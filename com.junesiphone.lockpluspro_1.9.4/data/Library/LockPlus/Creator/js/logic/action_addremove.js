/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/
/*global
  action,
  constants,
  loadClock,
  weatherdivs,
  systemdivs,
  miscDivs,
  $,
*/


/**
 * Add/Remove elements from the screen
 *
 *
 */
action.removeItemFromScreen = function(id) {
    var parent = document.getElementById('screenElements'),
        div = document.getElementById(id),
        newArray = [],
        i, placed;
        //issue here when elemnet is in a div or panel
        try{
            parent.removeChild(div); //remove element from dom
        }catch(err){
            div.parentElement.removeChild(div);
        }

    delete this.movedElements[id];
    this.savedElements.placedElements = this.movedElements; //since the element was removed from movedElements, this also removes from placedElements
    
    //remvoe from custompanel
    Object.keys(action.savedElements.placedElements).forEach(function(key){
        newArray = [];
        if(key.substring(0, 4) === 'cust'){
           placed = action.savedElements.placedElements;
           if(placed[key]['data-vars']){
               for(i = 0; i < placed[key]['data-vars'].length; i++){
                if(placed[key]['data-vars'][i] != id){
                    newArray.push(placed[key]['data-vars'][i]);
                }
               }
               placed[key]['data-vars'] = newArray;
           }
        }
    });
    //remove from custompanel local obj
    customPanel.removeFromCustomPanelObj(id);
    this.saveStorage();
};


function setupCustomApp(div, id){
    var value, split, name, bundle;
    if(miscEl){
        if(miscEl[id]){
            value = miscEl[id];
            split = value.split('~');
            name = split[0];
            bundle = split[1];
            div.setAttribute('name', name);
            div.setAttribute('bundleID', bundle);
            div.innerHTML = name;
            action.savedElements.placedElements[id]['name'] = name;
            action.savedElements.placedElements[id]['bundleID'] = bundle;
        }
    }
}

function addPlaceHoldersToScreen(div, id){
    var placeWidth = '50px';
    var placeHolder = null;
        try{
            if(action.savedElements.placedElements['fpplaceholder']){
                placeHolder = action.savedElements.placedElements['fpplaceholder'];
                placeWidth = placeHolder['width'];
            }else if(action.savedElements.placedElements['fpplaceholder0']){
                placeHolder = action.savedElements.placedElements['fpplaceholder0'];
                placeWidth = placeHolder['width'];
            }else if(action.savedElements.placedElements['fpplaceholder1']){
                placeHolder = action.savedElements.placedElements['fpplaceholder1'];
                placeWidth = placeHolder['width'];
            }
        }catch(err){
            
        }

        //Creator only styles
        div.style.backgroundImage = 'url("file:///Library/LockPlus/Creator/images/placeholder.png")';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
        div.style.zIndex = 1;
        div.style.borderColor = 'black';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '0px';

        //gives time for it to be added to the screen
        setTimeout(function(){
            action.setCss(id, 'width', placeWidth);
            action.setCss(id, 'height', placeWidth);
        },0);
}

function addAvatarToScreen(div, id){
    // Creator only styles
    div.style.backgroundColor = 'black';
    div.style.backgroundImage = 'url("file:///var/mobile/Library/LockPlus/avatarspecialforlpp.png")';
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';

    // Gives time for it to be added to the screen
    setTimeout(function(){
        action.setCss(id, 'width', '50px');
        action.setCss(id, 'height', '50px');
        action.setCss(id, 'top', '248px');
        action.setCss(id, 'left', '130px');
    }, 0);
}

function addAlbumArtToScreen(div, id){
    // Creator only styles
    //none
    // Gives time for it to be added to the screen
    setTimeout(function(){
        action.setCss(id, 'width', '50px');
        action.setCss(id, 'height', '50px');
        action.setCss(id, 'top', '248px');
        action.setCss(id, 'left', '130px');
        action.setCss(id, 'background-color', 'black');
        action.setCss(id, 'border-color', 'black');
        action.setCss(id, 'border-style', 'solid');
        action.setCss(id, 'border-width', '0px');
        action.setCss(id, 'background-image', "url('file:///Library/LockPlus/Creator/images/blank.png");
        //action.setCss(id, 'background-image', "url('http://127.0.0.1:5500/layout/Library/LockPlus/Creator/images/blank.png");
        action.setCss(id, 'background-size', 'contain');
        action.setCss(id, 'background-repeat', 'no-repeat');
        action.setCss(id, 'position', 'absolute');
    }, 0);
}

