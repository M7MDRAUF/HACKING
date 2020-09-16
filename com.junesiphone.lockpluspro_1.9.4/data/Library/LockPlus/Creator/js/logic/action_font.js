
/**
 * Handling of the font menu.
 * Handle uppercase
 * Handle align
 */

var fontMoving = false;

(function(window, doc) {
    var symbolFonts = ['entypo', 'mat1', 'mat2', 'mat3', 'mat4', 'mat5', 'webdev', 'Mountain'],
        fontHolderDIV = doc.getElementById('font'),
        fontCategories = {
            scripted : ['alistairsignature', 'allura', 'autograf', 'autumnchant', 'azkasia-demo', 'back', 'badweather', 'beautydemo', 'beadworkdemo', 'bellagio', 'bettersignature', 'billionstars_personaluse', 'blackjack', 'bklchcry', 'braxton', 'bssignature', 'carybe', 'cherry-cordial', 'daniel-bold', 'fronte', 'fringe', 'goodvibes', 'hightide', 'krinkles', 'krinklesdecor', 'lasenter_personaluseonly', 'mafakanev', 'masterofbreak', 'mostwasted', 'olympic', 'pacifico', 'paktype-naqsh', 'parry_hotter', 'pushkin', 'ratinfested', 'rotterdam', 'salamat', 'samster', 'scriptina', 'sensationsandqualities', 'shimes', 'shimestwo', 'signer', 'streamster', 'tiza', 'tuesdaynight-regular', 'wildyouth', 'yungjames'],
        };

    /* 
      Creating a list ABC, abc, and 123 for Symbol preview 
    */
    function createSymbolPreviewInnerHTML(font) {
        var html, abc, numbers, i, f, e;
        html = '';
        abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        html += '<br><br><br><br>';
        for (i = 0; i < abc.length; i++) {
            html += '<div>' + abc[i] + ': <span style="font-family:' + font + ';">' + abc[i] + '</span><span>&nbsp;&nbsp;</span></div>';
        }
        html += '<br><br>';
        for (f = 0; f < abc.length; f++) {
            html += '<div>' + abc[f].toUpperCase() + ': <span style="font-family:' + font + ';">' + abc[f].toUpperCase() + '</span><span>&nbsp;&nbsp;</span></div>';
        }
        html += '<br><br>';
        for (e = 0; e < numbers.length; e++) {
            html += '<div>' + numbers[e] + ': <span style="font-family:' + font + ';">' + numbers[e] + '</span><span>&nbsp;&nbsp;</span></div>';
        }
        return html;
    }

    /* 
      Creating symbol preview window 
    */
    function createSymbolPreviewWindowForFont(font) {
        var fontDiv = doc.createElement('div'),
            closeDiv = doc.createElement('p'),
            setDiv = doc.createElement('p');
        closeDiv.innerHTML = "Close";
        setDiv.innerHTML = "Set Font";
        closeDiv.id = 'symbolCloseDiv';
        setDiv.id = 'symbolSetDiv';
        closeDiv.onclick = function() {
            doc.body.removeChild(fontDiv);
        };
        setDiv.onclick = function() {
            doc.body.removeChild(fontDiv);
            action.setFont(font);
        };
        fontDiv.id = 'symbolFontList';
        fontDiv.innerHTML = createSymbolPreviewInnerHTML(font);
        fontDiv.appendChild(closeDiv);
        fontDiv.appendChild(setDiv);
        doc.body.appendChild(fontDiv);
    }

    /* 
      Loop through all elements to see if a font is on an element 
    */
    function calculateUsedFonts() {
        var usedFonts = [];
        Object.keys(action.savedElements.placedElements).forEach(function(key) {
            var value = action.savedElements.placedElements[key];
            Object.keys(value).forEach(function(skey) { //loop styles on the object
                var styleVal = value[skey];
                if (skey === 'font-family') {
                    usedFonts.push(styleVal);
                }
            });
        });
        return usedFonts;
    }

    /*
      Creating a list a-z that allows easier font navigation
    */
    function createShortcuts(array) {
        sortArray(array); //helpers.js
        var holder = doc.getElementById('fontShortcuts'),
            i, item;
        holder.innerHTML = "";
        for (i = 0; i < array.length; i++) {
            item = doc.createElement('div');
            item.innerHTML = array[i];
            holder.appendChild(item);
        }
    }

    /* 
      I wanted symbol fonts first
      so after the array is sorted run this to move
      items in the array.

      ***REMOVED
    */
    function moveSymbolsToBeginning() {
        var place = null, i;
        for (i = 0; i < symbolFonts.length; i++) {
            place = fontArray.indexOf(symbolFonts[i]);
            fontArray.move(symbolFonts[i], -place);
        }
    }

    /* 
      Appending all fonts to the list
    */
    function createFontList(object) {
        var fontList = doc.getElementById('fList'),
            defaultFont = doc.createElement('li'),
            defaultFont2 = doc.createElement('li'),
            fragment = doc.createDocumentFragment(),
            usedFonts = calculateUsedFonts(),
            shortcutArray = [],
            selected = doc.getElementById(action.selectedItem),
            li, i, innerHTML;
        fontList.innerHTML = "";
        sortArray(fontArray);

        //for svg knockout
        if(selected.classList.contains('knockout')){
            innerHTML = doc.getElementById(action.selectedItem + 'knockout').innerHTML;
        }else{
            innerHTML = selected.innerHTML;
        }

        if(object){
            if(object.subsection){
                for (i = 0; i < fontArray.length; i += 1) {
                    if(fontCategories[object.subsection].contains(fontArray[i].toLowerCase())){
                        li = doc.createElement('li');
                        li.innerHTML = '<span class="fontname">(' + fontArray[i] + ') </span><br>' + selected.innerHTML;
                        if(selected.style.fontFamily === fontArray[i]){
                            li.style.backgroundColor = 'white';
                            li.style.color = 'black';
                        }
                        li.style.fontFamily = fontArray[i];
                        li.title = fontArray[i];
                        fragment.appendChild(li);
                    }
                }
            }else{
                for (i = 0; i < fontArray.length; i += 1) {
                    if (usedFonts.contains(fontArray[i])) {
                        li = doc.createElement('li');
                        li.innerHTML = '<span class="fontname">(' + fontArray[i] + ') </span><br>' + selected.innerHTML;
                        if(selected.style.fontFamily === fontArray[i]){
                            li.style.backgroundColor = 'white';
                            li.style.color = 'black';
                        }
                        li.style.fontFamily = fontArray[i];
                        li.title = fontArray[i];
                        fragment.appendChild(li);
                    }
                }
            }
        }else{
            defaultFont.title = 'helvetica';
            defaultFont.innerHTML = '<span class="fontname">(helvetica) </span><br>' + selected.innerHTML;
            defaultFont2.title = '-apple-system';
            defaultFont2.innerHTML = '<span class="fontname">(-apple-system) </span><br>' + selected.innerHTML;
            
            fontList.appendChild(defaultFont);
            fontList.appendChild(defaultFont2);
            moveSymbolsToBeginning();
            for (i = 0; i < fontArray.length; i += 1) {
                //add first letter to shortcutArray
                var firstLetter = String(fontArray[i]).charAt(0).toLowerCase();
                if (!shortcutArray.contains(firstLetter) && checkIfLetter(firstLetter)) {
                    shortcutArray.push(firstLetter);
                }
                li = doc.createElement('li');
                li.innerHTML = '<span class="fontname">(' + fontArray[i] + ') </span><br>' + innerHTML;
                if (usedFonts.contains(fontArray[i])) {
                    li.style.backgroundColor = 'white';
                    li.style.color = 'black';
                } else {
                    li.style.backgroundColor = 'black';
                    li.style.color = 'white';
                }
                li.style.fontFamily = fontArray[i];
                li.title = fontArray[i];
                fragment.appendChild(li);
            }
        }
        
        fontList.appendChild(fragment);
        fontHolderDIV.style.display = 'block';
        createShortcuts(shortcutArray);
    }

    /*
      When a shortcut is pressed we scroll to the first font with that letter.
    */
    function scrollFontList(el) {
        var fontList = doc.getElementById('fList');
        for (var i = 0; i < fontList.children.length; i++) {
            if (fontList.children[i].title) {
                if (String(fontList.children[i].title).charAt(0).toLowerCase() === el.target.innerHTML) {
                    //if item isn't in the symbolFonts, as we moved them to the top of the list.
                    if (!symbolFonts.contains(fontList.children[i].title)) {
                        fontList.children[i].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        return;
                    }
                }
            }
        }
    }

    /*
      touchmove on fontHolderDIV
    */
    function setFontMoving() {
        fontMoving = true;
    }

    function removePreviewEvents(){
        document.getElementById('fontPreviewApplyButton').removeEventListener('touchend', applyFont);
        document.getElementById('fontPreviewCloseButton').removeEventListener('touchend', goBackPreview);
    }

    function removePreviewWindow(){
        document.body.removeChild(document.getElementById('fontPreviewWindow'));
    }

    function applyFont(el){
        document.getElementById('font').style.opacity = 1.0;
        removePreviewEvents();
        removePreviewWindow();
        action.setFont(el.target.title);
        deselectScreenElement(action.selectedItem, true);
    }

    function goBackPreview(el){
        removePreviewEvents();
        removePreviewWindow();
        document.getElementById('font').style.opacity = 1.0;
    }

    function showFontPreview(event){
        if(document.getElementById('fontPreviewWindow')){
            document.body.removeChild(document.getElementById('fontPreviewWindow'));
        }
        document.getElementById('font').style.opacity = 0.5;
        var text = event.target.innerHTML.split(')')[1].replace('<br>',''),
        fontPreviewWindow = createDOM({
            type: 'div',
            id: 'fontPreviewWindow',
            attribute: ['title', 'Font: ' + event.target.title]
        }),
        fontPreviewText = createDOM({
            type: 'div',
            id: 'fontPreviewText',
            innerHTML: text,
        }),
        fontPreviewABC = createDOM({
            type: 'div',
            id: 'fontPreviewABC',
            innerHTML: "ABCDEFGHIJKLM<br>NOPQRSTUVWXYZ <br> abcdefghijklm<br>nopqrstuvwxyz <br> 0123456789"
        }),
        applyButton = createDOM({
            type: 'div',
            id: 'fontPreviewApplyButton',
            innerHTML: 'Apply Font',
            attribute: ['title', event.target.title]
        }),
        cancelButton = createDOM({
            type: 'div',
            id: 'fontPreviewCloseButton',
            innerHTML: "Go Back",
            attribute: ['title', event.target.title]
        });

        fontPreviewABC.style.fontFamily = event.target.title;
        fontPreviewText.style.fontFamily = event.target.title;

         Object.keys(action.savedElements.placedElements[action.selectedItem]).forEach(function(skey) { //loop styles on the object
            var styleVal = action.savedElements.placedElements[action.selectedItem][skey];
            if(skey != '-webkit-transform' && skey != 'top' && skey != 'left' && skey != 'font-size' && skey != 'position' && skey != 'z-index' && skey != 'text-align' && skey != 'font-family' && skey != 'width' && skey != 'height'){
                
                fontPreviewText.style[skey] = styleVal;
            }
        });


        cancelButton.addEventListener('touchend', goBackPreview);
        applyButton.addEventListener('touchend', applyFont);

        fontPreviewWindow.appendChild(fontPreviewText);
        fontPreviewWindow.appendChild(fontPreviewABC);
        fontPreviewWindow.appendChild(applyButton);
        fontPreviewWindow.appendChild(cancelButton);
        document.body.appendChild(fontPreviewWindow);
        //action.setFont(event.target.title);
    }

    /*
      touchend on fontHolderDIV
    */
    function fontSelected(el) {
        if (fontMoving == true) {
            fontMoving = false;
        } else {
            if (event.target.nodeName === 'LI') {
                if (symbolFonts.indexOf(event.target.title) > -1) {
                    createSymbolPreviewWindowForFont(event.target.title);
                } else {
                    showFontPreview(event);
                }
            } else {
                if(el.target.className.indexOf('fontMenuButtons') != -1){

                }else{
                    action.cgfont();
                }
            }
        }
    }

    /* 
      Font buttons on top of the font menu 
    */
    function loadFontMenuButtons() {
        var fontButtonsDIV = doc.getElementById('fontButtons'),
            fontButtons = {
                closeFontList: {
                    action: function() {
                        var button = document.getElementById('button_usedFontList');
                        deselectScreenElement(action.selectedItem, true);
                        fontHolderDIV.style.display = 'none';
                        button.innerHTML = "Applied Fonts";
                        button.title = "usedFonts";
                    },
                    innerText: 'Close Fonts',
                    className: 'fontMenuButtons close'
                },
                usedFontList: {
                    action: function(el) {
                        if(el.target.title === 'usedFonts'){
                            createFontList({
                                selectedOnly: true,
                            });
                            el.target.title = 'allFonts';
                            el.target.innerHTML = 'All Fonts';
                        }else{
                            createFontList();
                            el.target.title = 'usedFonts';
                            el.target.innerHTML = 'Applied Fonts';
                        }

                    },
                    innerText: 'Applied Fonts',
                    className: 'fontMenuButtons used',
                    title: 'usedFonts'
                },
                scriptFonts:{
                    action: function(){
                        createFontList({
                            subsection: 'scripted'
                        });
                    },
                    innerText: 'Script Fonts',
                    className: 'fontMenuButtons script',
                    title: 'scriptFonts'
                }
            },
            div = null,
            button = null;
        Object.keys(fontButtons).forEach(function(key) {
            button = fontButtons[key];
            div = doc.createElement('div');
            div.innerHTML = button.innerText;
            div.title = button.title;
            div.id = 'button_' + key;
            div.className = button.className;
            div.onclick = function(el) {
                fontButtons[key].action(el);
            };
            fontButtonsDIV.appendChild(div);
        });
    }

    function init() {
        loadFontMenuButtons();
        fontHolderDIV.addEventListener('touchmove', setFontMoving, false);
        fontHolderDIV.addEventListener('touchend', fontSelected, false);
        doc.getElementById('fontShortcuts').addEventListener('touchend', scrollFontList, false);
    }
    init();

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.createFontList = function() {
            createFontList();
        };
        return externalMethods;
    }
    window.fontMenuOptions = initExternalMethods();
}(window, document));



