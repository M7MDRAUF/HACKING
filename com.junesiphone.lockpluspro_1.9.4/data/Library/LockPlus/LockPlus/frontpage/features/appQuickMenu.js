(function(window, doc) {

    var currentAppPlaceholder = null;

    var appOptionsButtons = {
        name: "App Options",
        colors: function(){
            basicWindow.removeWindowById('appOptions');
            var inputs = [{
                    innerHTML: "Badge Background Color",
                    /*
                        Important here we use badgeBackgroundColor because lStorage['badgeBackgroundColor']
                        exists and is used globally across all elements. So if we don't have a value it will
                        check if that one is set so we get correct preview in the input picker.
                    */
                    tag: currentAppPlaceholder + "~" + 'badgeBackgroundColor',
                    defaultColor: 'red',
                    onChange: function(value){
                        addStyleString('#'+currentAppPlaceholder+' > .FPBadge{background-color:'+value+'!important;}', 'individualBadgeBGColor');
                        lStorage['appIcons'][currentAppPlaceholder]['badgeBackgroundColor'] = value;
                        lStorage.saveStorage();
                    }
                },
                {
                    innerHTML: "Badge Text Color",
                    tag: currentAppPlaceholder + "~" + 'badgeTextColor',
                    defaultColor: 'white',
                    onChange: function(value){
                        addStyleString('#'+currentAppPlaceholder+' > .FPBadge{color:'+value+'!important;}', 'individualBadgeTextColor');
                        lStorage['appIcons'][currentAppPlaceholder]['badgeTextColor'] = value;
                        lStorage.saveStorage();
                    }
                },
                {
                innerHTML: "Label Text Color",
                tag: currentAppPlaceholder + "~" + 'labelTextColor',
                defaultColor: 'white',
                onChange: function(value){
                    //addStyleString('.FPLabel{color:'+value+'!important;}', 'labelTextColor');
                    addStyleString('#'+currentAppPlaceholder+' > .FPLabel{color:'+value+'!important;}', 'individualLabelTextColor');
                    lStorage['appIcons'][currentAppPlaceholder]['labelTextColor'] = value;
                    lStorage.saveStorage();  
                }
            }];
            colorInputs.createInput(inputs, 'Colors', 'appOptions');
        },
        clear_Color_Options: function(){
            lStorage['appIcons'][currentAppPlaceholder]['labelTextColor'] = null;
            lStorage['appIcons'][currentAppPlaceholder]['badgeTextColor'] = null;
            lStorage['appIcons'][currentAppPlaceholder]['badgeBackgroundColor'] = null;
            lStorage.saveStorage();
            location.reload();
        },
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
        externalMethods.create = function(divID){
            currentAppPlaceholder = divID;
            createMenu();
        };
        return externalMethods;
    }
    window.appExtras = initExternalMethods();
}(window, document));

