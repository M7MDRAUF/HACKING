var tempWall,
    action = {
        savedElements: {}, //object to save elements placed
        movedElements: {}, //elements that are placed and moved
        wallpaper: '',
        uploadSelection: '', //save type of upload selection (overlay or background)
        selectedItem: '',
        selectedItems: [],
        blurTimeout: null,
        timeout: '',
        lastNotificationTime: false,
        zoomScale: 1.5,
        isScrollingEdit: false,
        actionQueue: [], //Queue of actions for undo/redo
        queuePosition: -1, //The current position within this ↑ queue, which action was most recently done
        isUndoingRedoing: false, //True while it's either undoing or redoing, prevents more from being added to the stack while it's processing the stack
        sizeQueueTimeout: {
            timeout: null,
            isEditingText: false,
            isTimeoutRunning: false,
            previousCssKey: '',
            previousAction: null,
            initialValue: ''
        }
    };
widgetArray = []; //just incase it doesn't load
action.widgetLoaded = null;

//disable context menu in chrome
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

//Instead of having the user enter details everytime, just store it.
action.loadUserCredentials = function(){
    var devName = document.getElementById('fdevname'),
    devEmail = document.getElementById('femail');
    $("#fdevname").change(function(){
        localStorage.name = devName.value;
    });
    $("#femail").change(function(){
        localStorage.email = devEmail.value;
    });
    if(localStorage.name){
        devName.value = localStorage.name;
    }
    if(localStorage.email){
        devEmail.value = localStorage.email;
    }
}

action.checkName = function(string){
    var pattern = new RegExp(/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/); //unacceptable chars
    if (pattern.test(string)) {
        alert("Please only use standard alphanumerics no symbols!");
        return false;
    }
    return true;
};

function exportSBHTML(){
    window.location = "exportSBHTML";
}

action.addRule = function (sheet, selector, styles) {
    if (sheet.insertRule) {
        return sheet.insertRule(selector + " {" + styles + "}", sheet.cssRules.length);
    }
    if (sheet.addRule) {
        return sheet.addRule(selector, styles);
    }
};

action.removeRule = function (sheet, selector, styles){
    var she, e, st;
    if(sheet.cssRules){
        for (she = 0; she < sheet.cssRules.length; she++) {
            if (sheet.cssRules[she].selectorText == selector) { 
                //battery border is a special fuck
                if(selector == "#battery"){
                    for (e = 0; e < sheet.cssRules[she].style.length; e++) {
                        st = sheet.cssRules[she].style[e];
                        if(st === "border-top-color"){
                            sheet.deleteRule(she);   
                        }
                    }
                }
                //all other css values
                if(sheet.cssRules[she].style[0] == styles){
                    sheet.deleteRule(she);
                }
            }
        }
    }
};

action.previewTheme = function(){
    html2canvas(document.querySelector('.screen'), {
      gradientText: [{
        start: 0,
        color: '#ff0'
      }, {
        start: 1,
        color: '#f0f'
      }]
    })
    .then(function(canvas) {
      document.getElementById('themePreview').appendChild(canvas);
      document.getElementById('themePreview').style.zIndex = '99999';
    })
};

// setTimeout(function(){
//     action.saveTheme();
// },1000);

