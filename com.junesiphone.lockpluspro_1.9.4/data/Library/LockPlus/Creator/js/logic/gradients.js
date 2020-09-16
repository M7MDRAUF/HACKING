var textGradient = {
    selected: null,
    colorlist: [],
    defaultGradient: 'linear-gradient(to bottom, white 0%, black 90%)',
    gradientPreview: null,
    gradientWindow: null,
    gradientTypes: {
        'to bottom': {
            innerHTML: 'To bottom',
            type: 'linear-gradient'
        },
        'to top': {
            innerHTML: 'To top',
            type: 'linear-gradient'
        },
        'to left': {
            innerHTML: 'To left',
            type: 'linear-gradient'
        },
        'to right': {
            innerHTML: 'To right',
            type: 'linear-gradient'
        },
        'to bottom right': {
            innerHTML: 'To bottom right',
            type: 'linear-gradient'
        },
        'to bottom left': {
            innerHTML: 'To bottom left',
            type: 'linear-gradient'
        },
        'to top right': {
            innerHTML: 'To top right',
            type: 'linear-gradient'
        },
        'to top left': {
            innerHTML: 'To top left',
            type: 'linear-gradient'
        }
    }
};

function removeGradient() {
    var element = document.getElementById(action.selectedItem),
        item = action.savedElements.placedElements[action.selectedItem];
    if(element.id.indexOf('box') > -1){
    	item['background'] = 'red';
	    delete item['-webkit-background-clip'];
	    delete item['-webkit-text-fill-color'];
    	element.style.background = 'red';
    }else{
    	item['background'] = 'inherit';
	    item['-webkit-background-clip'] = 'inherit';
	    item['-webkit-text-fill-color'] = 'initial';
	    element.style.background = 'inherit';
	    element.style.webkitBackgroundClip = 'inherit';
	    element.style.webkitTextFillColor = 'initial';
    }
    action.saveStorage();
}

function createGradientDivs(div) {
    var el = document.createElement(div.type);
    el.id = div.id;
    el.className = div.class;
    el.innerHTML = div.html;
    el.title = div.title;
    div.container.appendChild(el);
    return el;
}

function setPositionValue(value) {
    var div, gradient, values;
    if (textGradient.selected) {
        div = document.getElementById('colorsection' + textGradient.selected);
        gradient = getGradientFromPreview();
        values = getValuesFromLinearGradient(gradient);
        replaceItemInGradient(gradient, values, value);
    } else {
        textGradient.selected = 0;
        div = document.getElementById('colorsection' + textGradient.selected);
        gradient = getGradientFromPreview();
        values = getValuesFromLinearGradient(gradient);
        div.parentElement.style.border = '1px solid white';
        replaceItemInGradient(gradient, values, value);
    }
}

function objectToGradient(gradient) {
    var str = "";
    for (var i = 0; i < gradient.colors.length; i++) {
        if (i + 1 === gradient.colors.length) {
            str += gradient.colors[i] + " " + gradient.colorsPercent[i];
        } else {
            str += gradient.colors[i] + " " + gradient.colorsPercent[i] + ", ";
        }
    }
    var gradientString = gradient.type + "(" + gradient.direction + ", " + str + ")";
    return gradientString;
}

function setGradientToPreview(gradient) {
    var div = textGradient.gradientPreview,
        readyGradient = objectToGradient(gradient);
    readyGradient = readyGradient.replace(/~/g, ',');
    div.style.background = readyGradient;
    div.setAttribute('gradient', readyGradient);
    if(action.selectedItem.indexOf('box') > -1 || action.selectedItem.indexOf('circle') > -1){
    	gradientPreview.innerHTML = '';
    }else{
    	gradientPreview.innerHTML = 'Apply Gradient';
    	gradientPreview.style.webkitBackgroundClip = 'text';
    	gradientPreview.style.webkitTextFillColor = 'transparent';
    }
}

function replaceItemInGradient(gradient, values, newValue) {
    values['colorsPercent'][textGradient.selected] = newValue + '%';
    setGradientToPreview(values);
}

