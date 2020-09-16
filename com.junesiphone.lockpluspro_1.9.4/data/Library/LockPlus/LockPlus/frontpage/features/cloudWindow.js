(function(window, doc) {
    var cloudInfo = null;

    function openMenu(menuString){
        if(menuString){
            window[menuString].create();
        }
    }

    function hasMenu(e){
        var titleInfo = e.target.title;
        if(titleInfo){
            if(cloudInfo.cloudItems[titleInfo].openMenu){
                openMenu(cloudInfo.cloudItems[titleInfo].openMenu);
            }
        }
    }

    function buttonPressed(e){
        var titleInfo = e.target.title;
        if(titleInfo){
            cloudInfo.cloudItems[titleInfo]();
        }
    }

    function removeUnderlineAddSpace(str){
        return str.replace('_',' ').replace('_',' ');
    }

    function removeMenu(){
        var element = doc.getElementById('cloudWindow');
        if(element){
            element.parentElement.removeChild(element);
            EventsController.removeEvents({
                label: 'cloudWindow'
            });
        }
    }

    function createMenu(){
        removeMenu();
        var key, value, button,
        cloudWindow = doc.createElement('div');
        cloudWindow.id = 'cloudWindow';
        cloudWindow.className = 'cloudWindow';
        buttonContainer = doc.createElement('div');
        buttonContainer.className = 'cloudButtonContainer';

        Object.keys(cloudInfo.cloudItems).forEach(function(v){
            value = cloudInfo.cloudItems[v];
            key = v;
            if(key === 'name'){
                return;
            }
            button = createDOM({
                type: 'div',
                id: '',
                innerHTML: removeUnderlineAddSpace(key),
                className: 'cloudButton',
                attribute: ['title', key]
            });

            if(typeof(value) === "function"){
                EventsController.addEvent(button, {
                    event: 'click',
                    callback: buttonPressed,
                    label: 'cloudWindow'
                });
            }
            if(typeof(value) === "object"){
                EventsController.addEvent(button, {
                    event: 'click',
                    callback: hasMenu,
                    label: 'cloudWindow'
                });
            }
            buttonContainer.appendChild(button);
        });

        cloudWindow.appendChild(buttonContainer);
        cloudInfo.parentWindow.appendChild(cloudWindow);
        return cloudWindow;
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.makeCloud = function(obj) {
            cloudInfo = obj;
            return createMenu();
        };
        externalMethods.removeCloud = function() {
            return removeMenu();
        };
        return externalMethods;
    }
    window.cloudWindow = initExternalMethods();
}(window, document));
