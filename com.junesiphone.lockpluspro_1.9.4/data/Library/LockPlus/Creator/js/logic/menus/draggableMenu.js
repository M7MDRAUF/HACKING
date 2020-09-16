(function(window, doc){
    var eventsAdded = [];
    var menuName = 'shadowMenu';

    function addEvent(obj){
        if(obj.type){
            obj.element.addEventListener(obj.type, obj.action);
            eventsAdded.push(obj);
        }
    }

    function makeAndAppendMenu(id){
        var menu = doc.createElement('div');
            menu.id = id;
            menu.className = 'menuThreeInputsOneButton';
            doc.body.appendChild(menu);
        return menu;
    }

    function createDragButton(){
        var button = document.createElement('div');
            button.className = 'shadowDragButton';
            button.innerHTML = '';
            button.id = "shadowDragButton";
        return button;
    }

    /*
        addEvent({
            type: 'click',
            action: removeMenu,
            element: button
        });
    */
    function deleteDraggable(){
        try{
            $('#shadowMenu').draggable( "destroy");
        }catch(err){}
    }
    function removeAllEvents(){
        liSelected = null;
        deleteDraggable();
        var i, obj;
        for (i = 0; i < eventsAdded.length; i++) {
            obj = eventsAdded[i];
            obj.element.removeEventListener(obj.type, obj.action);
        }
        eventsAdded = [];
    }
    function removeMenu(el){
        var menuDIV = doc.getElementById(menuName);
        if(menuDIV){
            if(el){
                deselectScreenElement(action.selectedItem, true);
            }
            removeAllEvents();
            if(menuDIV){
                menuDIV.parentElement.removeChild(menuDIV);
            }
            shadowInfo = [];
        }
    }
    function createCloseButton(){
        var button = document.createElement('div');
            button.className = 'shadowCloseButton';
            button.innerHTML = '';
            button.id = "shadowCloseButton";
            button.style.zIndex = '9999';
            button.setAttribute('onclick', 'draggableMenu.removeMenu()');
            addEvent({
                type: 'click',
                action: removeMenu,
                element: button
            });
        return button;
    }
    function createMenu(){
        var menu = makeAndAppendMenu(menuName);
        menu.appendChild(createDragButton());
        menu.appendChild(createCloseButton());
        $('#shadowMenu').draggable({
            scroll: false,
            containment: 'window',
            axis: 'y',
            scroll: false,
            handle:'.shadowDragButton',
        });
        return menu;
    }
    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.create = function() {
            return createMenu();
        };
        externalMethods.removeMenu = function(){
            removeMenu();
        };
        return externalMethods;
    }
    window.draggableMenu = initExternalMethods();
}(window, document));