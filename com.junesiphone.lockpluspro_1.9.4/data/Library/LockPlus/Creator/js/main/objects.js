
function moveAllItems(style, move){
    var blackListVars = [];
    Object.keys(action.savedElements.placedElements).forEach(function (key) {
        //don't include items placed in panels
        if(action.savedElements.placedElements[key]['data-name']){
            blackListVars = action.savedElements.placedElements[key]['data-vars'];
        }
    });

    Object.keys(action.savedElements.placedElements).forEach(function (key) {
        if(blackListVars.includes(key)){
            return;           
        }
        try {
            if (action.savedElements.placedElements[key][style]) {
                var top = action.savedElements.placedElements[key][style];
                action.savedElements.placedElements[key][style] = parseInt(move, 10) + parseInt(top, 10);
                document.getElementById(key).style[style] = parseInt(move, 10) + parseInt(top, 10) + "px";
            } else {
                action.savedElements.placedElements[key][style] = parseInt(move, 10);
                document.getElementById(key).style[style] = parseInt(move, 10) + "px";
            }
        } catch (err) {
            //alert(err + action.savedElements.placedElements[key]);
        }
        action.saveStorage();
    });
}

function moveOverlay(style, move){
    var overlay = document.getElementById('overlay');
        var oldStyle = overlay.style[style];
        if(oldStyle <= 0){
            oldStyle = 0;
        } 
        overlay.style[style] = parseInt(move, 10) + parseInt(oldStyle, 10) + "px";
        if(!action.savedElements.placedElements['overlayStyle']){
            action.savedElements.placedElements['overlayStyle'] = {};
        }
        action.savedElements.placedElements['overlayStyle'][style] = parseInt(move, 10) + parseInt(oldStyle, 10) + "px";
        action.saveStorage();
    }

