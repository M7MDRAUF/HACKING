(function(window, doc){

    var animationInfo = [];
    var eventsAdded = [];
    var menuName = 'shadowMenu';
    var shadowSelected = null;

    function addEvent(obj){
        if(obj.type){
            obj.element.addEventListener(obj.type, obj.action);
            eventsAdded.push(obj);
        }
    }

    function setSelected(div){
        div.style.border = '1px solid white';

        var element = document.getElementById('windowButtonHolder');
        for (var i = 0; i < element.children.length; i++) {
           element.children[i].classList.remove('inactive');
        }
    }

    function setDeselected(div){
        div.style.border = '1px solid transparent';
    }

    function liClicked(el){
        var li = doc.getElementById('shadowHolder');
            shadowSelected = el.target.title;
            for (var e = 0; e < li.children.length; e++) {
                setDeselected(li.children[e]);
                if(li.children[e] === el.target){
                    setSelected(li.children[e]);
                }
            }
    }
    

    function makeAndAppendMenu(id){
        var menu = doc.createElement('div');
            menu.id = id;
            menu.className = 'menuThreeInputsOneButton';
            menu.style.height = "900px!important";
            doc.body.appendChild(menu);
            document.getElementById('shadowMenu').style.height = "350px";
        return menu;
    }

    function loadElementAnimation(el){
        animationInfo = [];
        animationInfo.push({
            xVal: el['transformX'] || 0,
            yVal: el['transformY'] || 0,
            rotateVal: el['transformRotate'] || 0,
            speedVal: el['aniUp'] || 1000,
            origin: el['transformOrigin'] || 'center center',
            delay: el['delay'] || 0,
            fade: el['fade'] || '',
            fadeTime: el['fadeTime'] || 1000,
        });
    }

    /*/// */
    function previewStringFromAnimationObject(animationObject){
        var string = "",
            temp = "";
            Object.keys(animationObject).forEach(function(key){
                if(key === 'transform'){
                    innerObj = animationObject[key];
                    string += "x: <span style='pointer-events:none;font-weight:500;'>" + innerObj.xVal + "</span> |";
                    string += " y: <span style='pointer-events:none;font-weight:500;'>" + innerObj.yVal + "</span> |";
                    string += " rotate: <span style='pointer-events:none;font-weight:500;'>" + innerObj.rotateVal + "</span> |";
                }else{
                    temp = key;
                    if(key === 'speedVal'){
                        temp = 'speed'
                    }
                    string += " " + temp + ": <span style='pointer-events:none;font-weight:500;'>" + animationObject[key] + "</span> |";
                }
            });
        return string;
    }

    /*/// */
    function loadAnimationInfo(animation, holder, loadLI){
        var li2;
        animationInfo = [];
        for (var i = 0; i < animation.length; i++) {
            animationInfo.push(animation[i]);
            if(loadLI){
                li2 = doc.createElement('li');
                li2.title = i;
                li2.style.height = 'auto';
                li2.style.fontSize = "16px";
                li2.innerHTML = previewStringFromAnimationObject(animation[i]);
                li2.style.padding = "10px";
                addEvent({
                    type: 'click',
                    action: liClicked,
                    element: li2
                });
                holder.appendChild(li2);
            }
        }
    }

    function createShadowHolder(){

        var holder = doc.createElement('ul'),
            li = doc.createElement('li'),
            elS = action.savedElements.placedElements[action.selectedItem],
            style,
            li2,
            string = "";

            style = elS['aniUp'];

            addEvent({
                type: 'click',
                action: liClicked,
                element: li
            });

            holder.className = 'shadowHolder';
            
            holder.id = 'shadowHolder';

            if(elS['transformAnimation']){
               loadAnimationInfo(elS['transformAnimation'], holder, true);
            }else if(style){
                if(elS['transformX']){
                    string += elS['transformX'] + 'px ';
                }else{
                    string += '0px ';
                }
                if(elS['transformY']){
                    string += elS['transformY'] + 'px ';
                }else{
                    string += '0px ';
                }
                if(elS['transformRotate']){
                    string+= elS['transformRotate'] + 'deg ';
                }else{
                    string += '0deg ';
                }
                if(elS['aniUp']){
                    string += elS['aniUp'] + ' ';
                }else{
                    string += '1000 ';
                }
                if(elS['transformOrigin']){
                    string += elS['transformOrigin'];
                }else{
                    string += 'center center ';
                }
                if(elS['delay']){
                    string += elS['delay'];
                }else{
                    string += '0 ';
                }
                if(elS['opacity']){
                    string += els['opacity'];
                }else{
                    string += 1;
                }
                loadElementAnimation(elS);
                for (var e = 0; e < animationInfo.length; e++) {
                    li2 = doc.createElement('li');
                    li2.title = e;
                    li2.innerHTML = string;
                    addEvent({
                        type: 'click',
                        action: liClicked,
                        element: li2
                    });
                    holder.appendChild(li2);
                }
                //parseStyleToObject(style);
            }
        return holder;
    }

    function selectNextLI(){
        var li = doc.getElementById('shadowHolder');
        for (var e = 0; e < li.children.length; e++) {
            setDeselected(li.children[e]);
            if(Number(li.children[e].title) === Number(shadowSelected) + 1){
                liClicked({
                    target: li.children[e]
                });
            }
        }
    }

    function saveAnimation(){
        action.savedElements.placedElements[action.selectedItem]['transformAnimation'] = animationInfo;
        action.saveStorage();
    }

    function updateLIshadowInnerHTML(){
        var liHolder = doc.getElementById('shadowHolder'),
            li2;
            liHolder.innerHTML = "";
            for (var i = 0; i < animationInfo.length; i++) {
                li2 = doc.createElement('li');
                li2.title = i;
                li2.style.height = "auto";
                li2.style.fontSize = "16px";
                li2.style.padding = "10px";
                if(Number(i) === Number(shadowSelected)){
                    setSelected(li2);
                }
                li2.innerHTML = previewStringFromAnimationObject(animationInfo[i]);
                addEvent({
                    type: 'click',
                    action: liClicked,
                    element: li2
                });
                liHolder.appendChild(li2);
            }
    }

    function deleteLegacy(){
        var legacyValues = ['fade', 'aniUp', 'aniDown', 'aniLeft', 'aniRight'],
            placedElements = action.savedElements.placedElements[action.selectedItem];
        for (var i = 0; i < legacyValues.length; i++) {
            if(action.selectedItem){
                if(placedElements[legacyValues[i]]){
                    placedElements[legacyValues[i]] = null;
                }
            }
        }
    }

    function deleteAnimation(){
        var newShadow = [];
            for (var i = 0; i < animationInfo.length; i++) {
                if(i != shadowSelected){
                    newShadow.push(animationInfo[i]);
                }
            }
       animationInfo = newShadow;
       deleteLegacy();
       saveAnimation();
       updateLIshadowInnerHTML();
       document.getElementById(action.selectedItem).style.webkitTransition = '';
    }

    /*/// */
    function addNewAnimation(){
        var elDiv = doc.getElementById('shadowHolder'),
            li = doc.createElement('li'),
            obj = {
                transform: {
                    xVal: 0,
                    yVal: 0,
                    rotateVal: 0
                },
                speedVal: 400,
                origin: 'center center',
                opacity: 1,
                delay: 0
            };
            //could use last animation
            // if(animationInfo.length > 0){
            //     defaultAnimation = previewStringFromAnimationObject(animationInfo[animationInfo.length-1]);
            //     temp = animationInfo[animationInfo.length-1];
            //     console.log(temp);
            //     animationInfo.push(temp);
            // }else{
                animationInfo.push(obj);
            //}

            li.title = elDiv.children.length;
            li.innerHTML = previewStringFromAnimationObject(obj);
            li.style.height = 'auto';
            li.style.fontSize = "16px";
            li.style.padding = "10px";
            addEvent({
                type: 'click',
                action: liClicked,
                element: li
            });
            
            elDiv.appendChild(li);
            saveAnimation();
            selectNextLI();
    }

    /* 
        BUTTON WINDOW
    */

    function saveButtonChanges(){
        action.savedElements.placedElements[action.selectedItem]['transformAnimation'] = animationInfo;
        action.saveStorage();
        loadAnimationInfo(animationInfo, null, null);
        updateLIshadowInnerHTML();
        testAnimation();
    }

    function showPopup(el, obj){
        jPopup(obj);
    }

    var aniButtons = {
        x : {
            innerHTML: 'X',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number for X direction.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].transform.xVal = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        y : {
            innerHTML: 'Y',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number for Y direction",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].transform.yVal = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        rotate: {
            innerHTML: 'rotate',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number as a rotate value.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].transform.rotateVal = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        speed: {
            innerHTML: 'speed',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number for the animation speed.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].speedVal = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        delay: {
            innerHTML: 'delay',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number to delay this animations in milliseconds.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].delay = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        origin: {
            innerHTML: 'origin',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter top left, top right, etc.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].origin = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        opacity: {
            innerHTML: 'opacity',
            action: function(el){
                showPopup(el, {
                    type: "input",
                    message: "Enter a number between 0 and 1 for opacity.",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        //do something on no
                    },
                    functionOnOk: function(value) {
                        animationInfo[shadowSelected].opacity = value;
                        saveButtonChanges();
                    }
                });
            }
        },
        test: {
            innerHTML: 'test',
            action: function(){
                testAnimation();
            }
        },
        test_all: {
            innerHTML: 'test all',
            action: function(){
                testAll();
            }
        },
        add: {
            innerHTML: 'add animation',
            action: function(){
                addNewAnimation();
            }
        },
        custom:{
            innerHTML: 'custom',
            action: function(){
                var val1 = prompt('Enter a style. Example: background-color'), val2;
                if(val1){
                    val2 = prompt('Enter a value');
                    animationInfo[shadowSelected][val1] = val2;
                    saveButtonChanges();
                }
            }
        },
        delete:{
            innerHTML: 'delete',
            action: function(){
                deleteAnimation();
            }
        }
    };

    function createWindowDiv(div){
        var el = document.createElement(div.type);
        el.id = div.id;
        el.className = div.class;
        el.innerHTML = div.html;
        el.title = div.title;
        div.container.appendChild(el);
        return el;
    }

    function buttonAction(el){
        aniButtons[el.target.title].action();
    }

    function addButtonsToWindow(el){
        var buttonHolder = document.createElement('div'),
            element = null, temp = '';
            buttonHolder.id = 'windowButtonHolder';
            el.appendChild(buttonHolder);
            if(!shadowSelected){
                temp = "inactive";
            }

        Object.keys(aniButtons).forEach(function(key){
            element = createWindowDiv({
                type: 'div',
                id: '',
                html: aniButtons[key].innerHTML,
                title: key,
                class: (key === 'add') ? '' : temp,
                container: buttonHolder
            });
            addEvent({
                type: 'click',
                action: buttonAction,
                element: element
            });
            
        });
    }

    function createButtonWindow(){
        var windowEl = document.createElement('div');
            windowEl.id = 'windowButtonElement';
            addButtonsToWindow(windowEl);
            return windowEl;
    }

    function createDragButton(){
        var button = document.createElement('div');
            button.className = 'shadowDragButton';
            button.innerHTML = '';
            button.id = "shadowDragButton";
        return button;
    }

    /*
        addEvent({
            type: 'click',
            action: removeMenu,
            element: button
        });
    */

    function deleteDraggable(){
        try{
            $('#shadowMenu').draggable( "destroy");
        }catch(err){}
    }

    function removeAllEvents(){
        shadowSelected = null;
        deleteDraggable();
        var i, obj;
        for (i = 0; i < eventsAdded.length; i++) {
            obj = eventsAdded[i];
            obj.element.removeEventListener(obj.type, obj.action);
        }
        eventsAdded = [];
    }

    function removeMenu(el){
        var menuDIV = doc.getElementById(menuName);
        if(menuDIV){
            if(el){
                deselectScreenElement(action.selectedItem, true);
            }
            removeAllEvents();
            if(menuDIV){
                menuDIV.parentElement.removeChild(menuDIV);
            }
            animationInfo = [];
        }
    }

    function createCloseButton(){
        var button = document.createElement('div');
            button.className = 'shadowCloseButton';
            button.innerHTML = '';
            button.id = "shadowCloseButton";
            addEvent({
                type: 'click',
                action: removeMenu,
                element: button
            });
        return button;
    }

    function createMenu(){
        var menu = makeAndAppendMenu(menuName);
        menu.appendChild(createDragButton());
        menu.appendChild(createCloseButton());
        menu.appendChild(createShadowHolder());
        menu.appendChild(createButtonWindow());

        $('#shadowMenu').draggable({
            scroll: false,
            containment: 'window',
            axis: 'y',
            scroll: false,
            handle:'.shadowDragButton',
        });
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function() {
            animationInfo = [];
            createMenu();
            bottomMenu.closeBottomMenu();
        };
        externalMethods.removeMenu = function(){
            removeMenu();
        };
        return externalMethods;
    }
    window.animationMenu = initExternalMethods();
}(window, document));