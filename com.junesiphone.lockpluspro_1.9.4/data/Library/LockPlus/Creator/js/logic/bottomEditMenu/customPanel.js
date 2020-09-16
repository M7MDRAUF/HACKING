(function(window, doc) {
    var customPanels = {
        names: [],
        data: {}
    };

    //check array to see what numbers have been used.
    function getDivNumber() {
        if(customPanels){
            return customPanels.names.length;
        }else{
            return 0;
        }
    }

    function updateSelectedItem(){
        var selectedItem = action.selectedItem;
        deselectScreenElement(action.selectedItem, true);
        action.selectedItem = selectedItem;
        $('#' + selectedItem).css('outline', '1px solid white');
        bottomMenu.toggle();
    }

    function removePanelMenu(){
        var divMenu = doc.getElementById('customDivMenu');
        if(divMenu){
            doc.body.removeChild(divMenu);
        }
    }

    function makeFirstPanel(number){
        var customName = 'customPanels' + getDivNumber(),
            oldItem = action.selectedItem;

            if(number){
                customName = 'customPanels' + number;
            }
            action.addtoScreen(customName, action.selectedItem);
            customPanels.names.push(customName);
            customPanels.data[customName] = [action.selectedItem];
            customVar = customName;
            //document.getElementById(customVar).style['data-vars'] = JSON.stringify(customPanels);
            action.savedElements.placedElements[customVar]['data-vars'] = customPanels.data[customVar];
            action.savedElements.placedElements[customVar]['data-name'] = customName;
            action.savedElements.placedElements[customVar]['width'] = '320px';
            action.savedElements.placedElements[customVar]['height'] = '200px';
            doc.getElementById(customName).style.width = '320px';
            doc.getElementById(customName).style.height = '200px';
            doc.getElementById(customName).setAttribute('data-title', customName);
            
            doc.getElementById(customName).className = 'customPanel';
            updateSelectedItem();
            return customName;
    }

    function removeFromDataVars(panel, name, goingInPanel){
        if(panel === goingInPanel){
            return;
        }
        var dataVars = action.savedElements.placedElements[panel]['data-vars'];
        var newArray = [];
        for (var i = 0; i < dataVars.length; i++) {
            if(dataVars[i] != name){
                newArray.push(dataVars[i]);
            }
        }
        action.savedElements.placedElements[panel]['data-vars'] = newArray;
        action.saveStorage();
        newArray = [];
    }

    function checkIfInAnotherPanel(goingInPanel){
      var placedEls =  Object.keys(action.savedElements.placedElements),
        elInfo = null, i, e;
      for (i = 0; i < placedEls.length; i++) {
        if(placedEls[i].substring(0, 11) === "customPanel"){
            elInfo = action.savedElements.placedElements[placedEls[i]];
            if(elInfo){
                if(elInfo['data-vars']){
                    for (var e = 0; e < elInfo['data-vars'].length; e++) {
                        if(elInfo['data-vars'][e] === action.selectedItem){
                            removeFromDataVars(placedEls[i], action.selectedItem, goingInPanel);
                        }
                    }
                }
            }
        }
      }

    }

    /*
        when item is removed from the screen this removes that element
        from the local array Headers.

        If this isn't done then when a user doesn't deselect hte panel
        if they delete an item, then add one back it will add old elements.

        add elements > misc > box > custom box > add panel > delete custom box > add elements > symbols > font > add font to panel > delete font from panel
     */
    
    function removeFromCustomPanelObj(name){
        var newArray = [];
        for (var i = 0; i < customPanels.data.length; i++) {
            if(customPanels.data[i] != name){
                newArray.push(customPanels.data[i]);
            }
        }
        customPanels.data = newArray;
    }

    function addToPanel(name){
        checkIfInAnotherPanel(name);
        var elemen = null;

            if(!Array.isArray(customPanels.data[name])){
                customPanels.data[name] = [];
            }

            customPanels.data[name].push(action.selectedItem);
            customVar = name;

            uniqueArray = customPanels.data[name].filter(function(item, pos) {
                return customPanels.data[name].indexOf(item) == pos;
            });
            action.savedElements.placedElements[customVar]['data-vars'] = uniqueArray;
           
            elemen = document.getElementById(action.selectedItem);
            elemen.style.top = 0;
            elemen.style.left = 0;
            action.savedElements.placedElements[elemen.id]['top'] = 0;
            action.savedElements.placedElements[elemen.id]['left'] = 0;
            
            action.saveStorage();
            document.getElementById(name).appendChild(document.getElementById(action.selectedItem));
            removePanelMenu();
            updateSelectedItem();
    }

    function showcustomPanels() {
        if (document.getElementById('customDivMenu')) {
            return;
        }
        var customVar = null;
        if (customPanels.names.length > 0) {
            var div = document.createElement('div'),
                create,
                extra,
                close,
                remove;
            div.className = 'customDivMenu';
            div.id = 'customDivMenu';
            document.body.appendChild(div);
            for (var i = 0; i < customPanels.names.length; i++) {
                create = document.createElement('div');
                create.innerHTML = customPanels.names[i];
                create.style.color = "white";
                create.onclick = function() {
                    addToPanel(this.innerHTML);
                }
                div.appendChild(create);
            }
            extra = document.createElement('div');
            extra.innerHTML = "Add Panel";
            extra.style.color = "white";
            extra.onclick = function() {
                div.parentElement.removeChild(div);
                

                var customName = 'customPanel' + getDivNumber();
                action.addtoScreen(customName, action.selectedItem);
                customPanels.names.push(customName);
                customPanels.data[customName] = [action.selectedItem];
                customVar = customName;
                //document.getElementById(customVar).style['data-vars'] = JSON.stringify(customPanels);
                action.savedElements.placedElements[customVar]['data-vars'] = customPanels.data[customVar];
                action.savedElements.placedElements[customVar]['data-name'] = customName;
                //action.savedElements.placedElements[customVar]['data-name'] = customName;
                document.getElementById(customName).setAttribute('data-title', customName);
                document.getElementById(customName).className = 'customPanel';

                action.savedElements.placedElements[customVar]['width'] = '320px';
                action.savedElements.placedElements[customVar]['height'] = '200px';
                document.getElementById(customName).style.width = '320px';
                document.getElementById(customName).style.height = '200px';

                action.saveStorage();
            }
            remove = document.createElement('div');
            remove.innerHTML = "Remove From Panel";
            remove.style.color = "white";
            remove.onclick = function() {
                var parent = document.getElementById('screenElements');
                parent.appendChild(document.getElementById(action.selectedItem));
                Object.keys(customPanels.data).forEach(function(key){
                    var newArray = [];
                    if(customPanels.data[key].contains(action.selectedItem)){
                        for (var i = 0; i < customPanels.data[key].length; i++) {
                            if(customPanels.data[key][i] != action.selectedItem){
                                newArray.push(customPanels.data[key][i]);
                            }
                        }
                        customPanels.data[key] = newArray;
                        action.savedElements.placedElements[key]['data-vars'] = customPanels.data[key];
                        action.saveStorage();
                        removePanelMenu();
                    }
                });
            }
            close = document.createElement('div');
            close.innerHTML = "Close";
            close.style.color = "white";
            close.onclick = function() {
                div.parentElement.removeChild(div);
            }
            div.appendChild(extra);
            div.appendChild(remove);
            div.appendChild(close);
        } else {
            makeFirstPanel();
        }

    }


    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.show = function() {
            showcustomPanels();
        };
        externalMethods.makeFirstPanel = function(number) {
            return makeFirstPanel(number);
        };
        externalMethods.addToPanel = function(number) {
            addToPanel(number);
        };
        externalMethods.getCustomPanelObj = function() {
            return customPanels;
        };
        externalMethods.setCustomPanelObj = function(obj) {
            customPanels = obj;
        };
        externalMethods.clear = function() {
            customPanels = {
                names: [],
                data: {}
            };
        };
        externalMethods.removeFromCustomPanelObj = function(name){
            removeFromCustomPanelObj(name);
        };
        return externalMethods;
    }
    window.customPanel = initExternalMethods();
}(window, document));