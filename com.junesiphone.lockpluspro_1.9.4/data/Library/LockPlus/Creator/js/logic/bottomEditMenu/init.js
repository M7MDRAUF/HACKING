(function(window, doc) {

	var lastBottomMenuPosition = null;


	function createDiv(div){
		var el = document.createElement(div.type);
	    el.id = div.id;
	    el.className = div.class;
	    el.innerHTML = div.html;
	    div.container.appendChild(el);
	    return el;
	}

	function resetToDragPosition(){
		if(lastBottomMenuPosition){
			doc.getElementById('bottomMenu').style.top = lastBottomMenuPosition + 10 + 'px';
	    	doc.getElementById('miniMenu').style.top = lastBottomMenuPosition - 30 + 'px';
	    	doc.getElementById('editDragger').style.top = lastBottomMenuPosition + 'px';
		}
	}

	function upsizeMenuToggle(menuDIV, dragger, miniMenu, button){
	    function upsizeMenu(){
	        menuDIV.style.height = '85%';
	        dragger.style.opacity = miniMenu.style.opacity = 0;
	        button.innerHTML = '&darr;';
	        menuDIV.style.top = 'auto';
	    }
	    function downsizeMenu(){
	        menuDIV.style.height = '200px';
	        dragger.style.opacity = miniMenu.style.opacity = 1;
	        button.innerHTML = '&uarr;';
	        resetToDragPosition();
	    }

	    if(menuDIV.style.height != '85%'){
	        upsizeMenu();
	    }else{
	        downsizeMenu();
	    }
	}

	function loadSavedPositions(draggerTop, bottomTop, miniTop){
		document.getElementById('editDragger').style.top = draggerTop
    	document.getElementById('bottomMenu').style.top = bottomTop;
        document.getElementById('miniMenu').style.top = miniTop;
    }

	function createBottomMenu(){
		var mainMenu, dragger, upsize, miniMenu,
	    dragOffset = 10,
	    miniMenuOffset = 30,
	    savedPositions = null;
	    mainMenu = createDiv({
	        type: 'div',
	        id: 'bottomMenu',
	        html: '',
	        class: action.selectedItem + "Menu",
	        container: document.body
	    });
	    miniMenu = createDiv({
	        type: 'div',
	        id: 'miniMenu',
	        html: '',
	        class: "miniMenu",
	        container: document.body
	    });
	    dragger = createDiv({
	        type: 'div',
	        id: 'editDragger',
	        html: 'DragMe!',
	        class: '',
	        container: document.body
	    });
	    mainMenuUL = createDiv({
	        type: 'ul',
	        id: 'bottomMenuUL',
	        html: '',
	        class: '',
	        container: mainMenu
	    });
	    upsize = createDiv({
	        type: 'div',
	        id: '',
	        html: '&uarr;',
	        class: 'upsizer',
	        container: mainMenu
		}),
		closeMenu = createDiv({
	        type: 'div',
	        id: '',
	        html: 'X',
	        class: 'closeMenu',
	        container: mainMenu
		});

	    //add events
	    upsize.onclick = function(){
	        upsizeMenuToggle(mainMenu, dragger, miniMenu, this);
		};
		closeMenu.onclick = function(){
			bottomMenu.closeBottomMenu();
			deselectScreenElement(action.selectedItem, true);
		};
	    mainMenu.ontouchmove = function(){
	        action.isScrollingEdit = true;
	    };
	    mainMenu.ontouchend = function(){
	        action.isScrollingEdit = false;
	    };

	    //disable menuExtender
	    upsize.style.display = 'none';

	    savedPositions = {
	    	bottomMenu: 0,
	    	miniMenu: 0,
	    	dragger: 0
	    };


	    if(localStorage.editMenuPositions){
	    	var obj = JSON.parse(localStorage.editMenuPositions);
	    	savedPositions = obj;
	    	loadSavedPositions(savedPositions['dragger'],savedPositions['bottomMenu'], savedPositions['miniMenu']);
	    }

	    //allow dragging
	    $(dragger).draggable({
	        axis: "y",
	        drag: function (event, ui) {
	            if (ui.position.top > screen.height - 240) {
	                ui.position.top = screen.height - 240;
	            } else if (ui.position.top < 60) {
	                ui.position.top = 60;
	            }
	            //record position of menu
	            lastBottomMenuPosition = ui.position.top;

	            savedPositions['bottomMenu'] = ui.position.top + dragOffset;
	        	savedPositions['miniMenu'] = ui.position.top - miniMenuOffset;
	        	savedPositions['dragger'] = ui.position.top;

	            //need to get the actual menu
	            document.getElementById('bottomMenu').style.top = ui.position.top + dragOffset;
	            document.getElementById('miniMenu').style.top = ui.position.top - miniMenuOffset;

	        },
	        stop: function(){
	        	localStorage.editMenuPositions = JSON.stringify(savedPositions);
	        }
	    });

	    resetToDragPosition();

	    /* Initialize buttons */
	    bottomMenuLayout.layoutSettings();
	}

	function closeBottomMenu(){
		if(document.getElementById('bottomMenu')){
			triButtons.removeEvents();
			removeFromDOM('bottomMenu');
			removeFromDOM('miniMenu');
			removeFromDOM('editDragger');
		}
	}
	function openBottomMenu(){
		var editDragger;
		triButtons.removeEvents();
		menuLayout.close();
		closeBottomMenu(); // make sure it doesn't exist.
		createBottomMenu();
		editDragger = doc.getElementById('editDragger');
		editDragger.style.display = 'block';
	}
	function toggleBottomMenu(){
		if(document.getElementById('bottomMenu')){
			closeBottomMenu();
		}else{
			if(action.selectedItem !== ''){
				openBottomMenu();
			}
		}
	}

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.toggle = function(){
            toggleBottomMenu();
        };
        externalMethods.closeBottomMenu = function(){
        	closeBottomMenu();
        };
        return externalMethods;
    }
    window.bottomMenu = initExternalMethods();
}(window, document));