action.setFont = function (fontName) {
    action.setCss(action.selectedItem, 'font-family', fontName);
    document.getElementById(action.selectedItem).setAttribute('title', "Font: " + fontName);
    document.getElementById('font').style.display = 'none';
};

action.cgfont = function () {
    bottomMenu.closeBottomMenu();
    fontMenuOptions.createFontList();
};

// action.cguppercase = function () {
//     console.log(constants);
//     var lastSelector = '#' + $('#' + action.selectedItem).css('text-transform') + 'Option';
//     this.cgOption('uppercase', constants.editArray[7], ['uppercase', 'capitalize', 'lowercase'], 0, true, function (optionSelector) {
//         lastSelector = action.basicOptionSelected(optionSelector, lastSelector, 'text-transform', $(optionSelector).attr('id').substring(0, $(optionSelector).attr('id').length - 6));
//     }, function (optionName) {
//         //return $('<label id="' + optionName + 'Option" style="text-align: center; text-transform: ' + optionName + ';">' + optionName + '</label>');
//         return action.getBasicOptionElement(optionName, 'text-align: center; text-transform: ' + optionName, 'text-transform');
//     });
// };

// action.cgalign = function () {
//     var lastSelector = '#' + $('#' + action.selectedItem).css('text-align') + 'Option';
//     this.cgOption('align', constants.editArray[4], ['left', 'center', 'right'], 0, true, function (optionSelector) {
//         if (optionSelector === '#centerOption') {
//             var prmpt = confirm('Do you want this centered on the screen?\nIf you want it centered by a defined width press cancel.');
//             if (prmpt === true) {
//                 action.autoCenter();
//             }
//         }
//         lastSelector = action.basicOptionSelected(optionSelector, lastSelector, 'text-align', $(optionSelector).attr('id').substring(0, $(optionSelector).attr('id').length - 6));
//     }, function (optionName) {
//         return action.getBasicOptionElement(optionName, 'text-align: ' + optionName, 'text-align');
//     });
// };
