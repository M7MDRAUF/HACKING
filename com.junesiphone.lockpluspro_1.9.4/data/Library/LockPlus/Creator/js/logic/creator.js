/* 
	Runs actions that places multiple items automatically.
*/

function findNewName(name){
	var loopCount = 100, namePart = "";
		if(name.includes('box')){
			namePart = 'box';
		}
		if(name.includes('fpplaceholder')){
			namePart = 'fpplaceholder';
		}
		for (var i = 0; i < loopCount; i++) {
			if(!document.getElementById(namePart + i)){
				return namePart + i;
			}
		}
}

function checkIfBoxAlreadyExists(name){
	if(name.includes('box') || name.includes('fpplaceholder')){
		var itAlreadyExists = document.getElementById(name);
		if(itAlreadyExists){
			name = findNewName(name);
		}
	}
	return name;
}

var makeTemplate = function(obj){
	function setTemplateCss(elementObj){
		if(elementObj.css){
			Object.keys(elementObj.css).forEach(function(key){
				var styleVal = elementObj.css[key];
				var elementName = elementObj.reference;
				if(key === 'left' && styleVal === 'center'){
					styleVal = 320/2 - document.getElementById(elementObj.reference).offsetWidth / 2 + 'px';
				}
				if(key === 'innerHTML'){
					document.getElementById(elementObj.reference).innerHTML = styleVal;
				}
				if(key === 'iconname'){
					$('.icon').attr('src', 'weather/real/' + styleVal + '.png');
				}
				if(elementName.includes('icon') && key === 'width'){
					document.getElementById(elementObj.reference).children[0].style.cssText = 'pointer-events:none;width:' + styleVal + ';height:' + styleVal + ';';
				}
				action.setCss(elementObj.reference, key, styleVal);
			});
		}
	}
	Object.keys(obj).forEach(function(name){
		var elementObj = obj[name], i, elementInside;
		if(elementObj.type === 'element'){
			var elName = checkIfBoxAlreadyExists(name);
			obj.name = elName;
			name = elName;
			action.addtoScreen(name);
			elementObj.reference = name;
		}
		if(elementObj.type === 'panel'){
			for (i = 0; i < elementObj.contains.length; i++) {
				elementInside = elementObj.contains[i];
				action.selectedItem = elementInside;
				if(!elementInside.includes('panel')){
					action.selectedItem = obj[elementInside].reference;
					if(!elementObj.reference){
						elementObj.reference = customPanel.makeFirstPanel();
						customPanel.addToPanel(elementObj.reference);
					}else{
						customPanel.addToPanel(elementObj.reference);
					}
				}else{
					action.selectedItem = obj[elementInside].reference;
					if(!elementObj.reference){
						elementObj.reference = customPanel.makeFirstPanel();
						customPanel.addToPanel(elementObj.reference);
					}else{
						customPanel.addToPanel(elementObj.reference);
					}
				}
				deselectScreenElement(action.selectedItem, true);
			}
		}
		setTimeout(function(){
			setTemplateCss(elementObj);
		},0);
	});

	/*
		Alright this is to fix panels having the wrong references in data-vars and data-name
		data-vars lists the elements in the panel
		data-name is the name of the panel (customPanel0)

		If a panel contains another panel these names need to be correct.
		Since we've adding these panels here we can grab the correct names from
		customPanel.getCustomPanelObj() thankfully.
	*/
	function removeDuplicates(arr) {
		var obj = {};
		var ret_arr = [];
		for (var i = 0; i < arr.length; i++) {
			obj[arr[i]] = true;
		}
		for (var key in obj) {
			ret_arr.push(key);
		}
		return ret_arr;
	}
	setTimeout(function(){
		var panelObject = customPanel.getCustomPanelObj();
		for (var p = 0; p < panelObject['names'].length; p++) {
			var arrayWithoutDuplicates = removeDuplicates(panelObject.data[panelObject['names'][p]]);
			action.savedElements.placedElements[panelObject['names'][p]]['data-vars'] = arrayWithoutDuplicates;
			action.savedElements.placedElements[panelObject['names'][p]]['data-name'] = panelObject['names'][p];
		}
		action.saveStorage();
	},0);
};

