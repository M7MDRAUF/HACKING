(function(window, doc) {

    function clickBackButton() {
        var menuName = menuLayout.getMenuObjectName(),
            object = menuPanel,
            objectKeys = Object.keys(object),
            elementPanelDiv = doc.getElementById('elementPanelContainer');

        /* If menuName is in the objectKeys then go back to first level */
        if (objectKeys.indexOf(menuName) !== -1) {
            menuLayout.loadNewMenu(object, elementPanelDiv);
        } else {
            if (!object[menuName]) {
                for (var i = 0; i < objectKeys.length; i++) {
                    if (object[objectKeys[i]][menuName]) {
                        menuLayout.loadNewMenu(object[objectKeys[i]], elementPanelDiv);
                    }
                }

            }
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.create = function() {
            menuLayout.generateMenu({
                dict: menuPanel,
                backAction: function() {
                    clickBackButton();
                },
                clickAction: function(el) {}
            });
        };
        return externalMethods;
    }
    window.mainMenu = initExternalMethods();
}(window, document));