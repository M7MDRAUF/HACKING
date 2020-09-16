
(function(window, doc) {
    function createToggle(toggles){
        var mainContainer = createDOM({
            type: 'div',
            id: '',
            className: 'toggleMainContainer'
        }),
        container, title, toggle, isChecked;
        for (var i = 0; i < toggles.length; i++) {
            
            container  = createDOM({
                type: 'div',
                id: '',
                className: 'toggleContainer'
            }),
            toggle = createDOM({
                type: 'input',
                inputType: 'checkbox',
                id: '',
                className: 'checkbox-switch'
            });
            if(toggles[i].saveName){
                if(lStorage[toggles[i].saveName]){
                    toggle.checked = true;
                }
            }
            title = createDOM({
                type: 'div',
                id: '',
                innerHTML: toggles[i].innerHTML,
                className: 'toggleTitle'
            });
            container.appendChild(toggle);
            container.appendChild(title);
            var toggle = new Switchery(toggle, {
                showText: false,
                onChange: function(e, val){
                    if(e.toggleObject){
                        if(e.toggleObject.onChange(e, val)){
                            e.saveName(e, val);
                        }
                    }
                }
            });
            toggle.toggleObject = toggles[i];
            toggle.switcher.classList.add('toggleSwitch');
            toggle.switcher.classList.add('toggleSwitch');
            mainContainer.appendChild(container);
        }
        return mainContainer;
    }
    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.createToggle = function(obj) {
           return createToggle(obj);
        };
        return externalMethods;
    }
    window.toggleMaker = initExternalMethods();
}(window, document));


//COLORS

(function(window, doc) {
    var allInputs = null,
        placedSpectrum = [];


    function getInputByTag(tag){
        if(allInputs){
            for(var i = 0; i < allInputs.length; i++){
                if(allInputs[i].tag === tag){
                    return allInputs[i];
                }
            }
        }
    }
    function spectrumEvent(e, color){
       var ins = getInputByTag(e.title);
       ins.onChange(color);
    }

    function closeInputs(){
        for(var i = 0; i < placedSpectrum.length; i++){
            $(placedSpectrum[i]).spectrum("destroy");
        }
        allInputs = null;
        placedSpectrum = [];
    }

    function windowWillRemove(){
        closeInputs();
    }

    function getColorOfElement(element){
        var splitElementTitle,
            placeHolderName,
            styleType,
            currentColor;

        /* 
            elements that are nested in lStorage
            like lStorage['appIcons']['fpplaceholder0']['labelColor'] = value;

            When I set these in colorInputs.createInput
            the tag is "fpplaceholder0~labelColor" so we can grab that saved value
        */
       
        if(element.title.includes('~')){
            splitElementTitle = element.title.split('~');
            placeHolderName = splitElementTitle[0];
            styleType = splitElementTitle[1];
            if(lStorage['appIcons'][placeHolderName][styleType]){
                return lStorage['appIcons'][placeHolderName][styleType];
            }else{
                var ins = getInputByTag(element.title);
                currentColor = ins.defaultColor;
                if(lStorage[styleType]){
                    currentColor = lStorage[styleType];
                }
                return currentColor;
            }
        }

        /* get normally */
        if(lStorage[element.title]){
            return lStorage[element.title];
        }else{
            var ins = getInputByTag(element.title);
            return ins.defaultColor;
        }
    }

    function addSpectrum(inputHolder){
        placedSpectrum.push(inputHolder);
        $(inputHolder).spectrum({
            preferredFormat: "rgb",
            localStorageKey: 'spectrum',
            showAlpha: true,
            showInput: true,
            showPalette: true,
            color: getColorOfElement(inputHolder),
            move: function(color) {
                spectrumEvent(this, color.toRgbString());
            },
            change: function(color) {
                spectrumEvent(this, color.toRgbString());
            }
        });
    }

    function createInput(makeInputs, title, backMenu){
        allInputs = makeInputs; // save for callback lookup
        var toggleWindow = basicWindow.makeWindow({
            title: title,
            id: 'colorWindow',
            className: 'colorWindow',
            width: 300,
            height: 300,
            center: true,
            bgcolor: 'transparent',
            beforeRemove: windowWillRemove,
            backButton:true,
            backTo: function(){
                window[backMenu].create();
                //mainMenu.create();
            },
        });

        var mainContainer = createDOM({
            type: 'div',
            id: '',
            className: 'colorMainContainer'
        }),
        container, inputHolder;
        for (var i = 0; i < allInputs.length; i++) {
            container  = createDOM({
                type: 'div',
                id: '',
                className: 'colorContainer'
            }),
            inputHolder = createDOM({
                type: 'input',
                inputType: 'text',
                id: '',
                className: 'inputHolder',
                attribute: ['title', allInputs[i].tag]
            });
            // if(toggles[i].saveName){
            //     if(lStorage[toggles[i].saveName]){
            //         console.log(lStorage[toggles[i].saveName]);
            //         toggle.checked = true;
            //     }
            // }
            title = createDOM({
                type: 'div',
                id: '',
                innerHTML: allInputs[i].innerHTML,
                className: 'toggleTitle'
            });
            container.appendChild(inputHolder);
            container.appendChild(title);
            mainContainer.appendChild(container);
            toggleWindow.appendChild(mainContainer);
            addSpectrum(inputHolder);
        }
        return toggleWindow;
    }
    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.createInput = function(obj, title, backMenu) {
           return createInput(obj, title, backMenu);
        };
        externalMethods.closeInputs = function() {
            return closeInputs();
         };
        return externalMethods;
    }
    window.colorInputs = initExternalMethods();
}(window, document));


