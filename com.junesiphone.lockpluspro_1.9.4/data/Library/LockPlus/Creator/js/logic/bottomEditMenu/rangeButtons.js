(function(window, doc) {

    function makeRangeInput(name) {
        var input = doc.createElement('input');
        input.type = 'text';
        input.className = name + 'js-opacity';
        input.id = 'range' + name;
        return input;
    }

    function makeRangeHolder() {
        var range = doc.createElement('div');
        range.className = 'powerranger js-change-opacity';
        return range;
    }

    function appendSliderWithElements(name) {
        var slideCon = doc.createElement('div');
        slideCon.className = 'slider-wrapper';
        slideCon.style.width = 130 + "px";
        slideCon.style.left = 20 + "px";
        if(screen.width === 320){
            slideCon.style.width = 100 + "px";
            slideCon.style.left = 10 + "px";
        }
        if(screen.width >= 768){
            slideCon.style.width = 200 + "px";
            slideCon.style.left =  "50px";
        }
        slideCon.id = 'sliderContainer' + name;
        slideCon.appendChild(makeRangeInput(name));
        slideCon.appendChild(makeRangeHolder(name));
        doc.getElementById(name).appendChild(slideCon);
        return slideCon;
    }

    function makeRange(name, does, custom) {
        var slideCon = appendSliderWithElements(name),
            opct, initOpct, callbackFunction, cleanName;
        opct = doc.querySelector('.' + name + 'js-opacity');

        if(custom){
            callbackFunction = function(){
                bottomMenuButtons.adjust(name);
                custom({
                    type: 'range',
                    value: name
                });
            }
        }else{
            callbackFunction = function() {
                bottomMenuButtons.adjust(name);
            }
        }

        cleanName = name.replace('BM', '');
        if(userOptions[cleanName]){
            initOpct = new Powerange(opct, {
                callback: callbackFunction,
                decimal: userOptions[cleanName].range.decimal,
                min: userOptions[cleanName].range.min,
                max: userOptions[cleanName].range.max,
                start: userOptions[cleanName].range.startVal(does),
                hideRange: true,
                //decimal:true,
                //step: 1,
            });
        }
    }

    function createInputWithDetails(obj, name) {
        var inputContainer = doc.createElement('div'),
            input = doc.createElement('input'),
            increment = doc.createElement('div'),
            decrement = doc.createElement('div');

        inputContainer.className = obj.inputContainerClassName;
        input.type = obj.inputType;
        input.value = obj.inputValue;
        input.id = obj.inputID;
        input.className = obj.inputClassName;

        input.onblur =function(event){
            resetMoveForInput(event);
        }
        input.onfocus = function(event){
            moveUpForInput(event);
        }

        input.onchange = function(el) {
            obj.inputAction(el)
        };

        increment.className = obj.incrementClassName;
        increment.innerHTML = obj.incrementHTML;
        increment.ontouchstart = function(el) {
            obj.buttonAction(el);
        };
        increment.ontouchend = function(el) {
            obj.buttonCancel(el);
        };

        decrement.className = obj.decrementClassName;
        decrement.innerHTML = obj.decrementHTML;
        decrement.ontouchstart = function(el) {
            obj.buttonAction(el);
        };
        decrement.ontouchend = function(el) {
            obj.buttonCancel(el);
        };

        if (!mobilecheck()) {
            increment.onmousedown = function(el) {
                obj.buttonAction(el);
            };
            increment.onmouseup = function(el) {
                obj.buttonCancel(el);
            };
            decrement.onmousedown = function(el) {
                obj.buttonAction(el);
            };
            decrement.onmouseup = function(el) {
                obj.buttonCancel(el);
            };
        }

        inputContainer.appendChild(increment);
        inputContainer.appendChild(decrement);
        inputContainer.appendChild(input);
        doc.getElementById(name).appendChild(inputContainer);
    }

    function makeRangeButtons(name, does, custom) {
        var inputValueType = null;
        makeRange(name, does, custom);
        if(custom){
            if(userOptions[name.replace('BM','')]){
                inputValueType = userOptions[name.replace('BM','')].range.startVal(does);
            }else{
                inputValueType = rangeActions[name].startVal(does);
            }
            createInputWithDetails({
                inputContainerClassName: 'inputContainer',
                inputType: 'text',
                inputValue: inputValueType,
                inputID: 'manual' + name,
                inputClassName: 'manualInput',
                incrementClassName: 'incs inButton',
                incrementHTML: '+',
                decrementClassName: 'decs inButton',
                decrementHTML: '-',
                buttonAction: function(el) {
                    //menu.touching = true;
                    bottomMenuButtons.inputClick(el.target);
                    th = document.getElementById(this.inputID);
                    custom({
                        type: 'input',
                        value: th.value
                    });
                },
                buttonCancel: function() {
                    //menu.touching = false;
                },
                inputAction: function(el) {
                    bottomMenuButtons.adjust(name, el.target.value, true);
                    custom({
                        type: 'input',
                        value: el.target.value
                    });
                }
            }, name);
        }else{
            createInputWithDetails({
                inputContainerClassName: 'inputContainer',
                inputType: 'text',
                inputValue: userOptions[name.replace('BM','')].range.startVal(does),
                inputID: 'manual' + name,
                inputClassName: 'manualInput',
                incrementClassName: 'incs inButton',
                incrementHTML: '+',
                decrementClassName: 'decs inButton',
                decrementHTML: '-',
                buttonAction: function(el) {
                    menu.touching = true;
                    bottomMenuButtons.inputClick(el.target);
                },
                buttonCancel: function() {
                    menu.touching = false;
                },
                inputAction: function(el) {
                    bottomMenuButtons.adjust(name, el.target.value, true);
                }
            }, name);
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(name, does, custom) {
            makeRangeButtons(name, does, custom);
        };
        return externalMethods;
    }
    window.rangeButtons = initExternalMethods();
}(window, document));