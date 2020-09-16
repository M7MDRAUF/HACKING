(function(window, doc) {

    var currentMenu = "",
        menuObjectName = "nothing",
        menuHeight = 0,
        menuBottom = 0;


    function showScrollDetector(container) {
        /*
        	Detect when the element panel's height
        	is above a percent of the height.
        	#elementPanelContainer height is set to 34vh
        	35% of the height.

        	Added some padding to value so it wouldn't show when
        	the div overflowed just a little.

        */
        if (container.parentElement) {
            var scrollButton = doc.getElementById('elementScrollInfo'),
                elementPanel = doc.getElementById('elementPanelContainer'),
                state = 'none',
                percentValue = 35,
                percentOfHeight,
                padding = -20


            value = elementPanel.scrollHeight + padding;
            percentOfHeight = (screen.height / 100) * percentValue;

            if (value > percentOfHeight) {
                state = "block";
            }

            scrollButton.style.display = state;
        }
    }

    function animateButtons(div, on) {
        var lowValue = 0.8,
            normalValue = 1.0;

    	if(div.id === 'elementPanelContainer'){
            //dont animate the whole sceen
    		return;
    	}
        
        if (div) {
            div.style.transition = 'transform 0.2s ease-in-out';
            if (on) {
                div.style.webkitTransform = "scale(" + lowValue + ")";
            } else {
                div.style.webkitTransform = "scale(" + normalValue + ")";
            }
        }
    }

    function createRanges(obj, rangeAction, elementMenu){
        var input, holder, rangeOBJ, container;
        container = doc.createElement('div');
        container.className = 'rangeContainer';
        elementMenu.appendChild(container);
        doc.getElementById('elementInfoTitle').innerHTML = obj.name.replace('_', ' ');
        Object.keys(obj).forEach(function(key) {
            if (key != 'title' && key != 'name') {
                input = null;
                holder = null;
                holder = doc.createElement('div');
                input = document.createElement('input');
                input.style.width = '80%';
                input.id = key;
                holder.className = 'customRangeHolder';
                holder.title = key.replace('_', ' ').replace('_', ' ');
                holder.appendChild(input);
                container.appendChild(holder);
                rangeOBJ = new Powerange(input, {
                    callback: function(){
                        rangeAction(this); // use this to return the input
                    },
                    el: input, //use this to retrieve the value from the input
                    decimal: false,
                    min: obj[key].min,
                    max: obj[key].max,
                    start: obj[key].start,
                    step: obj[key].step,
                    hideRange: true,
                });
            }
        });
    }

    function loop(EP, container) {

        
        var div, inner, key1, appOnly = EP.appOnly, creatorOnly = EP.creatorOnly;
        currentMenu = EP;
        menuObjectName = EP.name;

        document.getElementById('elementInfoTitle').innerHTML = menuObjectName.replace('_', ' ');
        Object.keys(EP).forEach(function(key) {

            if(key === 'appOnly' || key === 'creatorOnly'){
                return;
            }

            if(!getIsInApp()){
                if(appOnly && appOnly.contains(key)){
                    return;
                }
            }
            
            if(getIsInApp()){
                if(creatorOnly && creatorOnly.contains(key)){
                    return;
                }
            }            
            
            if (key != 'title' && key != 'name') {

                div = document.createElement('span');
                div.title = key;


                //replacing this so we can have words with gaps.
                div.innerHTML = key.replace("_", " ").replace('_', ' ');

                if (key.includes("~")) {
                    key1 = key.split('~')[0];
                    inner = key.split('~')[1];
                    div.innerHTML = key1 + " " + inner;
                }

                div.className = "elementOption";

                //for font symbols
                if(key.indexOf('ft') > -1){
                    if(key.split('_')[1]){
                        div.style.fontFamily = key.split('_')[1].replace('F', '');
                        if(key.split('_')[1].replace('F', '') === 'entypo'){
                            div.style.fontSize = '35px';
                        }
                        div.style.textTransform = 'none';
                    }
                }

                //If item is a string
                if (typeof EP[key] === 'string') {
                    div.className = "String";
                    container.className = "selectView";
                    div.innerHTML = EP[key];
                    if (document.getElementById(key)) {
                        div.className = "String highLighted";
                    }
                }


                if (typeof EP[key] === 'function') {
                    div.className = "String";
                    container.className = "selectView";

                    //if elements it opens so add a sign it opens.
                    if(key === 'add_elements' || key === 'placed_Elements' || key === 'widgets' || key === 'history'){
                    	div.innerHTML = key.replace('_', ' ') + "<div class='itemFolder'></div>";
                    }
                    div.onclick = function(el){
                    	
                    	//if(key != 'clear_Screen' && key != 'upload' && key != 'widget'){
                    		EP[key]();
                    	//}
                    }
                }


                container.title = currentMenu;
                if (typeof EP[key] === 'object') {

                    div.title = key;
                    // CUSTOM 
                    // Remove the Elements text from ClockElements.
                    // Need to add it back when we trigger that menu.
                    if (key.includes('Elements')) {
                        div.innerHTML = key.split('Elements')[0];
                    }

                    //if element is an object is has a sub container. Can make it visible to users here
                    div.innerHTML = div.innerHTML + "<div class='itemFolder'></div>";

                    div.className = "elementOption Object";

                    //if key is an image set image
                    if (EP[key]) {
                        if (EP[key].image) {
                            div.style.backgroundImage = 'url("' + EP[key].image + '")';
                            div.className += ' elementImage';
                            div.innerHTML = "";
                        }
                    }

                    container.className = "objectView";
                    div.onclick = function(el) {
                        if (el.target.style.backgroundImage) {

                        } else {
                            currentMenu = el.target.title;
                            container.innerHTML = "";

                            //CUSTOM check if key exists as we removed it
                            //on ClockElements, WeatherElements, etc.
                            if (EP[key]) {
                                loop(EP[key], container);
                            } else if (EP[key + "Elements"]) {
                                loop(EP[key + "Elements"], container);
                            }
                        }

                    }


                }
                if(div.innerHTML === 'blank'){
                    div.style.opacity = 0;
                    div.style.pointerEvents = 'none';
                    div.innerHTML = "BLANK SPACE TO SEPARATE NEEDS TO BE BIG";
                }
                //console.log(container);
                container.appendChild(div);
            }
        });

        //hide back button on main pages
        if (currentMenu === menuPanel) { // currentMenu === elementPanel ||
            document.getElementById("elementBackButton").style.display = 'none';
        } else {
            document.getElementById("elementBackButton").style.display = 'block';
        }
        showScrollDetector(container);
        return container;
    }

    function addDragOption(dragBar){
    	$(dragBar).draggable({
      		axis: "y",
      		start: function(event, ui){
      			 menuHeight = 0;
      			 menuBottom = 0;
      		},
      		drag: function(event, ui){
      			var draggerTop = ui.position.top,
      				menuHeight = getComputedStyleInt('elementMenu', 'height'),
      				draggerPosFromBottom = screen.height - draggerTop - 33;
      				if(draggerPosFromBottom > screen.height - 100){
      					//$('#elementMenu').css('bottom', screen.height - menuHeight/2);
      					//dragBar.style.top = menuHeight/2 + "px";
      					return false;
      				}else if(draggerPosFromBottom < 30){
      					return false;
      				}else{
      					$('#elementMenu').css('bottom', draggerPosFromBottom);
      				}

      		},
      		stop: function(event, ui){
      			 menuHeight = getComputedStyleInt('elementMenu', 'height');
      			 menuBottom = getComputedStyleInt('elementMenu', 'bottom');
      		},
      		create: function(event, ui){
      			var elementDragger = document.getElementById('elementInfoDragger'),
      				paddingTop = getComputedStyleInt('elementMenu', 'padding-top'),
      				heightFromTop;

      			/*
      				MenuBottom how far the menu is from the bottom.
      				get screen height subtract the bottom: value of 
      				menuBottom. 

      				padding top is the padding the dragger is moved down.
      			*/
      			if(menuBottom){
      				heightFromTop = screen.height - menuBottom;
      				// Dragger
      				elementDragger.style.top = heightFromTop - paddingTop + "px";

      				//move menu to the dragger bar.
      				$('#elementMenu').css('bottom', screen.height - heightFromTop);
      			}else{
      				elementDragger.style.top = getTopValue() + "px";
      			}
      		}
      	})
    }
    function getTopValue(){
    	var menuHeight, top, paddingTop, paddingBottom, menuDiv, fin;
        	menuHeight = getComputedStyleInt('elementMenu', 'height');
        	top = parseInt($('#elementMenu').css('top'));
        	menuDiv = document.getElementById('elementMenu');
        	paddingTop = getComputedStyleInt('elementMenu', 'padding-top');
        	paddingBottom = getComputedStyleInt('elementMenu', 'padding-bottom');
        	fin = top + menuHeight + paddingTop;
        	return fin;
    }

    function removeDragBar(){
    	if(doc.getElementById('elementInfoDragger')){
    		document.body.removeChild(document.getElementById('elementInfoDragger'));
    	}
    }
    function removeMenu(){
        if(doc.getElementById('elementMenu')){
            document.body.removeChild(document.getElementById('elementMenu'));
        }
    }

    function loadItems(EP, backAction, clickAction) {
        var container = document.createElement('div');
        container.id = 'elementPanelContainer';
        container.ontouchstart = function(el) {
                animateButtons(el.target, true);
            },
            container.ontouchend = function(el) {
                animateButtons(el.target, false);
            },
            container.onclick = function(el) {
                clickAction(el);
            };
        container = loop(EP, container);
        return container;
    }

    function createMenuDiv(div){
        var el = document.createElement(div.type);
        el.id = div.id;
        el.className = div.class;
        el.innerHTML = div.html;
        el.title = div.title;
        div.container.appendChild(el);
        return el;
    }

    function createMenu(dictionary, backAction, clickAction, rangeAction) {
    	removeDragBar();
        removeMenu();

        var elementMenu, close, back, scrolls, info, dragBar;

        elementMenu = createMenuDiv({
            type: 'div',
            id: 'elementMenu',
            html: '',
            title: '',
            class: "elementMenu menuFadeIn",
            container: document.body
        });

        close = createMenuDiv({
            type: 'div',
            id: '',
            html: '',
            title: '',
            class: 'elementCloseButton',
            container: elementMenu
        });

        back = createMenuDiv({
            type: 'div',
            id: 'elementBackButton',
            html: '',
            title: '',
            class: 'elementBackButton',
            container: elementMenu
        });

        scrolls = createMenuDiv({
            type: 'div',
            id: 'elementScrollInfo',
            html: '&darr;',
            title: '',
            class: 'elementScrollInfo',
            container: elementMenu
        });

        close.addEventListener('touchend', function() {
            closeElementMenu();
        });

        back.addEventListener('click', function(el) {
            backAction(el);
        });
        scrolls.addEventListener('click', function(el) {
            //does nothing right now.
        });

        dragBar = createMenuDiv({
            type: 'div',
            id: 'elementInfoDragger',
            html: '',
            title: 'drag',
            class: "elementInfoDragger menuFadeIn",
            container: document.body
        });

        info = createMenuDiv({
            type: 'div',
            id: 'elementInfoTitle',
            html: '',
            title: '',
            class: "elementInfoTitle",
            container: elementMenu
        });

        if(rangeAction){
            createRanges(dictionary, rangeAction, elementMenu);
        }else{
            elementItemsContainer = loadItems(dictionary, backAction, clickAction);
            elementMenu.appendChild(elementItemsContainer);
        }
        addDragOption(dragBar);
    }


    function closeElementMenu() {
        // moveGrabber is square that moves everything from moveAll.
    	var moveAllElementsSquare = document.getElementById('moveGrabber'),
            elementDiv = document.getElementById('elementMenu'),
            dragBar = document.getElementById('elementInfoDragger'),
            delayForAnimation = 100;

        /* animate */
        if(elementDiv){
           elementDiv.className += " menuFadeOut";
        }
        if(dragBar){
           dragBar.className += " menuFadeOut";
        }

        if(moveAllElementsSquare || elementDiv){
            setTimeout(function(){
                if(moveAllElementsSquare){
                     doc.body.removeChild(moveAllElementsSquare);
                }

                if(elementDiv){
                    // since there is a time out make sure it's the same
                    if(elementDiv === document.getElementById('elementMenu')){
                        doc.body.removeChild(elementDiv);
                        removeDragBar();
                    }
                }

            }, delayForAnimation);
        }

        setTimeout(function(){
            if(elementDiv){
               elementDiv.classList.remove('menuFadeOut');
            }
            if(dragBar){
                dragBar.classList.remove('menuFadeOut');
            }
        }, delayForAnimation*2);
    }

    function loadNewMenu(object, div){
        div.innerHTML = "";
        menuLayout.loop(object, div);
    }

    function loadMainMenu(){
        //menuLayout.close();
        mainMenu.create();
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.generateMenu = function(obj) {
            createMenu(obj.dict, obj.backAction, obj.clickAction, obj.rangeAction);
        };
        externalMethods.loop = function(obj, container) {
            loop(obj, container);
        };
        externalMethods.setCurrentMenu = function(el) {
            currentMenu = el;
        };
        externalMethods.getMenuObjectName = function() {
            return menuObjectName;
        };
        externalMethods.getCurrentMenu = function(el) {
            return currentMenu;
        };
        externalMethods.close = function() {
            closeElementMenu();
        };
        externalMethods.loadNewMenu = function(object, div){
            loadNewMenu(object, div);
        };
        externalMethods.loadMainMenu = function(){
            loadMainMenu();
        };
        return externalMethods;
    }
    window.menuLayout = initExternalMethods();
}(window, document));