/* range */

/*
rangeWithButtons.createRange({
    title: 'Adjust Width',
    objName: 'width',
    divID: 'WidthRange',
    selectedPage: pageName,
    min: 80,
    max: 375*3,
    step:0,
    start: doc.getElementById(pageName).offsetWidth,
    onChange: rangeUpdated,
    buttonsCallback: buttonsClicked,
    buttons: [{
        innerHTML: "Screen Width",
        tag: 'screenwidth'
    },
    {
        innerHTML: "Manual Input",
        tag: 'manual'
    }]
});
*/
(function(window, doc) {

    var rangeObj;
    var createObj;
    var toggles = [];
    var toggleEvents = [];

    function onRemove(){
        if(createObj.onClose){
            createObj.onClose();
        }
        EventsController.removeEvents({
            label: 'rangeButton'
        });
        for(var i = 0; i < toggles.length; i++){
            toggles[i].destroy();
        }
        toggles = [];
    }

    function toggleChanged(toggle, e){
        for (var i = 0; i < toggles.length; i++) {
            if(toggles[i] === toggle){
                toggleEvents[i](toggles[i], e);
            }
        }
    }

    function createToggles(obj, rangeWindow){
        var mainContainer = createDOM({
            type: 'div',
            id: '',
            className: 'rangeToggleMainContainer'
        }),
        container, title, toggle;

        for (i = 0; i < obj.toggles.length; i++) {
            toggleEvents.push(obj.toggles[i].onChange);
            container = createDOM({
                type: 'div',
                id: '',
                className: 'rangeToggleContainer'
            });
            toggle = createDOM({
                type: 'input',
                inputType: 'checkbox',
                id: '',
                className: 'checkbox-switch'
            });
            title = createDOM({
                type: 'div',
                id: '',
                innerHTML: obj.toggles[i].innerHTML,
                className: 'rangeToggleTitle'
            });
            container.appendChild(toggle);
            container.appendChild(title);
            var toggle = new Switch(toggle, {
                showText: false,
                onChange: function(e){
                    toggleChanged(this, e);
                }
            });
            toggles.push(toggle);
        }
        mainContainer.appendChild(container);
        rangeWindow.appendChild(mainContainer);
    }
    function createButtons(obj, rangeWindow){
        var container = createDOM({
            type: 'div',
            id: '',
            className: 'rangeButtonContainer'
        }),
        allButtons = createDOM({
            type: 'div',
            id: '',
            className: 'rangeAllButtons'
        }), i, div, self;

        EventsController.addEvent(allButtons, {
            event: 'click',
            callback: function(el){
                obj.buttonsCallback(obj.selectedPage, el.target.title, el, rangeObj);
            },
            label: 'rangeButton'
        });

        for (i = 0; i < obj.buttons.length; i++) {
            button = obj.buttons[i];
            div = createDOM({
                type: 'div',
                id: '',
                innerHTML: button.innerHTML,
                attribute: ['title', button.tag],
                className: 'rangeButton'
            });
            allButtons.appendChild(div)
        }
        container.appendChild(allButtons);
        rangeWindow.appendChild(container);
    }
    /* 
        obj = {
            title: 'Adjust Width',
            tag: 'width',
            divID: 'WidthRange',
            selectedPage: pageName,
            min: 80,
            max: 375*3,
            step:0,
            start: doc.getElementById(pageName).offsetWidth,
            onChange: rangeUpdated,
            buttonsCallback: buttonsClicked,
            buttons: [{
                innerHTML: "Screen Width",
                tag: 'screenwidth'
            },
            {
                innerHTML: "Manual Input",
                tag: 'manual'
            }]
        }
    */

    function makeRangeInput(obj, rangeHolder){
        var el = document.createElement('input');
        el.title = obj.objName;
        el.className = obj.selectedPage;
        rangeHolder.appendChild(el);

        rangeObj = new Powerange(el, {
            callback: function(e){
                obj.onChange(this, obj.selectedPage);
            },
            el: el,
            min: obj.min,
            max: obj.max,
            start: obj.start,
            hideRange: false,
            decimal:true,
            step:obj.step,
        });
    }
    function createRange(obj){
        var windowID = obj.divID;
        if(obj.divID.constructor === Array){
            windowID = obj.divID[0];
        }
        var rangeWindow = basicWindow.makeWindow({
            title: obj.windowTitle,
            id: windowID,
            className: 'rangeWindow',
            width: 300,
            height: 190,
            centerHorizontally: true,
            bgcolor: 'green',
            beforeRemove: onRemove,
        }),
        rangeView = doc.createElement('div');
        rangeView.className = 'rangeView';
        rangeWindow.appendChild(rangeView);

        if(obj.divID.constructor === Array){
            var singleObj = {};
            for (var e = 0; e < obj.divID.length; e++) {

                rangeHolder = doc.createElement('div');
                rangeHolder.title = obj.title[e];
                rangeHolder.className = 'rangeHolder';
                rangeView.appendChild(rangeHolder);

                singleObj.objName = obj.objName[e];
                singleObj.divID = obj.divID[e];
                singleObj.min = obj.min[e];
                singleObj.max = obj.max[e];
                singleObj.title = obj.title[e],
                singleObj.selectedPage = obj.selectedPage;
                singleObj.step = obj.step;
                singleObj.start = obj.start[e];
                singleObj.onChange = obj.onChange;
                singleObj.buttonsCallback = obj.buttonsCallback;
                singleObj.buttons = obj.buttons;
                makeRangeInput(singleObj, rangeHolder);
            }
        }else{
            rangeHolder = doc.createElement('div');
            rangeHolder.className = 'rangeHolder';
            rangeHolder.title = obj.title;
            rangeWindow.appendChild(rangeHolder);
            makeRangeInput(obj, rangeHolder);
        }
        if(obj.buttons){
            createButtons(obj, rangeWindow);
        }

        if(obj.toggles){
            createToggles(obj, rangeWindow);
        }
        
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.createRange = function(obj) {
            createObj = obj;
            createRange(obj);
        };
        return externalMethods;
    }

    window.rangeWithButtons = initExternalMethods();
}(window, document));


