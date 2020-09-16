

// APP ICON OPTIONS

function createPlaceHolderStrings(){
    var string = "#fpplaceholder,";
    for (var i = 0; i < 201; i++) {
         string +=  (i < 200) ? "#fpplaceholder" + i + "," : "#fpplaceholder" + i + "";
    }
    return string;
}

function rangeUpdated(el){
    var value = el.el.value,
        element = el.el.parentElement;
    element.title = el.el.title + " " + value;
    if(el.el.title === "Badge Size"){
        addStyleString('.FPBadge{width:'+value+'px!important;height:'+value+'px!important;}', 'badgeSize');  
        lStorage.badgeSize = value;
        lStorage.saveStorage();
    }else if(el.el.title === 'Badge Font Size'){
        addStyleString('.FPBadge{font-size:'+value+'px!important;}', 'badgeFontSize');  
        lStorage.badgeFontSize = value;
        lStorage.saveStorage();
    }else if(el.el.title === 'Label Font Size'){
        addStyleString('.FPLabel{font-size:'+value+'px!important;}', 'labelFontSize');  
        lStorage.labelFontSize = value;
        lStorage.saveStorage();
    }else if(el.el.title === 'Badge Border Radius'){
        addStyleString('.FPBadge{border-radius:'+value+'px!important}', 'badgeBorderRadius');  
        lStorage.badgeBorderRadius = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Overlay Scale'){
        addStyleString('.overlayClass{-webkit-transform:scale('+value+')!important;}', 'overlayScale');
        lStorage.overlayScale = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Icon Roundness'){
        addStyleString(createPlaceHolderStrings() + '{border-radius:'+value+'px!important;}', 'iconBorderRadius');
        lStorage.iconBorderRadius = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Icon Size'){
        addStyleString(createPlaceHolderStrings() + '{background-position: center;background-size:'+value+'px!important;}', 'iconSize');
        lStorage.iconSize = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Underlay Scale'){
        addStyleString('.underlayClass{-webkit-transform:scale('+value+')!important;}', 'underlayScale');
        lStorage.underlayScale = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Badge Image BG Size'){
        addStyleString('.FPBadge{width:'+value+'px!important;height:'+value+'px!important;padding:0!important;}', 'badgeWidth');
        lStorage.badgeWidthSize = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Badge BG Width'){
        addStyleString('.FPBadge{width:'+value+'px!important;padding:0!important;}', 'badgeWidth');
        lStorage.badgeBGWidth = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Badge BG Height'){
        addStyleString('.FPBadge{height:'+value+'px!important;padding:0!important;}', 'badgeHeight');
        lStorage.badgeBGHeight = value;
        lStorage.saveStorage();
    }else if (el.el.title === 'Badge Image Size'){
        addStyleString('.FPBadge{background-size:'+value+'% '+value+'%!important;}', 'badgeImageSize');
        lStorage.badgeImageSize = value;
        lStorage.saveStorage();
    }
}

function buttonsClicked(page, tag, el, range){
    switch(tag) {
    case 'applyall':
        alert("This feature is not finished.");
        break;
    }
}

