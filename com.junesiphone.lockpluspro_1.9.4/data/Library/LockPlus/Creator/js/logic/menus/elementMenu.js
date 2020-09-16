/*
	Element menu contains items that can be placed on the screen.
	Example: "Clock, Weather, System, Misc"
	It gets info for this menu from elementPanel object in arrays.js

	action_addremove.js contains action.addToScreen and action.removeFromScreen
*/

(function(window, doc) {

    function placeOrRemoveItem(el) {

        //do not add FrontPage elements.
        if(Object.keys(elementPanel.frontpage).contains(el.target.title)){
            return;
        }
        
        var div = $('#' + el.target.title);
        if (div.length !== 0) {
            action.removeFromScreen(el.target.title);
            if (el.target.className === 'String highLighted') {
                el.target.className = 'String';
            }
        } else {
            if (el.target.className === 'String') {
                el.target.className = 'String highLighted';
            }
            action.addtoScreen(event.target.title);
        }
    }

    function clickBackButton(el) {
        var menuName = menuLayout.getMenuObjectName(),
            objectKeys = Object.keys(elementPanel),
            elementPanelDiv = doc.getElementById('elementPanelContainer');

        /* If elementPanel we need to exit to main menu */
        if (menuName === 'elementPanel') {
            menuLayout.loadMainMenu();
            return;
        }
        /* 
        	if:  menuName is in the objectKeys then go back to first level 
        	else: loop through keys if it's the third level elementMenu > clockElements > time
        	then load that menu.
        */ 
        if (objectKeys.indexOf(menuName) !== -1) {
            menuLayout.loadNewMenu(elementPanel, elementPanelDiv);
        } else {
            if (!elementPanel[menuName]) {
                for (var i = 0; i < objectKeys.length; i++) {
                    if (elementPanel[objectKeys[i]][menuName]) {
                        menuLayout.loadNewMenu(elementPanel[objectKeys[i]], elementPanelDiv);
                    }
                }

            }
        }
    }

    /*
    	The click action for everything in this menu is to place an element.
    	If in the object, the thing pressed is a string then place it.
    	The className gets set in menuLayout.js
    */

    function clickElementInElementPanel(el) {
        if (el.target.className === "String" || el.target.className == "String highLighted") {
            if(elementPanel.templates[el.target.title]){
                menuLayout.close();
            }else{
                placeOrRemoveItem(el);
            }
        }
    }


    function createElementMenu() {
        menuLayout.generateMenu({
            dict: elementPanel,
            backAction: function(el) {
                clickBackButton(el);
            },
            clickAction: function(el) {
                clickElementInElementPanel(el)
            }
        });
    }


    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.open = function() {
            createElementMenu();
        };
        return externalMethods;
    }
    window.elementMenu = initExternalMethods();
}(window, document));