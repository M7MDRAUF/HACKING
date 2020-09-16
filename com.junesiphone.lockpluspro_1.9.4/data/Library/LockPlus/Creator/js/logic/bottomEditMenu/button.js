/* 
    bottomMenu Buttons and Actions
*/
(function(window, doc) {

    /* deselect item in the item selection menu */
    function deselectItemFromPicker(){
        // var acc = document.getElementById('accordion'),
        //     items = acc.getElementsByClassName('liSelected');
        //     for (var i = 0; i < items.length; i++) {
        //         if(items[i].title === action.selectedItem){
        //             items[i].className = '';
        //         }
        //     }
    }

    function removeElementsFromCustomDiv(){
        /*
            CustomDivs are defined in customDivs.js
        */
        var screenElements, customDivChildren, customDivIndex, customDivs;

        customDivs = customDiv.getCustomDivsObj();

        screenElements = document.getElementById("screenElements");
        customDivChildren = customDivs.data[action.selectedItem];
        customDivIndex = customDivs.names.indexOf(action.selectedItem);
        /*
            Move items from the customDiv to screenElements
        */
        for (var i = 0; i < customDivChildren.length; i++) {
            screenElements.appendChild(document.getElementById(customDivChildren[i]));
        }
        /*
            Remove item from the customDivs object.
        */   
        if (customDivIndex > -1) {
          customDivs.names.splice(customDivIndex, 1);
          delete customDivs.data[action.selectedItem];
        }
        customDiv.setCustomDivsObj(customDivs);
    }

    function removeElementsFromCustomPanel(){
        /*
            CustomDivs are defined in customDivs.js
        */
        var screenElements, customDivChildren, customDivIndex, customDivs;

        customPanels = customPanel.getCustomPanelObj();

        screenElements = document.getElementById("screenElements");
        customDivChildren = customPanels.data[action.selectedItem];
        customDivIndex = customPanels.names.indexOf(action.selectedItem);
        /*
            Move items from the customDiv to screenElements
        */
        for (var i = 0; i < customDivChildren.length; i++) {
            screenElements.appendChild(document.getElementById(customDivChildren[i]));
        }
        /*
            Remove item from the customDivs object.
        */   
        if (customDivIndex > -1) {
          customPanels.names.splice(customDivIndex, 1);
          delete customPanels.data[action.selectedItem];
        }
        customPanel.setCustomPanelObj(customPanels);
    }


    function removeElementsFromCustomPanelAndDeleteItems(panelName){
        var customPanels, customDivChildren, customDivIndex;

        //if panel name isn't sent use selected item.
        if(!panelName){
            panelName = action.selectedItem;
        }
        
        customPanels = customPanel.getCustomPanelObj();
        customDivChildren = action.savedElements.placedElements[panelName]['data-vars'];
        customDivIndex = customPanels.names.indexOf(panelName);

        for (var i = 0; i < customDivChildren.length; i++) {
            if(customDivChildren[i].substring(0, 11) === 'customPanel'){
                //is a panel call function again to delete elements inside it
                removeElementsFromCustomPanelAndDeleteItems(customDivChildren[i]);
                action.removeItemFromScreen(customDivChildren[i]);
            }else{
                //normal element just remove
                action.removeItemFromScreen(customDivChildren[i]);
            }
        }
        //update local customPanel object (doesn't work on templates)
        if (customDivIndex > -1) {
            customPanels.names.splice(customDivIndex, 1);
            delete customPanels.data[panelName];
        }
        customPanel.setCustomPanelObj(customPanels);
    }
    
    function deleteItem(){
        deselectItemFromPicker();
        /*
            If customDiv we need to remove the items inside the customDiv.
        */
        if(action.selectedItem.substring(0, 9) === 'customDiv'){
            removeElementsFromCustomDiv();
        }
        if(action.selectedItem.substring(0, 11) === 'customPanel'){
            var confirmDeleteAll = confirm("Do you wish to remove all elements in this panel? If not press cancel and it will still remove the panel but keep the elements.");
            if(confirmDeleteAll){
                removeElementsFromCustomPanelAndDeleteItems();
            }else{
                removeElementsFromCustomPanel();
            }
        }

        /*
            batterypie adds styles. Remove them if it's removed.
        */
        if(action.selectedItem === 'batterypie'){
            batteryPie.clearStyles();
        }
        if(action.selectedItem === 'flipclock'){
            flipClock.remove();
        }

        //remove item from the screen
        action.removeItemFromScreen(action.selectedItem);

        if ($.inArray(action.selectedItem, constants.widgets) === -1) {
            action.widgetLoaded = false;
        }
        if (!action.isScrollingEdit) {
            handleScreenClick(event);
        }
    }

    function createButtons(id, name) {
        var button = document.createElement('div');
        button.innerHTML = 'Open';
        button.className = 'openButtons';

        if(userOptions[name]){
            button.innerHTML = userOptions[name].button.innerHTML;

            //check if enabled
            if(name === 'Battery'){
                if(action.savedElements.placedElements[action.selectedItem]['is-battery']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-battery'] === 'true'){
                        button.innerHTML = "Remove";
                    }
                }
            }

            if(name === 'Charging'){
                if(action.savedElements.placedElements[action.selectedItem]['is-charging']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-charging'] === 'true'){
                        button.innerHTML = "Remove";
                    }
                }
            }

            if(name === 'Playing'){
                if(action.savedElements.placedElements[action.selectedItem]['is-playing']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-playing'] === 'true'){
                        button.innerHTML = "Remove";
                    }
                }
            }

            if(name === 'HidePlaying'){
                if(action.savedElements.placedElements[action.selectedItem]['hide-playing']){
                    if(action.savedElements.placedElements[action.selectedItem]['hide-playing'] === 'true'){
                        button.innerHTML = "Remove";
                    }
                }
            }

            button.onclick = function(){
                userOptions[name].button.action();
            }
        }
        document.getElementById(id).appendChild(button);
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(id, name) {
            createButtons(id, name);
        };
        externalMethods.deleteItem = function(){
            deleteItem();
        };
        return externalMethods;
    }
    window.singleButton = initExternalMethods();
}(window, document));