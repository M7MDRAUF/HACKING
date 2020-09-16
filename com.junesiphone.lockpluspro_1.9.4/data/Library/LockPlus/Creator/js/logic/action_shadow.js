/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/
/*global
  action,
  alert,
  isMobile,
  $
*/
/**
 * Handling of setting shadows.
 *
 *
 */
action.cgShadowColor = function (isForBox) {
    var selector = isForBox ? '#boxshadowColorDiv' : '#shadowColorDiv',
        color = 'red';
    if (isMobile) {
        selector = isForBox;
    }
    function onMove(e, tinycolor){
        action.updateShadow(isForBox ? 'box' : '', tinycolor.toRgbString(), 'px', 'color', 'set'); //Added special case to updateShadow for this
    }
    color = action.updateShadow('', '', '', '', 'get');
    colorPicker.showPicker(selector, color, style, onMove, false);
};

action.updateShadow = function (idSelector, cssKey, unit, jsCssKey, purpose) {
    var isForBox,
        currentShadow,
        splitShadow,
        index = 0,
        newShadow;
    isForBox = action.selectedItem.indexOf("box") > -1;
    currentShadow = !isForBox ? $('#' + action.selectedItem).css('text-shadow') : $('#' + action.selectedItem).css('box-shadow');
    if (currentShadow !== 'none') {
        splitShadow = currentShadow.split(' ');
    } else {
        splitShadow = ['#ffffff', '0px', '0px', '0px'];
    }

    //Dealing with stupid browser reordering
    if (!splitShadow[0].indexOf('px') > -1 && splitShadow[0].indexOf("rgb") > -1) { //If the first splitShadow index doesn't contain 'px' and does contain 'rgb'
        if (splitShadow[0].indexOf('rgba') > -1) {
            splitShadow[0] = splitShadow[0] + splitShadow[1] + splitShadow[2] + splitShadow[3];
            splitShadow[1] = splitShadow[4];
            splitShadow[2] = splitShadow[5];
            splitShadow[3] = splitShadow[6];
        } else {
            splitShadow[0] = splitShadow[0] + splitShadow[1] + splitShadow[2];
            splitShadow[1] = splitShadow[3];
            splitShadow[2] = splitShadow[4];
            splitShadow[3] = splitShadow[5];
        }
    }

    if (jsCssKey === (!isForBox ? 'hShadow' : 'boxhShadow')) {
        index = 1;
    } else if (jsCssKey === (!isForBox ? 'vShadow' : 'boxvShadow')) {
        index = 2;
    } else if (jsCssKey === (!isForBox ? 'blur' : 'boxblur')) {
        index = 3;
    } else if (jsCssKey === (!isForBox ? 'color' : 'boxcolor')) {
        index = 0;
    }

    if (purpose === 'set') {
        newShadow = '';

        if (idSelector.charAt(0) === '#') {
            splitShadow[index] = $(idSelector).val() + unit;
        } else {
            splitShadow[index] = cssKey;
        }

        newShadow = splitShadow[0] + ' ' + splitShadow[1] + ' ' + splitShadow[2] + ' ' + splitShadow[3]; // Parse into correct format for css. Could've done a loop, but that's not necessary
        if (!isForBox) {
            action.setCss(action.selectedItem, 'text-shadow', newShadow);
        } else {
            action.setCss(action.selectedItem, 'box-shadow', newShadow);
        }
    }
    if (purpose === 'get') {
        return splitShadow[index];
    }
    if (purpose === 'clear') {
        if (isForBox) {
            action.setCss(action.selectedItem, 'box-shadow', 'none');
        } else {
            action.setCss(action.selectedItem, 'text-shadow', 'none');
        }
    }
};
