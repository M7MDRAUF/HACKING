/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/
/*global
  action,
  alert,
  constants,
  $
*/
/**
 * Handling of mutliple styles
 *
 *
 */

action.autoCenter = function () {
    action.setCss(action.selectedItem, 'left', '0');
    action.setCss(action.selectedItem, 'width', '320');
};
action.cgcolor = function (color, cssKey, div, progress) {
    var selectedColorDIV = document.getElementById(action.selectedItem);
    var currentColor = null;
    if (color) {
        action.setCss(action.selectedItem, cssKey, color);
    } else {
        function moveForProgressInner(e, tinycolor, cssKey, div){
            action.setCss(action.selectedItem, 'inner-color', tinycolor.toRgbString());
            addStyleString('.circle-progress-circle{stroke:'+tinycolor.toRgbString()+';}', 'circleinnercolor');  
        }
        function moveForProgressOuter(e, tinycolor, cssKey, div){
            action.setCss(action.selectedItem, 'outer-color', tinycolor.toRgbString());
            addStyleString('.circle-progress-value{stroke:'+tinycolor.toRgbString()+';}', 'circleoutercolor');  
        }
        function move(e, tinycolor, cssKey, div){
            action.cgcolor(tinycolor.toRgbString(), cssKey, div);
        }
        if(!currentColor){
            color = $('#' + action.selectedItem).css(cssKey);
        }

        /*
            Special treatment for batterypie
            It contains two user styles
            One to set the inner color and one for outer color
        */
        if(selectedColorDIV.id === 'batterypie'){
            if(progress === 'inner'){
                colorPicker.showPicker(div, color, cssKey, moveForProgressInner, false);
            }
            if(progress === 'outer'){
                colorPicker.showPicker(div, color, cssKey, moveForProgressOuter, false);
            }
        }else{
            colorPicker.showPicker(div, color, cssKey, move, false);
        }
    }
};
// action.cgStyle = function () {
//     var lastSelector = '#' + $('#' + action.selectedItem).css('font-style') + 'Option';
//     this.cgOption('style', constants.editArray[9], ['italic', 'oblique', 'initial'], 0, true, function (optionSelector) {
//         lastSelector = action.basicOptionSelected(optionSelector, lastSelector, 'font-style', $(optionSelector).attr('id').substring(0, $(optionSelector).attr('id').length - 6));
//     }, function (optionName) {
//         return action.getBasicOptionElement(optionName, 'text-align: center; font-style: ' + optionName, 'font-style');
//     });
// };
// action.cgBorderStyle = function () {
//     var lastSelector = '#' + $('#' + action.selectedItem).css('border-style') + 'Option';
//     this.cgOption('borderStyle', constants.borderArray[0], ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'], 20, true, function (optionSelector) {
//         lastSelector = action.basicOptionSelected(optionSelector, lastSelector, 'border-style', $(optionSelector).attr('id').substring(0, $(optionSelector).attr('id').length - 6));
//     }, function (optionName) {
//         return action.getBasicOptionElement(optionName, 'text-align:center; font-size:15px;', 'border-style');
//     });
// };