(function(window, doc) {
	var creations = {
		//moved to files
	}
	function createCreation(name){
		if(creations[name]){
			creations[name]();
		}
	}
	function loadTemplateFile(name){
        var s=document.getElementsByTagName('script')[0];
        var sc=document.createElement('script');
        sc.type='text/javascript';
        sc.async=true;
        sc.src='https://lockplus.us/CreatorAssets/images.js?' + Math.random(); 
        triedToLoadImages += 1;
        sc.onload = function(){
            clearTimeout(loadTimerTimeout);
            triedToLoadImages = 0;
            s.parentNode.insertBefore(sc,s);
        }
        sc.onerror = function(){
            if(triedToLoadImages < 5){
                loadTimerTimeout = setTimeout(function(){
                    loadCreatorImages();
                },1000);
            }else{
                alert('failed to load template');
            }
        }
	}
	var triedToLoadTemplates = 0;
	var loadTemplateTimer = null;
	function createCustom(name){
		var s = document.body;
        var sc = document.createElement('script');
        sc.type='text/javascript';
        sc.async=false;
		sc.src = 'file:///var/mobile/Documents/lockplustemplates/'+name+'.js';
		triedToLoadTemplates += 1;
		s.appendChild(sc);
        sc.onload = function(){
            clearTimeout(loadTemplateTimer);
            loadTemplateTimer = 0;
			setTimeout(function(){
				makeTemplate(lppTemplates[name]);
			},1000);
        }
        sc.onerror = function(){
            if(triedToLoadTemplates < 5){
                loadTemplateTimer = setTimeout(function(){
                    createCustom(name);
                },1000);
            }else{
                alert('failed to load template');
            }
        }
	}

	function testCustom(name){
		var s = document.body;
        var sc = document.createElement('script');
        sc.type='text/javascript';
        sc.async=false;
		sc.src = '../../../var/mobile/Documents/lockplustemplates/'+name+'.js';
		triedToLoadTemplates += 1;
		s.appendChild(sc);
        sc.onload = function(){
            clearTimeout(loadTemplateTimer);
            loadTemplateTimer = 0;
			setTimeout(function(){
				makeTemplate(lppTemplates[name]);
			},1000);
        }
        sc.onerror = function(){
            if(triedToLoadTemplates < 5){
                loadTemplateTimer = setTimeout(function(){
                    testCustom(name);
                },1000, name);
            }else{
                //alert('failed to load template');
            }
        }
	}

	function getAllElements(panelElements){
		var template = {};
		var addLast = [];
		for (var i = 0; i < panelElements.length; i++) {
			if(!action.savedElements.placedElements[panelElements[i]]['data-vars']){
				template[panelElements[i]] = {};
				template[panelElements[i]].type = 'element';
				template[panelElements[i]].css = {};
				Object.keys(action.savedElements.placedElements[panelElements[i]]).forEach(function(key){
					template[panelElements[i]].css[key] = action.savedElements.placedElements[panelElements[i]][key];
				});
				if(panelElements[i].includes('icon')){
					template[panelElements[i]].css['iconname'] = action.savedElements.iconName;
				}
			}else{
				//is a panel
				addLast.push(panelElements[i]);
				var panel2Els = action.savedElements.placedElements[panelElements[i]]['data-vars'];
				if(panel2Els){
					for (var e = 0; e < panel2Els.length; e++) {
						if(action.savedElements.placedElements[panel2Els[e]]['data-vars']){
							//is another panel
							addLast.push(panel2Els[e]);
							var panel3Els = action.savedElements.placedElements[panel2Els[e]]['data-vars'];
							if(panel3Els){
								for (var g = 0; g < panel3Els.length; g++) {
									console.log(panel3Els[g]);
								}
							}
						}else{
							template[panel2Els[e]] = {};
							template[panel2Els[e]].type = 'element';
							template[panel2Els[e]].css = {};
							Object.keys(action.savedElements.placedElements[panel2Els[e]]).forEach(function(key){
								template[panel2Els[e]].css[key] = action.savedElements.placedElements[panel2Els[e]][key];
							});
						}
					}
				}
			}
		}

		for (var f = 0; f < addLast.length; f++) {
			template[addLast[f]] = {};
			template[addLast[f]].type = 'panel';
			template[addLast[f]].css = {};
			Object.keys(action.savedElements.placedElements[addLast[f]]).forEach(function(key){
				template[addLast[f]].css[key] = action.savedElements.placedElements[addLast[f]][key];
			});
			template[addLast[f]].contains = action.savedElements.placedElements[addLast[f]]['data-vars'];
		}
		return template;
	}

	function saveTemplate(templateName){
		var template = {

		};
		var panelElements = action.savedElements.placedElements[action.selectedItem]['data-vars'];
		template = getAllElements(panelElements);
	
		template['mainPanel'] = {};
		template['mainPanel'].type = 'panel';
		template['mainPanel'].css = {};
		Object.keys(action.savedElements.placedElements[action.selectedItem]).forEach(function(key){
			template['mainPanel'].css[key] = action.savedElements.placedElements[action.selectedItem][key];
		});

		template['mainPanel'].contains = panelElements;
		var dataXMLFixes = JSON.stringify(template);
		dataXMLFixes.replace("@", "&#64;");
		dataXMLFixes.replace("&", "&amp;");
		dataXMLFixes.replace("&", "&#36;");
		window.location = 'savetemplate:$' + templateName + '$' + dataXMLFixes;

		//console.log(template);

		/* Test made template right after creation */

		// localStorage.removeItem('pressActions');
		// action.clearTheme(1);
		// customPanel.clear();
		// batteryPie.clearStyles();
		// customDiv.clear();
		// flipClock.remove();

		// console.log(template);

		// setTimeout(function(){
		// 	makeTemplate(template);
		// },1000);

	}

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(name) {
            createCreation(name);
		};
		externalMethods.makeCustom = function(name) {
			createCustom(name);
		};
		externalMethods.testCustom = function(name) {
			testCustom(name);
		};
		externalMethods.createTemplate = function() {
			var templateName = prompt('Enter a unique name (with no spaces) for your template');
				if(templateName){
					saveTemplate(templateName);
				}else{
					alert('You must enter a name');
				}
        };
        return externalMethods;
    }
    window.creator = initExternalMethods();
}(window, document));

