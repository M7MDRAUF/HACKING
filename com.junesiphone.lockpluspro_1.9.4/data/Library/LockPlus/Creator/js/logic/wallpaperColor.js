/*
    Goal: On load grab the set wallpaper to the LS
    Get colors from it.
*/

(function(window) {
    var wallColors = [];
    function generateColors(){
        var img = document.createElement('img');
            img.setAttribute('src', 'file:///var/mobile/Library/SpringBoard/LockBackgroundThumbnail.jpg');
            img.addEventListener('error', function(){
                //alert('err');
            });
            img.addEventListener('load', function() {
                var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches()
                for (var swatch in swatches){
                    if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
                        wallColors.push(swatches[swatch].getHex());
                    }
                }
            });
    }
    generateColors();
    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.getColors = function(){
            return wallColors;
        };
        return externalMethods;
    }
    window.wallColors = initExternalMethods();
}(window));