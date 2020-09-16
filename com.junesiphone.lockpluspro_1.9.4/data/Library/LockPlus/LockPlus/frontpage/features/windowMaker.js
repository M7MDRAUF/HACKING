/*

Usage:

center, centerHorizontally, centerVertically

var preview = basicWindow.makeWindow({
    title: 'Testing',
    id: 'pagePreview',
    className: 'pagePreview',
    width: 350,
    height: 350,
    bgcolor: 'green',
    color: 'white',
    center: true,
    backButton:true,
    backTo: function(){
        console.log("Back Pressed");
    },
    beforeRemove: function(){
        
    }
});
basicWindow.removeWindow(preview);

creates a basic window with a close button and title
*/

(function(window, doc) {
    var windowList = [];
    var dragButtonList = [];
    var lastBottomPosition = null;

    function backPressed(el){
        for (var i = 0; i < windowList.length; i++) {
            if(windowList[i].id === el.target.title){
                if(windowList[i].backTo){
                    windowList[i].backTo();
                }
            }
        }
    }

    function removeDrag(el){
        var div = document.getElementById('windowInfoDragger' + el);
        $(div).draggable("destroy");
        div.parentElement.removeChild(div);
    }

    /*
        closedPress
        * attribute : el
        * can be either an id or an element.
    */
    function closePressed(el){
        var elementID = "";
            if(el.target){
                elementID = el.target.parentElement.id;
            }else{
                elementID = el;
            }

        for (var i = 0; i < windowList.length; i++) {
            if(el.target){
                if(windowList[i].id === elementID){
                    removeDrag(elementID);
                    /*
                        windowList[i].beforeRemove

                        Tell whatever made this window
                        that it's closing so the other
                        view can remove any events.
                    */
                    if(windowList[i].beforeRemove){
                        windowList[i].beforeRemove(elementID);
                    }
                    windowList.splice(i, 1);
                }
            }else{
                if(windowList[i].id === elementID){
                    removeDrag(elementID);
                    if(windowList[i].beforeRemove){
                        windowList[i].beforeRemove(elementID);
                    }
                    windowList.splice(i, 1);
                    elementID = el;
                }
            }
        }
        EventsController.removeEvents({
            label: elementID
        });
        if(doc.getElementById(elementID)){
            doc.body.removeChild(doc.getElementById(elementID));
        }
    }

    function getTopValue(id){
    	var menuHeight, top, paddingTop, paddingBottom, menuDiv, fin;
        	menuHeight = getComputedStyleInt(id, 'height');
        	top = parseInt($('#' + id).css('top'));
        	menuDiv = document.getElementById(id);
        	paddingTop = getComputedStyleInt(id, 'padding-top');
        	paddingBottom = getComputedStyleInt(id, 'padding-bottom');
        	fin = top + menuHeight + paddingTop;
        	return fin;
    }

    function addDragOption(dragBar, windowElement){
        var menuHeight, menuBottom;
        
    	$(dragBar).draggable({
      		axis: "y",
      		start: function(event, ui){
      			menuHeight = 0;
                menuBottom = 0;
      		},
      		drag: function(event, ui){
      			var draggerTop = ui.position.top,
                      draggerPosFromBottom = screen.height - draggerTop - 33;
                      menuHeight = getComputedStyleInt(windowElement.id, 'height');
      				if(draggerPosFromBottom > screen.height - 100){
      					//$('#elementMenu').css('bottom', screen.height - menuHeight/2);
      					//dragBar.style.top = menuHeight/2 + "px";
      					return false;
      				}else if(draggerPosFromBottom < 30){
      					return false;
      				}else{
      					$('#' + windowElement.id).css('bottom', draggerPosFromBottom);
      				}

      		},
      		stop: function(event, ui){
      			menuHeight = getComputedStyleInt(windowElement.id, 'height');
                menuBottom = getComputedStyleInt(windowElement.id, 'bottom');
                lastBottomPosition = windowElement.style.bottom;
                   
      		},
      		create: function(event, ui){
      			var elementDragger = dragBar,
      				heightFromTop;
      			/*
      				MenuBottom how far the menu is from the bottom.
      				get screen height subtract the bottom: value of 
      				menuBottom. 

      				padding top is the padding the dragger is moved down.
                  */
                var menuBottom = getComputedStyleInt(windowElement.id, 'bottom');
      			if(menuBottom){
                    heightFromTop = (screen.height - menuBottom - 32);
                      // Dragger
                    elementDragger.style.top = heightFromTop + "px";
                    elementDragger.style.left = getComputedStyleInt(windowElement.id, 'left') + "px";
      				//$('#' + windowElement.id).css('bottom', screen.height - heightFromTop);
      			}else{
      				elementDragger.style.top = getTopValue(windowElement.id) + "px";
      			}
      		}
      	})
    }

    function basicWindow(obj){
        windowList.push(obj);
        var container = createDOM({
            type: 'div',
            id: obj.id,
            className: obj.className + ' windowContainer',
            attribute: ['title', '']
        }),
        closeButton = createDOM({
            type: 'div',
            id: '',
            innerHTML: '',
            className: 'windowClose',
            attribute: ['title', '']
        }),
        title = createDOM({
            type: 'div',
            id: '',
            innerHTML: obj.title,
            className: 'windowTitle windowTitle',
            attribute: ['title', '']
        }),
        backButton = createDOM({
            type: 'div',
            id: 'windowBackButton',
            attribute: ['title', obj.id],
            className: "windowBackButton"
        }),
        dragBar = createDOM({
            type: 'div',
            id: 'windowInfoDragger' + obj.id,
            attribute: ['title', 'drag'],
            className: "windowInfoDragger menuFadeIn"
        });
        dragButtonList.push(dragBar.id);

        if(obj.center){
            container.style.left = 10 + "px";
            container.style.bottom = screen.height/2 - obj.height/2 + "px";
        }
        if(obj.centerHorizontally){
            container.style.left = 10 + "px";
        }
        if(obj.centerVertically){
            container.style.bottom = 10 + "px";
        }
    
        container.style.position = "absolute";
        // getComputedVal()
        // dragBar.style.left = obj.width + "px";
        container.style.width = obj.width + "px";
        container.style.height = obj.height + "px";

        //reset menu to last position
        if(lastBottomPosition){
            container.style.bottom = lastBottomPosition;
        }

        if(obj.bgcolor){
            container.style.backgroundColor = obj.bgcolor;
        }

        EventsController.addEvent(closeButton, {
            event: 'click',
            callback: closePressed,
            label: obj.id
        });
        container.appendChild(closeButton);

        if(obj.backButton && obj.backTo){
            container.appendChild(backButton);
            EventsController.addEvent(backButton, {
                event: 'click',
                callback: backPressed,
                label: obj.id
            });
        }

        container.appendChild(title);
        //container.style.cssText = "position:absolute;width:"+obj.width+"px;height:"+obj.height+"px;background-color:"+obj.bgcolor+";";

        doc.body.appendChild(container);
        doc.body.appendChild(dragBar);
        addDragOption(dragBar, container);
        return container;
    }

    function removeAllWindows(){
        try{
            for (var i = 0; i < windowList.length; i++) {
                closePressed(windowList[i].id);
            }
        }catch(err){
            console.log(err);
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.makeWindow = function(obj) {
            return basicWindow(obj);
        };
        externalMethods.removeWindow = function(el) {
            closePressed(el.id);
        };
        externalMethods.removeWindowById = function(id) {
            closePressed(id);
        };
        externalMethods.removeAllWindows = function() {
            removeAllWindows();
        };
        externalMethods.getLastPosition = function(){
            return lastBottomPosition;
        };
        return externalMethods;
    }
    window.basicWindow = initExternalMethods();
  }(window, document));


//   setTimeout(function(){
//     var preview = basicWindow.makeWindow({
//         title: 'Testing',
//         id: 'pagePreview',
//         className: 'pagePreview',
//         width: 350,
//         height: 350,
//         bgcolor: 'green',
//         color: 'white',
//         center: true,
//         backButton:true,
//         backTo: function(){
//             console.log("Back Pressed");
//         }
//     });
//   },100);
