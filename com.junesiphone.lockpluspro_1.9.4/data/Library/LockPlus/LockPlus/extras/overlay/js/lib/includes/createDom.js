/*
** Creator: JunesiPhone
** Website: http://junesiphone.com
    
    Creates a domElement and will give the reverence to it. 

    Example:
    var folder = createDOM({
        type: 'div',
        id: 'shortcutFolder',
        className: 'shortcutFolder',
        attribute: ['title', 'alsocloser']
    });
    something.appendChild(folder);
*/

if (!String.prototype.includes) {
String.prototype.includes = function(search, start) {
  'use strict';
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};
}

Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}

function getComputedVal(el, style){
    var compStyle = window.getComputedStyle(document.getElementById(el));
    return compStyle[style];
}

/* Get computed style as an int */
function getComputedStyleInt(id, style) {
    var el = document.getElementById(id),
        computed, value;
        if(el){
          value = parseInt(el.style[style]);
          if (!value) {
              computed = getComputedStyle(el);
              value = parseInt(computed[style])
          }
          return value;
        }else{
          return 0;
        }
}

(function(window, doc) {
    window.createDOM = function(params) {
        var d = doc.createElement(params.type);
        if (params.className) {
            d.setAttribute('class', params.className);
        }
        if(params.inputType){
            d.type = params.inputType;
        }
        if (params.id) {
            d.id = params.id;
        }
        if (params.href){
            d.href = params.href;
        }
        if (params.innerHTML) {
            d.innerHTML = params.innerHTML;
        }
        if (params.attribute) {
            d.setAttribute(params.attribute[0], params.attribute[1]);
        }
        if (params.attribute2) {
            d.setAttribute(params.attribute2[0], params.attribute2[1]);
        }
        if (params.attribute3) {
            d.setAttribute(params.attribute3[0], params.attribute3[1]);
        }
        if (params.type === "img") {
            d.src = params.src;
        }
        if (params.appendChild) {
            d.appendChild(params.appendChild);
        }
        return d;
    };
}(window, document));


