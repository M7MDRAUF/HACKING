//init paper object
paper.install(window);
var paperTools = {};

//load paperJS
window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);
    paper.settings.handleSize = 2;
    paperTools.select.init();
}

