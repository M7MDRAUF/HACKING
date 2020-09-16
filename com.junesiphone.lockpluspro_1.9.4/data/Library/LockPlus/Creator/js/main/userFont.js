var userAddedFonts = [];
var fontArray;
var webfonts;

function loadfonts(string) {
    if (!string) {
        string = webfonts;
    }
    var array = string.split(',');
    fontArray = array;
    var css = "",
        i,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    for (i = 0; i < array.length; i++) {
        if (!mobilecheck()) { //for web
            css += "\n@font-face{\nfont-family:'" + array[i].replace(' ', '') + "';\nsrc:url('../../php/fonts/" + array[i].replace(' ', '') + ".otf');\n}";
        } else if (typeof variable !== 'undefined' && isInApp === true) {
            css += "\n@font-face{\nfont-family:'" + array[i] + "';\nsrc:url('file:///var/mobile/Documents/lockplusfonts/" + array[i] + ".otf');\n}";
        }else{
            css += "\n@font-face{\nfont-family:'" + array[i] + "';\nsrc:url('../../../../var/mobile/Documents/lockplusfonts/" + array[i] + ".otf');\n}";
        }
    }
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}



function loadFontFile(name, func, title) { //for web
    var milli = new Date().getMilliseconds(),
        link = name + "?" + milli,
        fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute('title', title);
    fileref.setAttribute("src", link);
    fileref.async = true;
    if (fileref !== "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    fileref.onload = function() {
        setTimeout(function() {
            func();
        }, 200);
    };
}

if (!mobilecheck()) { //for web
    loadFontFile('../../php/fonts/webfont.js', loadfonts, 'webfont.js');
}

function userfonts(string) {
    userAddedFonts = string.split(',');
}