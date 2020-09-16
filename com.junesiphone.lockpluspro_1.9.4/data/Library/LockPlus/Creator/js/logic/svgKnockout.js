(function(window, doc) {
    var el = document.getElementById(action.selectedItem);

    function createSVG(div, color){
        div = div || action.selectedItem;
        var html = "";
        html += '<svg style="position:absolute;left:0;top:0;pointer-events:none;-webkit-transform:translateZ(0);" class="'+div+'-text-container" width="100%" height="100%">';
        html += '<rect width="100%" height="100%" fill="'+color+'" x="0" y="0" fill-opacity="1" mask="url(#'+div+'-knockout)" />';
        html += '<mask id="'+div+'-knockout">';
        html += '<rect width="100%" height="100%" fill="#fff" x="0" y="0" />';
        html += '<text id="'+div+'knockout" alignment-baseline="central" x="50%" y="50%" fill="#000" text-anchor="middle"></text>';
        html += ' </mask></svg>';
        return html;
    }

    function toggleKnockout(div){

        div = div || action.selectedItem;

        var el = document.getElementById(div),
            placedItem = action.savedElements.placedElements[div],
            cachedHTML, color = 'white', values;

        if(el){
            values = placedItem.knockout;
            cachedHTML = el.innerHTML;

            /* Is knockout on placed element? */
            if(values){
                color = (values.knockoutColor) ? values.knockoutColor : 'white';
            }else{
                placedItem['knockout'] = {};
                placedItem['knockout']['knockoutColor'] = color;
            }

            /* Has svg already been created? */
            if(cachedHTML.indexOf('svg') > -1){
                cachedHTML = doc.getElementById(div + 'knockout').innerHTML;
            }

            /* replace innerHTML with svg */
            el.innerHTML = createSVG(div, color);

            el.classList.add("knockout");

            if(!placedItem['width']){
                el.style.width = '80px';
                el.style.height = '35px';
                placedItem['width'] = '80px';
                placedItem['height'] = '35px';
            }else{
                el.style.width = placedItem['width'];
                el.style.height = placedItem['height'];
            }

            action.saveStorage();
            if(doc.getElementById(div + 'knockout')){
                doc.getElementById(div + 'knockout').innerHTML = cachedHTML;
            }
        }
    }

    function removeKnockout(div){
        div = div || action.selectedItem;
        el = document.getElementById(div);
        if(el){
            if(el.classList.contains('knockout')){
                delete action.savedElements.placedElements[div]['knockout'];
                el.innerHTML = document.getElementById(div + "knockout").innerHTML;
                el.classList.remove('knockout');
            }
        }
    }

    function setColor(){
        var prm = prompt('Enter a color, supports name, rgb, rgba, and hex');
        if(prm){
            action.savedElements.placedElements[action.selectedItem]['knockout']['knockoutColor'] = prm;
            toggleKnockout();
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.toggle = function(div) {
            toggleKnockout(div);
        };
        externalMethods.remove = function(div) {
            removeKnockout(div);
        };
        externalMethods.color = function() {
            setColor();
        };
        return externalMethods;
    }
    window.svgKnockout = initExternalMethods();
}(window, document));