function reloadColors(values) {
   document.getElementById('gradientColorMenu').innerHTML = "";
   var values = getValuesFromLinearGradient(getGradientFromPreview());

    for (var i = 0; i < values.amountofColors; i++) {
        var gradientColorsEdits = createGradientDivs({
                type: 'div',
                id: '',
                class: 'gradientColorsEdit',
                html: '',
                title: '',
                container: document.getElementById('gradientColorMenu')
            }),
            gradientColors = createGradientDivs({
                type: 'div',
                id: 'colorsection' + i,
                class: 'gradientColors',
                html: '',
                title: 'colorsection' + i,
                container: gradientColorsEdits
            }),
            changeGradientColorButton = createGradientDivs({
                type: 'div',
                id: '',
                class: 'changeGradientColorButton gradientButton',
                html: 'Color',
                title: '',
                container: gradientColorsEdits
            }),
            changeGradientPositionButton = createGradientDivs({
                type: 'div',
                id: '',
                class: 'changeGradientPositionButton gradientButton',
                html: 'Remove',
                title: '',
                container: gradientColorsEdits
            });
        gradientColors.style.backgroundColor = values.colors[i];
    }

}

function getGradientFromPreview() {
    return textGradient.gradientPreview.getAttribute('gradient');
}

/*
	Cycles through gradient types
*/
function changeGradientType() {
    var values = getValuesFromLinearGradient(getGradientFromPreview()),
        keys, indexOfGradientTypes, type, gradientTypeDIV;

    gradientTypeDIV = document.getElementById('gradientType');

    if (values) {
        if (textGradient.gradientTypes[values.direction]) {
            keys = Object.keys(textGradient.gradientTypes);
            indexOfGradientTypes = keys.indexOf(values.direction);
            if (indexOfGradientTypes + 1 < keys.length) {
                type = keys[indexOfGradientTypes + 1];
                values.direction = type;
                gradientTypeDIV.innerHTML = textGradient.gradientTypes[type].innerHTML;
            } else {
                values.direction = 'to bottom';
                gradientTypeDIV.innerHTML = textGradient.gradientTypes['to bottom'].innerHTML;
            }
        } else {
            values.direction = 'to bottom';
            gradientTypeDIV.innerHTML = textGradient.gradientTypes['to bottom'].innerHTML;
        }
    } else {
        console.log("No Values");
    }
    setGradientToPreview(values);
}

function addColorToGradient() {
    var values = getValuesFromLinearGradient(getGradientFromPreview());
    values.colors.push('black');
    values.colorsPercent.push('0%');
    setGradientToPreview(values);
    reloadColors(values);
}

function parseRGBGradient(gradient) {
    var details = {
            direction: null,
            type: null,
            amountofColors: null,
            colors: [],
            colorsPercent: []
        },
        splitFromType,
        colorArray = [],
        percentArray = [];
    /*
    	loop through gradientTypes to see if the
    	gradient includes that key.

    	If so split the gradient by it's type (to bottom, etc)
    	this allows us to isolate the colors and numbers later.
    */
    Object.keys(textGradient.gradientTypes).forEach(function(key) {
        if (gradient.includes(key)) {
            // key is to bottom, to left, etc.
            splitFromType = gradient.split(key);
            details.direction = key;
            details.type = textGradient.gradientTypes[key].type;
        }
    });

    //Gradient contains 0deg
    if(!splitFromType){
        splitFromType = gradient.split('0deg');
        details.direction = 'linear-gradient';
        details.typle = 'to bottom';
    }

    splitByPercent = splitFromType[1].split('%');
    details.amountofColors = splitByPercent.length - 1;

    for (var i = 0; i < splitByPercent.length; i++) {
        if (splitByPercent[i].charAt(0) === ',') {
            splitByPercent[i] = splitByPercent[i].replace(', ', '');
        }
        if (splitByPercent[i] != '' && splitByPercent[i] != ')') {
            splitByPercent[i] = splitByPercent[i] + "%";
            //if rgb
            if (splitByPercent[i].includes('(')) {
                second = splitByPercent[i].split('(');
                rgb = second[0];
                color2 = second[1].split(')')[0];
                percent = second[1].split(')')[1];
                colorArray.push(rgb + '(' + color2 + ')');
                percentArray.push(percent.trim());
            } else {
                colorArray.push(splitByPercent[i].split(' ')[0]);
                percentArray.push(splitByPercent[i].split(' ')[1]);
            }
        }
    }
    details.colors = colorArray;
    details.colorsPercent = percentArray;
    return details;
}

