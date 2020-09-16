(function(window, doc) {

    function createInputWithDetails(obj) {
        var container = doc.createElement('div'),
            input = doc.createElement('input'),
            label = doc.createElement('div'),
            increment = doc.createElement('div'),
            decrement = doc.createElement('div');
        container.className = obj.containerClassName;
        label.innerHTML = obj.labelInnerHTML;
        label.className = obj.labelClassName;
        input.type = obj.inputType;
        input.value = obj.inputValue;
        input.className = obj.inputClassName;
        increment.innerHTML = obj.incrementHTML;
        increment.className = obj.incrementClassName;
        decrement.innerHTML = obj.decrementHTML;
        decrement.className = obj.decrementClassName;

        input.onchange = function(el) {
            obj.inputAction(el)
        };

        increment.ontouchstart = function(el) {
            obj.action(el);
        };
        increment.ontouchend = function() {
            obj.cancel();
        };
        increment.ontouchcancel = function() {
            obj.cancel();
        };
        increment.oncontextmenu = function() {
            obj.cancel();
        };

        decrement.ontouchstart = function(el) {
            obj.action(el);
        };
        decrement.ontouchend = function() {
            obj.cancel();
        };
        decrement.ontouchcancel = function() {
            obj.cancel();
        };
        decrement.oncontextmenu = function() {
            obj.cancel();
        };

        if (!mobilecheck()) {
            increment.onmousedown = function(el) {
                obj.action(el);
            };
            increment.onmouseup = function() {
                obj.cancel();
            };
            decrement.onmousedown = function(el) {
                obj.action(el);
            };
            decrement.onmouseup = function() {
                obj.cancel();
            };
        }
        container.appendChild(label);
        container.appendChild(increment);
        container.appendChild(decrement);
        container.appendChild(input);
        return container;
    }

    function makePositionInput(name) {
        var element = document.getElementById(action.selectedItem),
            input1, input2;

        input1 = createInputWithDetails({
            containerClassName: 'inputContainer',
            labelInnerHTML: 'top',
            labelClassName: 'topLabel',
            inputType: 'text',
            inputValue: getComputedStyleInt(element.id, 'top'),
            inputClassName: 'manualInput topInput',
            incrementClassName: 'incs inButton',
            incrementHTML: '+',
            decrementHTML: '-',
            decrementClassName: 'decs inButton',
            action: function(el) {
                menu.touching = true;
                bottomMenuButtons.inputClick(el.target, 'top');
            },
            cancel: function() {
                menu.touching = false;
            },
            inputAction: function(el) {
                bottomMenuButtons.adjust('top', el.target.value, true);
            }
        });

        input2 = createInputWithDetails({
            containerClassName: 'inputContainer2',
            labelInnerHTML: 'left',
            labelClassName: 'leftLabel',
            inputType: 'text',
            inputValue: getComputedStyleInt(element.id, 'left'),
            inputClassName: 'manualInput leftInput',
            incrementClassName: 'incs inButton',
            incrementHTML: '+',
            decrementHTML: '-',
            decrementClassName: 'decs inButton',
            action: function(el) {
                menu.touching = true;
                bottomMenuButtons.inputClick(el.target, 'left');
            },
            cancel: function() {
                menu.touching = false;
            },
            inputAction: function(el) {
                bottomMenuButtons.adjust('left', el.target.value, true);
            }
        });
        doc.getElementById(name).appendChild(input1);
        doc.getElementById(name).appendChild(input2);
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(name, does) {
            makePositionInput(name, does);
        };
        return externalMethods;
    }
    window.positionInputs = initExternalMethods();
}(window, document));