action.saveTheme = function() { //saves info to divs and sends form to create plist
    document.getElementById('screen').style.backgroundColor = "#141414";
    $('.grids').css('display', 'none');
    action.addRule(document.styleSheets[0], ".customDiv::after", "opacity:0!important");
    html2canvas(document.querySelector('.screen')).then(function(canvas) {
        document.getElementById('previewCanvas').appendChild(canvas);

        //If you want to see the preview enable this
        // document.getElementById('previewCanvas').style.opacity = 1;
        // document.getElementById('previewCanvas').style.zIndex = 9999;
        
        setTimeout(function() {
            action.removeRule(document.styleSheets[0], ".customDiv::after", 'opacity');
            var ca = document.getElementById('previewCanvas');
            ca.setAttribute('title', "Theme saved, refresh the page");
            ca.className = 'pCanvas';
            ca = ca.children[0];
            var dataURL = ca.toDataURL();
            $('.phone').css('display', 'none'); //dont hide until html2canvas has rendered it.
            $('#elPanel').css('display', 'none');
            $('#roundmenu').css('display', 'none');
            //$('#X').css('display','none');
            $('.newSVG').empty(); //remove svg
            $("body").append('<form id="saveForm"><h3>Enter theme details</h3><label class="flabel">Your Name</label><input type="text" name="fdevname" id="fdevname" placeholder="Your Name"/><label class="flabel">Your Email</label><input type="text" name="femail" id="femail" placeholder="Email@email.com"/><label class="flabel">Theme Name</label><input type="text" name="fthemename" id="fthemename" placeholder="Theme Name"/></br></br><span class="saveNote"><b>Note:</b> If you are testing this theme put the word test somewhere in the theme name. These automatically get deleted after a period of time. I would always use this method unless you are familiar with the creator.</span></br><div class="fsubmit">Submit</div><div class="exportSBHTML" onclick="exportSBHTML()">Export SBHTML</div><label class="errorlabel">*must fill in all inputs</label></form>');
            if(!mobilecheck()){
                document.querySelector('.exportSBHTML').style.display = 'none';
            }
            action.loadUserCredentials();
            $('.fsubmit').on('click', function() {
                document.getElementById('loader').style.display = 'block';
                setTimeout(function(){
                    var devname = $('#fdevname').val();
                    var themename = $('#fthemename').val();

                    if(devname !== 'E-rwinn'){
                        if(!action.checkName(devname)){
                            document.getElementById('loader').style.display = 'none';
                            return;
                        }
                    }

                    if(!action.checkName(themename)){
                        document.getElementById('loader').style.display = 'none';
                        return;
                    }

                    var email = $('#femail').val();
                    var wallsrc = $('#wallpaper').attr('src');
                    
                    if (wallsrc) {
                        setTimeout(function(){
                            window.location = 'uploadwall:' + themename;
                        },0);
                    }
                   
                    // setTimeout(function(){
                    //     window.location = 'uploadpreview:' + themename;
                    // },1000);
                    
                    var formData = new FormData();

                    /* 
                        Quick fix 
                        If a theme is uploaded with an @ sign it will break the plist.
                    */
                    var dataXMLFixes = JSON.stringify(action.savedElements.placedElements);
                   // dataXMLFixes.replace("-", "&#45;");
                    dataXMLFixes.replace("@", "&#64;");
                    dataXMLFixes.replace("&", "&amp;");
                    dataXMLFixes.replace("&", "&#36;");
                    //var previewURL =  'http://lockplus.us/php/previews/' + themename + '.jpg';
                    var iconString = action.savedElements.iconName || '';
                    var overlayString = (action.savedElements.overlay) ? action.savedElements.overlay : '';
                    var dataXML = dataXMLFixes || '';

                    setTimeout(function(){
                        window.location = 'previewd:' + dataURL.split(',')[1] + ':' + themename;
                        setTimeout(function(){
                            window.location = 'uploadtheme:$' + themename + '$' + email + '$' + devname  + '$' + iconString + '$' + overlayString + '$' + dataXML;
                            $('#saveForm').css('display', 'none');
                            setTimeout(function(){
                                document.getElementById('loader').style.display = 'none';
                                location.href = 'file:///Library/LockPlus/LockPlus/index.html';
                            },2000);
                        },100);
                    },100);
                    return;
                    formData.append('fileName', themename);
                    formData.append('email', email);
                    formData.append('devname', devname);
                    formData.append('Tpreview', 'http://lockplus.us/php/previews/' + themename + '.jpg');
                    formData.append('Ticon', action.savedElements.iconName || '');
                    formData.append('Toverlay', (action.savedElements.overlay) ? action.savedElements.overlay : '');
                    formData.append('Telements', dataXMLFixes || '');
                    if(!mobilecheck()){
                        if(wallname){
                            var formData2 = new FormData();
                            formData2.append('themeName', themename);
                            formData2.append('oldName', wallname);
                            $.ajax({
                                url: '../../php/wallrename.php',
                                data: formData2,
                                processData: false,
                                contentType: false,
                                type: 'POST',
                                success: function(msg) {
                                    //console.log(msg);
                                }
                            });
                        }
                    }
                    $.ajax({
                        url: 'http://lockplus.us/creator/php/exportiOS.php',
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        error: function (request, status, error) {
                            //alert('ERROR ' + request + status + error); 
                            setTimeout(function(){
                                $.ajax({
                                    url: 'http://lockplus.us/php/newDump.php',
                                    data: null,
                                    processData: false,
                                    contentType: false,
                                    type: 'GET',
                                    error: function (request, status, error) {
                                        document.getElementById('loader').style.display = 'none';
                                        if(!mobilecheck()){
                                            location.href = "http://lockplus.us";
                                        }else{
                                            location.href = 'file:///Library/LockPlus/LockPlus/index.html';
                                        }
                                    },
                                    success: function(msg){
                                        document.getElementById('loader').style.display = 'none';
                                        if(!mobilecheck()){
                                            location.href = "http://lockplus.us";
                                        }else{
                                            location.href = 'file:///Library/LockPlus/LockPlus/index.html';
                                        }
                                    }
                                });
                            },4000);
                        },
                        success: function(msg) {
                            if (msg === "Exists") {
                                alert('The name you used already exists, please try another');
                                document.getElementById('loader').style.display = 'none';
                            } else if (msg === 'http://lockplus.us/php/newDump.php') {
                                 $.ajax({
                                    url: msg,
                                    data: null,
                                    processData: false,
                                    contentType: false,
                                    type: 'GET',
                                    success: function(msg){
                                        if(!mobilecheck()){
                                            location.href = "http://lockplus.us";
                                        }else{
                                            location.href = 'file:///Library/LockPlus/LockPlus/index.html';
                                        }
                                    }
                                });
                                //location.href = msg;
                            } else {
                                alert("Whoops there was an error, please report to @JunesiPhone " + msg);
                                document.getElementById('loader').style.display = 'block';
                            }
                            imageData = null;
                            document.getElementById('loader').style.display = 'none';
                            $('.grids').css('display', 'block');
                        }
                    });
                },300);
            });
        }, 0);
    });
};