function parseBasicGradient(gradient) {
    var split,
        percent,
        extractColor,
        details = {
            direction: null,
            type: null,
            amountofColors: null,
            colors: [],
            colorsPercent: []
        };

    split = gradient.split(',');

    details.type = gradient.split('(')[0];
    details.direction = split[0].replace('linear-gradient(', '');
    details.amountofColors = split.length - 1;

    for (var i = 1; i < split.length; i++) {
        if (split[i].includes('%')) {
            percent = split[i].split(' ')[1];
            if (!percent.includes('%')) {
                percent = split[i].split(' ')[2]
            }
            details.colorsPercent.push(percent.replace(')', ''));
        }
        extractColor = split[i].replace(')', '').split(' ');
        if (extractColor[0] != "") {
            extractColor = split[i].replace(')', '').split(' ')[0];
        } else {
            extractColor = split[i].replace(')', '').split(' ')[1];
        }
        details.colors.push(extractColor);
    }
    return details;
}

function getValuesFromLinearGradient(gradient) {
    if (gradient.includes('rgb')) {
        return parseRGBGradient(gradient);
    } else {
        return parseBasicGradient(gradient);
    }
}

function updateInputs(newValue) {
    document.getElementById('manualgradientPositionRange').value = newValue;
    //move the range
    // Max Width = 70px;
    var value = percentCalculation(newValue, 70);
    document.querySelector('.range-handle').style.left = value + "px";
    document.querySelector('.range-quantity').style.width = value + "px";
}

function colorSelectedUpdateInputs(number) {
    var values = getValuesFromLinearGradient(getGradientFromPreview());
    if (values.colorsPercent[number]) {
        updateInputs(parseInt(values.colorsPercent[number], 10));
    }
}

function gradientMenuClicked(el) {
    var innerHTML = el.target.innerHTML;
    switch (innerHTML) {
        case 'Color':
            showColorPanel(el);
            break;
        case 'Remove':
            removeColorFromMenu(el);
            break;
        default:
            selectColorOption(el);
    }
}

function saveGradientToElement(gradient, selected) {
    //used when gradient presets sets a gradient;
    //When this happens an element isn't selected
    if(selected){
        action.selectedItem = selected;
    }
    var item = action.savedElements.placedElements[action.selectedItem];
	if(action.selectedItem.indexOf('box') > -1 || action.selectedItem.indexOf('circle') > -1){
        item['background-color'] = 'transparent';
    	item['background'] = gradient;
    	item['-webkit-background-clip'] = 'initial';
	    item['-webkit-text-fill-color'] = 'transparent';
    }else{
    	item['background'] = gradient;
	    item['-webkit-background-clip'] = 'text';
	    item['-webkit-text-fill-color'] = 'transparent';
    }
    action.saveStorage();
}

function applyGradientToElement(gradient, selected) {
    //used when gradient presets sets a gradient;
    //When this happens an element isn't selected
    if(selected){
        action.selectedItem = selected;
    }
	var element = document.getElementById(action.selectedItem);
	if(action.selectedItem.indexOf('box') > -1 || action.selectedItem.indexOf('circle') > -1){
    	element.style.background = gradient;
    }else{
    	element.style.background = gradient;
    	element.style.webkitBackgroundClip = 'text';
    	element.style.webkitTextFillColor = 'transparent';
    }
}

function applyGradient(el) {
    var gradient = getGradientFromPreview();
    saveGradientToElement(gradient);
    applyGradientToElement(gradient);

    jPopup({
        type: "confirm",
        message: "Gradient applied to the element.",
        yesButtonText: "Gotcha",
        noButtonText: "Exit",
        functionOnNo: function() {
            closeGradientWindow();
        },
        functionOnOk: function() {
            //do something on ok
        }
    });
}

function removeEvents(gradientWindow){
	var windowChildren = gradientWindow.children;
    for (var i = 0; i < windowChildren.length; i++) {

    	switch(windowChildren[i].id){
    		case 'gradientColorMenu':
    			windowChildren[i].removeEventListener('click', gradientMenuClicked);
    		break;
    		case 'gradientCloseButton':
    			windowChildren[i].removeEventListener('click', closeGradientWindow);
    		break;
    		case 'gradientType':
    			windowChildren[i].removeEventListener('click', changeGradientType);
    		break;
    	}

    	if(windowChildren[i].children){
    		if(windowChildren[i].children.length > 0){
    			for (var e = 0; e < windowChildren[i].children.length; e++) {
    				switch(windowChildren[i].children[e].id){
			    		case 'gradientHelpButton':
			    			windowChildren[i].children[e].removeEventListener('click', showHelp);
			    		break;
			    		case 'gradientUpdateButton':
			    			windowChildren[i].children[e].removeEventListener('click', addColorToGradient);
			    		break;
			    		case 'gradientApplyButton':
			    			windowChildren[i].children[e].removeEventListener('click', applyGradient);
			    		break;
			    	}
    			}
    		}
    	}


    }
}