function addQuoteToScreen(div, id){
    // Creator only styles
    //none
    // Gives time for it to be added to the screen
    setTimeout(function(){
        action.setCss(id, 'font-size', '10px');
        action.setCss(id, 'width', '320px');
        action.setCss(id, 'height', '100px');
        action.setCss(id, 'white-space', 'pre-wrap');
    }, 0);
}

function addIconToScreen(div, id){
    // Creator only styles
    //none

    // Gives time for it to be added to the screen
    setTimeout(function(){
        action.setCss(id, 'position', 'absolute');
        action.setCss(id, 'top', '248px');
        action.setCss(id, 'left', '130px');
        action.setCss(id, 'width', '40px');
    }, 0);
}

function addToScreenDefaults(div, id){
    // Gives time for it to be added to the screen
    setTimeout(function(){
        action.setCss(id, 'position', 'absolute');
        action.setCss(id, 'z-index', '2');
        action.setCss(id, 'top', '248px');
        action.setCss(id, 'left', '130px');
        if(id.substring(0, 2) != 'ft'){
            action.setCss(id, 'font-family', 'helvetica');
        }
        action.setCss(id, 'font-size', '30px');
        action.setCss(id, 'color', 'white');
    }, 0);
}

function addFlipClockToScreen(div, id){
    setTimeout(function(){
        action.setCss(id, 'height', '100px');
        action.setCss(id, 'width', '250px');
        action.setCss(id, 'left', '0px');
        flipClock.create(div);
    },0);
}

function addCustomFontElemnetToScreen(div, id){
    setTimeout(function(){
        action.setCss(id, 'font-family', 'mat2');
    }, 0);
}