(function(window, doc) {

    var appOptionsButtons = {
        name: "Page Options",
        toggles: function(){
            function windowWillRemove(){
                console.log('test');
            }
            basicWindow.removeAllWindows();
            var toggleWindow = basicWindow.makeWindow({
                title: 'Global Toggles',
                id: 'toggleWindow',
                className: 'toggleWindow drawerToggleWindow',
                width: 300,
                height: 300,
                center: true,
                bgcolor: 'transparent',
                beforeRemove: windowWillRemove,
            });
            
            var toggles = [{
                innerHTML: "Allow Spotlight",
                tag: 'enablespotlight',
                saveName: 'enablespotlight',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('pageOptions');
                    lStorage['enablespotlight'] = boolVal;
                    lStorage.saveStorage();
                }
            },
            {
                innerHTML: "Allow TodayView",
                tag: 'enabletodayview',
                saveName: 'enabletodayview',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('pageOptions');
                    lStorage['enabletodayview'] = boolVal;
                    lStorage.saveStorage();
                }
            },
            {
                innerHTML: "Hide FrontPage on TodayView",
                tag: 'hideFrontPageOnToday',
                saveName: 'hideFrontPageOnToday',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('pageOptions');
                    lStorage['hideFrontPageOnToday'] = boolVal;
                    lStorage.saveStorage();
                }
            },
            {
                innerHTML: "Allow Swipe Up Drawer",
                tag: 'swipeupdrawer',
                saveName: 'swipeupdrawer',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('pageOptions');
                    lStorage['swipeupdrawer'] = boolVal;
                    lStorage.saveStorage();
                }
            }];
            toggleWindow.appendChild(toggleMaker.createToggle(toggles));
        },
        colors: function(){
            basicWindow.removeWindowById('pageOptions');
            var inputs = [{
                innerHTML: "Body Background Color",
                tag: 'bodyBackgroundColor',
                saveName: 'bodyBackgroundColor',
                defaultColor: 'transparent',
                onChange: function(value){
                    lStorage.enablecolorbadges = null;
                    addStyleString('body{background-color:'+value+'!important;}', 'bodyBackgroundColor');  
                    lStorage['bodyBackgroundColor'] = value;
                    lStorage.saveStorage();
                }
            }];
            colorInputs.createInput(inputs, 'Colors', 'pageOptions');
        },
    };

    function createMenu(){
        basicWindow.removeAllWindows();
        cloudWindow.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: appOptionsButtons.name,
            id: 'pageOptions',
            className: 'pageOptions',
            width: 300,
            height: 190,
            bgcolor: 'transparent',
            color: 'white',
            center: true,
            backButton:true,
            backTo: function(){
                mainMenu.create();
            },
            beforeRemove: function(){
                cloudWindow.removeCloud();
            }
        });
        cloudWindow.makeCloud({
            parentWindow: mainWindow,
            cloudItems: appOptionsButtons,
            id: 'pageOptionsCloud'
        });
    }


    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(bundle){
            createMenu(bundle);
        };
        return externalMethods;
    }
    window.pageOptions = initExternalMethods();
}(window, document));

