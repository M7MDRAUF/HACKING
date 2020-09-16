(function(window, doc){

    var menuName = 'reflectionMenu',
        pressed = false,
        offset = 0,
        topColor = 99,
        bottomOffset = 0;

    function removeMenu(){
        var menuDIV = doc.getElementById(menuName);
        if(menuDIV){
            menuDIV.parentElement.removeChild(menuDIV);
        }
    }

    function handleChange(button, type){
        var newCSS,
            input = button.parent().find("input");
        if (button.text() === "+") {
            if(input[0].title === 'Y'){
                offset = offset + 1;  
                button.parent().find("input").val(offset);
            }else if (input[0].title === 'top'){
                topColor = topColor + 1;
                if(topColor >= 99){
                    topColor = 99;
                }
                button.parent().find("input").val(topColor);
            }else if (input[0].title === 'bottom'){
                bottomOffset = bottomOffset + 1;
                if(bottomOffset >= 73){
                    bottomOffset = 73;
                }
                button.parent().find("input").val(bottomOffset);
            }
        } else if(button.text() === "-"){
            if(input[0].title === 'Y'){
                offset = offset - 1;  
                button.parent().find("input").val(offset);
            }else if (input[0].title === 'top'){
                topColor = topColor - 1;
                if(topColor < 0){
                    topColor = 0;
                }
                if(topColor >= 100){
                    topColor = 100;
                }
                button.parent().find("input").val(topColor);
            }else if (input[0].title === 'bottom'){
                bottomOffset = bottomOffset - 1;
                if(bottomOffset < 0){
                    bottomOffset = 0;
                }
                button.parent().find("input").val(bottomOffset);
            }
        }
        newCSS = "below " + offset + "px linear-gradient(rgba(255, 255, 255, 0) " + bottomOffset + "%, rgba(255, 255, 255, " + parseFloat(topColor) / 100.0 +"))"; 
        action.setCss(action.selectedItem, type, newCSS);
    }

    function makeAndAppendMenu(){
        var menu = doc.createElement('div');
            menu.id = menuName;
            menu.className = 'menuThreeInputsOneButton reflectionMenu';
            doc.body.appendChild(menu);
            $(menu).draggable({axis: 'y'});
        return menu;
    }

    function createClearButton(){
        var button = doc.createElement('div');
            button.className = 'exColorButton reflectionClearButton';
            button.innerHTML = 'Clear';
            button.onclick = function () {
                removeMenu();
                action.setCss(action.selectedItem, "-webkit-box-reflect", "");
            };
        return button;
    }

    function startClicking(that, type){
        handleChange(that, type);
        if(pressed){
            setTimeout(function(){
                if(pressed){
                    startClicking(that, type);
                }
            },50);
        }
    }

    function createValueButton(incrementID, type, symbol, classes){
        var button = doc.createElement('div');
            button.innerHTML = symbol;
            button.className = classes;
            button.title = incrementID;
            button.ontouchstart = function(){
                pressed = true;
                startClicking($(this), type);
            };
            button.ontouchend = function(){
                pressed = false;
            };
            button.ontouchcancel = function(){
                pressed = false;
            };
        return button;
    }

    function createButtonLabel(name, classes){
        var label = doc.createElement('div');
            if(name === 'Y'){
                name = 'Y axis';
            }else if (name === 'top'){
                name = 'Top opacity';
            }else if (name === 'bottom'){
                name = 'Bottom offset';
            }
            label.innerHTML = name;
            label.className = classes;
            label.style.fontSize = "10px";
        return label;
    }

    function createButtonInput(currentValue, classes, name){
        var input = doc.createElement('input');
            input.value = currentValue;
            input.className = classes;
            input.title = name;
        return input;
    }

    function setInitialReflectionCSS(type){
        var newCSS = "below " + offset + "px linear-gradient(rgba(255, 255, 255, 0) " + bottomOffset + "%, rgba(255, 255, 255, " + parseFloat(topColor) / 100.0 +"))"; 
        action.setCss(action.selectedItem, type, newCSS);
    }

    function calculateValues(type){
        var currentCSS = $('#' + action.selectedItem).css(type).split(' ');
        if(currentCSS[0] != 'none'){
            offset = Number(Math.floor(currentCSS[1].replace("px", "")));
            topColor = Number(Math.floor(currentCSS[10].replace('))', '') * 100));
            bottomOffset = Number(Math.floor(currentCSS[6].replace("%,", "")));
        }else{
            setInitialReflectionCSS(type);
            calculateValues(type);
        }
    }

    function createMenu(type, count, names){
        var menu = makeAndAppendMenu(),
            externalInputContainer,
            i;
            calculateValues(type);

        for (i = 0; i < count; i++) {
            externalInputContainer = doc.createElement('div'),
            externalInputContainer.className = 'exInput' + i;
            if(names[i] === "Y"){
                externalInputContainer.appendChild(createButtonInput(offset, 'exInput', "Y"));
            }else if(names[i] === "top"){
                externalInputContainer.appendChild(createButtonInput(topColor, 'exInput', "top"));
            }else if (names[i] === "bottom"){
                externalInputContainer.appendChild(createButtonInput(bottomOffset, 'exInput', "bottom"));
            }
            externalInputContainer.appendChild(createValueButton(i, type, '+', 'exInc exButton'));
            externalInputContainer.appendChild(createValueButton(i, type, '-', 'exDec exButton'));
            externalInputContainer.appendChild(createButtonLabel(names[i], 'exTopLabel'));
            menu.appendChild(externalInputContainer);
        };
        menu.appendChild(createClearButton());
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(type, count, names, id) {
            createMenu(type, count, names, id);
        };
        externalMethods.removeMenu = function(){
            removeMenu();
        };
        return externalMethods;
    }
    window.reflectionMenu = initExternalMethods();
}(window, document));