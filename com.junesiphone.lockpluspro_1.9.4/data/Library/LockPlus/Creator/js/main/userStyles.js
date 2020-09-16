function addStyleString(str, id) {
    var element, node, doc = document;
    if (id) {
        /* If exists remove */
        if (doc.getElementById(id)) {
            element = doc.getElementById(id);
            doc.body.removeChild(element);
        }
    }
    node = doc.createElement('style');
    node.innerHTML = str;
    node.id = id;
    doc.body.appendChild(node);
};

function setBatteryWifiOrSignal(whichOne){
    switch (whichOne) {
        case 'battery':
            action.savedElements.placedElements[action.selectedItem]['is-wifi'] = 'false';
            action.savedElements.placedElements[action.selectedItem]['is-signal'] = 'false';
        break;
        case 'wifi':
            action.savedElements.placedElements[action.selectedItem]['is-battery'] = 'false';
            action.savedElements.placedElements[action.selectedItem]['is-signal'] = 'false';
        break;
        case 'signal':
            action.savedElements.placedElements[action.selectedItem]['is-battery'] = 'false';
            action.savedElements.placedElements[action.selectedItem]['is-wifi'] = 'false';
        break;

    }
    if(action.savedElements.placedElements[action.selectedItem]['is-'] + whichOne){
        if(action.savedElements.placedElements[action.selectedItem]['is-' + whichOne] === 'true'){
            action.savedElements.placedElements[action.selectedItem]['is-' + whichOne] = 'false';
            alert('Element will not be used as a ' + whichOne + ' bar.');
        }else{
            action.savedElements.placedElements[action.selectedItem]['is-' + whichOne] = 'true';
            alert('Element will be used as a ' + whichOne + ' bar, select again to remove it');
        }
    }else{
       action.savedElements.placedElements[action.selectedItem]['is-' + whichOne] = 'true';
       alert('Element will be used as a ' + whichOne + ' bar, select again to remove it.');
    }
    action.saveStorage();
}

function setURLToBox(url, attribute){
    action.savedElements.placedElements[action.selectedItem][attribute] = url;
    action.savedElements.placedElements[action.selectedItem]['background-size'] = 'cover';
    action.savedElements.placedElements[action.selectedItem]['background-color'] = 'transparent';
    action.savedElements.placedElements[action.selectedItem]['background-repeat'] = 'no-repeat';
    var selEle = document.getElementById(action.selectedItem);
    selEle.setAttribute(attribute, url);
    selEle.style.backgroundImage = 'url("'+url+'")';
    selEle.style.backgroundSize = 'cover';
    selEle.style.backgroundRepeat = 'no-repeat';
    action.saveStorage();
}
function createAssetChooser(attribute){
    var assets = LPPCreatorImages;

    var assetWindow = createDOM({
        type: 'div',
        id: 'assetWindow',
        className: 'assetWindow',
    }),
    assetView = createDOM({
        type: 'div',
        className: 'assetScrollView',
    }),
    assetCloseButton = createDOM({
        type: 'div',
        id: 'assetCloseButton',
        className: 'assetCloseButton',
    });

    assetWindow.addEventListener('click', function(el){
        if(el.target.id === 'assetCloseButton'){
            document.body.removeChild(document.getElementById('assetWindow'));
        }
        if(el.target.title === 'iconImage'){
            setURLToBox(el.target.getAttribute('itemURL'), attribute);
            document.body.removeChild(document.getElementById('assetWindow'));
        }
    });

    var grid = gridMaker({
        itemCount: assets.length,
        itemWidth : 45,
        holderWidth: 300,
        leftGap: 10,
        topGap: 5,
        topOffset: 35
    });

    for (var i = 0; i < assets.length; i++) {
        var div = createDOM({
            type: 'div',
            className: 'assetImage',
        });
        div.style.left = grid[i].left;
        div.style.top = grid[i].top;
        div.title = 'iconImage';
        div.setAttribute('itemURL', 'https://lockplus.us/CreatorAssets/images/' + assets[i]);
        div.style.backgroundImage = 'url(https://lockplus.us/CreatorAssets/images/'+assets[i]+')';
        assetView.appendChild(div);
    }

    assetWindow.appendChild(assetView);
    assetWindow.appendChild(assetCloseButton);
    document.body.appendChild(assetWindow);
}


/* functions for center (Center Container) X Axis, Y Axis, All */
function getCenterFromHeight() {
    var el = document.getElementById(action.selectedItem),
        size = document.querySelector('.screen'),
        heightVal = 0,
        subtract = 0,
        center;
    //iPX
    if (size.offsetHeight === 689) {
        subtract = 5;
    } else {
        subtract = 4;
    }

    heightVal = size.offsetHeight;
    if (el.parentElement.id.substring(0, 7) === 'customP') {
        heightVal = el.parentElement.offsetHeight;
    }
    center = ((heightVal / 2) - subtract) - el.offsetHeight / 2 + "px";
    return center;
}
function getCenterFromWidth() {
    var el = document.getElementById(action.selectedItem),
        center = 320 / 2 - el.offsetWidth / 2 + "px";
    if (el.parentElement.id.substring(0, 7) === 'customP') {
        center = el.parentElement.offsetWidth / 2 - el.offsetWidth / 2 + "px";
    }
    return center;
}