(function(window, doc) {

    var appOptionsButtons = {
        name: "Overlay Options",
        // toggles: function(){
        //     function windowWillRemove(){
        //         console.log('test');
        //     }
        //     basicWindow.removeAllWindows();
        //     var toggleWindow = basicWindow.makeWindow({
        //         title: 'Global Toggles',
        //         id: 'toggleWindow',
        //         className: 'toggleWindow drawerToggleWindow',
        //         width: 300,
        //         height: 300,
        //         center: true,
        //         bgcolor: 'transparent',
        //         beforeRemove: windowWillRemove,
        //     });
        //     var toggles = [{
        //         innerHTML: "Hide labels",
        //         tag: 'hideapplabels',
        //         saveName: 'hideapplabels',
        //         onChange: function(obj, boolVal){
                    
        //             basicWindow.removeWindowById('appOptions');
        //             lStorage['hideapplabels'] = boolVal;
        //             lStorage.saveStorage();
        //             try{
        //             if(boolVal){
        //                 addStyleString('.FPLabel{opacity:0;}', 'hideapplabels');
        //             }else{
        //                 addStyleString('.FPLabel{opacity:1;}', 'hideapplabels');
        //             }
        //             }catch(err){
        //                 //alert(err);
        //             } 
        //         }
        //     }];
        //     toggleWindow.appendChild(toggleMaker.createToggle(toggles));
        // },
        set_overlay: function(){
            var prm;
            if(lStorage['overlayImage']){
                prm = confirm('Underlay already set, do you wish to remove it?');
                if(prm){
                    lStorage['overlayImage'] = null;
                    lStorage.saveStorage();
                    location.reload();
                }
            }else{
                basicWindow.removeWindowById('overlayOptions');
                globalVars.changingOverlayImage = true;
                window.location = 'frontpage:loadIconBrowser';
            }
        },
        set_underlay: function(){
            var prm;
            if(lStorage['underlayImage']){
                prm = confirm('Underlay already set, do you wish to remove it?');
                if(prm){
                    lStorage['underlayImage'] = null;
                    lStorage.saveStorage();
                    location.reload();
                }
            }else{
                basicWindow.removeWindowById('overlayOptions');
                globalVars.changingUnderlayImage = true;
                window.location = 'frontpage:loadIconBrowser';
            }
        },
        move_overlay: function(){
            basicWindow.removeWindowById('overlayOptions');
            dragAdjuster.init({
                color:"black",
                drag: function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    addStyleString('.overlayClass{margin-left:'+ui.position.left+'px!important;margin-top:'+ui.position.top+'px!important;}', 'overlayDragging');  
                },
                stop:function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    if(!lStorage.overlayPosition){
                        lStorage.overlayPosition = {};
                    }
                    lStorage.overlayPosition = {
                        top: ui.position.top,
                        left: ui.position.left
                    };
                    lStorage.saveStorage();
                }
            });
        },
        move_underlay: function(){
            basicWindow.removeWindowById('overlayOptions');
            dragAdjuster.init({
                color:"black",
                drag: function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    addStyleString('.underlayClass{margin-left:'+ui.position.left+'px!important;margin-top:'+ui.position.top+'px!important;}', 'overlayDragging');  
                },
                stop:function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    if(!lStorage.underlayPosition){
                        lStorage.underlayPosition = {};
                    }
                    lStorage.underlayPosition = {
                        top: ui.position.top,
                        left: ui.position.left
                    };
                    lStorage.saveStorage();
                }
            });
        },
        size_options: function(){
            basicWindow.removeWindowById('overlayOptions');
            var settings = {
                overlayScale: Number(lStorage['overlayScale']) || 1,
                underlayScale: Number(lStorage['underlayScale']) || 1,
            };
            rangeWithButtons.createRange({
                windowTitle: 'Overlay Options',
                title: ['Overlay Scale', 'Underlay Scale'],
                objName: ['Overlay Scale', 'Underlay Scale'],
                divID: ['overlayScaling', 'underlayScaling'],
                selectedPage: '',
                min: [0, 0],
                max: [5, 5],
                step:0,
                start: [settings.overlayScale, settings.underlayScale],
                onChange: rangeUpdated,
                buttonsCallback: buttonsClicked,
                buttons: [{
                    innerHTML: "",
                    tag: ''
                }]
            });
        }
    };

    function createMenu(){
        basicWindow.removeAllWindows();
        cloudWindow.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: appOptionsButtons.name,
            id: 'overlayOptions',
            className: 'overlayOptions',
            width: 300,
            height: 190,
            bgcolor: 'transparent',
            color: 'white',
            center: true,
            backButton:true,
            backTo: function(){
                mainMenu.create();
            },
            beforeRemove: function(){
                cloudWindow.removeCloud();
            }
        });
        cloudWindow.makeCloud({
            parentWindow: mainWindow,
            cloudItems: appOptionsButtons,
            id: 'overlayOptionsCloud'
        });
    }


    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(bundle){
            createMenu(bundle);
        };
        return externalMethods;
    }
    window.overlayOptions = initExternalMethods();
}(window, document));

