//TODO cleanup
var loadedStoredElements = false;

function doOnLoad(){
    loadedStoredElements = true;
    action.loadFromStorage(); //load elements that are stored
    setTimeout(function () {
        action.zoomScale = screen.width / 320;
        switch (window.innerWidth) {
        case 375:
            action.zoomScale = 1.18;
            break;
        case 414:
            action.zoomScale = 1.3;
            break;
        case 768:
            action.zoomScale = 1.8;
            break;
        }
    }, 0); //if going to load immediately wait for everything visible to show first.
}
//event listeners
window.onload = function () {
    if(!this.loadedStoredElements){
        doOnLoad();
    }
}

//just in case window doesn't load (fonts)
setTimeout(function(){
    if(!loadedStoredElements){
        doOnLoad();
    }
},1000);

//for web might break.
if(!mobilecheck()){
    $('#font').on('click', function (event) {
        if (fontMoving == true) {
            fontMoving = false;
        } else {
            if ($(event.target).is('li')) {
                action.setFont(event.target.title);
            } else {
                action.cgfont();
            }
        }
    });
}

function closeMenus(){
    if (!action.isScrollingEdit) {
        handleScreenClick(event);
        shadowMenu.removeMenu();
        reflectionMenu.removeMenu();
        jsWidgets.removeWidgetMenu();
        bottomMenu.toggle();
        if(event.target.className === 'screen'){
            menuLayout.close();
        }
        $('.sidePanel').css('display', 'none');
    }
    // multiSelectedItems = [];
    // if(multiSelectedItems.length > 0){
    //     for (var i = 0; i < multiSelectedItems.length; i++) {
    //         document.getElementById(multiSelectedItems[i]).style.outline = '1px solid transparent';
    //     }
    // }
}

$('.screen').click(function (event) {
    closeMenus();
});

function deselectScreenElement(item, fullClear){
        $('#leftSelector').attr('title', 'Main Menu');
        $('#' + item).css('outline', '0px solid transparent'); // Remove the highlight
        if (fullClear) {
            //action.showIconMenu(constants.toolArray, -1); // Show the base toolArray
            action.selectedItem = ""; // Clear the selected item
            $('#font').css('display', 'none');
        }
        bottomMenu.toggle();
}

function handleScreenClick(event) {

    var id = event.target.id,
        si = action.selectedItem;

    if (id === '' && si != '') { // Clicked on the empty screen
        deselectScreenElement(action.selectedItem, true); //Doesn't hurt to do this once more, to do the full deselect

    } else if (id != 'screen' && id != '') { //If you clicked on something...
        if (id === si) {
            /* Did they click the currently selected item */
            deselectScreenElement(si, true);
        } else {
            /* User clicked on another element. */
            deselectScreenElement(si, false); // Unhighlight the old element
            action.selectedItem = event.target.id; // Set the selected item to the new element
            $('#' + event.target.id).css('outline', '1px solid white'); // Highlight new element
           // if (action.selectedItem === '') $('.elementPanel').data('prevHiddenState', $('.elementPanel').is(':visible')); // Save the panel's previous state, but only if switching to a new element
        }
    }else{
        if(id === 'screen'){
            /* If its the screen then just deselect the item */
            deselectScreenElement(action.selectedItem, true);
        }
    }
}

$('#bgInput').on('change', function (e) {
    action.uploadedImage(e);
});


/* grid stuff */
function createGrid(sizeleft, sizetop) {
    var i,
        sel = $('.grids'),
        height = sel.height(),
        width = sel.width(),
        ratioW = Math.floor(width / sizeleft),
        ratioH = Math.floor(height / sizetop);

    for (i = 0; i <= ratioW; i++) { // vertical grid lines
        $('<div />').css({
                'top': 0,
                'left': i * sizetop,
                'width': 1,
                'height': height
            })
            .addClass('gridlines')
            .appendTo(sel);
    }

    for (i = 0; i <= ratioH; i++) { // horizontal grid lines
        $('<div />').css({
                'top': i * sizeleft,
                'left': 0,
                'width': width,
                'height': 1
            })
            .addClass('gridlines')
            .appendTo(sel);
    }

    $('.gridlines').show();
}


//createGrid(constants.gridSizeLeft,constants.gridSizeTop);