var userOptions = {
    size: {
        info: "Changes the font-size. <br><br> If font is glitching change the height of the container and width to fully surround the text. If the font shows outside the box then it will glitch on iOS.",
        label: "Size",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'font-size', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'font-size');
            },
            decimal: false,
            min: 0,
            max: 80
        }
    },
    ProgressSize:{
        info: "Changes the circle size",
        label: "Circle Size",
        type: 'range',
        action: function(value){
            addStyleString('.circle-progress{pointer-events:none;width:'+value+'px;height:'+value+'px;}', 'circlewidth');  
            action.setCss(action.selectedItem, 'circle-width', value + 'px');
            
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'circle-width') || 100;
            },
            decimal: false,
            min: 0,
            max: 100
        }
    },
    ProgressOuterStroke:{
        info: "Changes the circle background stroke size.",
        label: "Circle BG stroke",
        type: 'range',
        action: function(value){
            addStyleString('.circle-progress-circle{stroke-width:'+value+'px;}', 'circlestroke');  
            action.setCss(action.selectedItem, 'circle-stroke', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'circle-stroke') || 10;
            },
            decimal: false,
            min: 0,
            max: 100
        }
    },
    ProgressInnerStroke:{
        info: "Changes the value stroke size, this is what shows current battery percent.",
        label: "Circle value stroke",
        type: 'range',
        action: function(value){
            addStyleString('.circle-progress-value{stroke-width:'+value+'px;}', 'circlestrokevalue');  
            
            action.setCss(action.selectedItem, 'circle-stroke-value', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'circle-stroke-value') || 10;
            },
            decimal: false,
            min: 0,
            max: 100
        }
    },
    ProgressDashArray:{
        info: "Adds dashes to value stroke",
        label: "Circle value dash",
        type: 'range',
        action: function(value){
            addStyleString('.circle-progress-value{stroke-dasharray:'+value+' 2;}', 'circlestrokedash');  
            action.setCss(action.selectedItem, 'circle-stroke-dasharray', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'circle-stroke-dash') || 0;
            },
            decimal: false,
            min: 0,
            max: 100
        }
    },
    ProgressInnerColor: {
        info: "Set the color for the background circle.",
        label: "Background circle color",
        type: 'button',
        newName: 'Inner color',
        button:{
            innerHTML: 'Inner color',
            action: function(){
                action.cgcolor(false, 'color', 'bottomMenu', 'inner');
            }
        }
    },
    ProgressOuterColor: {
        info: "Set the color for the value circle, this is what shows the battery percent.",
        label: "Value circle color",
        type: 'button',
        newName: 'Outer color',
        button:{
            innerHTML: 'Outer color',
            action: function(){
                action.cgcolor(false, 'color', 'bottomMenu', 'outer');
            }
        }
    },
    movetop: {
        info: "Will move item top or bottom",
        label: "Move Top",
        type: 'range',
        action: function (value){
            action.setCss(action.selectedItem, 'top', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'top');
            },
            decimal: false,
            min: -500,
            max: 900
        }
    },
    scale: {
        info: "Will scale clock.",
        label: "Scale",
        type: 'range',
        action: function (value){
            action.setCss(action.selectedItem, 'scale', value);
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'scale') || 1;
            },
            decimal: true,
            min: 0.2,
            max: 3
        }
    },
    moveleft: {
        info: "Will move item left or right",
        label: "Move Left",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'left', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'left');
            },
            decimal: false,
            min: -500,
            max: 320
        }
    },
    width: {
        info: "Changes the elements width",
        label: "Width",
        type: 'range',
        action: function(value){
            value = Math.floor(value);
            if(action.selectedItem === 'avatarImage'){
                action.setCss(action.selectedItem, 'width', value + 'px');
                action.setCss(action.selectedItem, 'height', value + 'px');
            }else{
                action.setCss(action.selectedItem, 'width', value + 'px');
            }
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'width');
            },
            decimal: false,
            min: 0,
            max: 320
        }
    },
    height: {
        info: "Changes the elements height",
        label: "Height",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'height', value + 'px');
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'height');
            },
            decimal: false,
            min: 0,
            max: 900
        }
    },
    lineHeight: {
        info: "Used for centering text vertically.",
        label: "Line Height",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'lineHeight', value + 'px');
        },
        range: {
            startVal: function(does) {
                var lineHeight = getComputedStyleInt(action.selectedItem, 'lineHeight');
                if(lineHeight === NaN){
                    lineHeight = 0;
                }
                return lineHeight;
            },
            decimal: false,
            min: -100,
            max: 668
        }
    },
    Rotate: {
        info: "When an item is rotated do not move it by dragging. Use the left and top buttons.",
        label: 'Rotate',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, '-webkit-transform', 'rotate(' + value + 'deg)');
        },
        range:{
            startVal: function(does) {
                return getRotationDegreesFromTransform($('#' + action.selectedItem));
            },
            decimal: false,
            min: 0,
            max: 360
        }
    },
    paddingright: {
        info: "Gives padding to the right side. Can be used to give spaces between elements when they are added to a custom div.",
        label: "Padding Right",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'padding-right', value + 'px');
        },
        range: {
            startVal: function(does) {
                return 0;
            },
            decimal: false,
            min: 0,
            max: 320
        }
    },
    paddingleft: {
        info: "Gives padding to the left side. Can be used to give spaces between elements when they are added to a custom div.",
        label: "Padding Left",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'padding-left', value + 'px');
        },
        range:{
            startVal: function(does) {
                return 0;
            },
            decimal: false,
            min: 0,
            max: 320
        }
    },
    zindex: {
        info: "z-index is what orders elements in Z space. <br><br> This allows you to place elements on top of each other. <br><br> If an element has a z-index of 1 and another has a z-index of 2 the one with 2 will be on top.",
        label: "z-index",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'z-index', value);
        },
        range: {
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'z-index');
            },
            decimal: false,
            min: 0,
            max: 10
        }
    },
    opacity: {
        info: "Changes the transparency of the element.",
        label: "Opacity",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'opacity', value + '');
        },
        range: {
            startVal: function(does) {
                return 0;
            },
            decimal: true,
            min: 0,
            max: 1,
            step: 0.1
        }
    },
    overflow: {
        info: "Changes what happens to elements outside their box",
        label: 'overflow',
        type: 'tributton',
        tributton: {
            buttonNames : ['visible', 'hidden', 'scroll'],
            first: function(el) {
                $('#' + action.selectedItem).css('overflow', 'visible');
                action.savedElements.placedElements[action.selectedItem]['overflow'] = 'visible';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('overflow', 'hidden');
                action.savedElements.placedElements[action.selectedItem]['overflow'] = 'hidden';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('overflow', 'scroll');
                action.savedElements.placedElements[action.selectedItem]['overflow'] = 'scroll';
            }
        }
    },
    boxColor: {
        info: "Change background color",
        label: 'BG Color',
        type: 'button',
        newName: 'BG Color',
        button:{
            innerHTML: 'Color Picker',
            action: function(){
                action.cgcolor(false, 'background-color', 'BMboxColor');
            }
        }
    },
    color: {
        info: "Colors an element, if you want a transparent element, set the transparency slider to the far left.",
        label: "Color",
        type: 'button',
        newName: 'Color',
        button:{
            innerHTML: 'Color Picker',
            action: function(){
                action.cgcolor(false, 'color', 'bottomMenu');
            }
        }
    },
    textGradient: {
        info: "Allows you to set a gradient on the text. Options are top to bottom or left to right. <br><br> It will ask how many colors, if 2 then set the first color, then set to 50, this will set it to start at 0 and end at 50%, next color set to 100.",
        label: "Text Gradient",
        type: 'button',
        newName: 'Gradient',
        button:{
            innerHTML: 'Open',
            action: function(){
                action.textGradient();
            }
        }
    },
    reflection: {
        info: "Adds reflection",
        label: "Reflection",
        type: 'button',
        newName: 'Reflection',
        button:{
            innerHTML: 'Open',
            action: function(){
                reflectionMenu.make('-webkit-box-reflect', 3, ['Y', 'top', 'bottom'], action.selectedItem);
                bottomMenu.closeBottomMenu();
            }
        }
    },
    copyStyle: {
        info: "Allows you to copy a style from another element. Copy most excludes things like top, left, data-vars (panels) and data-name (panels)",
        label: "Copy Style",
        type: 'button',
        newName: 'Copy Style',
        button:{
            innerHTML: 'Select',
            action: function(){
                copyStyle.open(); //copystyles.js
            }
        }
    },
    whitespace: {
        info: "Used to wrap text to the width",
        label: "white-space",
        type: 'tributton',
        tributton: {
            buttonNames : ['no-wrap', 'normal', 'pre'],
            first: function() {
                $('#' + action.selectedItem).css('white-space', 'nowrap');
                action.savedElements.placedElements[action.selectedItem]['white-space'] = 'nowrap';
            },
            second: function() {
                $('#' + action.selectedItem).css('white-space', 'normal');
                action.savedElements.placedElements[action.selectedItem]['white-space'] = 'normal';
            },
            third: function() {
                $('#' + action.selectedItem).css('white-space', 'pre');
                action.savedElements.placedElements[action.selectedItem]['white-space'] = 'pre';
            }
        }
    },
    align:{
        info: "Aligns element to the width. If the width is not wide enough the alignment will NOT be effective. <br><br> Make the width wide enough to cover the entire element with extra room, also keep in mind elements get wider. Example Tuesday is shorter than Wednesday.",
        label: "align - based on element width",
        type: 'tributton',
        tributton: {
            buttonNames : ['left', 'center', 'right'],
            first: function() {
                $('#' + action.selectedItem).css('text-align', 'left');
                action.savedElements.placedElements[action.selectedItem]['text-align'] = 'left';
            },
            second: function() {
                $('#' + action.selectedItem).css('text-align', 'center');
                action.savedElements.placedElements[action.selectedItem]['text-align'] = 'center';
            },
            third: function() {
                $('#' + action.selectedItem).css('text-align', 'right');
                action.savedElements.placedElements[action.selectedItem]['text-align'] = 'right';
            }
        }
    },
    Events:{
        info: "Defines wether an element receives touch.",
        label: "pointer-events",
        type: 'tributton',
        tributton: {
            buttonNames : ['auto', 'none', 'initial'],
            first: function() {
                $('#' + action.selectedItem).css('pointer-events', 'auto');
                action.savedElements.placedElements[action.selectedItem]['pointer-events'] = 'auto';
            },
            second: function() {
                $('#' + action.selectedItem).css('pointer-events', 'none');
                action.savedElements.placedElements[action.selectedItem]['pointer-events'] = 'none';
            },
            third: function() {
                $('#' + action.selectedItem).css('pointer-events', 'initial');
                action.savedElements.placedElements[action.selectedItem]['pointer-events'] = 'initial';
            }
        }
    },
    center: {
        info: "Centers the elements container (white border) to the center of the screen.",
        label: "center container",
        type: 'tributton',
        tributton: {
            buttonNames: ['X Axis', 'Y Axis', 'All'],
            first: function() {
                action.setCss(action.selectedItem, 'left', getCenterFromWidth());
            },
            second: function() {
                action.setCss(action.selectedItem, 'top', getCenterFromHeight());
            },
            third: function() {
                action.setCss(action.selectedItem, 'left', getCenterFromWidth());
                action.setCss(action.selectedItem, 'top', getCenterFromHeight());
            }
        }
    },
    vertical: {
        info: "With vertical set, words will now be vertical, not horizontal.",
        label: "vertical",
        type: 'tributton',
        tributton: {
            buttonNames: ['normal', 'verticalR', 'verticalL'],
            first: function(el) {
                $('#' + action.selectedItem).css('-webkit-writing-mode', 'unset');
                $('#' + action.selectedItem).css('-webkit-text-orientation', 'unset');
                action.savedElements.placedElements[action.selectedItem]['-webkit-writing-mode'] = 'unset';
                action.savedElements.placedElements[action.selectedItem]['-webkit-text-orientation'] = 'unset';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('-webkit-writing-mode', 'vertical-rl');
                $('#' + action.selectedItem).css('-webkit-text-orientation', 'upright');
                action.savedElements.placedElements[action.selectedItem]['-webkit-writing-mode'] = 'vertical-rl';
                action.savedElements.placedElements[action.selectedItem]['-webkit-text-orientation'] = 'upright';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('-webkit-writing-mode', 'vertical-lr');
                $('#' + action.selectedItem).css('-webkit-text-orientation', 'upright');
                action.savedElements.placedElements[action.selectedItem]['-webkit-writing-mode'] = 'vertical-lr';
                action.savedElements.placedElements[action.selectedItem]['-webkit-text-orientation'] = 'upright';
            }
        }
    },
    fonts: {
        info: "Change elements font",
        label: "Fonts",
        type: 'button',
        button:{
            innerHTML: 'Open',
            action: function(){
                action.cgfont();
            }
        }
    },
    weight: {
        info: "Font thickness, keep in mind not all fonts include different weights",
        label: "weight - if font supports it",
        type: 'tributton',
        tributton:{
            buttonNames: ['100', 'Custom', 'Normal'],
            first: function(el) {
                $('#' + action.selectedItem).css('font-weight', '100');
                action.savedElements.placedElements[action.selectedItem]['font-weight'] = '100';
            },
            second: function(el) {
                var weightPrompt = prompt("Enter a custom font weight value. Examples (200, 300, 400, bold, bolder)");
                if(weightPrompt){
                    $('#' + action.selectedItem).css('font-weight', weightPrompt);
                    action.savedElements.placedElements[action.selectedItem]['font-weight'] = weightPrompt;
                }
            },
            third: function(el) {
                $('#' + action.selectedItem).css('font-weight', 'normal');
                action.savedElements.placedElements[action.selectedItem]['font-weight'] = 'normal';
            }
        }
    },
    spacing: {
        info: "Spacing between the letters of words",
        label: "Text Spacing",
        type: 'tributton',
        tributton: {
            buttonNames: ['2px', 'Custom', 'None'],
            first: function(el) {
                $('#' + action.selectedItem).css('letter-spacing', '2px');
                action.savedElements.placedElements[action.selectedItem]['letter-spacing'] = '2px';
            },
            second: function(el) {
                var spacingPrompt = prompt("Enter a number value for letter spacing");
                if(spacingPrompt){
                    $('#' + action.selectedItem).css('letter-spacing', spacingPrompt + 'px');
                    action.savedElements.placedElements[action.selectedItem]['letter-spacing'] = spacingPrompt + 'px';
                }
            },
            third: function(el) {
                $('#' + action.selectedItem).css('letter-spacing', 'initial');
                action.savedElements.placedElements[action.selectedItem]['letter-spacing'] = 'initial';
            }
        }
    },
    decoration:{
        type: 'tributton',
        info: "Text decoraction",
        label: "Text Styles",
        tributton: {
            buttonNames: ['Underline', 'Strike', 'None'],
            first: function(el) {
                $('#' + action.selectedItem).css('text-decoration', 'underline');
                action.savedElements.placedElements[action.selectedItem]['text-decoration'] = 'underline';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('text-decoration', 'line-through');
                action.savedElements.placedElements[action.selectedItem]['text-decoration'] = 'line-through';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('text-decoration', 'none');
                action.savedElements.placedElements[action.selectedItem]['text-decoration'] = 'none';
            }
        }
    },
    uppercase:{
        info: "Uppercase = all letters will be capitol, Cap = first letter of each word will be capitol, Lower = all letters will be lowercase.",
        label: "Uppercase options",
        type: 'tributton',
        tributton:{
            buttonNames: ['Upper', 'Cap', 'Lower'],
            first: function(el) {
                $('#' + action.selectedItem).css('text-transform', 'uppercase');
                action.savedElements.placedElements[action.selectedItem]['text-transform'] = 'uppercase';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('text-transform', 'capitalize');
                action.savedElements.placedElements[action.selectedItem]['text-transform'] = 'capitalize';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('text-transform', 'lowercase');
                action.savedElements.placedElements[action.selectedItem]['text-transform'] = 'lowercase';
            }
        }
    },
    styleText:{
        info: "Change the text style",
        label: "Text style",
        type: 'tributton',
        tributton:{
            buttonNames: ['Italic', 'Oblique', 'Initial'],
            first: function(el) {
                $('#' + action.selectedItem).css('font-style', 'italic');
                action.savedElements.placedElements[action.selectedItem]['font-style'] = 'italic';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('font-style', 'oblique');
                action.savedElements.placedElements[action.selectedItem]['font-style'] = 'oblique';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('font-style', 'initial');
                action.savedElements.placedElements[action.selectedItem]['font-style'] = 'initial';
            }
        }
    },
    textborder:{
        info: "Adds a border around the text",
        label: "Text border",
        type: 'borderButton',
        action: function(value){
            action.setCss(action.selectedItem, '-webkit-text-stroke-width', value + 'px');
        },
        colorButton: function(){
            action.cgcolor(false, '-webkit-text-stroke-color', 'BMtextborder');
        },
        returnStyle: '-webkit-text-stroke-width',
    },
    shadow:{
        info: "Add shadow to element",
        label: 'Shadow',
        type: 'button',
        button:{
            innerHTML: 'Open Shadow',
            action: function(){
                shadowMenu.make('text-shadow', 3, ['x', 'y', 'blur'], action.selectedItem);
                bottomMenu.closeBottomMenu();
            }
        }
    },
    disabled: {
        info: "Disable item so it doesn't grab touches.",
        type: 'button',
        button:{
            innerHTML: 'Lock Element',
            action: function(){
                document.getElementById(action.selectedItem).style.pointerEvents = 'none';
                document.getElementById('enablemenu').style.display = 'block';
                //menuButton.js
                menu.disabledItems.push(action.selectedItem);
                handleScreenClick(event);
            }
        }
    },
    animations:{
        info: "To set an animation tap one, then set the speed. To remove an animation tap the animation you set and press cancel.",
        label: "Animations",
        type: 'button',
        button:{
            innerHTML: 'Animations',
            action: function(){
                animationMenu.make();
                //openAnimations(); //openAnimations.js
            }
        }
    },
    svgknockout: {
        info: "Cut hole in square with text",
        label: "SVG Knockout",
        type: 'tributton',
        tributton:{
            buttonNames: ['knockout', 'remove', 'color'],
            first: function(el) {
                svgKnockout.toggle();
            },
            second: function(el) {
                svgKnockout.remove();
            },
            third: function(el) {
                svgKnockout.color();
            }
        }
    },
    backgroundsize: {
        info: "For Image Backgrounds",
        label: "Background Size",
        type: 'tributton',
        tributton:{
            buttonNames: ['contain', 'cover', 'initial'],
            first: function(el) {
                $('#' + action.selectedItem).css('background-size', 'contain');
                action.savedElements.placedElements[action.selectedItem]['background-size'] = 'contain';
            },
            second: function(el) {
                $('#' + action.selectedItem).css('background-size', 'cover');
                action.savedElements.placedElements[action.selectedItem]['background-size'] = 'cover';
            },
            third: function(el) {
                $('#' + action.selectedItem).css('background-size', 'initial');
                action.savedElements.placedElements[action.selectedItem]['background-size'] = 'auto';
            }
        }
    },
    yposition: {
        info: "Move background image in Y position",
        label: "Adjust Y",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'background-position-y', value + 'px');
        },
        range:{
            startVal: function(does) {
                var value = action.savedElements.placedElements[action.selectedItem]['background-position-y'];
                    value = parseInt(value, 10);
                return value || 0;
            },
            decimal: false,
            min: -320,
            max: 320
        }
    },
    xposition: {
        info: "Move background image in X position",
        label: "Adjust X",
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'background-position-x', value + 'px');
        },
        range:{
            startVal: function(does) {
                var value = action.savedElements.placedElements[action.selectedItem]['background-position-x'];
                    value = parseInt(value, 10);
                return value || 0;
            },
            decimal: false,
            min: -320,
            max: 320
        }
    },
    centerposition:{
        info: "Center background image in container",
        label: "Center BG",
        type:'button',
        button:{
            innerHTML: 'CenterBG',
            action: function(){
                action.setCss(action.selectedItem, 'background-position', 'center');
            }
        }
    },
    adddiv: {
        info: "Add to div allows you to place an element in a container. The container can have multiple elements in it and can be styled itself. Each element is placed in the div with no spaces. To add a space add a padding left to the elements.",
        label: "Add to div",
        type:'button',
        button:{
            innerHTML: 'Add Div',
            action: function(){
                customDiv.show();
            }
        }
    },
    addpanel: {
        info: "Add to div allows you to place an element in a panel. The panel can have multiple elements in it and can be styled itself. ",
        label: "Add to panel",
        type:'button',
        button:{
            innerHTML: 'Add Panel',
            action: function(){
                customPanel.show();
            }
        }
    },
    makeimage: {
        info: "Allows you to place an image on the background of the box. Must be a http or https image. Does not load local files.",
        label: "Add image url",
        type:'button',
        button:{
            innerHTML: 'Add image url',
            action: function(){
                jPopup({
                    type: "confirm",
                    message: "Add url or select image?",
                    yesButtonText: "Add Url",
                    noButtonText: "Select Image",
                    functionOnNo: function() {
                        //do something on no
                        createAssetChooser('data-image');
                    },
                    functionOnOk: function() {
                        var promptForImage = prompt("Enter http or https url for image");
                        if(promptForImage){
                            action.savedElements.placedElements[action.selectedItem]['data-image'] = promptForImage;
                            action.savedElements.placedElements[action.selectedItem]['background-size'] = 'cover';
                            action.savedElements.placedElements[action.selectedItem]['background-color'] = 'transparent';
                            action.savedElements.placedElements[action.selectedItem]['background-repeat'] = 'no-repeat';
                            var selEle = document.getElementById(action.selectedItem);
                            selEle.setAttribute('data-image', promptForImage);
                            selEle.style.backgroundImage = 'url("'+promptForImage+'")';
                            selEle.style.backgroundSize = 'cover';
                            selEle.style.backgroundRepeat = 'no-repeat';
                            action.saveStorage();
                        }
                    }
                });
                //customPanel.show();
            }
        }
    },
    makeimage2: {
        info: "Image will change to this if music is playing.",
        label: "Add playing image url",
        type:'button',
        button:{
            innerHTML: 'Add 2nd image',
            action: function(){
                jPopup({
                    type: "confirm",
                    message: "Add url or select image?",
                    yesButtonText: "Add Url",
                    noButtonText: "Select Image",
                    functionOnNo: function() {
                        //do something on no
                        createAssetChooser('data-image2');
                    },
                    functionOnOk: function() {
                        var promptForImage = prompt("Enter http or https url for image");
                        if(promptForImage){
                            action.savedElements.placedElements[action.selectedItem]['data-image2'] = promptForImage;
                            action.savedElements.placedElements[action.selectedItem]['background-size'] = 'cover';
                            action.savedElements.placedElements[action.selectedItem]['background-color'] = 'transparent';
                            action.savedElements.placedElements[action.selectedItem]['background-repeat'] = 'no-repeat';
                            var selEle = document.getElementById(action.selectedItem);
                            selEle.setAttribute('data-image2', promptForImage);
                            action.saveStorage();
                        }
                    }
                });
                //customPanel.show();
            }
        }
    },
    dontshowzero: {
        info: "Dont show element if it's zero",
        label: "Dont show if 0",
        type:'button',
        button:{
            innerHTML: 'Dont show if 0',
            action: function(){
                var promptForImage = prompt("Type true or false. If true element will not show if has 0 value.");
                if(promptForImage){
                    action.savedElements.placedElements[action.selectedItem]['data-dontshot'] = promptForImage;
                    action.saveStorage();
                }
                //customPanel.show();
            }
        }
    },
    rssurl:{
        info: "Set an rss url",
        label: "Set RSS url",
        type:'button',
        button:{
            innerHTML: 'Set RSS url',
            action: function(){
                rssMenu.create();
            }
        }
    },
    delete:{
        info: "Removes element from the screen.",
        label: 'Delete Element',
        type: 'button',
        button:{
            innerHTML: 'Delete',
            action: function(){
                singleButton.deleteItem();
            }
        }
    },
    radius:{
        info: "Rounds corners",
        label: 'Radius',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'border-radius', value + 'px');
        },
        range:{
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'border-radius');
            },
            decimal: false,
            min: -100,
            max: 320
        }
    },
    boxGradient: {
        info: "Allows you to set a gradient on boxes. Options are top to bottom or left to right. <br><br> It will ask how many colors, if 2 then set the first color, then set to 50, this will set it to start at 0 and end at 50%, next color set to 100.",
        label: "Box Gradient",
        type: 'button',
        newName: 'Gradient',
        button:{
            innerHTML: 'Open',
            action: function(){
                action.textGradient();
            }
        }
    },
    blurbehind:{
        info: "Blurs behind item",
        label: "blur - blur behind object",
        type: 'tributton',
        tributton:{
            buttonNames: ['5px', 'Custom', 'None'],
            first: function(el) {
                $('#' + action.selectedItem).css('-webkit-backdrop-filter', 'blur(5px)');
                action.savedElements.placedElements[action.selectedItem]['-webkit-backdrop-filter'] = 'blur(5px)';
            },
            second: function(el) {
                var blurPrompt = prompt("Enter a custom blur number value.");
                if(blurPrompt){
                    $('#' + action.selectedItem).css('-webkit-backdrop-filter', 'blur('+blurPrompt+'px)');
                    action.savedElements.placedElements[action.selectedItem]['-webkit-backdrop-filter'] = 'blur('+blurPrompt+'px)';
                }
            },
            third: function(el) {
                $('#' + action.selectedItem).css('-webkit-backdrop-filter', 'blur(0px)');
                action.savedElements.placedElements[action.selectedItem]['-webkit-backdrop-filter'] = 'blur(0px)';
            }
        }
    },
    useas:{
        info: "Turns box into a bar that changes it's width based on battery, signal or wifi.",
        label: "Use as battery, signal, or wifi.",
        type: 'tributton',
        tributton:{
            buttonNames: ['Battery', 'Wifi', 'Signal'],
            first: function(el) {
                setBatteryWifiOrSignal('battery');
            },
            second: function(el) {
                setBatteryWifiOrSignal('wifi');
            },
            third: function(el) {
                setBatteryWifiOrSignal('signal');
            }
        }
    },
    Battery: {
        info: "When you set a square to be used as battery, the square will get shorter based on the battery percent.",
        label: "Use as battery",
        type: 'button',
        button:{
            innerHTML: 'Add',
            action: function(){
                if(action.savedElements.placedElements[action.selectedItem]['is-battery']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-battery'] === 'true'){
                        action.savedElements.placedElements[action.selectedItem]['is-battery'] = 'false';
                        this.innerHTML = "Add";
                    }else{
                        action.savedElements.placedElements[action.selectedItem]['is-battery'] = 'true';
                        this.innerHTML = "Remove";
                    }
                }else{
                   action.savedElements.placedElements[action.selectedItem]['is-battery'] = 'true';
                   this.innerHTML = "Remove"; 
                }
                action.saveStorage();
                bottomMenu.closeBottomMenu();
            }
        }
    },
    Charging: {
        info: "Will only show when device is charging.",
        label: "Show when charging",
        type: 'button',
        button:{
            innerHTML: 'Add',
            action: function(){
                if(action.savedElements.placedElements[action.selectedItem]['is-charging']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-charging'] === 'true'){
                        document.getElementById(action.selectedItem).style.opacity = 1;
                        action.savedElements.placedElements[action.selectedItem]['is-charging'] = 'false';
                        this.innerHTML = "Add";
                    }else{
                        action.savedElements.placedElements[action.selectedItem]['is-charging'] = 'true';
                        document.getElementById(action.selectedItem).style.opacity = 0;
                        this.innerHTML = "Remove";
                    }
                }else{
                   action.savedElements.placedElements[action.selectedItem]['is-charging'] = 'true';
                   this.innerHTML = "Remove"; 
                }
                action.saveStorage();
                bottomMenu.closeBottomMenu();
            }
        }
    },
    Playing: {
        info: "Will only show when music is playing",
        label: "Show when playing",
        type: 'button',
        button:{
            innerHTML: 'Add',
            action: function(){
                if(action.savedElements.placedElements[action.selectedItem]['is-playing']){
                    if(action.savedElements.placedElements[action.selectedItem]['is-playing'] === 'true'){
                        document.getElementById(action.selectedItem).style.opacity = 1;
                        action.savedElements.placedElements[action.selectedItem]['is-playing'] = 'false';
                        this.innerHTML = "Add";
                    }else{
                        action.savedElements.placedElements[action.selectedItem]['is-playing'] = 'true';
                        document.getElementById(action.selectedItem).style.opacity = 0;
                        this.innerHTML = "Remove";
                    }
                }else{
                   action.savedElements.placedElements[action.selectedItem]['is-playing'] = 'true';
                   this.innerHTML = "Remove"; 
                }
                action.saveStorage();
                bottomMenu.closeBottomMenu();
            }
        }
    },
    makeTemplate: {
        info: "Convert panel into a template",
        label: "Make template from panel",
        type: 'button',
        button:{
            innerHTML: "Create",
            action: function(){
                creator.createTemplate();
            }
        }
    },
    HidePlaying: {
        info: "Will hide when music is playing",
        label: "Hide when playing",
        type: 'button',
        button:{
            innerHTML: 'Add',
            action: function(){
                if(action.savedElements.placedElements[action.selectedItem]['hide-playing']){
                    if(action.savedElements.placedElements[action.selectedItem]['hide-playing'] === 'true'){
                        //document.getElementById(action.selectedItem).style.opacity = 1;
                        action.savedElements.placedElements[action.selectedItem]['hide-playing'] = 'false';
                        this.innerHTML = "Add";
                    }else{
                        action.savedElements.placedElements[action.selectedItem]['hide-playing'] = 'true';
                        //document.getElementById(action.selectedItem).style.opacity = 1;
                        this.innerHTML = "Remove";
                    }
                }else{
                   action.savedElements.placedElements[action.selectedItem]['hide-playing'] = 'true';
                   this.innerHTML = "Remove"; 
                }
                action.saveStorage();
                bottomMenu.closeBottomMenu();
            }
        }
    },
    AddAction:{
        info: "Allow this to do something",
        label: "Action",
        type: 'button',
        button:{
            innerHTML: 'Add',
            action: function(){
                actionMenu.create();
            }
        }
    },
    CustomName:{
        info: "Give custom name",
        label: "Custom Name",
        type: 'button',
        button:{
            innerHTML: 'Change',
            action: function(){
                var promptCustom = prompt("Enter a custom name");
                action.savedElements.placedElements[action.selectedItem]['customName'] = promptCustom;
                action.saveStorage();
            }
        }
    },
    seconds: {
        info: "Toggles seconds on and off",
        label: "Toggle Seconds",
        type: 'button',
        button: {
            innerHTML: 'Toggle',
            action: function(){
                var storage = localStorage.getItem('flipclockseconds');
                if(storage){
                    if(storage === 'true'){
                        localStorage.setItem("flipclockseconds", false);
                    }else{
                        localStorage.setItem("flipclockseconds", true);
                    }
                }else{
                    localStorage.setItem("flipclockseconds", false);
                }
                flipClock.create(document.getElementById(action.selectedItem));
            }
        }
    },
    AlignPlaceholders: {
        info: "Used to align placeholders in a panel",
        label: "Align Placeholders",
        type: 'button',
        button: {
            innerHTML: 'Align Grid',
            action: function(){
                alignPlaceholders.setup();
            }
        }
    },
    boxShadow:{
        info: "Add shadow to box",
        label: "Box shadow",
        type: 'button',
        button:{
            innerHTML: 'Open Shadow',
            action: function(){
                shadowMenu.make('box-shadow', 3, ['x', 'y', 'blur'], action.selectedItem);
                bottomMenu.closeBottomMenu();
            }
        }
    },
    border:{
        info: "Add border to box",
        label: "Border",
        type: 'borderButton',
        action: function(value){
            action.setCss(action.selectedItem, 'border-width', value + 'px');
        },
        colorButton: function(){
             action.cgcolor(false, 'border-color', 'BMborder');
        },
        returnStyle: 'border-width',
    },
    split:{
        info: "Will split 1 square into 4 squares around the edge of the current box.",
        label: "Split into 4 boxes",
        type: 'button',
        button:{
            innerHTML: 'Split',
            action:function(){
                var id = action.selectedItem,
                    width = parseInt(getComputedStyleInt(id, 'width')),
                    height = parseInt(getComputedStyleInt(id, 'height')),
                    left = parseInt(getComputedStyleInt(id, 'left')),
                    top = parseInt(getComputedStyleInt(id, 'top')),
                    bgColor = document.getElementById(action.selectedItem).style.backgroundColor,
                    splitWidth = 4,
                    availableBoxes = [];

                left = left - splitWidth/2;
                top = top - splitWidth/2;

                Object.keys(elementPanel.miscElements.box).forEach(function(key){
                    if(key != 'name' && key != 'title' && !key.includes('Auto')){
                        if(!document.getElementById(key)){
                            availableBoxes.push(key);
                        }
                    }
                });

                if(availableBoxes.length >= 4){
                    action.removeItemFromScreen(action.selectedItem);
                    bottomMenu.closeBottomMenu();
                    action.selectedItem = '';
                    for (var i = 0; i < 4; i++) {
                        var nameEl = availableBoxes[i];
                        action.addtoScreen(nameEl);
                        if(i === 0){
                            action.setCss(nameEl, 'width', width + 'px');
                            action.setCss(nameEl, 'height', splitWidth + 'px');
                            action.setCss(nameEl, 'top', top + 'px');
                            action.setCss(nameEl, 'left', left + 'px');
                            action.setCss(nameEl, 'background-color', bgColor);
                        }else if (i === 1){
                            action.setCss(nameEl, 'width', splitWidth + 'px');
                            action.setCss(nameEl, 'height', height + 'px');
                            action.setCss(nameEl, 'top', top + 'px');
                            action.setCss(nameEl, 'left', left + 'px');
                            action.setCss(nameEl, 'background-color', bgColor);
                        }else if (i === 2){
                            action.setCss(nameEl, 'width', splitWidth + 'px');
                            action.setCss(nameEl, 'height', height + 'px');
                            action.setCss(nameEl, 'top', top + 'px');
                            action.setCss(nameEl, 'left', Number(left + width) + 'px');
                            action.setCss(nameEl, 'background-color', bgColor);
                        }else if (i === 3){
                            action.setCss(nameEl, 'width', width + splitWidth + 'px');
                            action.setCss(nameEl, 'height', splitWidth + 'px');
                            action.setCss(nameEl, 'top', Number(top + height) + 'px');
                            action.setCss(nameEl, 'left', left + 'px');
                            action.setCss(nameEl, 'background-color', bgColor);
                        }
                    }
                    action.saveStorage();
                }else{
                    jPopup({
                        type: "alert",
                        message: "There is not enough boxes to create more.",
                        yesButtonText: "OK",
                        functionOnOk: function() {
                            //do something on ok
                        }
                    });
                }
            }
        }
    },
    addtext:{
        info: "Changes custom text elements text.",
        label: "Change Text",
        type: 'button',
        button:{
            innerHTML: 'Enter Text',
            action: function(){
                var prmpt = prompt("Enter full text", "");
                    prmpt = $('<div/>').text(prmpt).html();
                if (prmpt != null) {
                    $('#' + action.selectedItem).html(prmpt);
                    action.savedElements.placedElements[action.selectedItem].innerHTML = prmpt //Saves to localStorage
                    action.saveStorage();
                }
            }
        }
    },
    triColor:{
        info: "",
        label: "Color",
        type: 'button',
        button:{
            innerHTML: 'Open',
            action: function(){
                action.cgcolor(false, 'border-bottom-color', 'BMtriColor');
            }
        }
    },
    triSize:{
        info: "Size",
        label: 'Size',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'border-left', value + 'px solid transparent');
                action.setCss(action.selectedItem, 'border-right', value + 'px solid transparent');
                action.setCss(action.selectedItem, 'border-bottom', value + 'px solid ' + document.getElementById(action.selectedItem).style.borderBottomColor);
        },
        range:{
            startVal: function(does) {
                return getComputedStyleInt(action.selectedItem, 'border-bottom-width');
            },
            decimal: false,
            min: 5,
            max: 320
        }
    },
    triRotate:{
        info: "Rotate",
        label: 'Rotate',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, '-webkit-transform', 'rotate(' + value + 'deg)');
        },
        range:{
            startVal: function(does) {
                return getRotationDegreesFromTransform($('#' + action.selectedItem));
            },
            decimal: false,
            min: 0,
            max: 360
        }
    },
    widgetsize:{
        info: "Size",
        label: 'Size',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, '-webkit-transform', 'scale(' + value + ')');
            action.savedElements.placedElements[action.selectedItem]['-webkit-transform'] = 'scale(' + value + ')';
        },
        range:{
            startVal: function(does) {
                var div, values, startvalue;
                div = $('#' + action.selectedItem).css('transform');
                values = div.split('(')[1];
                values = values.split(')')[0];
                values = values.split(',');
                startvalue = values[0] || 1;
                return startvalue;
            },
            decimal: true,
            min: 0,
            max: 5
        }
    },
    iconwidth:{
        info: "Size",
        label: 'Width',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'width', value + 'px');
            $('#iconImg' + action.selectedItem).css('width', value + 'px');
        },
        range:{
            startVal: function(does) {
                return getComputedStyleInt('iconImg' + action.selectedItem, 'width');
            },
            decimal: false,
            min: 0,
            max: 300
        }
    },
    iconheight:{
        info: "Size",
        label: 'Height',
        type: 'range',
        action: function(value){
            action.setCss(action.selectedItem, 'height', value + 'px');
            $('#iconImg' + action.selectedItem).css('height', value + 'px');
        },
        range:{
            startVal: function(does) {
                return getComputedStyleInt('iconImg' + action.selectedItem, 'width');
            },
            decimal: false,
            min: 0,
            max: 300
        }
    },
    changeicon:{
        info: "",
        label: "Change Icon",
        type: 'button',
        button:{
            innerHTML: 'Change Icon',
            action: function(){
                action.populateIcons();
            }
        }
    },
    gradientPositionRange:{
        type: 'range',
        range: {
            startVal: function(does) {
                return 50;
            },
            decimal: false,
            min: 0,
            max: 100
        }
    }

},
constants = {
    /* Common text elements */
    editArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'color'
                ,'textGradient'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'whitespace'
                ,'align'
                ,'center'
                ,'vertical'
                ,'fonts'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'textborder'
                ,'affixes'
                ,'shadow'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'svgknockout'
                ,'adddiv'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'delete'],
        notifyArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'color'
                ,'textGradient'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'whitespace'
                ,'align'
                ,'center'
                ,'vertical'
                ,'fonts'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'textborder'
                ,'affixes'
                ,'shadow'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'svgknockout'
                ,'adddiv'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'dontshowzero'
                ,'delete'],
        rssArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'color'
                ,'textGradient'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'whitespace'
                ,'align'
                ,'center'
                ,'vertical'
                ,'fonts'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'textborder'
                ,'affixes'
                ,'shadow'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'svgknockout'
                ,'adddiv'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'rssurl'
                ,'delete'],

    /* coloricon */
    editIconArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'color'
                ,'textGradient'
                ,'reflection'
                ,'copyStyle'
                ,'align'
                ,'center'
                ,'vertical'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'style'
                ,'textborder'
                ,'shadow'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'adddiv'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'delete'],

    /* Custom Div Array */
    customDivArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'align'
                ,'center'
                ,'vertical'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'addpanel'
                ,'Events'
                ,'AddAction'
                ,'delete'],

    /* Custom Panel Array */
    customPanelArray: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'boxShadow'
                ,'blurbehind'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'align'
                ,'center'
                ,'vertical'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'Playing'
                ,'HidePlaying'
                ,'makeTemplate'
                ,'Charging'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'AlignPlaceholders'
                ,'CustomName'
                ,'delete'],

     /* Custom text elements */
    customTextNew: ['size'
                ,'movetop'
                ,'moveleft'
                ,'width'
                ,'height'
                ,'lineHeight'
                ,'Rotate'
                ,'paddingright'
                ,'paddingleft'
                ,'zindex'
                ,'opacity'
                ,'overflow'
                ,'boxColor'
                ,'color'
                ,'textGradient'
                ,'reflection'
                ,'copyStyle'
                ,'radius'
                ,'whitespace'
                ,'align'
                ,'center'
                ,'vertical'
                ,'fonts'
                ,'weight'
                ,'spacing'
                ,'decoration'
                ,'uppercase'
                ,'style'
                ,'textborder'
                ,'affixes'
                ,'shadow'
                ,'addtext'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'svgknockout'
                ,'adddiv'
                ,'Events'
                ,'addpanel'
                ,'AddAction'
                ,'delete'],

    /* Avatar */
    avatarEditArray: [ 'movetop'
                       ,'moveleft'
                       ,'width'
                       ,'radius'
                       ,'opacity'
                       ,'Rotate'
                       ,'boxShadow'
                       ,'border'
                       ,'zindex'
                       ,'reflection'
                       ,'backgroundsize'
                       ,'customCSS'
                       ,'disabled'
                       ,'animations'
                       ,'addpanel'
                       ,'Events'
                       ,'AddAction'
                       ,'delete'],
    
    flipclockEditArray: [ 
                        'seconds'
                        ,'scale'
                       ,'movetop'
                       ,'moveleft'
                       ,'width'
                       ,'opacity'
                       ,'zindex'
                       ,'reflection'
                       ,'customCSS'
                       ,'disabled'
                       ,'Events'
                       ,'animations'
                       ,'AddAction'
                       ,'delete'],

    fpEditArray: [  'width'
                    ,'height'
                    ,'movetop'
                    ,'moveleft'
                    ,'boxColor'
                    ,'boxGradient'
                    ,'opacity'
                    ,'center'
                    ,'copyStyle'
                    ,'radius'
                    ,'Rotate'
                    ,'blurbehind'
                    ,'boxShadow'
                    ,'border'
                    ,'zindex'
                    ,'reflection'
                    ,'customCSS'
                    ,'disabled'
                    ,'animations'
                    ,'AddAction'
                    ,'addpanel'
                    ,'delete'],

    progressArray: [  'ProgressSize'
                    ,'ProgressOuterStroke'
                    ,'ProgressInnerStroke'
                    ,'ProgressDashArray'
                    ,'ProgressInnerColor'
                    ,'ProgressOuterColor'
                    ,'movetop'
                    ,'moveleft'
                    ,'opacity'
                    ,'center'
                    ,'Rotate'
                    ,'zindex'
                    ,'reflection'
                    ,'disabled'
                    ,'Events'
                    ,'animations'
                    ,'addpanel'
                    ,'delete'],

    /* Boxes elements */
    boxEditArray: [ 'movetop'
                    ,'moveleft'
                    ,'width'
                    ,'height'
                    ,'boxColor'
                    ,'boxGradient'
                    ,'opacity'
                    ,'overflow'
                    ,'center'
                    ,'copyStyle'
                    ,'radius'
                    ,'Rotate'
                    ,'blurbehind'
                    ,'useas'
                    ,'boxShadow'
                    ,'border'
                    ,'zindex'
                    ,'reflection'
                    ,'customCSS'
                    ,'disabled'
                    ,'animations'
                    ,'split'
                    ,'backgroundsize'
                    ,'makeimage'
                    ,'makeimage2'
                    ,'centerposition'
                    ,'Events'
                    ,'addpanel'
                    ,'AddAction'
                    ,'CustomName'
                    ,'delete'],
    
    /* Album elements */
    albumEditArray: [ 'movetop'
                    ,'moveleft'
                    ,'width'
                    ,'height'
                    ,'opacity'
                    ,'center'
                    ,'copyStyle'
                    ,'radius'
                    ,'Rotate'
                    ,'blurbehind'
                    ,'boxShadow'
                    ,'border'
                    ,'zindex'
                    ,'reflection'
                    ,'customCSS'
                    ,'disabled'
                    ,'animations'
                    ,'backgroundsize'
                    ,'yposition'
                    ,'xposition'
                    ,'centerposition'
                    ,'Events'
                    ,'addpanel'
                    ,'AddAction'
                    ,'delete'],

    /* Circle elements */
    circleEditArray: [ 'movetop'
                    ,'moveleft'
                    ,'width'
                    ,'height'
                    ,'boxColor'
                    ,'boxGradient'
                    ,'opacity'
                    ,'center'
                    ,'copyStyle'
                    ,'radius'
                    ,'Rotate'
                    ,'blurbehind'
                    ,'boxShadow'
                    ,'border'
                    ,'zindex'
                    ,'reflection'
                    ,'customCSS'
                    ,'disabled'
                    ,'animations'
                    ,'Events'
                    ,'addpanel'
                    ,'AddAction'
                    ,'delete'],

    /* Triangle elements */
    triEditArray: [ 'movetop'
                    ,'moveleft'
                    ,'width'
                    ,'height'
                    ,'triColor'
                    ,'opacity'
                    ,'center'
                    ,'copyStyle'
                    ,'radius'
                    ,'triSize'
                    ,'triRotate'
                    ,'blurbehind'
                    ,'zindex'
                    ,'customCSS'
                    ,'disabled'
                    ,'animations'
                    ,'Events'
                    ,'addpanel'
                    ,'AddAction'
                    ,'delete'],

    iconArray: ['iconwidth'
                ,'iconheight'
                ,'movetop'
                ,'moveleft'
                ,'center'
                ,'changeicon'
                ,'opacity'
                ,'boxColor'
                ,'radius'
                ,'reflection'
                ,'customCSS'
                ,'disabled'
                ,'animations'
                ,'zindex'
                ,'Events'
                ,'addpanel' //added
                ,'AddAction'
                , 'delete'],

    widgetArray: ['movetop'
                ,'moveleft'
                ,'widgetsize'
                ,'center'
                ,'opacity'
                ,'customCSS'
                ,'disabled'
                //,'addpanel' //added
                , 'delete'],
                gridSizeTop: 160,
                gridSizeLeft: 284,
    iconList: ['ambre2','ambre3','astral1','MonolyphDark','MonolyphFlat','MonolyphLight','city','blue', 'clima', 'deep', 'plex', 'Flex', 'GlowWhite', 'june', 'Klear', 'lines', 'mauri', 'mauri2', 'MNMLB', 'MNMLBW', 'MNMLW', 'mw', 'nude', 'plastic', 'playful', 'primusweather', 'Purcy', 'realicons', 'reddock', 'round', 'round2', 'shadow', 'shiny', 'simple', 'simply', 'six', 'sixtynine', 'Sk37ch', 'smash', 'stardock', 'swhite', 'toon', 'toon2', 'topaz', 'weathercom', 'wetter', 'yahoo','black', 'BlackOrange','blacky','bbl', 'blackd', 'cleard', 'flt', 'kelly', 'climacut', 'climablack', 'noidea', 'pbwidget', 'plaindark', 'plainwhite', 'htc', 'sticker', 'wth', 'yah1', 'yah2', 'yah3', 'custover', 'kuro', 'perfect', 'twofresh', 'faded'],
};
