(function(window, doc) {

    function scrollToElement(targetEl) {
        var pos = targetEl.style.position,
        top = targetEl.style.top;
        targetEl.style.position = 'relative';
        targetEl.style.top = '-20px';
        targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        targetEl.style.top = top;
        targetEl.style.position = pos;
    }

    function checkIfInAnotherPanel(){
        var placedEls =  Object.keys(action.savedElements.placedElements),
          elInfo = null, i, e;
            for (i = 0; i < placedEls.length; i++) {
            if(placedEls[i].substring(0, 11) === "customPanel"){
                elInfo = action.savedElements.placedElements[placedEls[i]];
                if(elInfo){
                    if(elInfo['data-vars']){
                        for (var e = 0; e < elInfo['data-vars'].length; e++) {
                            if(elInfo['data-vars'][e] === action.selectedItem){
                                if(action.savedElements.placedElements[placedEls[i]]['customName']){
                                    return " in " + "(" + action.savedElements.placedElements[placedEls[i]]['customName'] + ")" + " / " + placedEls[i];
                                }
                                return " in " + placedEls[i];
                            }
                        }
                    }
                }
            }
            }
        return "";
    }

    function addToMiniMenu(letter, reference) {
        var miniMenu = doc.getElementById('miniMenu'),
        div = doc.createElement('div'),
        miniMenuTitle = "";
        miniMenuTitle = action.selectedItem + checkIfInAnotherPanel();

        //if user uses custom name.
        if(action.savedElements.placedElements[action.selectedItem]['customName']){
            miniMenuTitle = "(" + action.savedElements.placedElements[action.selectedItem]['customName'] + ")" + " / " + action.selectedItem + checkIfInAnotherPanel();
            //miniMenuTitle = miniMenuTitle.substring(0, 60);
        }

        miniMenu.title = miniMenuTitle;

        div.innerHTML = letter;
        div.className = 'shortcut';
        div.onclick = function() {
            scrollToElement(reference);
        }
        miniMenu.appendChild(div);
        //make the click faster as touchstart or touchend isn't available
        FastClick.attach(div);
    };

    function checkAddToMiniMenu(liName, div) {
        switch (liName) {
            case 'size':
                addToMiniMenu('A', div);
                break;
            case 'position':
                addToMiniMenu('B', div);
                break;
            case 'width':
                addToMiniMenu('C', div);
                break;
            case 'boxColor':
                addToMiniMenu('E', div);
                break;
            case 'align':
                addToMiniMenu('F', div);
                break;
            case 'shadow':
            case 'boxShadow':
                addToMiniMenu('G', div);
                break;
            case 'radius':
                addToMiniMenu('H', div);
                break;
            case 'fonts':
                addToMiniMenu('I', div);
                break;
            case 'uppercase':
                addToMiniMenu('K', div);
                break;
            case 'addtext':
                addToMiniMenu('L', div);
                break;
            case 'delete':
                addToMiniMenu('M', div);
                break;
        }
    }

    function createAffixes() {
    	var bmAffixes, holderDiv, prefix, suffix;

        bmAffixes = doc.createElement('li');
        bmAffixes.id = "BMaffixes";
        bmAffixes.className = "bottomMenuLI";

        holderDiv = doc.createElement('div');
        holderDiv.style.cssText = "width:100%; position:absolute; top:50%; -webkit-transform:translate(0%,-50%)";

        prefix = doc.createElement('div');
        prefix.id = "prefixDiv";
        prefix.innerHTML = '<div id="customPrefixDivWrapper" style="position:absolute;left:50%; -webkit-transform:translate(-50%,0%)scale(0.8);"><input type="text" id="customPrefixInput"/></div><label>&nbsp;&nbsp;Prefix</label>';

        suffix = doc.createElement('div');
        suffix.id = "suffixDiv";
        suffix.innerHTML = '<div id="customSuffixDivWrapper" style="position:absolute;left:50%; -webkit-transform:translate(-50%,0%)scale(0.8);"><input type="text" id="customSuffixInput"/></div><label>&nbsp;&nbsp;Suffix</label>';

        doc.getElementById('bottomMenuUL').appendChild(bmAffixes);
        bmAffixes.appendChild(holderDiv);
        holderDiv.appendChild(prefix);
        holderDiv.appendChild(suffix);

        action.cgAffix('prefix');
        action.cgAffix('suffix');
    }

    function createCustomCSS() {
        var customCSS, label, cCSS, holderDiv;
        customCSS = document.createElement('li');
        customCSS.id = "BMcustomCSS";
        customCSS.className = "bottomMenuLI";
        doc.getElementById('bottomMenuUL').appendChild(customCSS);

        label = doc.createElement('div');
        label.innerHTML = "Custom CSS";
        label.className = "liText";
   
        customCSS.appendChild(label);

        holderDiv = document.createElement('div');
        holderDiv.style.cssText = "width:100%; position:absolute; top:50%; -webkit-transform:translate(0%,-50%)";
        customCSS.appendChild(holderDiv);

        cCSS = doc.createElement('textarea');
        cCSS.className = "customCSSInput";
        cCSS.id = "customCSSText";
        cCSS.cols = "40";
        holderDiv.appendChild(cCSS);

        cCSS.onfocus = function(){
        	bottomMenuCSS.insertCustomCSS();
        };
        cCSS.onblur = function(){
        	bottomMenuCSS.updateCustomCSS();
        };
    }

    function createWhat(liName, does, id) {
        var type = "";
        liName = (liName === 'style') ? 'styleText' : liName;
        if(userOptions[liName]){
            type = userOptions[liName].type;
            switch (type) {
                case 'range':
                    bottomMenuButtons.createRange(id, does);
                break;
                case 'button':
                    bottomMenuButtons.createButtons(id, liName);
                break;
                case 'tributton':
                    bottomMenuButtons.createTriButtons(id, userOptions[liName].tributton.buttonNames[0], userOptions[liName].tributton.buttonNames[1], userOptions[liName].tributton.buttonNames[2]);
                break;
                case 'borderButton':
                    bottomMenuButtons.createBorderButton(id);
                break;
            }
        }
    }

    function setCustomInfoIfThere(liName, element){
    	if(userOptions[liName]){
			if(userOptions[liName].label){
				if(userOptions[liName].info){
					element.innerHTML = userOptions[liName].label + ' &#9432;';
				}else{
					element.innerHTML = userOptions[liName].label;
				}
			}
        	if(userOptions[liName].info){
        		element.onclick = function(){
        			jPopup({
				        type: "alert",
				        message: userOptions[liName].info,
				        yesButtonText: "OK",
				        functionOnOk: function() {
				            //do something on ok
				        }
				    });
        		};
        	}
        }
    }

    function createList(liName, does) {
    	var UL, li, div, innerStuff = liName;
        UL = doc.getElementById('bottomMenuUL');
        li = doc.createElement('li');
        div = doc.createElement('div');
        checkAddToMiniMenu(liName, div);
        if(userOptions[liName]){
            if(userOptions[liName].newName){
                innerStuff = userOptions[liName].newName;
            }
        }
        div.innerHTML = innerStuff;
        div.className = 'liText';
        setCustomInfoIfThere(liName, div);
        li.id = 'BM' + liName;
        li.className = 'bottomMenuLI';
        li.appendChild(div);
        UL.appendChild(li);
        createWhat(liName, does, li.id);
    }

    function createItems(thisArray, name, exclude) {
    	var name, cssval, i;
        exclude = (exclude) ? exclude : [];
        for (i = 0; i < constants[thisArray].length; i++) {
            name = constants[thisArray][i];
            cssval = name;
            if (exclude.indexOf(name) <= -1) { //if item is not excluded
                if (name === 'affixes') {
                    createAffixes(name, cssval);
                } else if (name === 'customCSS') {
                    createCustomCSS();
                } else {
                    createList(name, cssval);
                }
            }
        }
    }

    function layoutSettings() {
        
        if (action.selectedItem.substring(0, 3) === 'box') {
            createItems('boxEditArray', 'box');
        }else if (action.selectedItem === 'quote1') {
            createItems('rssArray', 'rss');
        }else if (action.selectedItem === 'batterypie') {
            createItems('progressArray', 'progress');
        }else if (action.selectedItem.substring(0, 3) === 'fpp') {
            createItems('fpEditArray', 'fpp');
        }else if (action.selectedItem === 'flipclock'){
            createItems('flipclockEditArray', 'flipClock');
        } else if (action.selectedItem === 'avatarImage') {
            createItems('avatarEditArray', 'avatarImage');
        } else if (action.selectedItem.substring(0, 3) === 'tri') {
            createItems('triEditArray', 'tri');
        } else if (action.selectedItem.substring(0, 6) === 'notify') {
            createItems('notifyArray', 'notify');
        } else if (action.selectedItem == 'songalbumArt' || action.selectedItem == 'songalbumArtnohide') {
            createItems('albumEditArray', 'songalbumArt', ['boxColor', 'boxShadow', 'blurbehind']);
        } else if (widgetArray.indexOf(action.selectedItem) != -1) {
            createItems('widgetArray', 'widget');
        } else if (action.selectedItem === 'icon' || action.selectedItem === 'day1icon' || action.selectedItem === 'day2icon' || action.selectedItem === 'day3icon' || action.selectedItem === 'day4icon' || action.selectedItem === 'day5icon' || action.selectedItem === 'hour1icon' || action.selectedItem === 'hour2icon' || action.selectedItem === 'hour3icon' || action.selectedItem === 'hour4icon' || action.selectedItem === 'hour5icon') {
            createItems('iconArray', 'icon');
        } else if (action.selectedItem.length > 4 && action.selectedItem.substring(0, 4) === 'text') {
            createItems('customTextNew', 'text');
        } else if (action.selectedItem.substring(0, 9) === 'customDiv') {
            createItems('customDivArray', 'customDiv');
        } else if (action.selectedItem === 'coloricon'){
            createItems('editIconArray', 'coloricon');
        } else if (action.selectedItem.substring(0, 11) === 'customPanel'){
            createItems('customPanelArray', 'customPanel');
        } else {
            createItems('editArray', 'everything');
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.layoutSettings = function() {
            layoutSettings();
        };
        return externalMethods;
    }
    
    window.bottomMenuLayout = initExternalMethods();
}(window, document));