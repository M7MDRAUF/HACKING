/*
    One place to load spectrum
*/

(function(window) {
    var input;
    function onBlur(event){
        resetMoveForInput(event);
    }
    function onFocus(event){
        moveUpForInput(event);
    }
    function showPicker(div, color, cssKey, onMove, onHide){

        $("#" + div).spectrum({
            showInitial: true,
            maxSelectionSize: 66,
            localStorageKey: 'spectrum',
            showAlpha: true,
            showInput: true,
            preferredFormat: "rgba",
            showPalette: true,
            color: color,
            palette: (wallColors.getColors()) ? wallColors.getColors() : []
        });
        $('.sp-container').draggable({
            handle: '.sp-container-drag',
            containment: 'window',
        });
        //opacity fixes the weird jump
        $('.sp-container').css('opacity', 0);
        setTimeout(function () {
            $('#' + div).spectrum('show');
            $('.sp-container').css('opacity', 1);
            input = document.getElementById('spectrumInput');
            if(input){
                input.addEventListener('blur', onBlur, false);
                input.addEventListener('focus', onFocus, false);
            }
        }, 0); //give it time to load.
        
        $("#" + div).on('move.spectrum', function (e, tinycolor) {
            if(onMove){
                onMove(e, tinycolor, cssKey, div);
            }
        });
        $("#" + div).on('hide.spectrum', function (e, tinycolor) {
            if(onMove){
                onMove(e, tinycolor, cssKey, div);
            }
            if(input){
                input.removeEventListener('blur', onBlur, false);
                input.removeEventListener('focus', onFocus, false);
            }
            try{
                $('.sp-container').draggable("destroy");
            }catch(err){}
            $("#" + div).spectrum("destroy");
            onMove = null;
            div = null;
            color = null; 
            cssKey = null;
            if(onHide){
                onHide(e, tinycolor);
            }
            onHide = null;
        });
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.showPicker = function(div, color, cssKey, onMove, onHide){
            showPicker(div, color, cssKey, onMove, onHide);
        };
        return externalMethods;
    }
    window.colorPicker = initExternalMethods();
}(window));

//colorPicker.showPicker('colorPickerHolder', 'red', 'color', null, null);