var fontArray = ['abeatbykai', 'adamasreg', 'android', 'aileronlight', 'aileronthin', 'aileronbold', 'aileronthick', 'aileronultra', 'aileronheavy', 'ailerons', 'akrobatblack', 'akrobatbold', 'akrobatexbold', 'akrobatlight', 'akrobatregular', 'akrobatsemibold', 'akrobatthin', 'akrobatxlight', 'allura', 'alpine', 'apriolight', 'aprioreg', 'anders', 'arista', 'autograf', 'avantgarde', 'aventura', 'azedobold', 'azedolight', 'back', 'bariollight', 'bariolthin', 'bariolbold', 'bikoblack', 'bikoregular', 'bikobold', 'bebasbold', 'bebaslight', 'bebasneue', 'bebasneueregular', 'blanch', 'breaksemi', 'braxton', 'building', 'canter', 'canarolight', 'captian', 'clemente', 'codebold', 'codelight', 'condlight', 'cooperhewiththin', 'cooperhewittbold', 'cooperhewittbook', 'cooperhewittlight', 'cooperhewittreg', 'crafted', 'cumulous', 'damier', 'din', 'dinerfat', 'disclaimerclassic', 'disclaimerreg', 'dense', 'earth', 'everafte', 'establo', 'fabfelt', 'feast', 'flow', 'freeky', 'fronte', 'futura', 'future', 'fringe', 'fortuna', 'geoma', 'gido', 'gasaltreg', 'gasaltthin', 'gasaltbold', 'globerreg', 'globerthin', 'geoman', 'goodvibes', 'gothicregular', 'gothicbold', 'hab', 'hallo', 'hanging', 'high', 'higher', 'huxlee', 'heygorgeous', 'ikaros', 'infinity', 'inkferno', 'jaapokki', 'jellyka', 'kanji', 'kaneda', 'king', 'krinkles', 'krinklesdecor', 'lcd', 'lg', 'lobster', 'lot', 'loveloblack', 'latoblack', 'latobold', 'latolight', 'latoreg', 'latothin', 'loveloline', 'lovelolinel', 'manbow', 'nexabold', 'nexabolder', 'nexalight', 'manifesto', 'manteka', 'makhina', 'masterofbreak', 'mikadolight', 'mikadoregular', 'mikadobold', 'mikadomedium', 'mikadoultra', 'mikadoblack', 'modernesans', 'moonlight', 'moonbold', 'moonshinerround', 'moonshinersharp', 'mohave', 'mostwasted', 'olympic', 'oswald', 'panama', 'penelope', 'perfo', 'plstk', 'poplar', 'provisionary', 'pushkin', 'quadrantabold', 'quadrantareg', 'qontra', 'ratinfested', 'reckoner', 'reboard', 'realtimethin', 'realtimelight', 'realtimeregular', 'realtimesemi', 'realtimebold', 'rexbold', 'roadrage', 'robotobold', 'robotolight', 'robotoregular', 'salamat', 'samster', 'samsunglight', 'samsungregular', 'samsungexlight', 'samsungreg', 'sanfranlight', 'sanfranthin', 'sanfranreg', 'sanfranbold', 'sanfranheavy', 'sciflysans', 'streamster', 'shimes', 'shimestwo', 'signer', 'scriptina', 'storopia', 'superair', 'talldark', 'timber', 'tiza', 'track', 'tresdias', 'wildyouth', 'zekton', 'zelda', 'entypo', 'mat1', 'mat2', 'mat3', 'mat4', 'mat5', 'webdev', 'Mountain'],
    menuPanel = {
        name: "menuPanel",
        appOnly: ['load_theme', 'reload_creator', 'test_preview', 'close_creator'],
        creatorOnly: ['exit_creator'],
        background: {
            name: "background",
            Camera_Roll: function() {
                action.uploadSelection= 'cgBackground';
                $('#bgInput').click();
            },
            Wallpaper_website: function() {
                location.href = "http://idevicewalls.com";
            },
            Photo_editor: function() {
                location.href = "https://doka.photo/";
            },
            clear_BG: function() {
                jPopup({
                    type: "confirm",
                    message: "Do you wish to clear the background?",
                    yesButtonText: "YES",
                    noButtonText: "NO",
                    functionOnNo: function() {},
                    functionOnOk: function() {
                        $('#wallpaper').attr('src', '');
                        $('#wallpaper').css('display', 'none');
                    }
                });
            },
            help: function() {
                jPopup({
                    type: "alert",
                    message: "The background option is only used when you are about to upload a theme. If you want a wallpaper included with your uploaded theme set it here before upload. Setting a background here does not apply it to your lockscreen. You apply wallpapers to the lockscreen via the stock settings. Settings> Wallpaper> Choose a new wallpaper> set to lockscreen",
                    yesButtonText: "OK",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        overlay: {
            name: "overlay",
            Camera_Roll: function() {
                action.uploadSelection= 'cgOverlay';
                $('#bgInput').click();
            },
            Overlay_website: function() {
                location.href = "http://idevicewalls.com/index.php?category=overlays";
            },
            clear_Overlay: function() {
                jPopup({
                    type: "confirm",
                    message: "Do you wish to clear the overlay?",
                    yesButtonText: "YES",
                    noButtonText: "NO",
                    functionOnNo: function() {},
                    functionOnOk: function() {
                        $('.screenoverlay').css('background-image', '');
                        action.savedElements.overlay = '';
                        delete action.savedElements['overlayStyle'];
                        action.saveStorage();
                    }
                });
            },
            move_overlay: {
                name: "move_all",
                add_Grabber: function() {
                    this.remove_Grabber();
                    var div = document.createElement('div'),
                        middleTop = screen.height / 2 - 50 + "px",
                        middleLeft = screen.width / 2 - 50 + "px";

                    div.id = 'moveGrabber';
                    div.style.top = middleTop
                    div.style.left = middleLeft

                    var y = null;
                    var x = null;

                    var setnumber = 0;
                    var setnumber2 = 0;

                    document.body.appendChild(div);

                    $(div).draggable({
                        axis: "",
                        start: function(event, ui) {

                        },
                        drag: function(event, ui) {
                            y = parseInt(middleTop, 10) - ui.position.top;
                            x = parseInt(middleLeft, 10) - ui.position.left;
                            if (setnumber) {
                                moveOverlay('top', setnumber -y);
                                //moveAllItems('top', setnumber - y);

                            }
                            if (setnumber2) {
                                moveOverlay('left', setnumber2 -x);
                                //moveAllItems('left', setnumber2 - x);
                            }
                            setnumber = y;
                            setnumber2 = x;
                        },
                        stop: function(event, ui) {
                            div.style.top = middleTop;
                            div.style.left = middleLeft;
                            setnumber = 0;
                            setnumber2 = 0;
                        },
                        create: function(event, ui) {

                        }
                    });
                },
                remove_Grabber: function() {
                    var moveGrabber = document.getElementById('moveGrabber');
                    $(moveGrabber).draggable("destroy");
                    if (moveGrabber) {
                        document.body.removeChild(moveGrabber);
                    }

                },
            },
            help: function() {
                jPopup({
                    type: "alert",
                    message: "Overlays are not moveable, but if you want to make a custom overlay go back to the main LockPlus menu, click tools, then make overlay. It will allow you to place multiple images and place them wherever you want. Once you save it use it as an overlay here.",
                    yesButtonText: "OK",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        load_theme: function(){
            if(typeof isInApp != 'undefined'){
                var themeName = prompt('Enter theme name');
                if(themeName){
                    window.location = "loadTheme:" + themeName;
                }                
            }else{
                jPopup({
                    type: "alert",
                    message: "Not available use the LockPlus menu.",
                    yesButtonText: "OK",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        add_elements: function() {
            menuLayout.close();
            elementMenu.open();
            // menuLayout.setCurrentMenu = "";
        },
        // elements: function(){

        //     menuLayout.close();
        //     elementMenu.open();
        //     menuLayout.setCurrentMenu = "";
        // },
        placed_Elements: function() {
            menuLayout.close();
            placedMenu.create();
        },
        toggle_panel:function(){
            menuLayout.close();
            placedMenu.create('panelsonly');
        },
        widgets: function() {
            menuLayout.close();
            jsWidgets.showWidgets();
        },
        add_font: {
            name: "add_font",
            select_font: function() {
                menuLayout.close();
                //action.addFont();
                addFontsMenu.create();
            },
            font_help: function() {
                jPopup({
                    type: "alert",
                    message: "A font with .otf extention and no spaces in the name can be placed in /Library/LockPlus/fonts once a font is put here press reload fonts, then select the font to use. It will then show in the fonts when stylig an element.",
                    yesButtonText: "OK",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        move_all: {
            name: "move_all",
            add_Grabber: function() {
                this.remove_Grabber();
                var div = document.createElement('div'),
                    middleTop = screen.height / 2 - 50 + "px",
                    middleLeft = screen.width / 2 - 50 + "px";

                div.id = 'moveGrabber';
                div.style.top = middleTop
                div.style.left = middleLeft

                var y = null;
                var x = null;

                var counter = 0;

                var setnumber = 0;
                var setnumber2 = 0;

                document.body.appendChild(div);

                $(div).draggable({
                    axis: "",
                    start: function(event, ui) {

                    },
                    drag: function(event, ui) {
                        y = parseInt(middleTop, 10) - ui.position.top;
                        x = parseInt(middleLeft, 10) - ui.position.left;
                        if (setnumber) {
                            moveAllItems('top', setnumber - y);

                        }
                        if (setnumber2) {
                            moveAllItems('left', setnumber2 - x);
                        }
                        setnumber = y;
                        setnumber2 = x;
                    },
                    stop: function(event, ui) {
                        div.style.top = middleTop;
                        div.style.left = middleLeft;
                        setnumber = 0;
                        setnumber2 = 0;
                    },
                    create: function(event, ui) {

                    }
                });
            },
            remove_Grabber: function() {
                var moveGrabber = document.getElementById('moveGrabber');
                if (moveGrabber) {
                    $(moveGrabber).draggable("destroy");
                    document.body.removeChild(moveGrabber);
                }

            },
            move_Help: function() {
                jPopup({
                    type: "alert",
                    message: "Add a grabber and move it around the screen to move elements. You cannot move overlays, they are stationary.",
                    yesButtonText: "Ok",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        // multi_select:function(){
        //     multiDragger.start();
        //     menuLayout.close();
        // },
        exporting: {
            name: "exporting",
            appOnly: [''],
            creatorOnly: ['export_SBHTML', 'export_Widget'],
            export_SBHTML: function() {
                try{
                    /*
                        Updates the NSString wkStorage in the tweak.
                        Which writes to LPP.js in the end of export.
                    */
                    window.webkit.messageHandlers.observe.postMessage(localStorage.getItem('placedElements'));
                }catch(err){}
                jPopup({
                    type: "confirm",
                    message: "Do you wish to export this widget to XenHTML? It will be located in XenHTML when screen goes blank.",
                    yesButtonText: "Yes",
                    noButtonText: "No",
                    functionOnNo: function() {},
                    functionOnOk: function() {
                        if (mobilecheck()) {
                            window.location = "exportSBHTML";
                        }
                    }
                });
            },
            export_Widget: function() {
                try{
                    window.webkit.messageHandlers.observe.postMessage(localStorage.getItem('placedElements'));
                }catch(err){}
                jPopup({
                    type: "confirm",
                    message: "Do you wish to export this widget to XenHTML? It will be located in XenHTML when screen goes blank.",
                    yesButtonText: "Yes",
                    noButtonText: "No",
                    functionOnNo: function() {},
                    functionOnOk: function() {
                        if (mobilecheck()) {
                            window.location = "exportWidget";
                        }
                    }
                });
            },
            export_FrontPage: function() {
                try{
                    window.webkit.messageHandlers.observe.postMessage(localStorage.getItem('placedElements'));
                }catch(err){}
                jPopup({
                    type: "confirm",
                    message: "Do you wish to export this to FrontPage? You must have FrontPage installed. Do not add spaces in the name when exported.",
                    yesButtonText: "Yes",
                    noButtonText: "No",
                    functionOnNo: function() {},
                    functionOnOk: function() {
                        try{
                        if (mobilecheck()) {
                            document.getElementById('screen').style.backgroundColor = "#141414";
                            html2canvas(document.querySelector('.screen')).then(function(canvas) {
                                document.getElementById('previewCanvas').appendChild(canvas);
                                var ca = document.getElementById('previewCanvas');
                                    ca.setAttribute('title', "Theme saved, refresh the page");
                                    ca.className = 'pCanvas';
                                    ca = ca.children[0];
                                    var dataURL = ca.toDataURL();
                                    setTimeout(function(){
                                        window.location = 'previewfpp:' + dataURL.split(',')[1] + ':' + 'fppreview';
                                    },100);
                            });
                        }
                        }catch(err){
                            alert(err);
                        }
                    }
                });
            },
            exporting_help: function() {
                jPopup({
                    type: "alert",
                    message: "If you are exporting a widget with touches exportWidget, otherwise exportSBHTML. Widget makes Widget.html with sizing, SBHTML will fit the screen.",
                    yesButtonText: "Ok",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        },
        settings:{
            name: "settings",
            reset_all: function(){
                 jPopup({
                    type: "confirm",
                    message: "You must reload the creator for changes to take. This will also reset the color picker.",
                    yesButtonText: "Reload Now",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function() {
                        localStorage.creatorOptions = null;
                        localStorage.removeItem('spectrum');
                        location.href = "file:///Library/LockPlus/LockPlus/index.html"
                    }
                });
            },
            reset_ColorPicker: function(){
                localStorage.removeItem('spectrum');
            },
            set_BGColor: function(){
                creatorOptions.showColorPickerForCreatorOptions('bgcolor');
            },
            set_CircleColor:function(){
                creatorOptions.showColorPickerForCreatorOptions('circlecolor');
            },
            circle_outside:function(){
                creatorOptions.showColorPickerForCreatorOptions('circleoutside');
            },
            MenuBarsColor: function(){
                creatorOptions.showColorPickerForCreatorOptions('menubarscolor');
            },
            MenuBarsTextColor: function(){
                creatorOptions.showColorPickerForCreatorOptions('menubarstextcolor');
            },
            MenuButtonColor: function(){
                creatorOptions.showColorPickerForCreatorOptions('menubuttoncolor');
            },
            MenuButtonTextColor: function(){
                creatorOptions.showColorPickerForCreatorOptions('menubuttontextcolor');
            }
        },
        clear_Screen: function() {
            jPopup({
                type: "confirm",
                message: "Do you wish to clear the screen?",
                yesButtonText: "Yes",
                noButtonText: "No",
                functionOnNo: function() {},
                functionOnOk: function() {
                    localStorage.removeItem('pressActions');
                    action.clearTheme(1);
                    customPanel.clear();
                    batteryPie.clearStyles();
                    customDiv.clear();
                    flipClock.remove();
                }
            });
        },
        upload_theme: function() {
            jPopup({
                type: "confirm",
                message: "Upload this theme? Once uploaded you can then download it by name. <br> <br> If uploading a theme used for FrontPage please add SB at the end!",
                yesButtonText: "Yes",
                noButtonText: "No",
                functionOnNo: function() {},
                functionOnOk: function() {
                    menuLayout.close();
                    action.saveTheme();
                }
            });
        },
        exit_creator: function() {
            location.href = "file:///Library/LockPlus/LockPlus/index.html";
        },
        reload_creator: function(){
            location.reload();
        },
        close_creator: function(){
            location.href = "closecreator:LockPlus";
        },
        test_preview: function() {
            location.href = "testPreview:LockPlus";
        },
        custom_command: function(){
            var customPromp = prompt("Enter javascript command \n DO NOT USE THIS IF YOU DONT KNOW WHAT YOURE DOING.");
            if(customPromp){
                eval(customPromp);
            }
        }
    },
    elementPanel = {
        name: "elementPanel",
        clockElements: {
            name: "clockElements",
            time: {
                name: 'time',
                title: "Clocks",
                flipclock: 'FlipClock',
                fullclock: cF.zhour() + ":" + cF.minute() + ":" + cF.second(),
                clock: cF.hour() + ":" + cF.minute(),
                zclock: cF.zhour() + ":" + cF.minute() + " (padded hour)",
                hour: cF.hour() + " (hour)",
                zhour: cF.zhour() + " (padded hour)",
                minute: cF.minute() + " (minute)",
                second: cF.second() + " (seconds)",
                clocksmush: cF.hour() + "" + cF.minute(),
                clocksmush1: cF.zhour() + "" + cF.minute() + " (padded)",
                clockline: cF.hour() + "|" + cF.minute(),
                clockdot: cF.hour() + "." + cF.minute(),
                clockdsh1: cF.zhour() + '-' + cF.minute() + " (padded)",
                clockdsh2: cF.hour() + '-' + cF.minute(),
                clockdot: cF.hour() + "." + cF.minute(),
                zclockdot: cF.zhour() + "." + cF.minute() + " (padded)",
                clockpm: cF.hour() + ":" + cF.minute() + cF.am() + " (Only shows am/pm on 12hr)",
                sclock: cF.hour() + ":" + cF.minute() + cF.ampmstrict() + " (always show am/pm)",
                sclockpadded: cF.zhour() + ":" + cF.minute() + cF.ampmstrict() + " (padded always show am/pm)",
                pm: cF.am() + " (am or pm)",
                amalways: cF.amalways() + " (am or pm always show)",
                timer: "00:00 (Clock Timer iOS10+)"
            },
            timeText: {
                name: 'timeText',
                title: "Time Text",
                htext: cF.hourtext() + " (hour text)",
                mtext: "o' clock" + " (minute text)",
                mtext2: "zero one & forty one",
                mtext3: "one & forty one",
                hrmin: cF.hourtext() + '.' + cF.minute(),
                hrnsmin: cF.hourtext() + ' ' + cF.minute(),
                hrsmush: cF.hourtext() + cF.minute(),
                hrmintx: (cF.minutetwotext() !== "") ? cF.hourtext() + '.' + cF.minuteonetextdot() + '.' + cF.minutetwotext() : cF.hourtext() + '.' + cF.minuteonetextdot() + cF.minutetwotext(),
                ttext: cF.hourtext() + " " + cF.minuteonetext() + ' ' + cF.minutetwotext(),
                min1: cF.minuteonetext() + " (Minute P1)",
                min2: cF.minutetwotext() + " (Minute P2)",
                min3: cF.minuteonetextNoSpace() + " (Minute No Space P1)",
                //ttextstr: cF.hourtext() + "" + cF.minuteonetext() + '' + cF.minutetwotext() + '<p style="text-transform:uppercase">' + cF.daytext() + '</p><p style="text-transform:lowercase">the' + cF.dateplus() + '</p>',

                nhrtmin: cF.hourtext() + ':' + cF.minute(),
                nhrtmin2: cF.zhour() + ':' + cF.minuteonetext() + ' ' + cF.minutetwotext(),
                nhrtmin3: cF.zhour() + ':' + cF.minuteonetextNoSpace() + ' ' + cF.minutetwotext(),
                nhrtarrowmin: cF.hourtext() + '>>' + cF.minute(),
                nttext: "[" + cF.hourtext() + "]" + cF.minuteonetext() + cF.minutetwotext(),
                nttext2: "(" + cF.hourtext() + ")" + cF.minuteonetext() + cF.minutetwotext(),
                tod: cF.tod() + " (time of day)",
                tod2: cF.tod2() + " (time of day - has night)",
                lngclstring: "It's " + cF.hour() + ":" + cF.minute() + " on " + cF.daytext().toLowerCase() + " the " + cF.dateplus()
            },
            dates: {
                name: 'dates',
                title: "Dates",
                date: cF.date() + " (Date)",
                datepad: cF.paddeddate() + " (Padded date)",
                
                datetext: cF.datetext(),
                dateplus: cF.dateplus(),
                datepadfirst: String(cF.paddeddate()).charAt(0) + " (Padded date first value)",
                datepadsecond: String(cF.paddeddate()).charAt(1) + " (Padded date second value)",
                daysleft: cF.daysLeft() + " ( days left in year)",
                daysleftpercent: cF.daysLeftPercentLeft() + " (year percent done)",
                daysleftpercent2: cF.daysLeftPercentToGo() + " (percent left in year)",
                prevdate: cF.prevdate() + " (yesterday's date)",
                nextdate: cF.nextdate() + " (tomorrow's date)",

                datemonthnum: cF.paddeddate() + '' + cF.monthdatepadded() + " (date/month)",
                monthnumdate: cF.monthdate() + '' + cF.paddeddate() + " (month/date)",
                timeslashdatemonth: cF.zhour() + cF.minute() + " / " + cF.paddeddate() + '' + cF.monthdatepadded() + " (time / datemonth)",
                timeslashmonthdate: cF.zhour() + cF.minute() + " / " + cF.monthdatepadded() + '' + cF.paddeddate() + " (time / monthdate)",
                monthdateslashtime: cF.monthdatepadded() + '' + cF.paddeddate()  + " / " + cF.zhour() + cF.minute() + " (monthdate / time)",
                datemonthslashtime: cF.paddeddate() + '' + cF.monthdatepadded() + " / " + cF.zhour() + cF.minute() + " (datemonth / time)",

                datebar: cF.monthdate() + '|' + cF.date() + '|' + cF.smyear(),
                datebar2: cF.date() + '|' + cF.monthdate() + '|' + cF.smyear(),
                datesnslash: cF.monthdate() + '/' + cF.date() + '/' + cF.smyear(),
                datesnslash2: cF.date() + '/' + cF.monthdate() + '/' + cF.smyear(),
                datesingled: cF.monthdate() + '-' + cF.date() + '-' + cF.smyear(),
                datesingled2: cF.date() + '-' + cF.monthdate() + '-' + cF.smyear(),
                mdy: cF.monthdate() + "/" + cF.date() + "/" + cF.year(),
                mdy2: cF.date() + "/" + cF.monthdate() + "/" + cF.year(),
                monthnumslashdatepad: cF.monthdate() + '/' + cF.paddeddate() + " (Padded date)",
                monthnumslashdate: cF.monthdate() + '/' + cF.date(),
                monthnumslashdatepad2: cF.monthdatepadded() + '/' + cF.paddeddate() + " (Full Padded)",
                monthnumslashdatepad3: cF.paddeddate() + '/' + cF.monthdatepadded() + " (Full Padded)",
                dateslashmonthpad: cF.paddeddate() + '/' + cF.monthdate() + " (Padded date)",
                dateslashmonthnumber: cF.date() + '/' + cF.monthdate(),
                dateliketime1: cF.paddeddate() + ':' + cF.monthdatepadded(),
                dateliketime2: cF.monthdatepadded() + ':' + cF.paddeddate(),
            },
            day: {
                name: 'day',
                title: "Day Text",
                day: cF.daytext(),
                sday: cF.sdaytext(),
                sday1: cF.sdaytext().slice(0, 1) + " (first letter of day)",
                sday2: cF.sdaytext().slice(1, 2) + " (second letter of day)",
                sday3: cF.sdaytext().slice(2, 3) + " (third letter of day)",
                daycut1: cF.daytext().substring(1) + " (cut first letter off)",
                daycut2: cF.daytext().substring(2) + " (cut first + second letter off)",
                daycut: cF.daytext().substring(3) + " (cut first 3 letters off day)",
                mday: cF.mdaytext() + " (day piece 'Wednes')",
                yestday: cF.yesterdaydaytext() + " (previous day)",
                sprevday: cF.sprevday() + " (previous day short)",
                nextday: cF.nextdaytext() + " (next day)",
                snextday: cF.snextday() + " (next day short)",
            },
            month: {
                name: 'month',
                title: "Month",
                monthD: cF.monthdate() + " (Month Number)",
                monthDPadded: cF.monthdatepadded() + " ( Padded)"
            },
            monthText: {
                name: 'monthText',
                title: "Month Text",
                month: cF.monthtext(),
                smonth: cF.smonthtext(),
                smonthsplit: cF.monthtext().substring(3) + ' (cut first 3 letters off month)',
                smonth1: cF.smonthtext().slice(0, 1) + " (first letter of month)",
                smonth2: cF.smonthtext().slice(1, 2) + " (second letter of month)",
                smonth3: cF.smonthtext().slice(2, 3) + " (third letter of month)",
                prevmonth: cF.prevmonthtext() + " (previous month)",
                sprevmonth: cF.sprevmonth() + " (previous month short)",
                nextmonth: cF.nextmonthtext() + " (next month)",
                snextmonth: cF.snextmonth() + " (next month short)",
            },
            year: {
                name: 'year',
                title: "Year",
                year: "" + cF.year(),
                yearnum: cF.year().toString().slice(2, 4) + " (year)",
                yeartext: convertTOWord(cF.year())
            },
            strings: {
                name: 'strings',
                title: "Strings",
                sdaymonthdate: cF.sdaytext() + ', ' + cF.monthtext() + ' ' + cF.paddeddate(),
                sdaydatemonth: cF.sdaytext() + ', ' + cF.paddeddate() + ' ' + cF.monthtext(),
                sdaymonthdateno: cF.sdaytext() + ' ' + cF.monthtext() + ' ' + cF.paddeddate(),
                sdaydatemonthno: cF.sdaytext() + ' ' + cF.paddeddate() + ' ' + cF.monthtext(),
                sdaymonth: cF.sdaytext() + ', ' + cF.monthtext(),

                dstring: cF.sdaytext() + ', ' + cF.smonthtext() + ' ' + cF.date(),
                dstringpad: cF.sdaytext() + ', ' + cF.smonthtext() + ' ' + cF.paddeddate(),
                nsmdd: cF.sdaytext() + " " + cF.date(),
                smdotdate: cF.smonthtext() + '.' + cF.date(),
                datesmdot: cF.date() + '.' + cF.smonthtext(),
                dateslashmonth: cF.date() + "/" + cF.monthtext(),
                monthslashdate: cF.monthtext() + "/" + cF.date(),
                datemonth: cF.date() + " " + cF.monthtext(),
                datemonthrev: cF.monthtext() + " " + cF.date(),
                fullmonthdotdate: cF.monthtext() + '.' + cF.date(),
                datedotmonthfull: cF.date() + '.' + cF.monthtext(),
                nsmmyear: cF.smonthtext() + " " + cF.year(),
                nmdplusyear: cF.monthtext() + " " + cF.dateplus() + " " + cF.year(),
                datemonthyear: cF.date() + ' ' + cF.monthtext() + ', ' + cF.year(),
                prevdaystrings: cF.yesterdaydaytext() + ' ' + cF.monthtext() + ' ' + cF.prevdate(),
                todaystrings: cF.daytext() + ' ' + cF.monthtext() + ' ' + cF.date(),
                nextdaystrings: cF.nextdaytext() + ' ' + cF.monthtext() + ' ' + cF.nextdate(),
                dateplusof: cF.dateplus() + " of " + cF.monthtext(),
                dateplusplusof: cF.daytext() + ", " + cF.dateplus() + " of " + cF.monthtext(),
                datestring: cF.daytext() + ", " + cF.monthtext() + " " + cF.date(),
                datedash: cF.daytext() + "-" + cF.monthtext() + "-" + cF.date(),
                datespace: cF.daytext() + " " + cF.monthtext() + " " + cF.date(),
                ndatedash: cF.daytext() + " - " + cF.monthtext() + " - " + cF.date(),
                monthdateyear: cF.monthtext() + " " + cF.date() + ", " + cF.year(),
                daydatesmonth: cF.daytext() + ' ' + cF.date() + ' ' + cF.smonthtext(),
                daydatescommamonth: cF.daytext() + ', ' + cF.date() + ' ' + cF.smonthtext(),
                monthlinespace: cF.monthtext() + " | " + cF.date() + " | " + cF.year(),
                monthline: cF.monthtext() + "|" + cF.date() + "|" + cF.year(),
                monthdayyear: cF.monthtext() + " " + cF.date() + " " + cF.year(),
                datestringrev: cF.monthtext() + " " + cF.date() + ", " + cF.daytext(),
                datedotmonth: cF.paddeddate() + '.' + cF.monthtext(),
                monthdot: cF.monthtext() + "." + cF.paddeddate(),
                daydatemonth: cF.daytext() + " | " + cF.date() + " " + cF.monthtext(),
                daydatemonth2: cF.date() + " " + cF.monthtext() + " | " + cF.daytext(),
                dayabdatemonth: cF.sdaytext() + ' ' + cF.date() + ' ' + cF.smonthtext(),
                daycommadatemonth: cF.sdaytext() + ', ' + cF.date() + ' ' + cF.smonthtext(),
                daydate: cF.daytext() + " " + cF.date(),
                daydotdate: cF.daytext() + "." + cF.date(),
                nsmd: cF.smonthtext() + " " + cF.date(),
                ndsm: cF.date() + " " + cF.smonthtext(),
                ndsm2: cF.paddeddate() + " " + cF.smonthtext(),
                ndsm3: cF.smonthtext() + " " + cF.paddeddate(),
                ndsm4: cF.sdaytext() + " " + cF.paddeddate(),
                ndsmd: cF.date() + " " + cF.sdaytext(),
                datedotsmonth: cF.date() + '.' + cF.sdaytext(),
                datedotsmonthpad: cF.paddeddate() + '.' + cF.sdaytext(),
                smonthdotdate: cF.sdaytext() + '.' + cF.date(),
                smonthdotdatepad: cF.sdaytext() + '.' + cF.paddeddate(),
            }
        },
        weatherElements: {
            name: 'weatherElements',
            wstring: {
                name: 'wstring',
                title: "String",
                tempcon: "76 Cloudy",
                tempcon1: "76°f Cloudy",
                tempcon2: "76° Cloudy",
                contemp: "Cloudy 76°",
                contemp2: "Cloudy 76°f",
                windstr: "25mph N",
                medwstring: "Cloudy &amp; 76&deg;",
                lngwstring: "It's cloudy outside and the temp is around 35&deg;.",
                lngwstring2: "Currently it's 35&deg; outside.",
                lngwstring3: "Currently it's cloudy, the high today will reach 60&deg; </br> Right now it's 90&deg; and your battery is 50%",
                lngwstring4: "It could be cloudy and 50&deg; but who really knows. </br> What I can tell you is your battery is 50%:)",
                lngwstring5: "The current temperature is 90&deg;, it's cloudy with a wind speed of 30mph. </br> Your battery is at 90% and is charging.",
            },
            temps: {
                name: 'temps',
                title: "Temp",
                temp: "76",
                tempdeg: "76°",
                tempdegplus: "76°f"
            },
            icon: {
                name: 'icon',
                title: "Icon",
                icon: "Weather",
                coloricon: 'Color Icon'
            },
            forecast: {
                name: 'forecast',
                title: "Forecast",

                day1day: "Day1 Day Mon",
                day1icon: "Day1 Icon",
                day1lohigh: "Day1 75°/50°",
                day1high: "Day1 High 75°",
                day1low: "Day1 Low 50°",
                day1highno: "Day1 High 75",
                day1lowno: "Day1 Low 50",

                day2day: "Day2 Day Tue",
                day2icon: "Day2 Icon",
                day2lohigh: "Day2 75°/50°",
                day2high: "Day2 High 75°",
                day2low: "Day2 Low 50°",
                day2highno: "Day2 High 75",
                day2lowno: "Day2 Low 50",

                day3day: "Day3 Day Wed",
                day3icon: "Day3 Icon",
                day3lohigh: "Day3 75°/50°",
                day3high: "Day3 High 75°",
                day3low: "Day3 Low 50°",
                day3highno: "Day3 High 75",
                day3lowno: "Day3 Low 50",

                day4day: "Day4 Day Thu",
                day4icon: "Day4 Icon",
                day4lohigh: "Day4 75°/50°",
                day4high: "Day4 High 75°",
                day4low: "Day4 Low 50°",
                day4highno: "Day4 High 75",
                day4lowno: "Day4 Low 50",

                day5day: "Day5 Day Fri",
                day5icon: "Day5 Icon",
                day5lohigh: "Day5 75°/50°",
                day5high: "Day5 High 75°",
                day5low: "Day5 Low 50°",
                day5highno: "Day5 High 75",
                day5lowno: "Day5 Low 50",
            },
            hourlyforecast:{
                name: 'hourlyforecast',
                title: "Hourly Forecast",

                hour1: "Hr1Time:2:00",
                hour1temp: "Hr1Temp:39°",
                hour1icon: "Hr1Icon:0",
                hour1precip: 'Hr1Precip:20%',

                hour2: "Hr2Time:2:00",
                hour2temp: "Hr2Temp:39°",
                hour2icon: "Hr2Icon:0",
                hour2precip: 'Hr2Precip:20%',

                hour3: "Hr3Time:2:00",
                hour3temp: "Hr3Temp:39°",
                hour3icon: "Hr3Icon:0",
                hour3precip: 'Hr3Precip:20%',

                hour4: "Hr4Time:2:00",
                hour4temp: "Hr4Temp:39°",
                hour4icon: "Hr4Icon:0",
                hour4precip: 'Hr4Precip:20%',

                hour5: "Hr5Time:2:00",
                hour5temp: "Hr5Temp:39°",
                hour5icon: "Hr5Icon:0",
                hour5precip: 'Hr5Precip:20%',

                hourlystring1: "1: 10:00 Temp:50° Precip: 20%",
                hourlystring2: "2: 11:00 Temp:50° Precip: 20%",
                hourlystring3: "3: 12:00 Temp:50° Precip: 20%",
                hourlystring4: "4: 01:00 Temp:50° Precip: 20%",
                hourlystring5: "5: 02:00 Temp:50° Precip: 20%",

                hourlystringtemp1: "1 Temperature: 10:00 50°",
                hourlystringtemp2: "2 Temperature: 11:00 50°",
                hourlystringtemp3: "3 Temperature: 12:00 50°",
                hourlystringtemp4: "4 Temperature: 01:00 50°",
                hourlystringtemp5: "5 Temperature: 02:00 50°",

                hourlystringtempdash1: "1 Temperature: 10:00 - 50°",
                hourlystringtempdash2: "2 Temperature: 11:00 - 50°",
                hourlystringtempdash3: "3 Temperature: 12:00 - 50°",
                hourlystringtempdash4: "4 Temperature: 01:00 - 50°",
                hourlystringtempdash5: "5 Temperature: 02:00 - 50°",

                hourlystringtempcolon1: "1 Temperature: 10:00 : 50°",
                hourlystringtempcolon2: "2 Temperature: 11:00 : 50°",
                hourlystringtempcolon3: "3 Temperature: 12:00 : 50°",
                hourlystringtempcolon4: "4 Temperature: 01:00 : 50°",
                hourlystringtempcolon5: "5 Temperature: 02:00 : 50°",

                hourlystringprecip1: "1 Precipitation: 10:00 20%",
                hourlystringprecip2: "2 Precipitation: 11:00 20%",
                hourlystringprecip3: "3 Precipitation: 12:00 20%",
                hourlystringprecip4: "4 Precipitation: 01:00 20%",
                hourlystringprecip5: "5 Precipitation: 02:00 20%",

                hourlystringprecipdash1: "1 Precipitation: 10:00 - 20%",
                hourlystringprecipdash2: "2 Precipitation: 11:00 - 20%",
                hourlystringprecipdash3: "3 Precipitation: 12:00 - 20%",
                hourlystringprecipdash4: "4 Precipitation: 01:00 - 20%",
                hourlystringprecipdash5: "5 Precipitation: 02:00 - 20%",

                hourlystringprecipcolon1: "1 Precipitation: 10:00 : 20%",
                hourlystringprecipcolon2: "2 Precipitation: 11:00 : 20%",
                hourlystringprecipcolon3: "3 Precipitation: 12:00 : 20%",
                hourlystringprecipcolon4: "4 Precipitation: 01:00 : 20%",
                hourlystringprecipcolon5: "5 Precipitation: 02:00 : 20%",
            },
            highs: {
                name: 'highs',
                title: "High",
                high: "80",
                highdeg: "80°",
                highdegplus: "80°f"
            },
            lows: {
                name: 'lows',
                title: "Low",
                low: "70",
                lowdeg: "70°",
                lowdegplus: "70°f"
            },
            lowhigh: {
                name: 'lowhigh',
                title: "High and Low",
                highdashlow: "80-70",
                highdashlowdeg: "80°-70°",
                highslashlow: "80/70",
                highslashlowdeg: "80°/70°"
            },
            city: {
                name: 'city',
                title: "City",
                city: "Current City"
            },
            uvIndex:{
                name: 'uvindex',
                title: "uvindex",
                uvindex: '3'
            },
            location:{
                name: 'location',
                title: 'location',
                county: 'Shelby',
                country: 'United States',
                countryAbbr: 'US',
                //state: 'Tennessee',
                stateAbbr: 'TN'
            },
            condition: {
                name: 'condition',
                title: "Condition",
                condition: "Cloudy"
            },
            humidity: {
                name: 'humidity',
                title: "Humidity",
                humidity: "60"
            },
            windchill: {
                name: 'windchill',
                title: "Wind Chill",
                windchill: "20°"
            },
            wind: {
                name: 'wind',
                title: "Wind",
                wind: "25mph",
                winddirection: "N"
            },
            pressure: {
                name: 'Pressure',
                title: 'Pressure',
                pressure: '30.0',
                pressureRising: '1'
            },
            heatindex:{
                name: 'heatindex',
                title: 'HeatIndex',
                heatindex: '10'
            },
            airquality:{
                name: 'airquality',
                title: 'airquality',
                airquality: '10'
            },
            visibility: {
                name: 'visibility',
                title: "Visibility",
                visibility: "20miles"
            },
            rain: {
                name: 'rain',
                title: "Rain",
                rain: "20%"
            },
            dewpoint: {
                name: 'dewpoint',
                title: "Dewpoint",
                dewpoint: "40°"
            },
            feelslike: {
                name: 'feelslike',
                title: "FeelsLike",
                feelslike: "90",
                feelslikedeg: "90°"
            },
            suntime: {
                name: 'suntime',
                title: "Sun",
                sunrise: "5:00 (sunrise)",
                sunset: "7:00 (sunset)"
            },
            update: {
                name: 'update',
                title: "Last Updated",
                update: "Last Updated"
            }

        },
        systemElements: {
            name: 'systemElements',
            phone_name: {
                name: 'phone_name',
                title: "phone_name",
                phonename: "iPhone Name",
                phonename2: 'Hello, Name',
                phonename3: 'Good Morning, Name'
            },
            health:{
                name: "health",
                title: "health",
                stepsToday: "StepsToday: 1000",
                stepsTodayDay: "StepsTodayDay: Today",
                stepsTodaySDay: "StepsTodayDay: Mon",
                stepsTodayDate: "StepsTodayDay: 10",
                stepsTodayDatePlus: "StepsTodayDay: 10th",
                b1: 'blank',
                stepsToday0: "StepArray0: 1000",
                stepsTodayDay0: "StepsArray0: Monday",
                stepsTodaySDay0: "StepsArray0: Mon",
                stepsTodayDate0: "StepsArray0: 11",
                stepsTodayDatePlus0: "StepsArray0: 11th",
                b2: 'blank',
                stepsToday1: "StepArray1: 1000",
                stepsTodayDay1: "StepsArray1: Tuesday",
                stepsTodaySDay1: "StepsArray1: Tue",
                stepsTodayDate1: "StepsArray1: 12",
                stepsTodayDatePlus1: "StepsArray1: 12th",
                b3: 'blank',
                stepsToday2: "StepArray2: 1000",
                stepsTodayDay2: "StepsArray2: Wednesday",
                stepsTodaySDay2: "StepsArray2: Wed",
                stepsTodayDate2: "StepsArray2: 13",
                stepsTodayDatePlus2: "StepsArray2: 13th",
                b4: 'blank',
                stepsToday3: "StepArray3: 1000",
                stepsTodayDay3: "StepsArray3: Thursday",
                stepsTodaySDay3: "StepsArray3: Thu",
                stepsTodayDate3: "StepsArray3: 14",
                stepsTodayDatePlus3: "StepsArray3: 14th",
                b5: 'blank',
                stepsToday4: "StepArray4: 1000",
                stepsTodayDay4: "StepsArray4: Friday",
                stepsTodaySDay4: "StepsArray4: Fri",
                stepsTodayDate4: "StepsArray4: 15",
                stepsTodayDatePlus4: "StepsArray4: 15th",
                b6: 'blank',
                stepsToday5: "StepArray5: 1000",
                stepsTodayDay5: "StepsArray5: Saturday",
                stepsTodaySDay5: "StepsArray5: Sat",
                stepsTodayDate5: "StepsArray5: 16",
                stepsTodayDatePlus5: "StepsArray5: 16th",
                b7: 'blank',
                stepsToday6: "StepArray6: 1000",
                stepsTodayDay6: "StepsArray6: Sunday",
                stepsTodaySDay6: "StepsArray6: Sun",
                stepsTodayDate6: "StepsArray6: 17",
                stepsTodayDatePlus6: "StepsArray6: 17th",
                b8: 'blank',
                stepsToday7: "StepArray7: 1000",
                stepsTodayDay7: "StepsArray7: Sunday",
                stepsTodaySDay7: "StepsArray7: Sun",
                stepsTodayDate7: "StepsArray7: 17",
                stepsTodayDatePlus7: "StepsArray7: 17th",

            },
            events_strings:{
                name: 'events_strings',
                title: "events_strings",
                events1monthstring: "Event 1: June 22: Doing Something",
                events2monthstring: "Event 2: June 23: Doing Something",
                events3monthstring: "Event 3: June 24: Doing Something",
                events4monthstring: "Event 4: June 25: Doing Something",

                events1monthstring6: "Event 1: June 22 Doing Something",
                events2monthstring6: "Event 2: June 23 Doing Something",
                events3monthstring6: "Event 3: June 24 Doing Something",
                events4monthstring6: "Event 4: June 25 Doing Something",

                events1monthstring5: "Event 1: June 22nd: Doing Something",
                events2monthstring5: "Event 2: June 23rd: Doing Something",
                events3monthstring5: "Event 3: June 24th: Doing Something",
                events4monthstring5: "Event 4: June 25th: Doing Something",

                events1monthstring2: "Event 1: June 22nd Doing Something",
                events2monthstring2: "Event 2: June 23rd Doing Something",
                events3monthstring2: "Event 3: June 24th Doing Something",
                events4monthstring2: "Event 4: June 25th Doing Something",

                events1daystring: "Event 1: Mon: Doing Something",
                events2daystring: "Event 2: Tue: Doing Something",
                events3daystring: "Event 3: Wed: Doing Something",
                events4daystring: "Event 4: Thur: Doing Something",

                events1daystring7: "Event 1: Monday Doing Something",
                events2daystring7: "Event 2: Tuesday Doing Something",
                events3daystring7: "Event 3: Wednesday Doing Something",
                events4daystring7: "Event 4: Thursday Doing Something",

                events1daystring8: "Event 1: Monday 22nd June",
                events2daystring8: "Event 2: Tuesday 23rd June",
                events3daystring8: "Event 3: Wednesday 24th June",
                events4daystring8: "Event 4: Thursday 25th June",

                events1monthstring3: "Event 1: June 22nd",
                events2monthstring3: "Event 2: June 23rd",
                events3monthstring3: "Event 3: June 24th",
                events4monthstring3: "Event 4: June 25th",

                events1monthstring4: "Event 1: June 22",
                events2monthstring4: "Event 2: June 23",
                events3monthstring4: "Event 3: June 24",
                events4monthstring4: "Event 4: June 25",

                events1timestring: "Event 1: 05:30pm - 06:30pm",
                events2timestring: "Event 2: 06:30pm - 07:30pm",
                events3timestring: "Event 3: 07:30pm - 08:30pm",
                events4timestring: "Event 4: 09:30pm - 10:30pm",
            },
            events:{
                name: 'events',
                title: "events",

                events1date: "Event 1 date string: 00-00-2020",
                events1title: "Event 1 title: Doing Something",
                events1day: "Event 1 day full: Monday",
                events1sday: "Event 1 day: Mon",
                events1month: "Event 1 month: June",
                events1dateval: "Event 1 date: 22",
                events1dateplus: "Event 1 date: 22nd",
                events1starttime: "Event 1 start: 5:00",
                events1endtime: "Event 1 end: 6:00",

                events1starttimepadded: "Event 1 paddedstart: 05:00",
                events1starttimepaddedpm: "Event 1 paddedstartpm: 05:00pm",
                events1starttimepm: "Event 1 startpm: 5:00pm",

                events1endtimepadded: "Event 1 paddedend: 05:00",
                events1endtimepaddedpm: "Event 1 paddedendpm: 05:00pm",
                events1endtimepm: "Event 1 endpm: 5:00pm",

                events2date: "Event 2 date string: 00-00-2020",
                events2title: "Event 2 title: Doing Something",
                events2day: "Event 2 day full: Tuesday",
                events2sday: "Event 2 day short: Tue",
                events2month: "Event 2 month: June",
                events2dateval: "Event 2 date: 22",
                events2dateplus: "Event 2 date: 22nd",
                events2starttime: "Event 2 start: 7:00",
                events2endtime: "Event 2 end: 8:00",

                events2starttimepadded: "Event 2 paddedstart: 07:00",
                events2starttimepaddedpm: "Event 2 paddedstartpm: 07:00pm",
                events2starttimepm: "Event 2 startpm: 7:00pm",

                events2endtimepadded: "Event 2 paddedend: 08:00",
                events2endtimepaddedpm: "Event 2 paddedendpm: 08:00pm",
                events2endtimepm: "Event 2 endpm: 8:00pm",

                events3date: "Event 3 date string: 00-00-2020",
                events3title: "Event 3 title: Doing Something",
                events3day: "Event 3 day full: Wednesday",
                events3sday: "Event 3 day short: Wed",
                events3month: "Event 3 month: June",
                events3dateval: "Event 3 date: 22",
                events3dateplus: "Event 3 date: 22nd",
                events3starttime: "Event 3 start: 9:00",
                events3endtime: "Event 3 end: 10:00",

                events3starttimepadded: "Event 3 paddedstart: 09:00",
                events3starttimepaddedpm: "Event 3 paddedstartpm: 09:00pm",
                events3starttimepm: "Event 3 startpm: 9:00pm",

                events3endtimepadded: "Event 3 paddedend: 10:00",
                events3endtimepaddedpm: "Event 3 paddedendpm: 10:00pm",
                events3endtimepm: "Event 3 endpm: 10:00pm",

                events4date: "Event 4 date string: 00-00-2020",
                events4title: "Event 4 title: Doing Something",
                events4day: "Event 4 day full: Thursday",
                events4sday: "Event 4 day short: Thu",
                events4month: "Event 4 month: June",
                events4dateval: "Event 4 date: 22",
                events4dateplus: "Event 4 date: 22nd",
                events4starttime: "Event 4 start: 11:00",
                events4endtime: "Event 4 end: 12:00",

                events4starttimepadded: "Event 4 paddedstart: 11:00",
                events4starttimepaddedpm: "Event 4 paddedstartpm: 11:00pm",
                events4starttimepm: "Event 4 startpm: 11:00pm",

                events4endtimepadded: "Event 4 paddedend: 12:00",
                events4endtimepaddedpm: "Event 4 paddedendpm: 12:00pm",
                events4endtimepm: "Event 4 endpm: 12:00pm",
            },
            firmware: {
                name: 'firmware',
                title: "Firmware",
                firmware: "Version 8.3"
            },
            ipaddress: {
                name: 'ipaddress',
                title: "iPAddress",
                ipaddress: "192.168.x.x"
            },
            battery: {
                name: 'battery',
                title: "Battery",
                battery: "100",
                batterypercent: "100%",
                batteryperslashcharge: "80% / charging",
                chargingtxt: "Not Charging",
                chargingstate: "Charging",
                onlycharging: "Charging (only charging)",
                batterypie: 'Circle Battery'
            },
            memory: {
                name: 'memory',
                title: "Memory",
                ramFree: "700 (Free)",
                ramUsed: "100 (Used)",
                ramAvailable: "800 (Available)",
                ramFreeMB: "700mb (Free)",
                ramUsedMB: "100mb (Used)",
                ramAvailableMB: "800mb (Available)"
            },
            unlock: {
                name: 'unlock',
                title: "Unlock",
                unlock: "Unlock"
            },
            respring: {
                name: 'respring',
                title: "Respring",
                respring: "Respring"
            },
            sleep: {
                name: 'sleep',
                title: "Sleep",
                sleep: "Sleep"
            },
            flashlight: {
                name: 'flashlight',
                title: "Flashlight",
                flashlight: "Flashlight"
            },
            music: {
                name: 'music',
                title: "Music",
                playmusic: "Play (no hide)",
                nextmusic: "Next (no hide)",
                prevmusic: "Previous (no hide)",
                songalbumArtnohide: 'Song Artwork (no hide)',
                duration: 'Song Duration',
                elapsed: 'Song Elapsed',
                durationbar: 'Duration Bar',
                playmusichide: "Play (auto hide)",
                nextmusichide: "Next (auto hide)",
                prevmusichide: "Previous (auto hide)",
                songtitle: "Song Title (auto hide)",
                songartist: 'Song Artist (auto hide)',
                songalbum: 'Song Album (auto hide)',
                songalbumArt: 'Song Artwork (auto hide)',
                songtitlenohide: "Song Title (no hide)",
                songartistnohide: 'Song Artist (no hide)',
                songalbumnohide: 'Song Album (no hide)'
            },
            search: {
                name: 'search',
                title: "Search",
                searchicon: "Search Icon",
                searchtext: "Search Text"
            },
            signal: {
                name: 'signal',
                title: "Signal",
                signal: "3",
                signalpercent: "40%"
            },
            alarm: {
                name: 'alarm',
                title: "Alarm",
                alarm24: "10:30 AM",
                alarmstring: "Tue 10:30 AM",
                alarmstringsmall: "Tue 10:30",
                alarm: "8:00",
                alarmhr: "8",
                alarmmin: "30",
                alarmday: "Tuesday",
                alarmsday: "Tue"
            },
            wifi: {
                name: 'wifi',
                title: "Wifi",
                wifi: "2",
                wifipercent: "20%"
            },
            notifications: {
                name: 'notifications',
                title: "Notifications",
                notifymail: "Mail",
                notifysms: "SMS",
                notifyphone: "Phone",
                notifywhats: "WhatsApp",
                notifytelegram: "Telegram",
                notifytelegramx: "TelegramX",
                notifyfbmessenger: "FBMessenger",
                notifydiscord: "Discord",
                notifyviber: "Viber",
                notifyinstagram: "Instagram",
                notifyfacebook: "Facebook",
                notifygmail: "Gmail",
                notifyoutlook: "Outlook",
                notifyairmail: "AirMail",
                notifyymail: "YMail",
                notifysnapchat: "SnapChat",
                notifyreddit: "Reddit",
                notifygoogleplus: "GooglePlus",
                notifylinkedin: "LinkedIn",
                notifyslack: "Slack",
                notifyspark: "Spark",
                notifydiscord: "Discord",
                notifytwitter: "Twitter",
                notifytweetbot: "Tweetbot",
                notifyyoutube: "YouTube",
            }
        },
        symbols: {
            name: "symbols",
            html_symbols: {
                name: 'html_symbols',
                title: 'html_symbols',
                sy1: '⦿',
                sy2: '◉',
                sy3: '○',
                sy4: '◌',
                sy5: '◎',
                sy6: '●',
                sy7: '◔',
                sy8: '◯',
                sy9: '〇',
                sy10: '⊕',
                sy11: '⊖',
                sy12: '⊘',
                sy13: '❝',
                sy14: '❞',
                sy15: '♛',
                sy16: '☾',
                sy17: '﹏',
                sy18: '︴',
                sy19: '☰',
                sy20: '▸',
                sy21: '▾',
                sy22: '⎔',
                sy23: '',
                sy24: '⍝',
                sy25: '⌘',
                sy26: '⌥',
                sy27: '⍋',
                sy28: '✖',
                sy29: '❜',
                sy30: '❛',
                sy31: '▦',
                sy32: '❀',
                sy33: '⋆',
                sy34: '™',
                sy35: '⊛',
                sy36: '◐',
                sy37: '◑',
                sy38: '﹄',
                sy39: '﹃',
                sy40: '〣',
                sy41: '㋡',
                sy42: 'ッ',
                sy43: '✘',
                sy44: '❤',
                sy45: '⤻',
                sy46: '⬏',
                sy47: '☽',
                sy48: '☾',
                sy49: '♪',
                sy50: '〈',
                sy51: '〉',
                sy52: '✹',
                sy53: '☂',
            },
            fonts:{
                name: 'fonts',
                title: 'fonts',

                ft1_entypoF: 'A',
                ft2_entypoF: 'B',
                ft3_entypoF: 'C',
                ft4_entypoF: 'D',
                ft5_entypoF: 'E',
                ft6_entypoF: 'F',
                ft7_entypoF: 'G',
                ft8_entypoF: 'H',
                ft9_entypoF: 'I',
                ft10_entypoF: 'J',
                ft11_entypoF: 'K',
                ft12_entypoF: 'L',
                ft13_entypoF: 'M',
                ft14_entypoF: 'N',
                ft15_entypoF: 'O',
                ft16_entypoF: 'P',
                ft17_entypoF: 'Q',
                ft18_entypoF: 'R',
                ft19_entypoF: 'S',
                ft20_entypoF: 'T',
                ft21_entypoF: 'U',
                ft22_entypoF: 'V',
                ft23_entypoF: 'W',
                ft24_entypoF: 'X',
                ft25_entypoF: 'Y',
                ft26_entypoF: 'Z',
                ft27_entypoF: 'a',
                ft28_entypoF: 'b',
                ft29_entypoF: 'c',
                ft30_entypoF: 'd',
                ft31_entypoF: 'e',
                ft32_entypoF: 'f',
                ft33_entypoF: 'g',
                ft34_entypoF: 'h',
                ft35_entypoF: 'i',
                ft36_entypoF: 'j',
                ft37_entypoF: 'k',
                ft38_entypoF: 'l',
                ft39_entypoF: 'm',
                ft40_entypoF: 'n',
                ft41_entypoF: 'o',
                ft42_entypoF: 'p',
                ft43_entypoF: 'q',
                ft44_entypoF: 'r',
                ft45_entypoF: 's',
                ft46_entypoF: 't',
                ft47_entypoF: 'u',
                ft48_entypoF: 'v',
                ft49_entypoF: 'w',
                ft50_entypoF: 'x',
                ft51_entypoF: 'y',
                ft52_entypoF: 'z',
                ft53_entypoF: '0',
                ft54_entypoF: '1',
                ft55_entypoF: '2',
                ft56_entypoF: '3',
                ft57_entypoF: '4',
                ft58_entypoF: '5',
                ft59_entypoF: '6',
                ft60_entypoF: '7',
                ft61_entypoF: '8',
                ft62_entypoF: '9',

                ft1_mashup: 'A',
                ft2_mashup: 'B',
                ft3_mashup: 'C',
                ft4_mashup: 'D',
                ft5_mashup: 'E',
                ft6_mashup: 'F',
                ft7_mashup: 'G',
                ft8_mashup: 'H',
                ft9_mashup: 'I',
                ft10_mashup: 'J',
                ft11_mashup: 'K',
                ft12_mashup: 'L',
                ft13_mashup: 'M',
                ft14_mashup: 'N',
                ft15_mashup: 'O',
                ft16_mashup: 'P',
                ft17_mashup: 'Q',
                ft18_mashup: 'R',
                ft19_mashup: 'S',
                ft20_mashup: 'T',
                ft21_mashup: 'U',
                ft22_mashup: 'V',
                ft23_mashup: 'W',
                ft24_mashup: 'X',
                ft25_mashup: 'Y',
                ft26_mashup: 'Z',
                ft27_mashup: 'a',
                ft28_mashup: 'b',
                ft29_mashup: 'c',
                ft30_mashup: 'd',
                ft31_mashup: 'e',
                ft32_mashup: 'f',
                ft33_mashup: 'g',
                ft34_mashup: 'h',
                ft35_mashup: 'i',
                ft36_mashup: 'j',
                ft37_mashup: 'k',
                ft38_mashup: 'l',
                ft39_mashup: 'm',
                ft40_mashup: 'n',
                ft41_mashup: 'o',
                ft42_mashup: 'p',
                ft43_mashup: 'q',
                ft44_mashup: 'r',
                ft45_mashup: 's',
                ft46_mashup: 't',
                ft47_mashup: 'u',
                ft48_mashup: 'v',
                ft49_mashup: 'w',
                ft50_mashup: 'x',
                ft51_mashup: 'y',
                ft52_mashup: 'z',
                ft53_mashup: '0',
                ft54_mashup: '1',
                ft55_mashup: '2',
                ft56_mashup: '3',
                ft57_mashup: '4',
                ft58_mashup: '5',
                ft59_mashup: '6',
                ft60_mashup: '7',
                ft61_mashup: '8',
                ft62_mashup: '9',

                ft1_mat2F: 'A',
                ft2_mat2F: 'B',
                ft3_mat2F: 'C',
                ft4_mat2F: 'D',
                ft5_mat2F: 'E',
                ft6_mat2F: 'F',
                ft7_mat2F: 'G',
                ft8_mat2F: 'H',
                ft9_mat2F: 'I',
                ft10_mat2F: 'J',
                ft11_mat2F: 'K',
                ft12_mat2F: 'L',
                ft13_mat2F: 'M',
                ft14_mat2F: 'N',
                ft15_mat2F: 'O',
                ft16_mat2F: 'P',
                ft17_mat2F: 'Q',
                ft18_mat2F: 'R',
                ft19_mat2F: 'S',
                ft20_mat2F: 'T',
                ft27_mat2F: 'a',
                ft28_mat2F: 'b',
                ft29_mat2F: 'c',
                ft30_mat2F: 'd',
                ft31_mat2F: 'e',
                ft32_mat2F: 'f',
                ft33_mat2F: 'g',
                ft34_mat2F: 'h',
                ft35_mat2F: 'i',
                ft36_mat2F: 'j',
                ft37_mat2F: 'k',
                ft38_mat2F: 'l',
                ft39_mat2F: 'm',
                ft40_mat2F: 'n',
                ft41_mat2F: 'o',
                ft42_mat2F: 'p',
                ft43_mat2F: 'q',
                ft44_mat2F: 'r',
                ft45_mat2F: 's',
                ft46_mat2F: 't',

                ft1_mat4F: 'A',
                ft2_mat4F: 'B',
                ft3_mat4F: 'C',
                ft4_mat4F: 'D',
                ft5_mat4F: 'E',
                ft6_mat4F: 'F',
                ft7_mat4F: 'G',
                ft8_mat4F: 'H',
                ft9_mat4F: 'I',
                ft10_mat4F: 'J',
                ft11_mat4F: 'K',
                ft12_mat4F: 'L',
                ft13_mat4F: 'M',
                ft14_mat4F: 'N',
                ft15_mat4F: 'O',
                ft16_mat4F: 'P',
                ft17_mat4F: 'Q',
                ft18_mat4F: 'R',
                ft19_mat4F: 'S',
                ft20_mat4F: 'T',
                ft21_mat4F: 'U',
                ft22_mat4F: 'V',
                ft23_mat4F: 'W',
                ft24_mat4F: 'X',
                ft25_mat4F: 'Y',
                ft26_mat4F: 'Z',
                ft27_mat4F: 'a',
                ft28_mat4F: 'b',
                ft29_mat4F: 'c',
                ft30_mat4F: 'd',
                ft31_mat4F: 'e',
                ft32_mat4F: 'f',
                ft33_mat4F: 'g',
                ft34_mat4F: 'h',
                ft35_mat4F: 'i',
                ft36_mat4F: 'j',
                ft37_mat4F: 'k',
                ft38_mat4F: 'l',
                ft39_mat4F: 'm',
                ft40_mat4F: 'n',
                ft41_mat4F: 'o',
                ft42_mat4F: 'p',
                ft43_mat4F: 'q',
                ft44_mat4F: 'r',
                ft45_mat4F: 's',
                ft46_mat4F: 't',
                ft47_mat4F: 'u',
                ft48_mat4F: 'v',
                ft49_mat4F: 'w',
                ft50_mat4F: 'x',
                ft51_mat4F: 'y',
                ft52_mat4F: 'z',
                ft53_mat4F: '0',
                ft54_mat4F: '1',
                ft55_mat4F: '2',
                ft56_mat4F: '3',
                ft57_mat4F: '4',
                ft58_mat4F: '5',
                ft59_mat4F: '6',
                ft60_mat4F: '7',
                ft61_mat4F: '8',
                ft62_mat4F: '9',

                ft1_mat5F: 'A',
                ft2_mat5F: 'B',
                ft3_mat5F: 'C',
                ft4_mat5F: 'D',
                ft5_mat5F: 'E',
                ft6_mat5F: 'F',
                ft7_mat5F: 'G',
                ft8_mat5F: 'H',
                ft9_mat5F: 'I',
                ft10_mat5F: 'J',
                ft11_mat5F: 'K',
                ft12_mat5F: 'L',
                ft13_mat5F: 'M',
                ft14_mat5F: 'N',
                ft15_mat5F: 'O',
                ft16_mat5F: 'P',
                ft17_mat5F: 'Q',
                ft18_mat5F: 'R',
                ft19_mat5F: 'S',
                ft20_mat5F: 'T',
                ft21_mat5F: 'U',
                ft22_mat5F: 'V',
                ft23_mat5F: 'W',
                ft24_mat5F: 'X',
                ft25_mat5F: 'Y',
                ft26_mat5F: 'Z',
                ft27_mat5F: 'a',
                ft28_mat5F: 'b',
                ft29_mat5F: 'c',
                ft30_mat5F: 'd',
                ft31_mat5F: 'e',
                ft32_mat5F: 'f',
                ft33_mat5F: 'g',
                ft34_mat5F: 'h',
                ft35_mat5F: 'i',
                ft36_mat5F: 'j',
                ft37_mat5F: 'k',
                ft38_mat5F: 'l',
                ft39_mat5F: 'm',
                ft40_mat5F: 'n',
                ft41_mat5F: 'o',
                ft42_mat5F: 'p',
                ft43_mat5F: 'q',
                ft44_mat5F: 'r',
                ft45_mat5F: 's',
                ft46_mat5F: 't',
                ft47_mat5F: 'u',
                ft48_mat5F: 'v',
                ft49_mat5F: 'w',
                ft50_mat5F: 'x',
                ft51_mat5F: 'y',
                ft52_mat5F: 'z',
                ft53_mat5F: '0',
                ft54_mat5F: '1',
                ft55_mat5F: '2',
                ft56_mat5F: '3',
                ft57_mat5F: '4',
                ft58_mat5F: '5',
                ft59_mat5F: '6',
                ft60_mat5F: '7',
                ft61_mat5F: '8',
                ft62_mat5F: '9',
            }

        },
        miscElements: {
            name: 'miscElements',
            hue: {
                name: 'hue',
                title: "Hue Widget",
                hueLights: "Lights",
                hueGroups: "Groups"
            },
            avatar: {
                name: 'avatar',
                title: "Avatar",
                avatarImage: "Image (set in tools)"
            },
            rss: {
                name: "rss",
                title: "RSS-Quote",
                quote1: "rss body",
                quote1Artist: "rss title",
                quote1ReadMore: "read more"
            },
            text: {
                name: "text",
                title: "Text Elements",
                textOne: "Custom Text 1",
                textTwo: "Custom Text 2",
                textThree: "Custom Text 3",
                textFour: "Custom Text 4",
                textFive: "Custom Text 5",
                textSix: "Custom Text 6",
                textSeven: "Custom Text 7",
                textEight: "Custom Text 8",
                textNine: "Custom Text 9",
                textTen: "Custom Text 10",
                textEleven: "Custom Text 11",
                textTwelve: "Custom Text 12",
                textThirteen: "Custom Text 13",
                textFourteen: "Custom Text 14",
                textFifteen: "Custom Text 15",
                textSixteen: "Custom Text 16",
                textSeventeen: "Custom Text 17",
                textEighteen: "Custom Text 18",
                textNineteen: "Custom Text 19",
                textTwenty: "Custom Text 20",
                textTwentyOne: "Custom Text 21"
            },
            box: {
                name: "box",
                title: "Squares",
                boxOne: "Custom Box 1",
                boxTwo: "Custom Box 2",
                boxThree: "Custom Box 3",
                boxFour: "Custom Box 4",
                boxFive: "Custom Box 5",
                boxSix: "Custom Box 6",
                boxSeven: "Custom Box 7",
                boxEight: "Custom Box 8",
                boxNine: "Custom Box 9",
                boxTen: "Custom Box 10",
                boxEleven: "Custom Box 11",
                boxTwelve: "Custom Box 12",
                boxThirteen: "Custom Box 13",
                boxFourteen: "Custom Box 14",
                boxFifteen: "Custom Box 15",
                boxSixteen: "Custom Box 16",
                boxSeventeen: "Custom Box 17",
                boxEighteen: "Custom Box 18",
                boxNineteen: "Custom Box 19",
                boxTwenty: "Custom Box 20",
                boxAutoHideOne: "Music Hide Box 1",
                boxAutoHideTwo: "Music Hide Box 2",
                boxAutoHideThree: "Music Hide Box 3",
                boxAutoHideFour: "Music Hide Box 4",
                boxAutoHideFive: "Music Hide Box 5",
                boxAutoHideSix: "Music Hide Box 6"
            },
            circle: {
                name: "circle",
                title: "Circles",
                boxCircleOne: "Custom Circle 1",
                boxCircleTwo: "Custom Circle 2",
                boxCircleThree: "Custom Circle 3",
                boxCircleFour: "Custom Circle 4",
                boxCircleFive: "Custom Circle 5",
                boxCircleSix: "Custom Circle 6",
                boxCircleSeven: "Custom Circle 7",
                boxCircleEight: "Custom Circle 8",
                boxCircleNine: "Custom Circle 9",
                boxCircleTen: "Custom Circle 10",
                boxCircleEleven: "Custom Circle 11",
                boxCircleTwelve: "Custom Circle 12",
                boxCircleThirteen: "Custom Circle 13",
                boxCircleFourteen: "Custom Circle 14",
                boxCircleFifteen: "Custom Circle 15",
                boxCircleSixteen: "Custom Circle 16",
                boxCircleSeventeen: "Custom Circle 17",
                boxCircleEighteen: "Custom Circle 18",
                boxCircleNineteen: "Custom Circle 19",
                boxCircleTwenty: "Custom Circle 20",
                boxCircleAutoHideOne: "Music Hide Circle 1",
                boxCircleAutoHideTwo: "Music Hide Circle 2",
                boxCircleAutoHideThree: "Music Hide Circle 3",
                boxCircleAutoHideFour: "Music Hide Circle 4",
                boxCircleAutoHideFive: "Music Hide Circle 5",
                boxCircleAutoHideSix: "Music Hide Circle 6"
            },
            triangle: {
                name: "triangle",
                title: "Triangles",
                triAngleOne: "Custom Triangle 1",
                triAngleTwo: "Custom Triangle 2",
                triAngleThree: "Custom Triangle 3",
                triAngleFour: "Custom Triangle 4",
                triAngleFive: "Custom Triangle 5",
                triAngleSix: "Custom Triangle 6",
                triAngleSeven: "Custom Triangle 7",
                triAngleEight: "Custom Triangle 8",
                triAngleNine: "Custom Triangle 9",
                triAngleTen: "Custom Triangle 10",
                triAngleEleven: "Custom Triangle 11",
                triAngleTwelve: "Custom Triangle 12",
                triAngleThirteen: "Custom Triangle 13",
                triAngleFourteen: "Custom Triangle 14",
                triAngleFifteen: "Custom Triangle 15",
                triAngleSixteen: "Custom Triangle 16",
                triAngleSeventeen: "Custom Triangle 17",
                triAngleEighteen: "Custom Triangle 18",
                triAngleNineteen: "Custom Triangle 19",
                triAngleTwenty: "Custom Triangle 20"
            },
            applist: {
                name: "apps",
                title: "Apps",
            },
            apps: {
                name: "apps",
                title: "Apps 1",
                app1: "Mail",
                app2: "SMS",
                app3: "Phone",
                app4: "Twitter",
                app5: "Tweetbot",
                app6: "Telegram"
            },
            apps2: {
                name: "apps2",
                title: "Apps 2",
                app7: "Instagram",
                app8: "Pandora",
                app9: "Spotify",
                app10: "Facebook",
                app11: "Kik",
                app12: "YouTube"
            },
            apps3: {
                name: "apps3",
                title: "Apps 3",
                app13: "WhatsApp",
                app14: "Safari",
                app15: "Weather",
                app16: "Clock",
                app17: "Music",
                app18: "Camera"
            },
            apps4: {
                name: "apps4",
                title: "Apps 4",
                app19: "Reminders",
                app20: "Notes",
                app21: "Maps",
                app22: "Calendar",
                app23: "Calculator",
                app24: "Cydia"
            },
            apps5: {
                name: "apps5",
                title: "Apps 5",
                app25: "YouTube",
                app26: "Settings",
                app27: "AppStore",
                app28: "Health",
                app29: "TelegramHD"
            },
            apps6: {
                name: "apps6",
                title: "Apps 6",
                app30: "Discord"
            }
        },
        templates: {
            name: 'templates',
            // Music_Controls: function(){
            //     creator.make('MusicControls');
            // },
            // Custom_Controls: function(){
            //     creator.make('CustomControls');
            // },
            // Forecast_Icons: function(){
            //     creator.make('ForecastIcons');
            // },
            // Forecast_Temp: function(){
            //     creator.make('ForecastIconsTemp');
            // },
            // Stock_Look: function(){
            //     creator.make('StockLook');
            // },
            // Music_Player: function(){
            //     creator.make('MusicPlayer');
            // },
            // JMusic: function(){
            //     creator.make('JMusic');
            // },
            // BootsMusic: function(){
            //     creator.make('BootsMusic');
            // },
            // Menu_3_labels: function(){
            //     creator.make('Menu3labels');
            // },
            // Battery_bar: function(){
            //     creator.make('BatteryBar');
            // },
            // Wifi_bar: function(){
            //     creator.make('WifiBar');
            // },
            // Signal_bar: function(){
            //     creator.make('SignalBar');
            // },
            // Events_1: function(){
            //     creator.make('Events1');
            // },
            // Events_2: function(){
            //     creator.make('Events2');
            // }
        },
        frontpage: {
            name: 'frontpage',
            add_placeholder: function(){
                var placedStored = action.savedElements.placedElements;
                var placeHolders = [];
                var placeHolderNumber = 0;
                var currentPlaceHolder = 1;
                if(!placedStored){
                    action.addtoScreen('fpplaceholder1');
                }else{
                    //loop over all placed elements looking for fpplaceholders
                    Object.keys(placedStored).forEach(function(key){
                        if(key.substring(0, 7) === 'fpplace'){
                            //get number from the string
                            placeHolderNumber = Number(key.replace('fpplaceholder', ''));
                            //push number to array of other numbers
                            placeHolders.push(placeHolderNumber);
                        }
                    });
                    //sort array largest to smallest
                    placeHolders = placeHolders.sort(function(a, b) {
                        return b - a;
                    });

                    if(placeHolders[0]){
                        currentPlaceHolder = (placeHolders[0] + 1);
                    }

                    //add new element to screen adding 1 to the largest number
                    action.addtoScreen('fpplaceholder' + currentPlaceHolder);
                }
            },
            help: function(){
                jPopup({
                    type: "alert",
                    message: "These elements only work in FrontPage. A placeholder can be changed in FrontPage to be an app, folder, or drawer icon.",
                    yesButtonText: "Ok",
                    functionOnOk: function() {
                        //do something on ok
                    }
                });
            }
        }
    };

    function loadTemplates(){
        for(var i = 0; i < userTemplates.length; i++){
            (function (a){
                elementPanel.templates[userTemplates[a]] = function(){
                    creator.makeCustom(userTemplates[a]);
                }
            }).call(this,i)
        }
    }

    setTimeout(function(){
        loadTemplates();
    },2000);

    //app31 : "Discord-com.hammerandchisel.discord";