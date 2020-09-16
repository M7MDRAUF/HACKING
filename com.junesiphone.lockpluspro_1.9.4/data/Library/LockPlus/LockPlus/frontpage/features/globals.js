var globalVars = {
    changingOverlayImage: false,
    changedImage: false,
	changingIconImage: false,
	changingIconDiv: null,
    changingBadgeImage: false,
    movedWhilePressing: false,
    borderOnIcon: null,
    changedImage: null,
    iconWidth: 40,
    dragging: false,
    deeppress: false,
    scrollBouncEnabled: false,
    addingToFolder: false,
    folderOpen : false,
    lastGrid: null,
    changingOverlayImage: false,
    changingUnderlayImage: false,
};

function removeBounce(){
    window.location = 'frontpage:scrollType:0';
}

function enableScrollViewBounce(){
    if(!globalVars.scrollBouncEnabled && lStorage.disablebouncing){
        window.location = 'frontpage:scrollType:2';
        globalVars.scrollBouncEnabled = true;
    }
    if(!lStorage.disablebouncing){
        window.location = 'frontpage:scrollType:0';
        globalVars.scrollBouncEnabled = false;
    }
}
function disableScrollViewBounce(){
    if(globalVars.scrollBouncEnabled && lStorage.disablebouncing){
        window.location = 'frontpage:scrollType:0';
        globalVars.scrollBouncEnabled = false;
    }
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

/* check if user has a stored image if not just default to fp images */
function getIconImage(bundle) {
    var imageLoc = '/var/mobile/Library/FrontPageCache/' + bundle + '.png';
    if(bundle.includes('pageJump')){
        imageLoc = "src/images/pageJump.png";
    }
    if(bundle.includes('drawerIcon')){
        imageLoc = "src/images/drawerIcon.png";
    }
    if(bundle.includes('folderIcon')){
        imageLoc = "src/images/folderIcon.png";
    }
    if (lStorage.iconImageLocations && lStorage.iconImageLocations[bundle]) {
        imageLoc = lStorage.iconImageLocations[bundle];
    }
    return imageLoc;
}

function addStyleString(str, id) {
    var element, node, doc = document;
    if (id) {
        /* If exists remove */
        if (doc.getElementById(id)) {
            element = doc.getElementById(id);
            doc.body.removeChild(element);
        }
    }
    node = doc.createElement('style');
    node.innerHTML = str;
    node.id = id;
    doc.body.appendChild(node);
};

/* set icon image with a blank default */
function setAppIconImage(element, bundle){
    var img = new Image(),
        src = getIconImage(bundle);
    img.onload = function(){
        element.style.backgroundImage = "url('" + src + "')";
    }; 
    img.onerror = function(){
        element.style.backgroundImage = "url('blank.png')";
    };
    img.src = src;
}

function setOverlayImage(element){
    var img = new Image(),
        src = lStorage.iconOverlayImage;

        if(src){
            img.onload = function(){
                element.style.backgroundImage = "url('" + src + "')";
            }; 
            img.onerror = function(){
                element.style.backgroundImage = "";
            };
            img.src = src;
        }
}

/* check if bundle has a badge */
function getIconBadge(bundle){
	var badge = "";
    try{
        if (FPI.bundle[bundle] && FPI.bundle[bundle].badge > 0) {
            badge = FPI.bundle[bundle].badge;
        }
    }catch(err){
        //console.log('Global.js error in getIconBadge ' + err);
    }
    return badge;
}

/* check if bundle has a name */
function getIconName(bundle){
	var name = "";
    try{
        if (FPI.bundle[bundle] && FPI.bundle[bundle].name) {
            name = FPI.bundle[bundle].name;
        }
    }catch(err){
        //console.log('Global.js error in getIconBadge ' + err);
    }
    return name;
}

/* check if it's day or not */
function isDay(){
    var hours = new Date().getHours();
    return hours > 6 && hours < 20;
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