function closeGradientWindow() {
    if (action.selectedItem) {
        deselectScreenElement(action.selectedItem, true);
    }
    gradientWindow = textGradient.gradientWindow;
    removeEvents(gradientWindow);
    document.body.removeChild(gradientWindow);
}

function showColorPanel(el) {
    var parent = el.target.parentElement,
        child1 = parent.children[0];


        function onMove(e, tinycolor){
            child1.style.backgroundColor = tinycolor.toRgbString();
            values = getValuesFromLinearGradient(getGradientFromPreview());
            values['colors'][Number(child1.id.replace('colorsection', ''))] = tinycolor.toRgbString();
            setGradientToPreview(values);
        }
        var color = child1.style.backgroundColor;
        colorPicker.showPicker('colorPickerHolder', color, null, onMove, false);
}

function removeColorFromMenu(el) {
    var number = textGradient.selected,
        gradient = getValuesFromLinearGradient(getGradientFromPreview()),
        edited = [],
        edited2 = [];

    if(!number){
        alert('Select a color before pressing remove.');
    }

    for (var i = 0; i < gradient.colors.length; i++) {
        if (i != number) {
            edited.push(gradient.colors[i]);
            edited2.push(gradient.colorsPercent[i]);
        }
    }

    gradient.colors = edited;
    gradient.colorsPercent = edited2;
    setGradientToPreview(gradient);
    reloadColors(gradient);
}

function selectColorOption(el) {
    var number, divs;

    if (el.target.title.includes('colorsection')) {
        number = parseInt(el.target.title.replace('colorsection', ''));
    }
    textGradient.selected = number;

    // add outline
    divs = document.getElementsByClassName('gradientColorsEdit');
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].children[0].id === el.target.title) {
            divs[i].style.border = "1px solid white";
            colorSelectedUpdateInputs(number);
        } else {
            divs[i].style.border = "1px solid transparent";
        }
    }
}

function showHelp(){
	jPopup({
        type: "confirm",
        message: "When adjusting the gradient look at the preview text to see changes, when the gradient is finished press apply to apply it to the element you have selected. <br><br> If you tap the button under the preview text you will cycle through gradient types. <br><br> Tap the color block to select that color, then you can use the slider to adjust the position from 0% to 100%.",
        yesButtonText: "OK",
        noButtonText: "Presets",
        functionOnNo: function() {
            //do something on no
            gradientPresets.showMenu();
            closeGradientWindow();
        },
        functionOnOk: function() {
            //do something on ok
        }
    });
}

