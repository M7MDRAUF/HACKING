(function(window, doc) {
    var excludedStyles = ['top', 'left', 'data-vars', 'data-name'];
    function copyAllStyles(copyfrom, copyto) {
        var elementStyles = action.savedElements.placedElements[copyfrom];
        for (style in elementStyles) {
            if (!excludedStyles.contains(style)) {
                copyto.style[style] = elementStyles[style];
                action.savedElements.placedElements[action.selectedItem][style] = elementStyles[style];
            }
        }
        action.saveStorage();
        loadStyleMenu(copyfrom);
    }

    function loadElements() {
        bottomMenu.closeBottomMenu();
        var placedItems = action.savedElements.placedElements,
            placedObject = {
                name: 'copy_styles',
            },
            element, innerHTML, strings;
        for (element in placedItems) {
            if (element != action.selectedItem) {
                try{
                    strings = String(doc.getElementById(element).innerHTML);
                    if(strings.includes('</div>')){
                        strings = strings.replace('<div','').replace('</div>', '').replace('Id=', '');
                        strings = strings.slice(0, 20);
                    }
                    innerHTML = " (" + strings + ")";
                    placedObject[element + "~" + innerHTML] = function() {}
                }catch(err){
                    console.log(err + ' Caused by: ' + element);
                }
            }
        }
        return placedObject;
    }

    function applyGradient(el) {
        var elementStyles = action.savedElements.placedElements[el],
            selected = doc.getElementById(action.selectedItem);
        selected.style['background'] = elementStyles['background'];
        selected.style['-webkit-background-clip'] = 'text';
        selected.style['-webkit-text-fill-color'] = 'transparent';
        action.savedElements.placedElements[action.selectedItem]['background'] = elementStyles['background'];
        action.savedElements.placedElements[action.selectedItem]['-webkit-background-clip'] = 'text';
        action.savedElements.placedElements[action.selectedItem]['-webkit-text-fill-color'] = 'transparent';
        action.saveStorage();
    }

    function applyAnimation(el){
        var elementStyles = action.savedElements.placedElements[el],
            selected = doc.getElementById(action.selectedItem),
            placedEL = action.savedElements.placedElements[action.selectedItem],
            styles = null;

            styles = elementStyles['transformAnimation'];
            selected.style['transformAnimation'] = styles;
            placedEL['transformAnimation'] = styles;
            action.saveStorage();
    }

    function applyValue(el, style, value){
        var selected = doc.getElementById(action.selectedItem);
        selected.style[style] = value;
        action.savedElements.placedElements[action.selectedItem][style] = value;
        action.saveStorage();
    }

    function loadStyles(el) {
        var elementStyles = action.savedElements.placedElements[el],
            selectedElement = doc.getElementById(action.selectedItem),
            placedObject = {
                name: 'copy_styles',
                copy_most_styles: function() {
                    var selected = doc.getElementById(action.selectedItem);
                    copyAllStyles(el, selected);
                    //menuLayout.close();
                }
            },
            style;
        for (style in elementStyles) {
            value = elementStyles[style];
            if (selectedElement.style[style] != value) {
                if (style === '-webkit-background-clip' || style === '-webkit-text-fill-color' || String(value).indexOf('linear-gradient') != -1) {
                    if (!placedObject['gradient']) {
                        placedObject['gradient'] = function() {
                            applyGradient(el);
                        }
                    }
                }else if (style === 'transformAnimation'){
                    if (!placedObject['transformAnimation']) {
                        placedObject['transformAnimation'] = function(){
                            applyAnimation(el);
                        }
                    }
                }else if (style === 'data-vars' || style === 'data-name'){

                } else {
                    placedObject[style + "~" + value] = function(){
                        return false;
                    };
                }
            }
        }
        return placedObject;
    }

    function loadStyleMenu(el) {
        var obj = loadStyles(el);
        menuLayout.generateMenu({
            dict: obj,
            backAction: function() {
                loadElementsMenu();
            },
            clickAction: function(el) {
                var currentElement, value, style;
                //if style has it's own function run it
                
                if(obj[el.target.title]){
                    if(!obj[el.target.title]()){
                        currentElement = doc.getElementById(action.selectedItem),
                        value = el.target.title.split('~')[1],
                        style = el.target.title.split('~')[0],
                        currentElement.style[style] = value;
                        action.savedElements.placedElements[action.selectedItem][style] = value;
                        action.saveStorage();
                    }
                }else{
                    currentElement = doc.getElementById(action.selectedItem),
                    value = el.target.title.split('~')[1],
                    style = el.target.title.split('~')[0],
                    currentElement.style[style] = value;
                    action.savedElements.placedElements[action.selectedItem][style] = value;
                    action.saveStorage();
                }
                el.target.parentElement.removeChild(el.target);
            }
        });
    }

    function loadElementsMenu() {
        var obj = loadElements();
        menuLayout.generateMenu({
            dict: obj,
            backAction: function() {
                menuLayout.close();
                placedMenu.selectItem(action.selectedItem);
            },
            clickAction: function(el) {
                loadStyleMenu(el.target.title.split('~')[0].replace(' ', ''));
            }
        });
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.open = function() {
            loadElementsMenu();
        };
        return externalMethods;
    }
    window.copyStyle = initExternalMethods();
}(window, document));