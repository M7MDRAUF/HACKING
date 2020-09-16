/*
    One place to load spectrum
*/

(function(window, doc) {

    function setup(containerDiv){
        var circle;
        containerDiv.className = 'progress';
        containerDiv.style.width = 'auto';
        containerDiv.style.height = 'auto';
        circle = new CircleProgress('.progress');
        circle.max = 100;
        circle.value = 75;
        circle.textFormat = 'none';
        addStyleString('.circle-progress{overflow:visible;pointer-events:none;}', 'circleoverflow');
    }

    function clearAddedStyles(){
        var addedStyles = ['circleoverflow', 'circleinnercolor', 'circleoutercolor', 'circlewidth', 'circlestroke', 'circlestrokevalue', 'circlestrokedash'],
        styleID, i, styleDOM;
        for (i = 0; i < addedStyles.length; i++) {
             styleID = addedStyles[i];
             styleDOM = doc.getElementById(styleID);
            if (styleDOM) {
                doc.body.removeChild(styleDOM);
            }
        }
        addedStyles = null;
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.setup = function(containerDiv){
            setup(containerDiv);
        };
        externalMethods.clearStyles = function(){
            clearAddedStyles();
        }
        return externalMethods;
    }
    window.batteryPie = initExternalMethods();
}(window, document));
