/*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true,
  unparam: true
*/
/*global
  action,
  alert,
  handleScreenClick,
  constants,
  $
*/
/**
 * Draggable options for every element
 *
 *
 */

action.syncInputs = function (left, top) {
    try {
        var t = document.querySelector('.topInput'),
            l = document.querySelector('.leftInput');
        if(t){ //item may be dragged but not selected
            t.value = Math.round(top);
            l.value = Math.round(left);
        }
    } catch (err) {
        console.log(err);
    }
};

action.addDraggable = function (id) {
    var contain,
        iswidget,
        dragDistance = {};

    //widget may not load if offline
    if(widgetArray){
        if ($.inArray(id, widgetArray) != -1) {
          iswidget = true;
        }
    }

    if (id === 'icon' || iswidget === true || id.substring(0, 3) === 'tri') {
        contain = '';
    } else {
        //contain = $('.screen');
        contain = '';
    }
    /*var startX;
    var startY;*/

    $('#' + id).draggable({
        containment: contain,
        start: function (event, ui) {
            dragDistance = {
                top: ui.position.top,
                left: ui.position.left
            };
            /* if dLine class has title the same as id remove it */
            /* remove it on start to not mess with it's own movement */
            /* it will snap to itself this solves that issue */
            $(".dLine[title='" + id + "']").remove();
            if (action.selectedItem !== id) {
                handleScreenClick(event);
            }
            action.sizeQueueTimeout.initialValue = [$('#' + id).position().top, $('#' + id).position().left]; //Just borrowing it, nothing else will need this while you're moving an element
        },
        drag: function(event, ui){
            // var left = ui.position.left - dragDistance.left;
            // var top = ui.position.top - dragDistance.top;
            // var offsetL = 0;
            // var offsetT = 0;
            // var div;

            // console.log(action.selectedItem);
            // console.log(multiSelectedItems);
            // console.log(ui.position.left);
            // console.log('test');
            // if(multiSelectedItems.length > 0){
            //     for (var i = 0; i < multiSelectedItems.length; i++) {
            //         if(multiSelectedItems[i] != action.selectedItem){
            //             div = document.getElementById(multiSelectedItems[i]);
            //             offsetL = parseInt(div.style.left);
            //             console.log(parseInt(div.style.left));
            //             console.log(ui.position.left);
            //             console.log(parseInt(div.style.left) + ui.position.left);
            //             console.log(div);
            //             div.style.left = left + "px";
            //             div.style.top = top + "px";
            //             offsetL = 0;
            //             //div.style.left = Number(parseInt(div.style.left, 10)) + Number(ui.position.left) + "px";
            //             //console.log(Number(parseInt(div.style.left)) + Number(ui.position.left));
            //         }
            //     }
            // }
        },
        stop: function (event, ui) {

            var left = ui.position.left - dragDistance.left;
            var top = ui.position.top - dragDistance.top;
            var offsetL = 0;
            var offsetT = 0;
            var div;
            var placedEL = action.savedElements.placedElements[id];
            /*
                Testing multi selection
            */
            // console.log(action.selectedItem);
            // console.log(multiSelectedItems);
            // console.log(ui.position.left);
            // console.log('test');
            // if(multiSelectedItems.length > 0){
            //     for (var i = 0; i < multiSelectedItems.length; i++) {
            //         if(multiSelectedItems[i] != action.selectedItem){
            //             div = document.getElementById(multiSelectedItems[i]);
            //             offsetL = parseInt(div.style.left);
            //             console.log(parseInt(div.style.left));
            //             console.log(ui.position.left);
            //             console.log(parseInt(div.style.left) + ui.position.left);
            //             console.log(div);
            //             div.style.left = parseInt(div.style.left) + left + "px";
            //             div.style.top = parseInt(div.style.top) +top + "px";
            //             offsetL = 0;
            //             action.savedElements.placedElements[multiSelectedItems[i]].left = parseInt(div.style.left) + left + "px";
            //             action.savedElements.placedElements[multiSelectedItems[i]].top = parseInt(div.style.top) + top + "px";
            //             //div.style.left = Number(parseInt(div.style.left, 10)) + Number(ui.position.left) + "px";
            //             //console.log(Number(parseInt(div.style.left)) + Number(ui.position.left));
            //         }
            //     }
            // }

            var position = $('#' + id).position(),
                snapper,
                el;
            action.addAction(['setCss', [
                [id, ['top', 'left'], action.sizeQueueTimeout.initialValue, [position.top, position.left]]
            ]]);
            action.sizeQueueTimeout.initialValue = '';

            // Since we're not going through setCss, it's never saved to localStorage. Gotta do it manually

            action.syncInputs(position.left, position.top);


            placedEL.left = position.left;
            placedEL.top = position.top;
            action.saveStorage();

            /* So a random bug popped up, when an item is dragged it sets a height. WHY?
               Which means if you resize the font the bounding box didn't change. This fixes that.
             */
            // if (id.substring(0, 3) !== 'box' && id !== 'avatarImage' && id !== 'songalbumArt' && id !== 'songalbumArtnohide' && id.substring(3, 9) !== 'Circle' && $.inArray(id, widgetArray) == -1) { //don't change box //don't change circle
            //     $('#' + id).css('height', 'auto');
            // }

            if ($.inArray(id, widgetArray) != -1) { //fix for widgets not wanting to get right
              placedEL.left = ui.position.left;
              placedEL.top = ui.position.top;
              action.saveStorage();
            }

            /* Create a div around the element which can be used for snapping */
            localStorage.snap = null;
            if (localStorage.snap === 'true') {
                snapper = $('<div>', {
                    'class': 'dLine',
                    'title': id
                });
                el = $('#' + id);
                position = el.position();
                snapper.insertBefore(el);
                snapper.css({
                    top: position.top + 'px',
                    left: position.left + 'px',
                    width: el.width(),
                    height: el.height()
                });
            }

            if(!document.getElementById('bottomMenu')){
                bottomMenu.toggle();
            }else{
                bottomMenuButtons.adjust('BMmovetop', placedEL.top, false);
                bottomMenuButtons.adjust('BMmoveleft', placedEL.left, false);
            }
        },
        snap: '.dLine' //snap other items to that div.
    });
};
