(function(window, doc) {

	/* Input + and - taps */
	function inputClickStops(currentValue, input){
		var maxValue = 320,
			name;

		if(input.id){
			name = input.id;
	        if(name.indexOf('Rotate') !== -1){
	            maxValue = 360;
	        }
	        if(name.indexOf('moveleft') !== -1){
	        	maxValue = 2000;
	        }
	        if(name.indexOf('movetop') !== -1){
	        	maxValue = 2000;
	        }
	        if(name.indexOf('height') !== -1){
	            maxValue = 2000;
			}
			if(name.indexOf('width') !== -1){
	            maxValue = 2000;
	        }
	    }

	    if (currentValue > maxValue) {
	        currentValue = maxValue;
	    }
	    return currentValue;
	}

	function getNewInputValue(button, oldValue){
		var changeValue = 1,
			newValue = 0,
			inputsThatNeedDecimal = ['manualBMwidgetsize'];

		/* find the input, check the name, change value change if item needs decimal */
		for (var i = 0; i < button.parentElement.children.length; i++) {
			if(button.parentElement.children[i].nodeName === 'INPUT'){
				input = button.parentElement.children[i];
				if(inputsThatNeedDecimal.contains(input.id)){
					changeValue = 0.01;
				}
			}
		}

		if(button.innerHTML === "+"){
			newValue = parseFloat(oldValue) + changeValue;
		}else if (button.innerHTML === "-"){
			newValue = parseFloat(oldValue) - changeValue;
		}
		return newValue;
	}

	function adjust(adjustItem, value, manual) {
		var itemInput, range, cleanName;
		if(doc.getElementById('range' + adjustItem)){
			range = doc.getElementById('range' + adjustItem);
		}
	    if (!manual) {
	    	setTimeout(function(){
	    		itemInput = doc.getElementById('manual' + adjustItem);
	    		itemInput.value = Math.floor(range.value);
	    		if(value){
	    			itemInput.value = Math.floor(value);
	    		}
	    	},0);
	    }
	    if (action.selectedItem.length > 0) {
	        if (value || value === 0) { //fix if left is set to 0
	        	cleanName =  adjustItem.replace('BM', '');
	        	if(userOptions[cleanName]){
	        		userOptions[cleanName].action(value);
	        	}
	        } else {
	        	cleanName =  adjustItem.replace('BM', '');
	        	if(userOptions[cleanName]){
					if(userOptions[cleanName]['action']){
						userOptions[cleanName].action(range.value);
					}
	        	}
	        }
		}
	}

	function inputClick(button, cssKey) {
		var input, oldValue, buttonName, newValue;
		for (var i = 0; i < button.parentElement.children.length; i++) {
			if(button.parentElement.children[i].nodeName === 'INPUT'){
				input = button.parentElement.children[i];
			}
		}

	    oldValue = input.value;
	    buttonName = input.id.replace('manual', '');

	    newValue = getNewInputValue(button, oldValue);
		input.value = newValue;

	    if(cssKey){ //top or left
	    	adjust(cssKey, newValue, true);
	    }else{
	    	newValue = inputClickStops(newValue, input);
	    	input.value = newValue;
	    	adjust(buttonName, newValue, true);
	    }
	    setTimeout(autoClickInput, 100, button, cssKey);
	}

	function autoClickInput(button, cssKey){
		var timeout = null;
        if(menu.touching == false){
            clearTimeout(timeout);
        }else{
        	if(cssKey){
        		timeout = setTimeout(inputClick, 0, button, cssKey);
        	}else{
        		timeout = setTimeout(inputClick, 0, button);
        	}
        }
	}
	/* END Input + and - taps */


	function createBorderButton(id) {
	    var button = doc.createElement('div'),
	    	cleanName = id.replace('BM','');
	    button.innerHTML = 'Color';
	    button.className = 'borderButton';
	    doc.getElementById(id).appendChild(button);



	    var inputContainer = doc.createElement('div');
	    inputContainer.className = 'inputContainer2';
	    var input2 = doc.createElement('input');
	    input2.type = 'text';

	    if(userOptions[cleanName]){
	    	if(userOptions[cleanName].colorButton){
	    		button.onclick = function(){
	    			userOptions[cleanName].colorButton();
	    		}
	    		input2.value = $('#' + action.selectedItem).css(userOptions[cleanName].returnStyle);
	    	}
	    }
	    
	    input2.id = 'manual' + id;
	    input2.className = 'manualInput';
	    var increment = doc.createElement('div');
	    var decrement = doc.createElement('div');
	    increment.className = 'incs inButton';
	    increment.onclick = function (el) {
	        inputClick(el.target);
	    }
	    increment.innerHTML = '+';
	    decrement.className = 'decs inButton';
	    decrement.onclick = function (el) {
	        inputClick(el.target);
	    }
	    decrement.innerHTML = '-';
	    input2.onchange = function () {
	        adjust(name, this.value, true);
	    }
	    inputContainer.appendChild(increment);
	    inputContainer.appendChild(decrement);
	    inputContainer.appendChild(input2);
	    doc.getElementById(id).appendChild(inputContainer);
	}

	function createPositionInputs(name, does) {
	    positionInputs.make(name, does);
	}

	function createTriButtons(name, one, two, three) {
	    triButtons.make(name, one, two, three);
	};

	function createButtons(id, name) {
	    singleButton.make(id, name);
	};

	function createRange(name, does) {
	    rangeButtons.make(name, does);
	}

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.createRange = function(a, b){
            createRange(a, b);
        };
        externalMethods.createButtons = function(a, b){
        	createButtons(a, b);
        };
        externalMethods.createTriButtons = function(a,b,c,d){
        	createTriButtons(a,b,c,d);
        };
        externalMethods.createPositionInputs = function(a,b){
        	createPositionInputs(a,b);
        };
        externalMethods.createBorderButton = function(a){
        	createBorderButton(a);
        };
        externalMethods.inputClick = function(button, cssKey){
        	inputClick(button, cssKey);
        };
        externalMethods.adjust = function(adjustItem, value, manual){
        	adjust(adjustItem, value, manual);
        };
        return externalMethods;
    }
    window.bottomMenuButtons = initExternalMethods();
}(window, document));