action.addtoScreen = function (id) { //when item is clicked from add panel
    var div = document.createElement('div'),
        divSelected,
        leftPos,
        rightPos,
        newLeftPos,
        spareEl,
        fontFam; //custom symbol font
    div.id = id;

    addToScreenDefaults(div, id);

    switch (id) {
        case 'avatarImage':
                addAvatarToScreen(div, id);
            break;
        case 'songalbumArt':
        case 'songalbumArtnohide':
                addAlbumArtToScreen(div, id);
             break;
        case 'quote1':
                addQuoteToScreen(div, id);
            break;
        case 'batterypie':
                /*
                    If the element is a batterypie we need to initiate and
                    create the svg counter part. This is done via the library
                    circleprogress https://github.com/tigrr/circle-progress 
                */
               setTimeout(function(){
                    batteryPie.setup(div);
               },0);
            break;
        case 'flipclock':
               addFlipClockToScreen(div, id);
            break;
        case 'icon':
        case 'day1icon':
        case 'day2icon':
        case 'day3icon':
        case 'day4icon':
        case 'hour1icon':
        case 'hour2icon':
        case 'hour3icon':
        case 'hour4icon':
        case 'hour5icon':
            addIconToScreen(div, id);
            break;
        case 'playmusic':
        case 'nextmusic':
        case 'prevmusic':
        case 'playmusichide':
        case 'playmusichide':
        case 'nextmusichide':
        case 'prevmusichide':
        case 'searchicon':
            addCustomFontElemnetToScreen(div, id);
            break;
        default:
            break;
    }

    if (id.substring(0, 3) === 'box') {
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.backgroundColor = 'red';
        //div.style.display = 'gray';
        div.style.zIndex = 1;
        div.style.borderColor = 'red';
        div.style.borderStyle = 'solid';
        div.style.borderWidth = '0px';
        if (id.substring(3, 9) === 'Circle') {
            div.style.borderRadius = '999px';
        }
    }
    if(id.substring(0, 7) === 'fpplace'){
        addPlaceHoldersToScreen(div, id);
    }
    document.getElementById('screenElements').appendChild(div);
    this.addDraggable(id);
    this.movedElements[id] = {};
    this.savedElements.placedElements = this.movedElements;
    if(id === 'durationbar'){
        setTimeout(function(){
            action.setCss(id, 'width', '100px');
            action.setCss(id, 'height', '10px');
            action.setCss(id, 'background-color', 'red');
            action.setCss(id, 'z-index', '3');
            action.setCss(id, 'border-color', 'red');
            action.setCss(id, 'border-style', 'solid');
            action.setCss(id, 'border-width', '0px');
            action.setCss(id, 'border-radius', '10px');
        },0);
    }
    if (id.substring(0, 3) === 'box') {
        this.savedElements.placedElements[id].width = '50px';
        this.savedElements.placedElements[id].height = '50px';
        this.savedElements.placedElements[id]['background-color'] = 'red';
        //this.savedElements.placedElements[id].display = 'gray';
        this.savedElements.placedElements[id]['z-index'] = 1;
        this.savedElements.placedElements[id]['border-color'] = 'red';
        this.savedElements.placedElements[id]['border-style'] = 'solid';
        this.savedElements.placedElements[id]['border-width'] = '0px';
        this.savedElements.placedElements[id].position = 'absolute';
        this.savedElements.placedElements[id].top = '248px';
        this.savedElements.placedElements[id].left = '130px';
        if (id.substring(3, 9) === 'Circle') {
            this.savedElements.placedElements[id]['border-radius'] = '999px';
        }
    }else {
        //for font symbol!
        if(id.substring(0, 2) === 'ft'){
            fontFam = id.split('_')[1].replace('F', '');
            action.setCss(id, 'font-family', fontFam);
        }
        if (id.substring(0,3) === 'tri'){ //triangle
            this.savedElements.placedElements[id]['border-left'] = '10px solid transparent';
            this.savedElements.placedElements[id]['border-right'] = '10px solid transparent';
            this.savedElements.placedElements[id]['border-bottom'] = '10px solid black';
            $('#' + id).css('border-left', '10px solid transparent');
            $('#' + id).css('border-right', '10px solid transparent');
            $('#' + id).css('border-bottom', '10px solid black');
        }
    }
    loadClock(); //in clock.js
    weatherdivs();
    systemdivs();
    miscDivs();
    symbolDivs();

    //For elements that are too long
    divSelected = $(div);
    leftPos = divSelected.position().left;
    rightPos = leftPos + divSelected.width();
    if (rightPos > 320) {
        newLeftPos = leftPos - (rightPos - 320);
        divSelected.css('left', newLeftPos > 0 ? newLeftPos : 0);
        this.savedElements.placedElements[id].left = newLeftPos > 0 ? newLeftPos : 0;
    }
    this.saveStorage();

    if (!action.isUndoingRedoing) {
        action.addAction(['addElement', [id]]);
    }
    try{ //if customDiv then no picker color.
        document.getElementById(id + 'Picker').style.backgroundColor = "#21b9b0"; //Add colored background to list element
        document.getElementById(id + 'Picker').style.borderColor = "#21b9b0";
    }catch(err){}

    if(div.id.substring(0, 9) === 'customDiv'){
        div.appendChild(document.getElementById(action.selectedItem));
        div.className = "customDiv";
        div.setAttribute('data-title', div.id);
    }

    if(div.id.substring(0, 11) === 'customPanel'){
        spareEl = document.getElementById(action.selectedItem);
        spareEl.style.top = 0;
        spareEl.style.left = 0;
        action.savedElements.placedElements[spareEl.id]['top'] = 0;
        action.savedElements.placedElements[spareEl.id]['left'] = 0;
        div.appendChild(spareEl);
        div.className = "customPanel";
        div.setAttribute('data-title', div.id);
    }

    //custom app
    if(id.substring(0,6) === 'bundle'){
        setupCustomApp(div, id);
    }
    action.saveStorage();
};

action.removeFromScreen = function (id) { //when trash for item is clicked or item is re-clicked in element menu
    if (action.selectedItems.length === 0) { // If it >0, then removeSelectedFromScreen handles the queueing
        if (!action.isUndoingRedoing) {
            action.addAction(['removeElement', [id, action.savedElements.placedElements[id]]]);
        } else {
            action.actionQueue[action.queuePosition][1] = [id, action.savedElements.placedElements[id]];
        }
    }
    action.selectedItem = id;
    singleButton.deleteItem();
};

action.removeSelectedFromScreen = function (toggleElementPanel) {
    var actionArr,
        i;
    if (action.selectedItems.length === 0) {
        action.removeFromScreen(action.selectedItem, toggleElementPanel);
    } else {
        actionArr = ['removeElement', []];
        for (i = 0; i < action.selectedItems.length; i += 1) {
            actionArr[1].push([action.selectedItems[i], action.savedElements.placedElements[action.selectedItems[i]]]);
            action.removeFromScreen(action.selectedItems[i], i === action.selectedItems.length - 1); // Only toggle elPanel if we're on the last item
        }
        action.addAction(actionArr);
    }
};