function createGradientWindow(value) {
    bottomMenu.closeBottomMenu();
    var oldGradient = action.savedElements.placedElements[action.selectedItem]['background'],
        split, type, direction, amountofColors, colors = [],
        colorsPercent = [],
        final, gradientBreakdown, 
        gradientWindow, 
        gradientPreview, 
        gradientType, 
        gradientColorMenu,
        gradientPositionRange,
        gradientCloseButton,
        gradientButtonWindow,
        gradientHelpButton,
        gradientUpdateButton,
        gradientApplyButton;

    if (!oldGradient || oldGradient === 'inherit') {
        oldGradient = textGradient.defaultGradient;
    }

    split = oldGradient.split(',');
    type = oldGradient.split('(')[0];
    direction = split[0].replace('linear-gradient(', '');
    amountofColors = split.length - 1;

    gradientBreakdown = getValuesFromLinearGradient(oldGradient);
    value = gradientBreakdown.amountofColors;
    colors = gradientBreakdown.colors;
    colorsPercent = gradientBreakdown.colorsPercent;

    gradientWindow = createGradientDivs({
        type: 'div',
        id: 'gradientWindow',
        class: 'gradientWindow',
        html: '',
        title: '',
        container: document.body
    });
    textGradient.gradientWindow = gradientWindow;
    gradientPreview = createGradientDivs({
        type: 'div',
        id: 'gradientPreview',
        class: 'gradientPreview',
        html: 'Preview Text',
        title: '',
        container: gradientWindow
    });
    gradientType = createGradientDivs({
        type: 'div',
        id: 'gradientType',
        class: 'gradientType gradientButton',
        html: 'Top to Bottom',
        title: '',
        container: gradientWindow
    });
    gradientColorMenu = createGradientDivs({
        type: 'div',
        id: 'gradientColorMenu',
        class: 'gradientColorMenu',
        html: '',
        title: '',
        container: gradientWindow
    });
    gradientPositionRange = createGradientDivs({
        type: 'div',
        id: 'gradientPositionRange',
        class: 'gradientPositionRange',
        html: '',
        title: '',
        container: gradientWindow
    });
    gradientCloseButton = createGradientDivs({
        type: 'div',
        id: 'gradientCloseButton',
        class: 'gradientCloseButton button',
        html: '',
        title: '',
        container: gradientWindow
    });
    gradientButtonWindow = createGradientDivs({
        type: 'div',
        id: 'gradientButtonWindow',
        class: 'gradientButtonWindow button',
        html: '',
        title: '',
        container: gradientWindow
    });
    gradientHelpButton = createGradientDivs({
        type: 'div',
        id: 'gradientHelpButton',
        class: 'gradientHelpButton gradientButton',
        html: 'Preset',
        title: '',
        container: gradientButtonWindow
    });
    gradientUpdateButton = createGradientDivs({
        type: 'div',
        id: 'gradientUpdateButton',
        class: 'gradientUpdateButton button',
        html: 'Add Color',
        title: '',
        container: gradientButtonWindow
    });
    gradientApplyButton = createGradientDivs({
        type: 'div',
        id: 'gradientApplyButton',
        class: 'gradientApplyButton button',
        html: 'Apply Gradient',
        title: '',
        container: gradientButtonWindow
    });

    textGradient.gradientPreview = gradientPreview;
    gradientPreview.style.background = oldGradient;


    if(action.selectedItem.indexOf('box') > -1 || action.selectedItem.indexOf('circle') > -1){
    	gradientPreview.innerHTML = '';
    }else{
    	gradientPreview.innerHTML = 'Apply Gradient';
    	gradientPreview.style.webkitBackgroundClip = 'text';
    	gradientPreview.style.webkitTextFillColor = 'transparent';
    }

    gradientPreview.setAttribute('gradient', oldGradient);

    rangeButtons.make('gradientPositionRange', 'gradient', function(info) {
        var value = null;

        if (info.type === 'input') {
            value = info.value;
        } else if (info.type === 'range') {

            if ("manual" + info.value === 'manualgradientPositionRange') {
                value = document.getElementById('manualgradientPositionRange').value;
            }
        }
        setPositionValue(value);
    });

    gradientUpdateButton.addEventListener('click', addColorToGradient);
    gradientHelpButton.addEventListener('click', showHelp);
    gradientApplyButton.addEventListener('click', applyGradient);
    gradientType.addEventListener('click', changeGradientType);
    gradientCloseButton.addEventListener('click', closeGradientWindow);
    gradientColorMenu.addEventListener('click', gradientMenuClicked);

    for (var i = 0; i < value; i++) {
        var gradientColorsEdits = createGradientDivs({
                type: 'div',
                id: '',
                class: 'gradientColorsEdit',
                html: '',
                title: '',
                container: gradientColorMenu
            }),
            gradientColors = createGradientDivs({
                type: 'div',
                id: 'colorsection' + i,
                class: 'gradientColors',
                html: '',
                title: 'colorsection' + i,
                container: gradientColorsEdits
            }),
            changeGradientColorButton = createGradientDivs({
                type: 'div',
                id: '',
                class: 'changeGradientColorButton gradientButton',
                html: 'Color',
                title: '',
                container: gradientColorsEdits
            }),
            changeGradientPositionButton = createGradientDivs({
                type: 'div',
                id: '',
                class: 'changeGradientPositionButton gradientButton',
                html: 'Remove',
                title: '',
                container: gradientColorsEdits
            });

        gradientColors.style.backgroundColor = colors[i];
    }
}

function createGradient() {
    createGradientWindow(0);
}

//setTimeout(function(){createGradientWindow(4);},1000);

action.textGradient = function() {
    jPopup({
        type: "tributton",
        message: "Do you wish to add or remove a gradient?",
        yesButtonText: "Add ",
        noButtonText: "No",
        extraButtonText: "Remove",
        functionOnNo: function() {
            //do something on no
        },
        functionOnOk: function() {
            //do something on ok
            createGradient();
        },
        functionOnExtra: function() {
            removeGradient();
        }
    });
};