action.clearTheme = function() {
    if (isios2) {
        localStorage.removeItem('ALTplacedElements');
    } else {
        localStorage.removeItem('placedElements');
    }
    action.savedElements = {};
    action.movedElements = {};
    action.selectedItem = '';
    $('#screenElements').empty();
    $('.newSVG').remove();
    $(".svg").remove();
    $('.screenoverlay').css('background-image', '');
    $('.screen').prepend('<img class="svg"/>');
    action.widgetLoaded = false;

    //Clear undo/redo stuff
    action.actionQueue = [];
    action.queuePosition = -1;
    action.isUndoingRedoing = false;
    action.sizeQueueTimeout = {
        timeout: null,
        isTimeoutRunning: false,
        previousCssKey: '',
        previousAction: null,
        initialValue: ''
    };
    menuLayout.close();
}