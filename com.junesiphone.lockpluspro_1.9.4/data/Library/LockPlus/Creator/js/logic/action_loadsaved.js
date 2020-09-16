/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true,
  unparam: true
*/
/*global
  action,
  alert,
  loadClock,
  weatherdivs,
  systemdivs,
  miscDivs,
  constants,
  $
*/
/**
 * Load saved theme
 *
 *
 */

action.beginAnimations = function(){
try{
    if(action.savedElements.placedElements[id].fade){
        $('#' + id).css('display', 'none');
    }
    if(action.savedElements.placedElements[id].aniUp){
        var d = document.getElementById(id);
        d.style.webkitTransform = 'translateY(1000px) translateZ(0)';
        setTimeout(function(){
            d.style.webkitTransition = 'transform 1s ease-in-out';
        },0)
    }
}catch(err){}
}

action.remakeDIV = function (id) {
    if(document.getElementById(id)){
        return;
    }
    var div = document.createElement('div');
    div.id = id;

    if(id === 'avatarImage'){
        div.style.backgroundColor = 'black';
        div.style.backgroundImage = 'url("file:///var/mobile/Library/LockPlus/avatarspecialforlpp.png?'+ 001+' ")';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
    }

    if(id.substring(0, 7) === 'fpplace'){
        div.style.width = '50px';
        div.style.height = '50px';
        // div.style.backgroundColor = 'black';
        div.style.backgroundImage = 'url("file:///Library/LockPlus/Creator/images/placeholder.png")';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.zIndex = 1;
        div.style.borderColor = 'black';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '0px';
        div.style.pointerEvents = 'initial!important'; 
    }

    if(id.substring(0, 3) === 'box'){
        if(action.savedElements.placedElements[id]['data-image']){
            div.style.backgroundImage = 'url("'+action.savedElements.placedElements[id]['data-image']+'")';
            div.style.backgroundSize = 'contain';
            div.style.backgroundRepeat = 'no-repeat';
        }
    }
    
    
    //for font symbols
    if(id.substring(0, 2) === 'ft'){
        div.className = id.split('_')[1];
    }
    
    div.style.position = 'absolute';

    document.getElementById('screenElements').appendChild(div);

    /*
        If the element is a batterypie we need to initiate and
        create the svg counter part. This is done via the library
        circleprogress https://github.com/tigrr/circle-progress 
    */

    if(id === 'batterypie'){
        batteryPie.setup(div);
    }

    if(id === 'flipclock'){
        setTimeout(function(){
            flipClock.create(div);
        },0);
    }

    this.addDraggable(id);
    loadClock(); //in clock.js
    weatherdivs();
    systemdivs();
    miscDivs();
    symbolDivs();
    action.beginAnimations();
};

var addedWidget = [];

function checkForVal(value, isX){
    var x = 0, y = 0;
    if(value.transformY || value.transformX){
        if(value.transformY){
            y = value.transformY;
        }
        if(value.transformX){
            x = value.transformX;
        }
    }else{
        return 1000;
    }
    if(isX){
        return x;
    }else{
        return y;
    }
}


