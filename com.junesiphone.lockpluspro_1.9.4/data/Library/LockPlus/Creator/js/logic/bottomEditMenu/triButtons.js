(function(window, doc) {

    function triButtonClicked(el){
        var classN = el.target.className,
            classClean = classN.replace('Tri', ''),
            name = el.target.parentElement.title;
            name = (name === 'BMstyle') ? 'styleText' : name.replace('BM', '');
            userOptions[name].tributton[classClean]();
            action.saveStorage();
    }

    function removeTriButtonEvents(){
        var divs = doc.getElementsByClassName('triContain');
            if(divs){
                for (var i = 0; i < divs.length; i++) {
                    divs[i].removeEventListener('click', triButtonClicked, false);
                }
            }
    }

    function makeTriButton(name, one, two, three) {
        var triContain = doc.createElement('div'),
            buttons = ['firstTri', 'secondTri', 'thirdTri'],
            tempDiv = null, 
            i, inner;
        triContain.className = 'triContain';
        triContain.title = name;
        triContain.addEventListener('click', triButtonClicked, false);

        for (i = 0; i < buttons.length; i++) {
            tempDiv = doc.createElement('div');
            tempDiv.className = buttons[i];
            tempDiv.innerHTML = one;
            switch(i){
                case 0:
                    inner = one;
                break;
                case 1:
                    inner = two;
                break;
                case 2:
                    inner = three;
                break;
            }
            tempDiv.innerHTML = inner;
            triContain.appendChild(tempDiv);
        }
        document.getElementById(name).appendChild(triContain);
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.make = function(name, one, two, three) {
            makeTriButton(name, one, two, three);
        };
        externalMethods.removeEvents = function() {
            removeTriButtonEvents();
        };
        return externalMethods;
    }
    window.triButtons = initExternalMethods();
}(window, document));