(function(window, doc) {
    var aqm = null;

    var buttons = {
        pageJump : {
            link_page:  {
                name: 'link page',
                ref: 'link_page',
                action: function(div){
                    pagePreview.setup({
                        showAddButton: false,
                        title: 'Link to which page?',
                        addingIcon: true,
                        callback: function(holderID){
                            if(!lStorage.pageJumps){
                                lStorage.pageJumps = {};
                            }
                            lStorage.pageJumps[aqm.event.id] = holderID;
                            lStorage.saveStorage();
                            basicWindow.removeWindow(doc.getElementById('pagePreview'));
                        }
                    });
                }
            },
            change_icon:  {
                name: 'change icon',
                ref: 'change_icon',
                action: function(div){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    globalVars.changingIconDiv = divEl;
                    window.location = 'frontpage:loadIconBrowser';
                }
            },
            change_app:  {
                name: 'change app',
                ref: 'change_app',
                action: function(div, element){
                    var containsItem = false;
                    if(!element || !element.id){
                        if(element.target){
                            element = element.target;
                        }
                    }
                    globalVars.changingIconImage = false;
                    globalVars.changingIconDiv = element;
                    Drawer.toggleDrawer({
                        state: 'changingApp',
                        callback: function(newApp) {
                            var iconPressed = div.getAttribute('icon-pressed');
                            var divEl = doc.getElementById(iconPressed);

                            containsItem = lStorage.arrayContainsItem(div.getAttribute('page'), newApp);
                            if(containsItem){
                                appContainers.swapAppPlaces(divEl.title, newApp, divEl.parentElement.id);
                                appContainers.reload();
                            }else{
                                lStorage.replaceInAppArray(div.getAttribute('page'), divEl.title, newApp);
                                appContainers.swapAppWithApp(divEl.title, newApp, divEl.parentElement.id);
                                appContainers.reload();
                            }
                        }
                    });
                }
            },
            remove_app:  {
                name: 'remove app',
                ref: 'remove_app',
                action: function(div){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    if(divEl){
                        var parent = divEl.parentElement;
                        appContainers.removeAppFromPage(iconPressed, parent.id);
                    }
                }
            }
        },
        appIcon:{
                open_menu: {
                    name: "Open Menu",
                    ref: 'open_menu',
                    action: function(){
                        mainMenu.create();
                    }
                },
                make_drawer:  {
                    name: 'make drawer',
                    ref: 'make_drawer',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                        if(!lStorage['appIcons'][el.id]){
                            lStorage['appIcons'][el.id] = {};
                        }
                        lStorage['appIcons'][el.id]['drawer'] = true;
                        el.setAttribute('bundleid', 'drawer');
                        lStorage['appIcons'][el.id]['bundle'] = 'drawer';
                        lStorage['appIcons'][el.id]['label'] = 'Drawer';
                        lStorage.replaceIconLocation('iconImageLocations', 'drawer', 'file:///Library/LockPlus/Creator/images/placeholder.png');
                        lStorage.saveStorage();
                        createFrontPageElement(el, el.id);
                    }
                },
                change_icon:  {
                    name: 'change icon',
                    ref: 'change_icon',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                        globalVars.changingIconDiv = el;
                        window.location = 'frontpage:loadIconBrowser';
                    }
                },
                change_app:  {
                    name: 'change app',
                    ref: 'change_app',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                        globalVars.changingIconImage = false;
                        globalVars.changingIconDiv = el;
                        FPDrawer.showDrawer(function(bundle){
                            el.setAttribute('bundleid', bundle);
                            el.style.backgroundImage = 'url("' + getIconImage(bundle) + '")';
                            
                            if(!lStorage['appIcons'][el.id]){
                                lStorage['appIcons'][el.id] = {};
                            }
                            lStorage['appIcons'][el.id]['bundle'] = bundle;
                            lStorage['appIcons'][el.id]['drawer'] = false;
                            lStorage['appIcons'][el.id]['label'] = null;
                            lStorage.saveStorage();
                            createFrontPageElement(el, el.id);
                        });
                    }
                },
                reset_icon:  {
                    name: 'reset icon image',
                    ref: 'reset_icon',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                            elID = el.getAttribute('bundleid');
                        lStorage['iconImageLocations'][elID] = "";
                        lStorage.saveStorage();
                        createFrontPageElement(el, el.id);
                    }
                },
                change_label:  {
                    name: 'change label',
                    ref: 'change_label',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                        if(!lStorage['appIcons'][el.id]){
                            lStorage['appIcons'][el.id] = {};
                        }
                        //allow menu to close before showing prompt.
                        setTimeout(function(){
                            var prmpt = prompt("Enter new label", "");
                            if(prmpt){
                                lStorage['appIcons'][el.id]['label'] = prmpt;
                                lStorage.saveStorage();
                                createFrontPageElement(el, el.id);
                            }
                        },0);
                    }
                },
                options:  {
                    name: 'App Extras',
                    ref: 'options',
                    action: function(div, element){
                        var el = document.getElementById(element.target.getAttribute('icon-pressed'));
                        if(!lStorage['appIcons'][el.id]){
                            lStorage['appIcons'][el.id] = {};
                        }
                        appExtras.create(el.id);
                    }
                },
        },
        boxElement: {
            change_image:  {
                name: 'change image',
                ref: 'change_image',
                action: function(div, element){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    globalVars.changedImage = divEl;
                    document.getElementById('imageSelector').click();
                }
            },
            reset_image:  {
                name: 'reset image',
                ref: 'reset_image',
                action: function(div, element){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    lStorage['iconImageLocations'][divEl.id] = null;
                    setTimeout(function(){
                        deleteImage(divEl.id);
                        lStorage.saveStorage();
                        location.reload();
                    },1000);
                }
            },
        },
        drawerIcon:{
            change_icon:  {
                name: 'change icon',
                ref: 'change_icon',
                action: function(div, element){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    globalVars.changingIconDiv = divEl.children[0];
                    window.location = 'frontpage:loadIconBrowser';
                }
            },
            reset_icon:  {
                name: 'reset icon image',
                ref: 'reset_icon',
                action: function(div, element){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    lStorage['iconImageLocations'][divEl.children[0].id] = "";
                    lStorage.saveStorage();
                    FPDrawer.reloadDrawer()
                }
            },
            remove_app:  {
                name: 'remove app',
                ref: 'remove_app',
                action: function(div){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    if(divEl){
                        window.location = 'frontpage:uninstallApp:' + divEl.children[0].id;
                        FPDrawer.reloadDrawer();
                    }
                }
            },
            add_favorite:  {
                name: 'add favorite',
                ref: 'add_favorite',
                action: function(div){
                    var iconPressed = div.getAttribute('icon-pressed');
                    var divEl = doc.getElementById(iconPressed);
                    var bundle = divEl.children[0].id;
                    if(globalDrawerFavorites.contains(bundle)){
                        var prmpt = confirm('App already in favs do you wish to remove?')
                        if(prmpt){
                            FPDrawer.removeGlobalFavorite(bundle);   
                        }
                    }else{
                        FPDrawer.addGlobalFavorite(bundle);
                    }
                }
            }
        },
    };

    function buttonPressed(button){
        removeMenu();
        var div = button.target;
        if(div.id.includes('pageJump')){
            buttons['pageJump'][div.title].action(div, button);
        }else if(div.id.includes('drawerIcon')){
            buttons['drawerIcon'][div.title].action(div, button);
        }else if(div.id.includes('folderIcon')){
            buttons['folderIcon'][div.title].action(div, button);
        }else if(div.id.includes('boxElement')){
            buttons['boxElement'][div.title].action(div, button);
        }else{
            buttons['appIcon'][div.title].action(div, button); 
        }
    }

    function createList(buttonType, iconID){
       var menu = createDOM({
            type: 'div',
            id: 'quickMenu',
            className: 'quickMenu',
            attribute: ['title', '']
        }),
        container = createDOM({
            type: 'div',
            id: '',
            className: 'quickMenuContainer',
            attribute: ['title', '']
        }),
        close = createDOM({
            type: 'div',
            id: '',
            innerHTML: 'X',
            className: 'quickMenuClose',
            attribute: ['title', '']
        });
        EventsController.addEvent(close, {
            event: 'click',
            callback: removeMenu,
            label: 'quickMenu'
        });

        Object.keys(buttons[buttonType]).forEach(function(key){
            var button = createDOM({
                 type: 'div',
                 id: buttonType + buttons[buttonType][key].ref,
                 innerHTML: buttons[buttonType][key].name,
                 className: 'quickMenuButton',
                 attribute: ['title', buttons[buttonType][key].ref],
                 attribute2: ['icon-pressed', iconID.id]
             });
             button.setAttribute('page', iconID.id);
             setTimeout(function(){
                EventsController.addEvent(button, {
                    event: 'click',
                    callback: buttonPressed,
                    label: 'quickMenu'
                });
             },200);
             container.appendChild(button);
         });
        
        menu.appendChild(close);
        menu.appendChild(container);
        doc.body.appendChild(menu);
        return menu;
    }

    function removeMenu(){
        globalVars.deeppress = false;
        var div = doc.getElementById('quickMenu');
        EventsController.removeEvents({
            label: 'quickMenu'
        });
        if(div){
            div.parentElement.removeChild(div);
        }
    }

    function positionMenu(list, div){

        var padding = 10;
        var top = div.offsetTop - list.offsetHeight - padding,
            left = div.offsetLeft;

        if(div.parentElement.className === 'customPanel'){

            top = div.offsetTop + div.parentElement.offsetTop;
            left = div.offsetLeft + div.parentElement.offsetLeft;

            if(div.parentElement.parentElement.className === 'customPanel'){
                top = div.offsetTop + div.parentElement.offsetTop + div.parentElement.parentElement.offsetTop;
                left = div.offsetLeft + div.parentElement.offsetLeft + div.parentElement.parentElement.offsetLeft;
            }
        }
            
        list.style.left = left + "px";
        list.style.top = top + "px";

        //stop going offscreen
        if(left + list.offsetWidth > 320){
            left = 320 - list.offsetWidth - padding;
        }

        if(top + list.offsetHeight > 568){
            top = 568 - list.offsetHeight;
        }
        if(top < 0){
            top = div.offsetTop + padding + div.offsetHeight;
            // if(div.parentElement.className === 'customPanel'){
            //     top = div.offsetTop + div.parentElement.offsetTop + padding + div.offsetHeight;
            // }
        }

        if(left < 0){
            left = 0;
        }

        /* fix for change image not able to be selected */
        if(top < 100){
            top = 100;
        }

        list.style.top = top + "px";
        list.style.left = left + "px";
    }

    function createMenu(){
        removeMenu();
        var div = aqm.event;
        var list = null;
        if(div.title){
            if(div.title.includes('AppIcon')){
                list = createList('drawerIcon', div);
            }
        }
        if(div.id.substring(0, 7) === 'fpplace'){
            list = createList('appIcon', div);
        }
        if(div.id.substring(0, 3) === 'box'){
            list = createList('boxElement', div);
        }
        positionMenu(list, div);
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.createMenu = function(obj) {
            aqm = obj;
            return createMenu();
        };
        externalMethods.closeMenu = function() {
            removeMenu();
        };
        return externalMethods;
    }
    window.appQuickMenu = initExternalMethods();
}(window, document));