/* dragAdjuster */
(function(window, doc) {
    var closeButton = null,
        dragElement,
        windowDiv,
        settings,
        lastTop, 
        lastLeft;

    function storeLastPositions(ui){
        if(lastTop){
            lastTop = lastTop + ui.position.top;
            lastLeft = lastLeft + ui.position.left;
        }else{
            lastTop = ui.position.top;
            lastLeft = ui.position.left;
        }
    }

    function dragStopped(ev, ui){
        if(settings.resetPosition){
            storeLastPositions(ui);
            settings.stop(ev, {
                position: {
                    left: lastLeft,
                    top: lastTop
                }
            });
        }else{
            settings.stop(ev, ui);
        }
    }

    function dragDragging(ev, ui){
        if(lastTop && settings.resetPosition){
            settings.drag(ev, {
                position:{
                    left: lastLeft + ui.position.left,
                    top: lastTop + ui.position.top
                }
            });
        }else{
            settings.drag(ev, ui);
        }
    }

    function addDraggable(dragDiv, windowDiv){
        $(dragDiv).draggable({
            stop: function (ev, ui) {
                if(settings.resetPosition){
                    dragDiv.style.top = 0;
                    dragDiv.style.left = 0;
                }
                dragStopped(ev, ui);
            },
            drag: function (ev, ui) {
                dragDragging(ev, ui);
            }
        });
    }

    function closeDragAdjuster(){
        if(settings.onClose){
            settings.onClose();
        }
        lastLeft = null;
        lastTop = null;
        $(dragElement).draggable( "destroy" );
        closeButton.removeEventListener('click', closeDragAdjuster, false);
        doc.body.removeChild(windowDiv);
    }

    function createCloseButton(){
        closeButton = document.createElement('div');
        closeButton.innerHTML = "X";
        closeButton.style.cssText = "position:absolute;top:0;right:0;width:30px;height:30px;line-height:30px;border-radius:99px;text-align:center;heigh:30px;background-color:red;";
        closeButton.addEventListener('click', closeDragAdjuster, false);
        return closeButton;
    }

    function createDragger(){
            windowDiv = doc.createElement('div');
            windowDiv.style.cssText = "position:absolute;display:block;text-align:center;left:10px;top:50%;-webkit-transform:translate(0%, -50%);height:300px;width:300px;background-color:transparent;z-index:99999;";
            dragElement = doc.createElement('div');
            dragElement.style.cssText = "position:relative;width:80px;height:40px;line-height:40px;background-color:"+settings.color+";margin-left:110px;border-radius:10px;margin-top:130px;";
            dragElement.innerHTML = "Drag Me";
            addDraggable(dragElement, windowDiv);
            windowDiv.appendChild(dragElement);
            windowDiv.appendChild(createCloseButton());
            doc.body.appendChild(windowDiv);
    }
    
    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.init = function(obj) {
			if(obj){
                settings = obj;
                createDragger();
			}
		};
        return externalMethods;
    }
    window.dragAdjuster = initExternalMethods();
}(window, document));