// setTimeout(function(){
// 	localStorage.removeItem('pressActions');
// 	action.clearTheme(1);
// 	customPanel.clear();
// 	batteryPie.clearStyles();
// 	customDiv.clear();
// 	flipClock.remove();
// 	//creator.make('MusicControls');
// 	creator.testCustom('4x2');
// },100);

/* 
	Test if adding a template replaces other elements. In this case box1
	lppTemplates['boxtest'] = {"boxOne":{"type":"element","css":{"width":"50px","height":"50px","background-color":"rgb(0, 164, 255)","z-index":"2","border-color":"red","border-style":"solid","border-width":"0px","position":"absolute","top":0,"left":0,"font-family":"helvetica","font-size":"30px","color":"white"}},"mainPanel":{"type":"panel","css":{"data-vars":["boxOne"],"data-name":"customPanels0","width":"141px","height":"108px","position":"absolute","z-index":"2","top":"129px","left":"100px","font-family":"helvetica","font-size":"30px","color":"white"},"contains":["boxOne"]}};
*/

// setTimeout(function(){
	// localStorage.removeItem('pressActions');
	// action.clearTheme(1);
	// customPanel.clear();
	// batteryPie.clearStyles();
	// customDiv.clear();
	// flipClock.remove();

// 	action.addtoScreen('fpplaceholder1');
// 	setTimeout(function(){
// 		creator.testCustom('fpplace');
// 	},100);
// },100);


