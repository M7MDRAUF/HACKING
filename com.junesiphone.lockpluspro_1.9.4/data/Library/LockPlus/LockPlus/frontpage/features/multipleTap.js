(function() {
    var taps = 0,
        tapTimer = null,
        clearTap = function() {
            taps = 0;
            clearTimeout(tapTimer);
            tapTimer = null;
        },
        multipleTap = function(obj) {
            obj.div.addEventListener('touchstart', function(e) {
                if (e.touches.length > 1) {
                    clearTap();
                    return;
                }
                taps = taps + 1;
                if (tapTimer === null) {
                    tapTimer = setTimeout(function() {
                        clearTap();
                    }, 900)
                };
            });
            obj.div.addEventListener('touchmove', function() {
                clearTap();
            });
            obj.div.addEventListener('touchend', function(e) {
                /* stop iOS from moving the screen when tapped */
                removeBounce()
                
                if (taps === obj.taps) {
                    setTimeout(function() {
                        obj.callback(e);
                    }, 0);
                    clearTap();
                }
            });
            obj.div.addEventListener('touchcancel', function() {
                clearTap();
            });
        };
    window.multipleTap = multipleTap;
}());