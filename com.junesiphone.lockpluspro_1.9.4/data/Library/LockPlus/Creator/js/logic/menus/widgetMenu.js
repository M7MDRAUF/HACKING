(function(window, doc){

	var widgetObject;

	/* loading this file includes the array */
	function loadWidgetList(){
		var link = 'https://lockplus.us/creator/widgets/resources/widget.js?' + Date.now(),
			fileref = doc.createElement('script');
		fileref.setAttribute("type", "text/javascript");
	    fileref.setAttribute("src", link);
	    fileref.async = true;
	    if (fileref !== "undefined") {
	        doc.getElementsByTagName("head")[0].appendChild(fileref);
	    }
	}
	loadWidgetList();

	function loadWidgetJS (id) {
	    var link = 'https://lockplus.us/creator/widgets/images/' + id + '.js?' + Date.now(),
	    fileref = document.createElement('script');
	    fileref.setAttribute("type", "text/javascript");
	    fileref.setAttribute('title', 'widgetScript');
	    fileref.setAttribute("src", link);
	    fileref.async = true;
	    if (fileref !== "undefined") {
	        doc.getElementsByTagName("head")[0].appendChild(fileref);
	    }
	    fileref.onload = function () {
	    	var widgetDiv = doc.getElementById(id);
	    		addWidgetToMovedElements(id);
	            action.savedElements.placedElements = action.movedElements;
	            replaceWidget(id, widgetDiv);
	    };
	}

	function removeWidgetMenu(){
		var widgetList = doc.getElementById('widgetlist');
		if(widgetList){
			widgetList.removeEventListener('click', widgetListClicked, false);
			doc.body.removeChild(widgetList);
		}
	}

	function addWidgetToPage (id, replace) {
		var widget = doc.getElementById(id);
	    if (!widget) {
	        removeWidgetMenu();
	        loadWidgetJS(id, false);
	    } else {
	    	widget.parentElement.removeChild(widget);
	    	removeWidgetMenu();
	        loadWidgetJS(id, false);
	    }
	    if (!replace) {
	        if (isios2) {
	            localStorage.setItem('ALTplacedElements', JSON.stringify(action.savedElements));
	        } else {
	            localStorage.setItem('placedElements', JSON.stringify(action.savedElements));
	        }
	    }
	    action.widgetLoaded = true;
	}

	function widgetListClicked(el){
		addWidgetToPage(el.target.title);
		//removeWidgetMenu();
	}

	// function createWidgetList(){
	// 	var div = doc.createElement('div');
	// 	div.id = 'widgetlist';
	// 	div.addEventListener('click', widgetListClicked, false);
	// 	doc.body.appendChild(div);
	// 	return div;
	// }

	// function loadWidgetPreviews(widgetList){
	// 	var i, divimg, imgs;
	// 	for (i = 0; i < widgetArray.length; i++) {
	//         divimg = doc.createElement('div');
	//         divimg.className = 'divimg';
	//         imgs = doc.createElement('img');
	//         imgs.src = 'http://lockplus.us/creator/widgets/images/' + widgetArray[i] + '.jpg';
	//         imgs.title = widgetArray[i];
	//         divimg.appendChild(imgs);
	//         widgetList.appendChild(divimg);
	//     }
	// }
	// function showWidgetPreview(url){
	// 	var widgetPreview = doc.createElement('div');
	// 		widgetPreview.className = 'widgetPreviewImage';
	// 		widgetPreview.style.backgroundImage = url.target.style.backgroundImage;
	// 		doc.body.appendChild(widgetPreview);

	// 		console.log(url.target);
	// 		//menuLayout.close();

 //        	//widgetListClicked(el);
	// }
	function showWidgets() {
		widgetObject = {
			name: "widgetPanel"
		};

		if(widgetArray.length > 0){
			for (var i = 0; i < widgetArray.length; i++) {
				widgetObject[widgetArray[i]] = {};
				widgetObject[widgetArray[i]]['image'] = 'https://lockplus.us/creator/widgets/images/' + widgetArray[i] + '.jpg';
			}

		    menuLayout.generateMenu({
	    		dict: widgetObject,
	    		backAction: function(){
	    			mainMenu.create();
	    		},
	    		clickAction: function(el){
	    			menuLayout.close();
	    			widgetListClicked(el);
	    		}
	    	});
		}else{
			jPopup({
		        type: "alert",
		        message: "There is no widgets, are you offline?",
		        yesButtonText: "OK",
		        functionOnOk: function() {
		            //do something on ok
		        }
		    });
		}
	}

	function replaceWidget(widgetName, div) {
	    var value = action.savedElements.placedElements[widgetName];
	    	div.style.top = '200px'; //default
	    	action.addDraggable(widgetName);
	    Object.keys(value).forEach(function(skey) { //loop styles on the object
	        var styleVal = value[skey];
	        if (skey != 'type') {
	            div.style.cssText += skey + ":" + styleVal;
	        }
	    });
	}

	function addWidgetToMovedElements(id){
		/* 
			if the widget object already exists just add type 
			otherwise create a new object for the widget with the type
		*/
		if (action.movedElements[id]) {
            action.movedElements[id].type = "widget";
        } else {
            action.movedElements[id] = {
                type: 'widget'
            };
        }
	}

	function initExternalMethods(){
        var externalMethods = {};
        externalMethods.showWidgets = function(){
        	//menu.toggle();
            showWidgets();
        };
        externalMethods.removeWidgetMenu = function(){
        	removeWidgetMenu();
        };
        externalMethods.addWidgetToPage = function(id, replace){
        	addWidgetToPage(id, replace);
        };
        return externalMethods;
    }
    window.jsWidgets = initExternalMethods();
}(window, document));