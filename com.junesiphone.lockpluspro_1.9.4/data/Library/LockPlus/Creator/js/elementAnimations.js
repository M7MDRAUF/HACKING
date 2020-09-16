/*
    Element Animations

    LockPlus tweak will call loadAnimation when LockPlus loads and hideAnimation when it closes.

    ** Called from tweak

    hideAnimations();
    loadAnimations();

    This file is in LockPlus and Creator

*/

/* animate the frame */
function animateFrame(animation, key) {
    var elementDOM = document.getElementById(key),
        rotate = 0,
        rotateOrigin = "center center",
        yVal = 0,
        xVal = 0,
        speed = 1000,
        oldTransform = 0,
        delay = 0,
        transform = ['xVal', 'yVal', 'rotateVal'],
        ref = ['xVal', 'yVal', 'rotateVal', 'speedVal'];

    Object.keys(animation).forEach(function(key) {
        if (key === 'transform') {
            xVal = Number(animation.transform.xVal);
            yVal = Number(animation.transform.yVal);
            rotate = Number(animation.transform.rotateVal);
            runExtras = false;
        } else {
            if (key === 'rotateVal') {
                rotate = animation[key];
            } else if (key === 'speedVal') {
                speed = animation[key];
            } else if (key === 'delay') {
                delay = animation[key];
            } else if (key === 'origin') {
                rotateOrigin = animation[key];
            } else {
                elementDOM.style.webkitTransition = ' ';
                elementDOM.style[key] = animation[key];
            }
        }

    });

    elementDOM.style.webkitTransition = 'all ' + Number(speed) + 'ms ease-in-out';
    elementDOM.style.webkitTransformOrigin = rotateOrigin;

    /* Apply Transform */
    if (action.savedElements.placedElements[key]['-webkit-transform']) {
        oldTransform = action.savedElements.placedElements[key]['-webkit-transform'];
        if (oldTransform.indexOf('rotate') > -1) {
            oldTransform = parseInt(oldTransform.replace('rotate(', '').replace(')', ''), 10);
        }
    }
    elementDOM.style.webkitTransform = 'rotate(' + Number(rotate) + 'deg) translateY(' + Number(yVal) + 'px) translateX(' + Number(xVal) + 'px) translateZ(0)';

    setTimeout(function() {
        elementDOM.style.webkitTransition = ' ';
    }, 0);
}

/* setup delays */
function runAnimations(div) {
    var delay = 0,
        speed = 0,
        nextDelay = 0,
        counted = 0,
        element,
        value = action.savedElements.placedElements[action.selectedItem],
        elDiv = document.getElementById(action.selectedItem),
        name = action.selectedItem,
        temp;

    if (div) {
        value = action.savedElements.placedElements[div];
        elDiv = document.getElementById(div);
        name = div;
    }

    elDiv.style.webkitTransition = '';
    elDiv.style.webkitTransform = 'rotate(0deg) translateY(0px) translateX(0px) translateZ(0)';

    for (var i = 0; i < value.transformAnimation.length; i++) {
        temp = value.transformAnimation[i];
        delay = Number(temp.delay);
        speed = Number(temp.speedVal);

        if (temp.opacity === 0) {
            elDiv.style.opacity = 0;
        }

        if (i === 0) {
            counted = delay + speed + counted;
            setTimeout(function(val) {
                animateFrame(val, name);
            }, delay, value.transformAnimation[i]);
        } else {
            counted = delay + counted + speed;
            setTimeout(function(val) {
                animateFrame(val, name);
            }, counted, value.transformAnimation[i]);
        }
    }
}


/* Creator Only */
function testAll(){
    var value;
    Object.keys(action.savedElements.placedElements).forEach(function (key) {
        value = action.savedElements.placedElements[key];
        if(value.transformAnimation){
            runAnimations(key);
        }
    });
}
function testAnimation(){
    runAnimations();
}
/* Creator Only */

/* LockPlus Only */
function hideAnimations() {
    var value = null;
    Object.keys(action.savedElements.placedElements).forEach(function(key) {
        value = action.savedElements.placedElements[key];
        try {
            if (value.fade) {
                var fadeNum = Number(value.fade);
                $('#' + key).css('opacity', '0');
            }
            var aUp = 0,
                aDown = 0,
                aLeft = 0,
                aRight = 0,
                yVal = 0,
                xVal = 0,
                speed = 0;
            if (value.aniUp) {
                aUp = Number(value.aniUp);
            }
            if (value.aniDown) {
                aDown = Number(value.aniDown);
            }
            if (value.aniLeft) {
                aLeft = Number(value.aniLeft);
            }
            if (value.aniRight) {
                aRight = Number(value.aniRight);
            }
            if (aUp > 0 || aDown > 0 || aLeft > 0 || aRight > 0) {
                $('#' + key).css('visibility', 'hidden');
            }
        } catch (err) {}
    });
}
/* LockPlus Only */

function runLegacyAnimation(key) {
    var style = action.savedElements.placedElements[key],
        div = document.getElementById(key),
        aUp = style.aniUp || 0,
        aDown = style.aniDown || 0,
        aLeft = style.aniLeft || 0,
        aRight = style.aniRight || 0,
        yVal = 0,
        xVal = 0,
        speed = 0;

    if (style.fade) {
        $('#' + key).css('opacity', '0');
        setTimeout(function() {
            $('#' + key).fadeTo(Number(style.fade), 1);
        }, 300);
    }

    if (aUp > 0 || aDown > 0 || aLeft > 0 || aRight > 0) {
        if (aUp > 0) {
            yVal = 1000;
            speed = aUp;
        }
        if (aDown > 0) {
            yVal = -1000;
            speed = aDown;
        }
        if (aLeft > 0) {
            xVal = 1000;
            speed = aLeft;
        }
        if (aRight > 0) {
            xVal = -1000;
            speed = aRight;
        }
        div.style.webkitTransform = 'translateY(' + yVal + 'px)translateX(' + xVal + 'px)translateZ(0)';
        $('#' + key).css('visibility', 'visible');
        setTimeout(function() {
            div.style.webkitTransition = 'transform ' + speed + 'ms ease-in-out';
            $('#' + key).css('-webkit-transform', 'translateY(0px)translateX(0px)translateZ(0)');
            setTimeout(function() {
                div.style.webkitTransition = '';
            }, speed + 100);
        }, 0);
    }
}

function checkContainsLegacy(styles){
    var legacyValues = ['fade', 'aniUp', 'aniDown', 'aniLeft', 'aniRight'];
    for (var i = 0; i < styles.length; i++) {
        if(legacyValues.contains(styles[i])){
            return true;
        }
    }
    return false;
}

/* LockPlus Only */
function loadAnimations() {
    var value = null,
        containsLegacy = false,
        placedEl = action.savedElements.placedElements;

    Object.keys(placedEl).forEach(function(key) {
        value = placedEl[key];
        containsLegacy = checkContainsLegacy(Object.keys(value));
        
        if(value.transformAnimation){
            runAnimations(key);
        }
        if(containsLegacy){
            runLegacyAnimation(key);
        }
    });
}
/* LockPlus Only */