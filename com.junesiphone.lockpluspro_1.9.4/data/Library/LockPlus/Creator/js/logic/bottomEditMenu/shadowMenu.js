/*
    shadowInfo = [
        {
            type: '',
            xVal: '',
            yVal: '',
            blurVal: '',
            color: ''
        }
    ]
*/

(function(window, doc){

    var shadowInfo = [];
    var eventsAdded = [];
    var lastColor = null;
    var shadowType = null;
    var menuName = 'shadowMenu';
    var shadowSelected = null;
    var fingerPressed = false;

    function addEvent(obj){
        if(obj.type){
            obj.element.addEventListener(obj.type, obj.action);
            eventsAdded.push(obj);
        }
    }

    function setSelected(div){
        div.style.border = '1px solid white';
        if(shadowSelected){
            document.getElementById('shadowInputHolder').classList.remove("inactive");
            document.getElementById('shadowDelete').classList.remove('inactive');
        }
    }

    function setDeselected(div){
        div.style.border = '1px solid transparent';
    }

    function liClicked(el){
        var holder = doc.getElementById('shadowInputHolder'),
            li = doc.getElementById('shadowHolder'),
            shadow = el.target.innerHTML;
            shadowSelected = el.target.title;
            values = shadow.split('rgb')[0].split(' ');
            for (var i = 0; i < holder.children.length; i++) {
                if(holder.children[i].children[0]){
                    holder.children[i].children[0].value = parseInt(values[i], 10);
                }
            }
            for (var e = 0; e < li.children.length; e++) {
                setDeselected(li.children[e]);
                if(li.children[e] === el.target){
                    setSelected(li.children[e]);
                }
            }
    }

    function returnWholeShadow(){
        var string = "",
            final = "";
        for (var i = 0; i < shadowInfo.length; i++) {
            Object.keys(shadowInfo[i]).forEach(function(key){
                if(key === 'color'){
                    string += shadowInfo[i][key]
                }else{
                    string += shadowInfo[i][key] + 'px ';
                }
            });
            if(i < shadowInfo.length-1){
                final += string + ', ';
            }else{
                final += string;
            }
            string = "";
        }
        return final;
    }

    function updateElementShadow(){
        shadow = returnWholeShadow();
        doc.getElementById(action.selectedItem).style[shadowType] = shadow;
        action.savedElements.placedElements[action.selectedItem][shadowType] = shadow;
        action.saveStorage();
    }

    function parseObjToStyle(obj){
        var string = "";
        Object.keys(obj).forEach(function(key){
            if(key === 'color'){
                string += obj[key]
            }else{
                string += obj[key] + 'px ';
            }
        });
        return string;
    }

    function updateLIshadowInnerHTML(){
        var liHolder = doc.getElementById('shadowHolder'),
            li2;
            liHolder.innerHTML = "";
            for (var i = 0; i < shadowInfo.length; i++) {
                li2 = doc.createElement('li');
                li2.title = i;
                if(Number(i) === Number(shadowSelected)){
                    setSelected(li2);
                }
                li2.innerHTML = parseObjToStyle(shadowInfo[i]);
                addEvent({
                    type: 'click',
                    action: liClicked,
                    element: li2
                });
                liHolder.appendChild(li2);
            }
    }

    function makeAndAppendMenu(id){
        var menu = doc.createElement('div'),
            menuPosition = localStorage.getItem('shadowMenuPosition');
            menu.id = id;
            menu.className = 'menuThreeInputsOneButton';
            if(menuPosition){
                menu.style.top = menuPosition + 'px';
            }
            doc.body.appendChild(menu);
        return menu;
    }

    function handleInputChange(event){
        resetMoveForInput(event);
        var shadow, buttonName;
            number = event.target.parentElement;
            number = number.className.charAt(number.className.length -1);
            shadow = shadowInfo[shadowSelected];
            buttonName = [['xVal', 'yVal', 'blurVal'][number]];
            shadow[buttonName] = event.target.value;
            updateElementShadow();
            updateLIshadowInnerHTML();
    }
    function handleInputChangeFocus(){
        moveUpForInput(event);
    }

    function createButtonInput(currentValue, classes){
        var input = document.createElement('input');
            input.value = currentValue;
            addEvent({
                type: 'blur',
                action: handleInputChange,
                element: input
            });
            addEvent({
                type: 'focus',
                action: handleInputChangeFocus,
                element: input
            });
            input.className = classes;
        return input;
    }

    function updateObjectWithShadow(style){
        var splitAtRGB, numbers, splitAtSpace, splitAtParen, color;

        style = style.trim();
        splitAtParen = style.split(')'),
        splitAtParen = splitAtParen[0] + ')';
        splitAtRGB = splitAtParen.split('rgb');
        if(splitAtParen.indexOf('rgba') > -1){
            splitAtRGB = splitAtParen.split('rgba');
        }
        
        numbers = splitAtRGB[0];
        splitAtSpace = numbers.split(' ');
        color = splitAtRGB[1];
        splitAtComma = color.split(',');

        //checking if rgb or rgba
        if(splitAtComma.length > 3){
            color = 'rgba' + color;
        }else{
            color = 'rgb' + color;
        }

        shadowInfo.push({
            xVal: parseInt(splitAtSpace[0], 10),
            yVal: parseInt(splitAtSpace[1], 10),
            blurVal: parseInt(splitAtSpace[2], 10),
            color: color
        });
    }

    function parseStyleToObject(shadowStyle){
        var splitAtParen = shadowStyle.split(')'),
            splitAtParentComma = null,
            addedParen = "";
            shadowInfo = [];

        // More than one shadow.
        if(splitAtParen.length > 2){
            splitAtParentComma = shadowStyle.split('),');
            for (var i = 0; i < splitAtParentComma.length; i++) {
                if(splitAtParentComma[i].charAt(splitAtParentComma[i].length-1) === ')'){
                    updateObjectWithShadow(splitAtParentComma[i]);
                }else{
                    addedParen = splitAtParentComma[i] + ")";
                    updateObjectWithShadow(addedParen);
                }
            }
        }else{
            updateObjectWithShadow(shadowStyle);
        }
    }

    function createShadowHolder(){
        var holder = doc.createElement('ul'),
            li = doc.createElement('li'),
            style = action.savedElements.placedElements[action.selectedItem][shadowType],
            li2;
            addEvent({
                type: 'click',
                action: liClicked,
                element: li
            });
            holder.className = 'shadowHolder';
            holder.id = 'shadowHolder';

            if(style){
                parseStyleToObject(style);
                for (var i = 0; i < shadowInfo.length; i++) {
                    li2 = doc.createElement('li');
                    li2.title = i;
                    li2.innerHTML = parseObjToStyle(shadowInfo[i]);
                    addEvent({
                        type: 'click',
                        action: liClicked,
                        element: li2
                    });
                    holder.appendChild(li2);
                }
            }
        return holder;
    }
    function setFingerPressed(state){
        fingerPressed = state;
    }
    function createValueButton(incrementID, type, symbol, classes){
        var button = document.createElement('div');
            button.innerHTML = symbol;
            button.className = classes;
            button.title = incrementID;
            // addEvent({
            //     type: 'click',
            //     action: function(){
            //         handleChange($(this), type);
            //     },
            //     element: button
            // });
            addEvent({
                type: 'touchstart',
                action:function(){
                    setFingerPressed(true);
                    handleChange($(this), type);
                },
                element: button
            });
            addEvent({
                type: 'touchend',
                action:function(){
                    setFingerPressed(false);
                },
                element: button
            });
            addEvent({
                type: 'touchmove',
                action:function(){
                    setFingerPressed(false);
                },
                element: button
            });
            addEvent({
                type: 'touchcancel',
                action:function(){
                    setFingerPressed(false);
                },
                element: button
            });
        return button;
    }

    function createButtonLabel(name, classes){
        var label = document.createElement('div');
            label.innerHTML = name;
            label.className = classes;
        return label;
    }

    function showColorPicker(){
        var isForBox = "#" + menuName;
        if(!shadowSelected){
            jPopup({
                type: "alert",
                message: "Select a shadow first.",
                yesButtonText: "OK",
                functionOnOk: function() {
                    //do something on ok
                }
            });
            return;
        }

        var selector = isForBox ? '#boxshadowColorDiv' : '#shadowColorDiv';
        if (isMobile) {
            selector = isForBox;
        }

        var color = shadowInfo[shadowSelected].color;
        function onMove(e, tinycolor){
            shadowInfo[shadowSelected].color = tinycolor.toRgbString();
            updateElementShadow();
            updateLIshadowInnerHTML();
            lastColor = tinycolor.toRgbString();
        }
        colorPicker.showPicker(menuName, color, '', onMove, false);
    }
    function createColorButton(){
        var button = document.createElement('div');
            button.className = 'exColorButton addColor';
            button.innerHTML = 'Color';
            addEvent({
                type: 'click',
                action: showColorPicker,
                element: button
            });
        return button;
    }

    function selectNextLI(){
        var li = doc.getElementById('shadowHolder');
        for (var e = 0; e < li.children.length; e++) {
            setDeselected(li.children[e]);
            if(Number(li.children[e].title) === Number(shadowSelected) + 1){
                liClicked({
                    target: li.children[e]
                });
            }
        }
    }

    function addNewShadow(){
        var elDiv = doc.getElementById('shadowHolder'),
            li = doc.createElement('li'),
            shadow = "0px 1px 0px rgb(0,0,0)";

            if(lastColor){
                shadow = "0px 1px 0px " + lastColor;
            }

            li.title = elDiv.children.length;
            li.innerHTML = shadow;
            addEvent({
                type: 'click',
                action: liClicked,
                element: li
            });
            shadowInfo.push({
                xVal: 0,
                yVal: 1,
                blurVal: 0,
                color: 'rgb(0,0,0)'
            });
            elDiv.appendChild(li);
            updateElementShadow(elDiv);
            selectNextLI();
    }

    function createAddShadowButton(){
        var button = document.createElement('div');
            button.className = 'exColorButton addShadow';
            button.innerHTML = 'Add Shadow';
            addEvent({
                type: 'click',
                action: addNewShadow,
                element: button
            });
        return button;
    }

    function deleteShadow(){
        var newShadow = [];
            for (var i = 0; i < shadowInfo.length; i++) {
                if(i != shadowSelected){
                    newShadow.push(shadowInfo[i]);
                }
            }
       shadowInfo = newShadow;
       updateElementShadow();
       updateLIshadowInnerHTML();
    }
    function createApplyShadowButton(){
        var button = document.createElement('div');
            button.className = 'exColorButton deleteShadow';
            button.innerHTML = 'Delete Shadow';
            button.id = 'shadowDelete';
            addEvent({
                type: 'click',
                action: deleteShadow,
                element: button
            });
            if(!shadowSelected){
                button.className += " inactive";
            }
        return button;
    }

    function currentValue(type){
        var result = $('#' + action.selectedItem).css(type).match(/(-?\d+px)|(rgb\(.+\))/g);
            if(!result){
                result = ['rgb(0,0,0)', '0px', '0px', '0px'];
            }
        return result;
    }

    function createDragButton(){
        var button = document.createElement('div');
            button.className = 'shadowDragButton';
            button.innerHTML = '';
            button.id = "shadowDragButton";
        return button;
    }

    /*
        addEvent({
            type: 'click',
            action: removeMenu,
            element: button
        });
    */

    function deleteDraggable(){
        try{
            $('#shadowMenu').draggable( "destroy");
        }catch(err){}
    }

    function removeAllEvents(){
        shadowSelected = null;
        deleteDraggable();
        var i, obj;
        for (i = 0; i < eventsAdded.length; i++) {
            obj = eventsAdded[i];
            obj.element.removeEventListener(obj.type, obj.action);
        }
        eventsAdded = [];
    }

    function removeMenu(el){
        var menuDIV = doc.getElementById(menuName);
        if(menuDIV){
            if(el){
                deselectScreenElement(action.selectedItem, true);
            }
            removeAllEvents();
            if(menuDIV){
                menuDIV.parentElement.removeChild(menuDIV);
            }
            shadowInfo = [];
        }
    }

    function createCloseButton(){
        var button = document.createElement('div');
            button.className = 'shadowCloseButton';
            button.innerHTML = '';
            button.id = "shadowCloseButton";
            addEvent({
                type: 'click',
                action: removeMenu,
                element: button
            });
        return button;
    }

    function createMenu(type, count, names){
        shadowType = type;
        var menu = makeAndAppendMenu(menuName),
            externalInputContainer,
            i, divEl = document.createElement('div');

            menu.appendChild(divEl);
            divEl.className = 'shadowInputHolder';
            divEl.id = 'shadowInputHolder';
        for (i = 0; i < count; i++) {
            externalInputContainer = doc.createElement('div'),
            externalInputContainer.className = 'exInput' + i;
            externalInputContainer.appendChild(createButtonInput(parseInt(currentValue(type)[i + 1], 10), 'exInput'));
            externalInputContainer.appendChild(createValueButton(i, type, '+', 'exInc exButton'));
            externalInputContainer.appendChild(createValueButton(i, type, '-', 'exDec exButton'));
            externalInputContainer.appendChild(createButtonLabel(names[i], 'exTopLabel'));
            divEl.appendChild(externalInputContainer);
        };

        if(!shadowSelected){
            divEl.className += ' inactive';
        }
        divEl.appendChild(createColorButton());
        menu.appendChild(createDragButton());
        menu.appendChild(createCloseButton());
        menu.appendChild(createAddShadowButton());
        menu.appendChild(createShadowHolder());
        menu.appendChild(createApplyShadowButton());

        $('#shadowMenu').draggable({
            scroll: false,
            containment: 'window',
            axis: 'y',
            scroll: false,
            handle:'.shadowDragButton',
            stop: function(e){
                if(e.pageY){
                    localStorage.setItem('shadowMenuPosition', e.pageY);
                }
            }
        });
        doc.getElementById(action.selectedItem).style.outlineColor = 'transparent';
    }

    function autoClickInput(button){
		var timeout = null;
        if(!fingerPressed){
            clearTimeout(timeout);
        }else{
            timeout = setTimeout(handleChange, 100, button);
        }
	}

    function handleChange(button){
        if(!fingerPressed){
            return;
        }
        var shadow = shadowInfo[shadowSelected],
            oldValue, newVal, ref;

        if(!shadowSelected || !shadow){
            jPopup({
                type: "alert",
                message: "Select a shadow first.",
                yesButtonText: "OK",
                functionOnOk: function() {
                    //do something on ok
                }
            });
            return;
        }
        ref = ['xVal', 'yVal', 'blurVal'];
        oldValue = shadow[ref[button.context.title]];
        if (button.text() === "+") {
            newVal = parseFloat(oldValue) + 1;
        } else if(button.text() === "-"){
            // (3) Button is blur, doesn't need
            // to go below 0.
            if(Number(button.context.title) === 2){
                if (oldValue > 0) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }else{
                newVal = parseFloat(oldValue) - 1;
            }
        } else {
            newVal = 0;
        }

        shadow[ref[button.context.title]] = newVal;
        button.parent().find("input").val(newVal);
        updateElementShadow();
        updateLIshadowInnerHTML();
        setTimeout(autoClickInput, 0, button);
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(type, count, names, id) {
            createMenu(type, count, names, id);
        };
        externalMethods.handleChange = function(button, type){
            handleChange(button, type);
        };
        externalMethods.removeMenu = function(){
            removeMenu();
        };
        return externalMethods;
    }
    window.shadowMenu = initExternalMethods();
}(window, document));