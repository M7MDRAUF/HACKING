//Global Favorites

var globalDrawerFavorites = [];

(function(window, doc) {

    function badgeAutoColor(badge, image){
        var img, vibrant, swatches, backupColor = "#343434";
            img = document.createElement('img');
            img.setAttribute('src', image);
            img.addEventListener('load', function() {
                var badgeBGColor = document.getElementById('badgeBackgroundColor');
                if(badgeBGColor){
                    badgeBGColor.parentElement.removeChild(badgeBGColor);
                }
                try{
                    vibrant = new Vibrant(img);
                    swatches = vibrant.swatches();
                    if(swatches['Vibrant']){
                        badge.style.backgroundColor = swatches['Vibrant'].getHex();
                        //addStyleString('.drawer_icon::before{background-color:'+swatches['Vibrant'].getHex()+';}', 'badgeBackgroundColorDrawer');  
                    }else{
                        if(swatches['LightVibrant']){
                            badge.style.backgroundColor = swatches['LightVibrant'].getHex();
                        }else{
                            if(swatches['DarkVibrant']){
                                badge.style.backgroundColor = swatches['DarkVibrant'].getHex();
                            }else{
                                if(swatches['Muted']){
                                    badge.style.backgroundColor = swatches['Muted'].getHex();
                                }else{
                                    if(swatches['DarkMuted']){
                                        badge.style.backgroundColor = swatches['DarkMuted'].getHex();
                                    }
                                }
                            }
                        }
                    }
                }catch(err){
                    badge.style.backgroundColor = backupColor;
                }
                img = null;
                vibrant = null;
                swatches = null;
                /*
                * Results into:
                * Vibrant #7a4426
                * Muted #7b9eae
                * DarkVibrant #348945
                * DarkMuted #141414
                * LightVibrant #f3ccb4
                */
            });
    }

    if(localStorage.getItem('globalDrawerFavorites')){
        globalDrawerFavorites = JSON.parse(localStorage.getItem('globalDrawerFavorites'));
    }


    function addGlobalFavorite(bundle){
        globalDrawerFavorites.push(bundle);
        localStorage.setItem('globalDrawerFavorites', JSON.stringify(globalDrawerFavorites));
    }
    
    function removeGlobalFavorite(bundle){
        var newArray = [];
        for (var i = 0; i < globalDrawerFavorites.length; i += 1) {
            if(globalDrawerFavorites[i] != bundle){
                newArray.push(globalDrawerFavorites[i]);
            }
        }
        globalDrawerFavorites = newArray;
        localStorage.setItem('globalDrawerFavorites', JSON.stringify(newArray));
        FPDrawer.reloadDrawer();
    }

    var iconWidth = 40,
        iconMargin = 25,
        pagingAmount = 20,
        pageSpacing = 20,
        pagePadding = 10,
        snapPoint = 100 + pageSpacing,
        drawerDiv = null,
        isScrolling = false,
        selectedMenu = null,
        drawerCallback = null,
        drawerOptions = {
            start: function(event){
                
            },
            end: function(){
               
            },
            startDeepPress: function(event){
                isScrolling = true;
                appQuickMenu.createMenu({
                    event: this,
                });
            },
            endDeepPress: function(){
                //alert("test");
                //isScrolling = false;
            },
            change: function(force, event){
                // this is called every time there is a change in pressure
                // force will always be a value from 0 to 1 on mobile and desktop
            },
            unsupported: function(){
                // NOTE: this is only called if the polyfill option is disabled!
                // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
            }
        };

    // iPhone X
    if (window.outerHeight == 812 || screen.height === 812) {
        iconWidth = 40;
        iconMargin = 15;
        pagingAmount = 32;
    }
    // iPhone XS Max / XR
    if (window.outerHeight == 896 || screen.height === 896) {
        iconWidth = 40;
        iconMargin = 15;
        pagingAmount = 32;
    }
    // iPhone 7
    if (window.outerHeight == 667 || screen.height == 667) {
        iconWidth = 40;
        iconMargin = 17;
        pagingAmount = 24;
    }
    // iPhone 5, 5s, SE
    if (window.outerHeight == 568 || screen.height === 568) {
        iconWidth = 40;
        iconMargin = 17;
        pagingAmount = 24;
    }
    // iPhone 6S+
    if (window.outerHeight == 736 || screen.height === 736) {
        iconWidth = 40;
        iconMargin = 15;
        pagingAmount = 24;
    }

    function sortArray(array) {
        if (array) {
            array = array.sort(function(a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            return array;
        }
    }

    function hasReachedPagingLimit(pagingCount){
        if (pagingCount === pagingAmount){
            return true;
        }
        return false;
    }

    function isLastApp(increment, appsLength){
        if(increment === appsLength - 1){
            return true;
        }
        return false;
    }

    function showDrawer(callback){
        drawerDiv.className = 'drawerShown';
        if(callback){
            drawerCallback = callback;
        }
    }

    function closeDrawer(){
        drawerDiv.className = 'drawerHidden';
        globalVars.changingIconDiv = null;
        globalVars.changingOverlayImage = false;
        globalVars.changedImage = false;
        globalVars.changingIconImage = false;
        globalVars.changingIconDiv = null;
        globalVars.changingBadgeImage = false;
        drawerCallback = null;
    }

    function selectMenuItem(item){
        selectMenu = item;
        var menuItems = ["fav_item", "noti_item", "all_items"],
            i, elementItem;
        for (i = 0; i < menuItems.length; i += 1) {
            elementItem = doc.getElementById(menuItems[i]);
            elementItem.style.backgroundColor = 'transparent';
            elementItem.style.color = 'white';
            if(menuItems[i] === item){
                elementItem.style.backgroundColor = 'rgba(255,255,255,0.3)';
                elementItem.style.color = 'black';
            }
        }
    }


    /* 
        Events
    */
    function drawerTouchstart(el){
        if(selectedMenu != el.target.title){
            switch (el.target.title) {
                case 'all_items':
                        createFullAppList();
                        selectMenuItem('all_items');
                    break;
                case 'fav_item':
                        selectMenuItem('fav_item');
                        createFullAppList('fav_item');
                    break;
                case 'noti_item':
                        selectMenuItem('noti_item');
                        createFullAppList('noti_item');
                    break;
                case 'closeButton':
                    closeDrawer();
                    break;
                default:
                    break;
            }
        }
    }

    function drawerTouchmove(){
        isScrolling = true;
    }

    function drawerTouchend(el){
        if(!isScrolling){
            if(el.target.title){
                switch (el.target.title) {
                    case 'AppIcon':
                        appToOpen = el.target.getAttribute('bundleid');
                        if(drawerCallback){
                            drawerCallback(appToOpen);
                            setTimeout(function(){
                                closeDrawer();
                            }, 0);
                        }else{
                            setTimeout(function(){
                                webviewOpenApp();
                                setTimeout(function(){
                                    closeDrawer();
                                },300);
                            },0);
                        }
                        break;
                    default:
                        break;
                }
            }
            appQuickMenu.closeMenu();
        }
        isScrolling = false;
    }

    function createIconLayout(){
        var container = createDOM({
            type: 'div',
            className: 'icon_container'
        }),
        iconImage = createDOM({
            type: 'div',
            className: 'icon_image'
        }),
        iconLabel = createDOM({
            type: 'div',
            className: 'icon_label'
        }),
        iconBadge = createDOM({
            type: 'div',
            className: 'icon_badge'
        });

        container.appendChild(iconImage);
        container.appendChild(iconLabel);
        container.appendChild(iconBadge);
        return {
            container: container,
            image: iconImage,
            label: iconLabel,
            badge: iconBadge
        };
    }

    function createMainView(){
        var main = doc.createElement('div');
            main.className = 'drawer_main';
            main.id = "drawer_main";
            main.style.cssText += "-webkit-scroll-snap-points-x: repeat(" + snapPoint + "%);";
            return main;
    }

    function setIconInfoFromObj(icon, obj){
        if (obj.name.indexOf("WhatsApp") >= 0) {
            obj.name = "WhatsApp";
        }
        icon.badge.innerHTML = (obj.badge >= 1) ? obj.badge : "";
        if(!lStorage['hidedrawerlabels']){
            icon.label.innerHTML = obj.name;
        }
        icon.container.title = "AppIcon";
        icon.container.setAttribute('bundleid', obj.bundle);
        icon.container.id = "drawer" + obj.bundle;

        if(lStorage['nocustomdrawericons']){
            var imageLoc = '/var/mobile/Library/FrontPageCache/' + obj.bundle + '.png';
            icon.image.style.backgroundImage = 'url("' + imageLoc + '")';
        }else{
            icon.image.style.backgroundImage = 'url("' + getIconImage(obj.bundle) + '")';
        }
        if(lStorage.enablecolorbadges && lStorage.usecurrentbadges){
            badgeAutoColor(icon.badge, getIconImage(obj.bundle));
        }
        icon.image.id = obj.bundle;
        icon.container.style.width = iconWidth + 'px';
        icon.container.style.height = iconWidth + 'px';
        icon.container.style.margin = iconMargin + 'px';
        Pressure.set(icon.container, drawerOptions);
    }

    function removeDrawerMainIfExists(){
        var drawerMain = doc.getElementById('drawer_main');
        if(drawerMain){
            drawerDiv.removeChild(drawerMain);
        }
    }

    function getNotificationsOnly(allApps){
        var e, notifArray = [];
        for (e = 0; e < allApps.length; e += 1) {
            if(allApps[e].badge >= 1){
                notifArray.push(allApps[e]);
            }
        }
        return notifArray;
    }
    function getFavsOnly(allApps){
        var e, favArray = [];
        for (e = 0; e < allApps.length; e += 1) {
            if(globalDrawerFavorites){
                if(globalDrawerFavorites.contains(allApps[e].bundle)){
                    favArray.push(allApps[e]);
                }
            }
        }
        return favArray;
    }

    function addSpacersTo(page){
        for (var p = 0; p < page.children.length % 4; p += 1) {
            var spacerDiv = createDOM({
                type: 'div',
                id: 'spacer',
                className: 'icon_container'
            });
            spacerDiv.style.width = iconWidth + 'px';
            spacerDiv.style.height = iconWidth + 'px';
            spacerDiv.style.margin = iconMargin + 'px';
            page.appendChild(spacerDiv);
        }
    }

    function createFullAppList(type){
        if(!drawerDiv){
            return;
        }
        removeDrawerMainIfExists();
        var iconItems, i, e, bundleObject,
            allApps = sortArray(FPI.apps.all),
            pagingCount = 0,
            page = doc.createElement('div'),
            mainView = createMainView();

            if(type){
                if(type === 'noti_item'){
                    selectMenuItem('noti_item');
                    allApps = getNotificationsOnly(allApps);
                }else if (type === 'fav_item'){
                    selectMenuItem('fav_item')
                    allApps = getFavsOnly(allApps);
                }
            }else{
                selectMenuItem('all_items');
            }

            for (i = 0; i < allApps.length; i += 1) {
                pagingCount += 1;
                bundleObject = FPI.bundle[allApps[i].bundle];
                iconItems = createIconLayout();
                setIconInfoFromObj(iconItems, bundleObject);
                page.appendChild(iconItems.container);
                if (hasReachedPagingLimit(pagingCount) || isLastApp(i, allApps.length)) {
                    pagingCount = 0;
                    page.className = 'drawer_page';
                    if (isLastApp(i, allApps.length)) { 
                        /* 
                            Since I align center the trailing icons will be centered 
                            Check if divisible by 4, if not then add blank spacers to make up
                            for it.
                        */
                        if(page.children.length % 4 != 0){
                            addSpacersTo(page);
                        }
                        page.style.cssText += "padding:" + pagePadding + "px; margin-right:0px;";
                    } else {
                        page.style.cssText += "padding:" + pagePadding + "px; margin-right:" + pageSpacing + "%;";
                    }
                    mainView.appendChild(page);
                    page.title = page.children[0].getAttribute('letter') + '-' + page.children[page.children.length - 1].getAttribute('letter');
                    page = doc.createElement('div');
                }
            }
            drawerDiv.appendChild(mainView);
    }

    function createMenuBar(){
        var menuItems = [
            {
                name : "Favorites",
                div: 'fav_item',
            },
            {
                name: "Notifications",
                div: "noti_item",
            },
            {
                name: "All Apps",
                div: "all_items",
            },
        ];
        var menuBar = createDOM({
            type: 'div',
            id: 'drawer_menu',
            innerHTML: '',
            className: 'drawer_menu',
        }),
        optionContainer = createDOM({
            type: 'div',
            id: '',
            innerHTML: '',
            className: 'menu_item_container',
        });

        menuBar.style.width = window.outerWidth + "px";
        optionContainer.style.left = 320/2 - 280/2 + 'px'; //center els

        for (i = 0; i < menuItems.length; i += 1) {
            var menuItem = createDOM({
                type: 'div',
                id: menuItems[i].div,
                innerHTML: menuItems[i].name,
                className: 'menu_item',
                attribute: ['title', menuItems[i].div]
            });
            optionContainer.appendChild(menuItem);
        }
        menuBar.appendChild(optionContainer);
        drawerDiv.appendChild(menuBar);
    }

    function createCloseButton(){
        var closeButton = createDOM({
            type: 'div',
            id: 'closeButton',
            innerHTML: '',
            className: 'closeButton',
            attribute: ['title', 'closeButton']
        });
        drawerDiv.appendChild(closeButton);
    }

    function createDrawer(){
        drawerDiv = createDOM({
            type: 'div',
            id: 'drawerDIV',
            innerHTML: '',
            className: 'drawerHidden',
            //attribute: ['title', key]
        });
        /*
            Since we are scaling the view port set the width from innerHeight
            setting 100% in css will not work due to the scaling.
        */
        drawerDiv.style.height = window.innerHeight + 2 + "px";
        
        EventsController.addEvent(drawerDiv, {
            event: 'touchstart',
            callback: drawerTouchstart,
            label: 'drawer'
        });
        EventsController.addEvent(drawerDiv, {
            event: 'touchmove',
            callback: drawerTouchmove,
            label: 'drawer'
        });
        EventsController.addEvent(drawerDiv, {
            event: 'touchend',
            callback: drawerTouchend,
            label: 'drawer'
        });

        doc.body.appendChild(drawerDiv);
        createMenuBar();
        createCloseButton();
        createFullAppList();
    }

    function updateBadge(bundle){
        var i, e, f, drawerDivs, page, badgeNum = "", iconContainer;

        try{
            badgeNum = FPI.bundle[bundle].badge;
        }catch(err){

        }
        
        /* 
            User trying to set apps but keeps resetting to page one because their friend constantly sends
            messages. When a badge is updated in the drawer I just reload the entire drawer. Easy because you
            dont have to filter through list of elements

            If drawer is open then filter through list of elements to stop it resetting to page 1.
            Otherwise do as it was and reload the drawer. 
        */
       
        if(drawerDiv){
            drawerDivs = document.getElementById('drawer_main');
            for (i = 0; i < drawerDivs.children.length; i += 1) {
                page = drawerDivs.children[i];
                for (e = 0; e < page.children.length; e += 1) {
                    if(bundle === page.children[e].getAttribute('bundleid')){
                        iconContainer = page.children[e];
                        for (f = 0; f < iconContainer.children.length; f += 1) {
                            if(iconContainer.children[f].className === 'icon_badge'){
                                iconContainer.children[f].innerHTML = (badgeNum >= 1) ? badgeNum : "";
                            }
                        }
                        
                    }
                }
            }
        }else{
            createFullAppList();
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.makeCloud = function(obj) {
            cloudInfo = obj;
            return createMenu();
        };
        externalMethods.createDrawer = function() {
            createDrawer();
        };
        externalMethods.showDrawer = function(callback) {
            showDrawer(callback);
        };
        externalMethods.closeDrawer = function() {
            closeDrawer();
        };
        externalMethods.updateBadge = function(bundle) {
            updateBadge(bundle);
        };
        externalMethods.reloadDrawer = function() {
            createFullAppList();
        };
        externalMethods.removeGlobalFavorite = function(item){
            removeGlobalFavorite(item);
        };
        externalMethods.addGlobalFavorite = function(item){
            addGlobalFavorite(item);
        };

        return externalMethods;
    }
    window.FPDrawer = initExternalMethods();
}(window, document));


// setTimeout(function(){
//     FPDrawer.showDrawer();
// },1000);