(function(window, doc) {

	function insertCustomCSS(){
	    var textArea = doc.getElementById('customCSSText'),
	    cssName, cssValue;
	    textArea.innerHTML = "";
	    Object.keys(action.savedElements.placedElements[action.selectedItem]).forEach(function (key) {
	        cssName = key,
	        cssValue = action.savedElements.placedElements[action.selectedItem][key];
	        textArea.innerHTML += cssName + ":" + cssValue + '; '
	    });
	    textArea.value = textArea.innerHTML;
	}
	
	//example
	//background: linear-gradient(to right, #1e5799 0%,#2989d8 50%,#207cca 51%,#7db9e8 100%);
	//background: -webkit-linear-gradient(-45deg, #1e5799 0%,#828419 50%,#dd2323 57%,#ef81df 100%);
	//background: -webkit-radial-gradient(center, ellipse cover, #1e5799 0%,#828419 50%,#dd2323 57%,#ef81df 100%);
	//background: -webkit-linear-gradient(left, #1e5799 0%,#828419 50%,#dd2323 57%,#ef81df 100%);
	//background: -webkit-linear-gradient(top, #1e5799 0%,#828419 50%,#dd2323 57%,#ef81df 100%);

	function convertLinearGradient (cssVal) {
	    var newStart = "";
	        var splitto = cssVal.split(',');
	        if (cssVal.indexOf("to") != -1) {
	            if(Number(cssVal.indexOf("top")) >= 1){
	                newStart += splitto[0] + ", ";
	            }else{
	                newStart += splitto[0].replace('to', 'to ') + ", ";
	            }
	        }
	        if (cssVal.indexOf("deg") != -1) {
	            newStart += splitto[0] + ", ";
	        }
	        if (cssVal.indexOf("center") != -1) {
	            newStart += splitto[0] + ", ";
	        }
	        if (cssVal.indexOf("left") != -1){
	            newStart += splitto[0] + ", ";
	        }
	        for (var f = 1; f < splitto.length; f++) {
	            var part = splitto[f].replace(')', '');
	                newStart += " " + part.substr(0, 7) + " " + part.substr(7, 9);
	            if (f === splitto.length - 1) {
	                newStart += ")";
	            } else {
	                newStart += ",";
	            }
	        }
	        cssVal = newStart;
	    return newStart;
	}

	function updateCustomCSS() {
	    var textArea = doc.getElementById('customCSSText'),
	        inner = textArea.value.replace(/\s/g, ""),
	        ar = inner.split(';'),
	        i, //loop one
	        splt,
	        multiplePX,
	        e, //loop 2
	        findzero,
	        cssName,
	        cssVal;
	    for (i = 0; i < ar.length; i++) {
	        splt = ar[i].split(':');
	        cssName = splt[0];
	        cssVal = splt[1];
	        if (cssName && cssVal) {
	            if ($('#' + action.selectedItem).css(cssName) != cssVal) {
	                multiplePX = cssVal.split('px'); //if string contains multiple px it needs spacing
	                if (multiplePX.length > 1) {
	                    cssVal = ""; //clear cssVal as we will make it ourself
	                    for (e = 0; e < multiplePX.length - 1; e++) {
	                        findzero = multiplePX[e].split('0');
	                        if (findzero.length > 1) { //if there is a split meaning another char other than 0
	                            if (!findzero[0].indexOf('px') !== -1) { //if there isn't px on first split[0]
	                                if (findzero[1].length == 1 && findzero[1] != ",") { //if next split contains 1 char and there isn't a comma after
	                                    multiplePX[e] = "0 " + findzero[1]; //zero with a space and add rest
	                                }
	                            }
	                        }
	                        cssVal += multiplePX[e] + "px "; //set cssval to our made string
	                    };
	                    cssVal += multiplePX[multiplePX.length - 1]; //add last element
	                }
	                //if linear gradient
	                if (cssVal.indexOf("gradient") !=-1) {
	                    cssVal = convertLinearGradient(cssVal);
	                }
	            
	                if(cssName === 'innerHTML'){
	                    //do nothing
	                }else{
	                    
	                    $('#' + action.selectedItem).css(cssName, cssVal);
	                    action.savedElements.placedElements[action.selectedItem][cssName] = cssVal;
	                }
	            }
	        }
	    };
	    action.saveStorage();
	    textArea.value = "";
	    textArea.innerHTML = "";
	}

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.insertCustomCSS = function(){
            insertCustomCSS();
        };
        externalMethods.updateCustomCSS = function(){
        	updateCustomCSS();
        }
        return externalMethods;
    }
    window.bottomMenuCSS = initExternalMethods();
}(window, document));