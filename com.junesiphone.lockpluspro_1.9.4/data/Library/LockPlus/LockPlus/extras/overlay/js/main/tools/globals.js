//polyfill for .includes
if (!Array.prototype.includes) {
Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (len === 0) {
        return false;
    }
    var n = fromIndex | 0;
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
        return true;
        }
        k++;
    }
    return false;
    }
});
}
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
function createRoundedRect(x,y,width,height,radius){
    var radius = new Size(radius, radius);
    return  new paper.Path.Rectangle(new paper.Rectangle(x, y, width, height), radius);
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
          return 'No Element';
        }
}