/* Test made templates */
// var madeTemplate = {
//     "stepsToday5": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": "19px",
//             "left": "0",
//             "font-family": "helvetica",
//             "font-size": "11px",
//             "color": "white",
//             "width": "50px",
//             "text-align": "center"
//         }
//     },
//     "stepsTodaySDay5": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": "0",
//             "left": "0",
//             "font-family": "helvetica",
//             "font-size": "15px",
//             "color": "white",
//             "text-align": "center",
//             "width": "50px",
//             "text-transform": "uppercase"
//         }
//     },
//     "stepsToday6": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": "19px",
//             "left": "0",
//             "font-family": "helvetica",
//             "font-size": "11px",
//             "color": "white",
//             "width": "50px",
//             "text-align": "center"
//         }
//     },
//     "stepsTodaySDay6": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": "0",
//             "left": "0",
//             "font-family": "helvetica",
//             "font-size": "15px",
//             "color": "white",
//             "text-align": "center",
//             "width": "50px",
//             "text-transform": "uppercase"
//         }
//     },
//     "stepsToday7": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": "19px",
//             "left": 0,
//             "font-family": "helvetica",
//             "font-size": "11px",
//             "color": "white",
//             "width": "50px",
//             "text-align": "center"
//         }
//     },
//     "stepsTodaySDay7": {
//         "type": "element",
//         "css": {
//             "position": "absolute",
//             "z-index": "2",
//             "top": 0,
//             "left": 0,
//             "font-family": "helvetica",
//             "font-size": "15px",
//             "color": "white",
//             "text-align": "center",
//             "width": "50px",
//             "text-transform": "uppercase"
//         }
//     },
//     "customPanel2": {
//         "type": "panel",
//         "css": {
//             "data-vars": ["stepsToday5", "stepsTodaySDay5"],
//             "data-name": "customPanel2",
//             "width": "52px",
//             "height": "51px",
//             "position": "absolute",
//             "z-index": "2",
//             "top": 0,
//             "left": 0,
//             "font-family": "helvetica",
//             "font-size": "30px",
//             "color": "white"
//         },
//         "contains": ["stepsToday5", "stepsTodaySDay5"]
//     },
//     "customPanel1": {
//         "type": "panel",
//         "css": {
//             "data-vars": ["stepsToday6", "stepsTodaySDay6"],
//             "data-name": "customPanel1",
//             "width": "52px",
//             "height": "51px",
//             "position": "absolute",
//             "z-index": "2",
//             "top": 0,
//             "left": "39px",
//             "font-family": "helvetica",
//             "font-size": "30px",
//             "color": "white"
//         },
//         "contains": ["stepsToday6", "stepsTodaySDay6"]
//     },
//     "customPanels0": {
//         "type": "panel",
//         "css": {
//             "data-vars": ["stepsToday7", "stepsTodaySDay7"],
//             "data-name": "customPanels0",
//             "width": "52px",
//             "height": "51px",
//             "position": "absolute",
//             "z-index": "2",
//             "top": 0,
//             "left": "79px",
//             "font-family": "helvetica",
//             "font-size": "30px",
//             "color": "white"
//         },
//         "contains": ["stepsToday7", "stepsTodaySDay7"]
//     },
//     "mainPanel": {
//         "type": "panel",
//         "css": {
//             "data-vars": ["customPanel2", "customPanel1", "customPanels0"],
//             "data-name": "customPanel3",
//             "width": "135px",
//             "height": "63px",
//             "position": "absolute",
//             "z-index": "2",
//             "top": "161px",
//             "left": "98px",
//             "font-family": "helvetica",
//             "font-size": "30px",
//             "color": "white"
//         },
//         "contains": ["customPanel2", "customPanel1", "customPanels0"]
//     }
// };
// setTimeout(function(){
// 	localStorage.removeItem('pressActions');
// 	action.clearTheme(1);
// 	customPanel.clear();
// 	batteryPie.clearStyles();
// 	customDiv.clear();
// 	flipClock.remove();

// 	setTimeout(function(){
// 		makeTemplate(madeTemplate);
// 	},100);
// },100);