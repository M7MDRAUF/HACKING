(function(window, doc) {

    function selectPlacedElement(name){

        //if user used a custom name.
        if(name.includes('/')){
            name = name.split('/')[1];
        }
        /*
            if there is a selected item, unselect it.
        */
        if(action.selectedItem){
            deselectScreenElement(action.selectedItem, true);
        }
        action.selectedItem = name;
        $('#' + name).css('outline', '1px solid white');
        bottomMenu.toggle();
        $('#editDragger').css('display', 'block');
    }

    function loadPlacedElements(){
        var placedItems = action.savedElements.placedElements,
            isPanel = false,
            placedObject = {
                name: 'placedItems',
            },
            element, innerHTML, elementDIV;

        for(element in placedItems){

            if(element === 'pressActions' || element === 'overlayStyle'){
                //items stored in placed eleents but just for info.
            }else{
                innerHTML = document.getElementById(element).innerHTML;
                if(innerHTML.includes('</div>')){
                    innerHTML = "CUSTOM";
                    if(action.savedElements.placedElements[element]){
                        if(action.savedElements.placedElements[element]['data-vars']){
                            isPanel = true;
                            innerHTML = " - contains: <br>" + JSON.stringify(action.savedElements.placedElements[element]['data-vars']).replace(/,/g,"<br>");
                        }
                    }
                }else if (innerHTML == ""){
                    innerHTML = document.getElementById(element).style.width + " x " + document.getElementById(element).style.height;
                }
                if(!isPanel){
                    innerHTML = "- " + String(innerHTML).slice(0,20);
                }
                if(action.savedElements.placedElements[element]['customName']){
                    element = "(" + action.savedElements.placedElements[element]['customName'] + ")" + "/" + element;
                }
                placedObject[element + "~" + innerHTML] = function(){
                    console.log('placedMenu.js');
                }
                isPanel = false;
            }
            
        }
        return placedObject;
    }

    function loadPanels(){
        var placedItems = action.savedElements.placedElements,
            isPanel = false,
            placedObject = {
                name: 'placedItems',
            },
            element, innerHTML, elementDIV;

        for(element in placedItems){
            if(element === 'pressActions' || element === 'overlayStyle'){
                //items stored in placed eleents but just for info.
            }else{
                innerHTML = document.getElementById(element).innerHTML;
                if(innerHTML.includes('</div>')){
                    innerHTML = "CUSTOM";
                    if(action.savedElements.placedElements[element]){
                        if(action.savedElements.placedElements[element]['data-vars']){
                            isPanel = true;
                            innerHTML = " - contains: <br>" + JSON.stringify(action.savedElements.placedElements[element]['data-vars']).replace(/,/g,"<br>");
                        }
                    }
                }else if (innerHTML == ""){
                    innerHTML = document.getElementById(element).style.width + " x " + document.getElementById(element).style.height;
                }
                if(!isPanel){
                    innerHTML = "- " + String(innerHTML).slice(0,20);
                }
                if(isPanel){
                    if(action.savedElements.placedElements[element]['customName']){
                        element = "(" + action.savedElements.placedElements[element]['customName'] + ")" + "/" + element;
                    }
                    placedObject[element + "~" + innerHTML] = function(){
                        console.log('placedMenu.js');
                    }
                }
                isPanel = false;
            }
        }
        return placedObject;
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(panels){
            var obj = null;
            if(panels){
                obj = loadPanels();
                menuLayout.generateMenu({
                    dict: obj,
                    backAction: function(){
                        menuLayout.loadMainMenu();
                    },
                    clickAction: function(el){
                       var panelName = el.target.title.split('~')[0];
                       //if user used a custom name.
                       if(panelName.includes('/')){
                            panelName = panelName.split('/')[1];
                       }
                       var selectedPanel = document.getElementById(panelName); 
                       if(selectedPanel.style.left === '0px' && selectedPanel.style.top === '50px'){
                        selectedPanel.style.left = action.savedElements.placedElements[panelName].left;
                        selectedPanel.style.top = action.savedElements.placedElements[panelName].top;
                       }else{
                        selectedPanel.style.left = 0;
                        selectedPanel.style.top = 50;
                       }
                       //bottomMenu.toggle();
                       menuLayout.close();
                    }
                });
            }else{
                obj = loadPlacedElements();
                menuLayout.generateMenu({
                    dict: obj,
                    backAction: function(){
                        menuLayout.loadMainMenu();
                    },
                    clickAction: function(el){
                        selectPlacedElement(el.target.title.split('~')[0]);
                    }
                });
            }
        };
        externalMethods.createMenuWithAction = function(action){
            var obj = loadPlacedElements();
            menuLayout.generateMenu({
        		dict: obj,
        		backAction: function(){
                    menuLayout.loadMainMenu();
        		},
        		clickAction: function(el){
                    action(el);
        		}
        	});
        };
        externalMethods.selectItem = function(name){
            selectPlacedElement(name);
        };
        return externalMethods;
    }
    window.placedMenu = initExternalMethods();
}(window, document));