(function(window, doc) {

    var appOptionsButtons = {
        name: "App Options",
        colors: function(){
            basicWindow.removeWindowById('appOptions');
            var inputs = [{
                innerHTML: "Badge Background Color",
                tag: 'badgeBackgroundColor',
                saveName: 'badgeBackgroundColor',
                defaultColor: 'red',
                onChange: function(value){
                    lStorage.enablecolorbadges = null;
                    addStyleString('.FPBadge{background-color:'+value+'!important;}', 'badgeBackgroundColor');  
                    lStorage['badgeBackgroundColor'] = value;
                    lStorage.saveStorage();
                }
            },
            {
                innerHTML: "Badge Text Color",
                tag: 'badgeTextColor',
                saveName: 'badgeTextColor',
                defaultColor: 'white',
                onChange: function(value){
                    addStyleString('.FPBadge{color:'+value+'!important;}', 'badgeTextColor');
                    lStorage['badgeTextColor'] = value;
                    lStorage.saveStorage();  
                }
            },
            {
                innerHTML: "Label Text Color",
                tag: 'labelTextColor',
                saveName: 'labelTextColor',
                defaultColor: 'white',
                onChange: function(value){
                    addStyleString('.FPLabel{color:'+value+'!important;}', 'labelTextColor');
                    lStorage['labelTextColor'] = value;
                    lStorage.saveStorage();  
                }
            }];
            colorInputs.createInput(inputs, 'Colors', 'appOptions');
        },
        toggles: function(){
            function windowWillRemove(){
                console.log('test');
            }
            basicWindow.removeAllWindows();
            var toggleWindow = basicWindow.makeWindow({
                title: 'Global Toggles',
                id: 'toggleWindow',
                className: 'toggleWindow drawerToggleWindow',
                width: 300,
                height: 300,
                center: true,
                bgcolor: 'transparent',
                beforeRemove: windowWillRemove,
            });
            var toggles = [{
                innerHTML: "Hide labels",
                tag: 'hideapplabels',
                saveName: 'hideapplabels',
                onChange: function(obj, boolVal){
                    
                    basicWindow.removeWindowById('appOptions');
                    lStorage['hideapplabels'] = boolVal;
                    lStorage.saveStorage();
                    try{
                    if(boolVal){
                        addStyleString('.FPLabel{opacity:0;}', 'hideapplabels');
                    }else{
                        addStyleString('.FPLabel{opacity:1;}', 'hideapplabels');
                    }
                    }catch(err){
                        //alert(err);
                    } 
                }
            },
            {
                innerHTML: "Align labels left",
                tag: 'alignlabelsleft',
                saveName: 'alignlabelsleft',
                onChange: function(obj, boolVal){
                    
                    basicWindow.removeWindowById('appOptions');
                    lStorage['alignlabelsleft'] = boolVal;
                    lStorage.saveStorage();
                    try{
                    if(boolVal){
                        addStyleString('.FPLabel{text-align:left!important;}', 'alignlabelsleft');
                    }else{
                        addStyleString('.FPLabel{text-align:center!important;}', 'alignlabelsleft');
                    }
                    }catch(err){
                        //alert(err);
                    } 
                }
            },
            {
                innerHTML: "Add badges to labels",
                tag: 'labelBadges',
                saveName: 'labelBadges',
                onChange: function(obj, boolVal){
                    
                    basicWindow.removeWindowById('appOptions');
                    lStorage['labelBadges'] = boolVal;
                    lStorage.saveStorage();
                    reloadAllFPPlaceholders(); 
                }
            },
            {
                innerHTML: "Hide badges",
                tag: 'hideappbadges',
                saveName: 'hideappbadges',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('appOptions');
                    lStorage['hideappbadges'] = boolVal;
                    lStorage.saveStorage();
                    try{
                    if(boolVal){
                        addStyleString('.FPBadge{opacity:0;}', 'hideappbadges');
                    }else{
                        addStyleString('.FPBadge{opacity:1;}', 'hideappbadges');
                    }
                    }catch(err){
                        //alert(err);
                    }
                    
                    
                }
            },
            {
                innerHTML: "Badge auto color",
                tag: 'enablecolorbadges',
                saveName: 'enablecolorbadges',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('appOptions');
                    lStorage['enablecolorbadges'] = boolVal;
                    lStorage.saveStorage();
                    reloadAllFPPlaceholders(); 
                }
            }];
            toggleWindow.appendChild(toggleMaker.createToggle(toggles));
        },
        size_options: function(){
            basicWindow.removeWindowById('appOptions');
            var settings = {
                badgeSizeRange: Number(lStorage['badgeSize']) || 10,
                badgeBorderRadius: Number(lStorage['badgeBorderRadius']) || 99,
                labelFontSize:  Number(lStorage['labelFontSize']) || 12,
                badgeFontSize:  Number(lStorage['badgeFontSize']) || 0,
                iconBorderRadius:  Number(lStorage['iconBorderRadius']) || 0,
                iconSize:  Number(lStorage['iconSize']) || 0,
                badgeWidthSize:  Number(lStorage['badgeWidthSize']) || 0,
                badgeBGWidth:  Number(lStorage['badgeBGWidth']) || 0,
                badgeBGHeight:  Number(lStorage['badgeBGHeight']) || 0,
                badgeImageSize:  Number(lStorage['badgeImageSize']) || 0
            };

            rangeWithButtons.createRange({
                windowTitle: 'Size Options',
                title: ['Badge Size', 'Badge Font Size', 'Badge Border Radius', 'Badge Image BG Size', 'Badge BG Width','Badge BG Height', 'Badge Image Size', 'Label Font Size', 'Icon Roundness', 'Icon Size'],
                objName: ['Badge Size', 'Badge Font Size', 'Badge Border Radius', 'Badge Image BG Size','Badge BG Width','Badge BG Height', 'Badge Image Size', 'Label Font Size', 'Icon Roundness', 'Icon Size'],
                divID: ['badgeSizeRange', 'badgeFontSize', 'badgeBorderRadius', 'badgeWidthSize', 'badgeBGWidth','badgeBGWidth', 'badgeImageSize', 'labelFontSize', 'iconBorderRadius', 'Icon Size'],
                selectedPage: '',
                min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                max: [100, 30, 100, 30, 50, 100, 500, 30, 99, 99],
                step:0,
                start: [settings.badgeSizeRange, settings.badgeFontSize, settings.badgeBorderRadius, settings.badgeWidthSize, settings.badgeBGWidth, settings.badgeBGHeight, settings.badgeImageSize, settings.labelFontSize, settings.iconBorderRadius, settings.iconSize],
                onChange: rangeUpdated,
                buttonsCallback: buttonsClicked,
                buttons: [{
                    innerHTML: "",
                    tag: ''
                }]
            });
        },
        move_badge: function(){
            basicWindow.removeWindowById('appOptions');
            dragAdjuster.init({
                color:"black",
                drag: function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    addStyleString('.FPBadge{margin-left:'+ui.position.left+'px!important;margin-top:'+ui.position.top+'px!important;}', 'badgeDragging');  
                },
                stop:function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    if(!lStorage.badgePosition){
                        lStorage.badgePosition = {};
                    }
                    lStorage.badgePosition = {
                        top: ui.position.top,
                        left: ui.position.left
                    };
                    lStorage.saveStorage();
                }
            });
        },
        move_label: function(){
            basicWindow.removeWindowById('appOptions');
            dragAdjuster.init({
                color:"black",
                drag: function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    addStyleString('.FPLabel{margin-top:'+ui.position.top+'px!important;margin-left:'+ui.position.left+'px!important;}', 'labelDragging');  
                },
                stop:function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    if(!lStorage.labelPosition){
                        lStorage.labelPosition = {};
                    }
                    lStorage.labelPosition = {
                        top: ui.position.top,
                        left: ui.position.left
                    };
                    lStorage.saveStorage();
                }
            });
        },
        set_badge_image: function(){
            basicWindow.removeWindowById('appOptions');
            globalVars.changingBadgeImage = true;
            window.location = 'frontpage:loadIconBrowser';
        },
        remove_badge_image: function(){
            basicWindow.removeWindowById('appOptions');
            lStorage.badgeImage = null;
            addStyleString('.FPBadge{background-image:url()!important;width:auto!important;height:auto!important;}', 'bgImageBadge');  
        },
        reset_badge_size: function(){
            basicWindow.removeWindowById('appOptions');
            lStorage.badgeImage = null;
            lStorage.badgeWidthSize = null;
            lStorage.badgeHeightSize = null;
            lStorage.badgeImageSize = null;
            lStorage.badgeBGWidth = null;
            lStorage.badgeBGHeight = null;
            addStyleString('.FPBadge{background-size:contain!important;text-align:center!important;width:auto!important;padding-right:5px!important;padding-top:1px!important;padding-bottom:1px!important;height:auto!important;}', 'bgBadgeReset');  
        },
        // center_badge_image: function(){
        //     basicWindow.removeWindowById('appOptions');
        //     addStyleString('.FPBadge{background-position: center;}', 'centerBadgeImage');  
        // },
    };

    function createMenu(){
        basicWindow.removeAllWindows();
        cloudWindow.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: appOptionsButtons.name,
            id: 'appOptions',
            className: 'appOptions',
            width: 300,
            height: 190,
            bgcolor: 'transparent',
            color: 'white',
            center: true,
            backButton:true,
            backTo: function(){
                mainMenu.create();
            },
            beforeRemove: function(){
                cloudWindow.removeCloud();
            }
        });
        cloudWindow.makeCloud({
            parentWindow: mainWindow,
            cloudItems: appOptionsButtons,
            id: 'drawerOptionsCloud'
        });
    }


    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(bundle){
            createMenu(bundle);
        };
        return externalMethods;
    }
    window.appOptions = initExternalMethods();
}(window, document));


