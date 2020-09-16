

// drawerOptions.create();

(function(window, doc) {

    var drawerOptionsButtons = {
        name: "Drawer Options",
        colors: function(){
            basicWindow.removeWindowById('drawerOptions');
            var inputs = [{
                innerHTML: "Badge Background Color",
                tag: 'badgeBackgroundColorDrawer',
                saveName: 'badgeBackgroundColorDrawer',
                defaultColor: 'red',
                onChange: function(value){
                    lStorage.enablecolorbadges = null;
                    addStyleString('.icon_badge{background-color:'+value+'!important;}', 'badgeBackgroundColorDrawer');  
                    lStorage['badgeBackgroundColorDrawer'] = value;
                    lStorage.saveStorage();
                }
            },
            {
                innerHTML: "Badge Text Color",
                tag: 'badgeTextColorDrawer',
                saveName: 'badgeTextColorDrawer',
                defaultColor: 'white',
                onChange: function(value){
                    addStyleString('.icon_badge{color:'+value+'!important;}', 'badgeTextColorDrawer');
                    lStorage['badgeTextColorDrawer'] = value;
                    lStorage.saveStorage();  
                }
            },
            {
                innerHTML: "Label Text Color",
                tag: 'labelTextColorDrawer',
                saveName: 'labelTextColorDrawer',
                defaultColor: 'white',
                onChange: function(value){
                    addStyleString('.icon_label{color:'+value+'!important;}', 'labelTextColorDrawer');
                    lStorage['labelTextColorDrawer'] = value;
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
                innerHTML: "Dont use custom icons.",
                tag: 'nocustomdrawericons',
                saveName: 'nocustomdrawericons',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('drawerOptions');
                    lStorage['nocustomdrawericons'] = boolVal;
                    lStorage.saveStorage();
                    FPDrawer.reloadDrawer();
                }
            },
            {
                innerHTML: "Hide labels",
                tag: 'hidedrawerlabels',
                saveName: 'hidedrawerlabels',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('drawerOptions');
                    lStorage['hidedrawerlabels'] = boolVal;
                    lStorage.saveStorage();
                    FPDrawer.reloadDrawer();
                }
            },
            {
                innerHTML: "Use current badge style",
                tag: 'usecurrentbadges',
                saveName: 'usecurrentbadges',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('drawerOptions');
                    lStorage['usecurrentbadges'] = boolVal;
                    lStorage.saveStorage();
                    FPDrawer.reloadDrawer();
                }
            },
            {
                innerHTML: "Don't organize favs.",
                tag: 'dontorganizefavs',
                saveName: 'dontorganizefavs',
                onChange: function(obj, boolVal){
                    basicWindow.removeWindowById('drawerOptions');
                    lStorage['dontorganizefavs'] = boolVal;
                    lStorage.saveStorage();
                    FPDrawer.reloadDrawer();
                    alert("Not finished");
                }
            }];
            toggleWindow.appendChild(toggleMaker.createToggle(toggles));
        }
    };

    function createMenu(){
        basicWindow.removeAllWindows();
        cloudWindow.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: drawerOptionsButtons.name,
            id: 'drawerOptions',
            className: 'drawerOptions',
            width: 300,
            height: 150,
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
            cloudItems: drawerOptionsButtons,
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
    window.drawerOptions = initExternalMethods();
}(window, document));