action.replaceElements = function () {
    
    var aniName = "", aniSpeed, xVal = 0, yVal = 0, value, oldTime = 0, legacy = false;
    Object.keys(this.savedElements.placedElements).forEach(function (key) {
        if(key === 'overlayStyle'){
            var obj = action.savedElements.placedElements[key];
            var overlay = document.getElementById('overlay');
            if(overlay){
                overlay.style.left = obj.left;
                overlay.style.top = obj.top;
            }
            return;
        }
        action.remakeDIV(key); //loop object and place items
        value = action.savedElements.placedElements[key];

        // if ($.inArray(key, constants.widgets) !== -1) {
        //     action.addToPage(key, true);
        // }
        //console.log(action.savedElements.placedElements[key]);

        /* Animations */
        legacy = checkContainsLegacy(Object.keys(value));

        if(value.transformAnimation){
            runAnimations(key);
        }

        if(value.knockout){
            svgKnockout.toggle(key);
        }

        if(legacy){
            if(value.fade){
                document.getElementById(key).style.display = 'none';
                $('#'+key).fadeIn(Number(value.fade));
            }
            runLegacyAnimation(key);
        }
        /* Animations */
        
        Object.keys(value).forEach(function (skey) { //loop styles on the object
            var styleVal = value[skey],
                elementDIV = null;

            switch (skey) {
                case 'scale':
                        document.getElementById(key).style.webkitTransform = 'scale('+styleVal+')';
                    break;
                case 'circle-width':
                        addStyleString('.circle-progress{width:'+styleVal+';height:'+styleVal+';}', 'circlewidth');
                    break;
                case 'outer-color':
                        addStyleString('.circle-progress-value{stroke:'+styleVal+';}', 'circleoutercolor');
                    break;
                case 'inner-color':
                        addStyleString('.circle-progress-circle{stroke:'+styleVal+';}', 'circleinnercolor');  
                    break;
                case 'circle-stroke-dasharray':
                        addStyleString('.circle-progress-value{stroke-dasharray:'+styleVal+' 2;}', 'circlestrokedash');
                    break;
                case 'circle-stroke':
                        addStyleString('.circle-progress-circle{stroke-width:'+styleVal+';}', 'circlestroke');
                    break;
                case 'circle-stroke-value':
                        addStyleString('.circle-progress-value{stroke-width:'+styleVal+';}', 'circlestrokevalue');
                    break;
                case 'fontSize':
                    skey = 'font-size';
                    break;
                case 'textAlign':
                    skey = 'text-align';
                    break;
                default:
                    break;
            }

            if (key === 'icon') { //#icon has an inner img element, it also needs height/width changed.
                $('#icon').css(skey, styleVal);
                if (skey === 'width' || skey === 'height') {
                    $('.icon').css(skey, styleVal);
                }
            } else if (key.substring(0, 4) === 'text' && skey === 'innerHTML') {
                if(document.getElementById(key).classList.contains('knockout')){
                    if(document.getElementById(key + 'knockout')){
                        document.getElementById(key + 'knockout').innerHTML = styleVal;
                    }
                }else{
                    $('#' + key).html(styleVal);
                }
            } else if (skey === 'data-prefix') {
                $('#' + key).attr('data-prefix', styleVal);
                $('#' + key).html(styleVal + $('#' + key).html());
            } else if (skey === 'data-suffix') {
                $('#' + key).attr('data-suffix', styleVal);
                $('#' + key).html($('#' + key).html() + styleVal);
            }else if (skey === 'bundleID') { //customApp
                $('#' + key).attr('bundleID', styleVal);
            }else if(skey === 'name'){ //customApp
                $('#' + key).attr('name', styleVal);
                $('#' + key).html(styleVal);
            }else if (skey === 'fade'){
                $('#'+key).fadeIn(Number(styleVal));
            }else if (skey === 'data-vars'){ //for elements in divs
                elementDIV = document.getElementById(key);
                elementDIV.setAttribute('data-title', key);
                try{
                    for (var i = 0; i < styleVal.length; i++) {
                        var div;
                        if(key.includes('customPanel')){
                            elementDIV.className = 'customPanel';


                            if (action.savedElements.placedElements[elementDIV.id]["is-charging"] === "true") {
                                elementDIV.style.opacity = 0; 
                            }

                            if (action.savedElements.placedElements[elementDIV.id]["is-playing"] === "true") {
                                elementDIV.style.opacity = 0; 
                            }
                        }else{
                            elementDIV.className = 'customDiv';
                        }

                        if(document.getElementById(styleVal[i])){
                            elementDIV.appendChild(document.getElementById(styleVal[i]));
                        }else{
                            if(String(styleVal[i]).length > 1){
                                action.remakeDIV(styleVal[i]);
                                div = document.getElementById(styleVal[i]);
                                elementDIV.appendChild(div);
                            }
                        }
                    }
                }catch(err){
                    alert(err + " action_loadsaved.js check data-vars");
                }
                if(key.indexOf('customPanel') > -1){
                    //get customPanels
                    var customPanels = customPanel.getCustomPanelObj();
                    customPanels.data[key] = styleVal
                    //append these new element that go in the panel
                    customPanels.names.push(key);
                    //add the panel name
                    customPanel.setCustomPanelObj(customPanels);
                    //save to custom panels
                }else{
                    var customDivs = customDiv.getCustomDivsObj();
                    customDivs.data[key] = styleVal
                    customDivs.names.push(key);
                    customDiv.setCustomDivsObj(customDivs);
                }
            }
            //we need to take into consideration the animations
            else if(skey === '-webkit-transform'){
                if(value.aniUp || value.aniDown || value.aniLeft || value.aniRight){

                }else{
                    $('#' + key).css(skey, styleVal);
                }
            }
            // end 
            else {

                var elDIV = document.getElementById(key);
                if(elDIV){
                    elDIV.style[skey] = styleVal;
                    if(skey === 'background' || skey === '-webkit-text-fill-color'){
                        if(Object.keys(value).contains('-webkit-background-clip')){
                            if(key.substring(0, 3) != 'box'){
                                elDIV.className = 'gradientText';
                            }
                        }
                    }
                }

                $('#' + key).css(skey, styleVal);
            }

            //console.log(key + 'is');
            //Widgets
            if ($.inArray(key, widgetArray) != -1) {

                //console.log('setting widget styles');
                //console.log("yes");
                try {
                    if ($.inArray(key, addedWidget) === -1) {
                        jsWidgets.addWidgetToPage(key);
                        addedWidget.push(key);
                    }
                } catch (err) {
                    //console.log(err);
                }
            }
        });
    });

};

action.saveNormalLocalStorage = function () {
    if (localStorage.placedElements) {
        if (localStorage.placedElements.length > 2) { //maybe it was set to a string of {} and it breaks everything
            this.savedElements = JSON.parse(localStorage.placedElements);

            this.movedElements = this.savedElements.placedElements; //keep moved elements up to date too
            if (this.savedElements.overlay) { //set overlay
                this.setOverlay(this.savedElements.overlay);
            }
            if (this.savedElements.placedElements) {
                setTimeout(function(){
                    action.replaceElements(); //put items back on screen
                },0);
            }
            if (this.savedElements.iconName) {
                this.setNewIcon(this.savedElements.iconName, 1); //if second paramenter dont show list
            }
        } else {
           
        }
    }
};

action.saveALTLocalStorage = function () {
    if (localStorage.ALTplacedElements) {
        if (localStorage.ALTplacedElements.length > 2) { //maybe it was set to a string of {} and it breaks everything
            this.savedElements = JSON.parse(localStorage.ALTplacedElements);

            this.movedElements = this.savedElements.placedElements; //keep moved elements up to date too
            if (this.savedElements.overlay) { //set overlay
                this.setOverlay(this.savedElements.overlay);
            }
            if (this.savedElements.placedElements) {
                this.replaceElements(); //put items back on screen
            }
            if (this.savedElements.iconName) {
                this.setNewIcon(this.savedElements.iconName, 1); //if second paramenter dont show list
            }
        } else {
            
        }
    }
};

action.loadFromStorage = function () { //reload elements onload
    //isios2 is ios2.html just loads into a different localStorage
    bundleList.listAppBundles();
    setTimeout(function(){
        if (isios2) {
            action.saveALTLocalStorage();
        } else {
            action.saveNormalLocalStorage();
        }
    }, 200);    
};
