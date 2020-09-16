$(document).ready(function(){

    // backup original handler
    var _mouseStart = $.ui.draggable.prototype._mouseStart;

    $.ui.draggable.prototype._mouseStart = function(event) {

        //remove the transform
        var transform = this.element.css('transform');
        this.element.css('transform', 'none');

        // call original handler
        var result = _mouseStart.call(this, event);

        //restore the transform
        this.element.css('transform', transform);

        return result;
    };
});