// mainMenu.create();
(function(window, doc) {
    var mainMenuButtons = {
        name: "Main Menu",
        open_drawer: function(){
            basicWindow.removeAllWindows();
            FPDrawer.showDrawer();
        },
        page_options: function(){
            basicWindow.removeAllWindows();
            pageOptions.create();
        },
        app_options: function(){
            basicWindow.removeAllWindows();
            appOptions.create();
        },
        drawer_options: function(){
            basicWindow.removeAllWindows();
            drawerOptions.create();
        },
        overlay_options: function(){
            basicWindow.removeAllWindows();
            overlayOptions.create();
        },
        move_all_items: function(){
            basicWindow.removeAllWindows();
            dragAdjuster.init({
                color:"black",
                drag: function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    addStyleString('#mainContainer{margin-left:'+ui.position.left+'px!important;margin-top:'+ui.position.top+'px!important;}', 'moveAllItems');  
                },
                stop:function(ev, ui){
                    ui.position.left = Math.round(ui.position.left);
                    ui.position.top = Math.round(ui.position.top);
                    if(!lStorage.moveAllItems){
                        lStorage.moveAllItems = {};
                    }
                    lStorage.moveAllItems = {
                        top: ui.position.top,
                        left: ui.position.left
                    };
                    lStorage.saveStorage();
                }
            });
        },
        reload_page: function(){
            location.reload(true);
            //location.href = location.href;
        },
        reload_apps: function(){
            basicWindow.removeAllWindows();
            reloadAllFPPlaceholders();
            //location.href = location.href;
        },
        respring: function(){
            window.location = 'frontpage:respring';
        },
        command: function(){
            var prmpt = prompt('Enter');
            try{
                if(prmpt === 'copyfavs'){
                    var prmpt2 = prompt('Enter theme name');
                    if(prmpt2){
                        var st = JSON.parse(localStorage.getItem(prmpt2));
                        if(st){
                            if(st['drawerFavorites']){
                                lStorage.drawerFavorites = st['drawerFavorites'];
                                lStorage.saveStorage();
                                FPDrawer.reloadDrawer();
                                alert("Favs transferred");
                            }
                        }
                    }
                }else{
                    eval(prmpt);
                }
            }catch(err){

            }
        },
        reset_all: function(){
            removeBounce();
            localStorage.removeItem(themeName);
            location.href = location.href;
        }
    };
    function createMenu(){

        basicWindow.removeAllWindows();
        cloudWindow.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: 'Main Menu',
            id: 'mainMenu',
            className: 'mainMenu',
            width: 300,
            height: 190,
            bgcolor: 'transparent',
            color: 'white',
            center: true,
            backButton:false,
            backTo: function(){
                
            },
            beforeRemove: function(){
                cloudWindow.removeCloud();
                enableScrollViewBounce();
            }
        });
        cloudWindow.makeCloud({
            parentWindow: mainWindow,
            cloudItems: mainMenuButtons,
            id: 'mainMenuCloud'
        });
    }
    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(){
            createMenu();
        };
        return externalMethods;
    }
    window.mainMenu = initExternalMethods();
}(window, document));
