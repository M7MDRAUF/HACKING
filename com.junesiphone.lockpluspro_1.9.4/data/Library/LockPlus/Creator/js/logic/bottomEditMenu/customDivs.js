(function(window, doc) {
    var customDivs = {
        names: [],
        data: {}
    };

    //check array to see what numbers have been used.
    function getDivName(counter) {
        if(customDivs){
            return customDivs.names.length;
        }else{
            return 0;
        }
    }

    function showCustomDivs() {
        if (doc.getElementById('customDivMenu')) {
            return;
        }
        var customVar = null;
        if (customDivs.names.length > 0) {
            var div = doc.createElement('div'),
                create,
                extra,
                close;
            div.className = 'customDivMenu';
            div.id = 'customDivMenu';
            doc.body.appendChild(div);
            for (var i = 0; i < customDivs.names.length; i++) {
                create = doc.createElement('div');
                create.innerHTML = customDivs.names[i];
                create.style.color = "white";
                create.onclick = function() {
                    div.parentElement.removeChild(div);
                    customDivs.data[this.innerHTML].push(action.selectedItem);
                    customVar = this.innerHTML;
                    action.savedElements.placedElements[customVar]['data-vars'] = customDivs.data[customVar];
                    action.saveStorage();
                    //doc.getElementById(customVar).style['data-vars'] = JSON.stringify(customDivs);
                    doc.getElementById(this.innerHTML).appendChild(doc.getElementById(action.selectedItem));
                }
                div.appendChild(create);
            }
            extra = doc.createElement('div');
            extra.innerHTML = "Add Div";
            extra.style.color = "white";
            extra.onclick = function() {
                div.parentElement.removeChild(div);
                var customName = 'customDiv' + getDivName();
                action.addtoScreen(customName, action.selectedItem);
                customDivs.names.push(customName);
                customDivs.data[customName] = [action.selectedItem];
                customVar = customName;
                //doc.getElementById(customVar).style['data-vars'] = JSON.stringify(customDivs);
                action.savedElements.placedElements[customVar]['data-vars'] = customDivs.data[customVar];
                action.saveStorage();
            }
            close = doc.createElement('div');
            close.innerHTML = "Close Panel";
            close.style.color = "white";
            close.onclick = function() {
                div.parentElement.removeChild(div);
            }
            div.appendChild(extra);
            div.appendChild(close);
        } else {
            var customName = 'customDiv' + getDivName();
            action.addtoScreen(customName, action.selectedItem);
            customDivs.names.push(customName);
            customDivs.data[customName] = [action.selectedItem];
            customVar = customName;
            //doc.getElementById(customVar).style['data-vars'] = JSON.stringify(customDivs);
            action.savedElements.placedElements[customVar]['data-vars'] = customDivs.data[customVar];
            action.saveStorage();
        }

    }


    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.show = function() {
            showCustomDivs();
        };
        externalMethods.getCustomDivsObj = function() {
            return customDivs;
        };
        externalMethods.setCustomDivsObj = function(obj) {
            customDivs = obj;
        };
        externalMethods.clear = function() {
            customDivs = {
                names: [],
                data: {}
            };
        };
        return externalMethods;
    }
    window.customDiv = initExternalMethods();
}(window, document));