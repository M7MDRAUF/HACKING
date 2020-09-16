(function(window, doc){
    var menu = null;
    var eventsAdded = [];
    var selectedEL = null;
    var pressActions = {};

    function updateLI(){
        var m2 = menu.children[0];
        var ch = m2.children;
        for(var i = 0; i < ch.length; i++){
            var nM = ch[i].getAttribute('name');
            if(pressActions[action.selectedItem][nM]){
                var escaped = JSON.stringify(pressActions[action.selectedItem][nM]).replace(/,/g, ', ');
                ch[i].innerHTML = nM + " " + escaped;
            }
        }
    }

    function getSelectedElName(){
        return selectedEL.getAttribute('name');
    }

    var clickActions = {
        addaction: function(){
            if(menu){
                if(menu.parentElement){
                    if(menu.parentElement.parentElement){
                        menu.parentElement.parentElement.removeChild(menu.parentElement);
                    }
                }
            }
           menu = draggableMenu.create();
           menu.innerHTML += actionTemplate();
           menu = doc.getElementById('actionMenu');
           addEvents(menu);
        },
        affectitem: function(){
            placedMenu.createMenuWithAction(function(el){
                var divName = el.target.title.split('~')[0];
                if(divName.includes('/')){
                    divName = divName.split('/')[1];
                }

                if(!pressActions[action.selectedItem]){
                    pressActions[action.selectedItem] = {};
                }
                if(!pressActions[action.selectedItem].affectedItems){
                    pressActions[action.selectedItem].affectedItems = [];
                }
                pressActions[action.selectedItem].affectedItems.push(divName);
                menuLayout.close();
                menu.children[0].innerHTML += "<li class='action' title='actionLI' name='"+divName+"'>"+divName+"</li>";
            });
            action.savedElements.placedElements[action.selectedItem]['action'] = action.selectedItem;
            action.saveStorage();
        },
        deleteaction: function(){
            delete action.savedElements.placedElements[action.selectedItem]['action'];
            //delete action.savedElements.placedElements['pressActions'];
            delete pressActions[action.selectedItem];
            action.saveStorage();
            menu.children[0].innerHTML = "";
        },
        liSelected: function(li){
            selectedEL = li;
            var aPreview = document.getElementById('actionPreview');
            for(var i = 0; i < aPreview.children.length; i++){
                aPreview.children[i].className = 'action';
            }
            li.className += ' selectedAction';
            showActionOptions(li);
        },
        addstyle: function(){
            
        },
        removeelement: function(){

            //console.log(menu.children[0]);

            var itemActionObject = pressActions[action.selectedItem];
            var newArray = [];
            var selectedName = getSelectedElName();
            var array = itemActionObject.affectedItems;

            delete itemActionObject[selectedName];
            if(array){
                for (var index = 0; index < array.length; index++) {
                    if(array[index] != selectedName){
                        newArray.push(array[index]);
                    }
                }
                pressActions[action.selectedItem].affectedItems = newArray;
            }
            clickActions.saveActions();
            var liHolder = document.getElementById('actionPreview');
            if(liHolder){
                for (var ind = 0; ind < liHolder.children.length; ind++) {
                    if(liHolder.children[ind].getAttribute('name') === selectedName){
                        liHolder.removeChild(liHolder.children[ind]);
                    }
                }
            }
        },
        saveActions: function(){
            action.savedElements.placedElements['pressActions'] = pressActions;
            action.saveStorage();
        },
        updatePressActions: function(style, value){
            if(!pressActions[action.selectedItem][selectedEL.getAttribute('name')]){
                pressActions[action.selectedItem][selectedEL.getAttribute('name')] = {};
            }
            if(style === 'x'){
                pressActions[action.selectedItem][selectedEL.getAttribute('name')]['-webkit-transform']= 'translateX('+value+'px)';
            }else if (style === 'y'){
                pressActions[action.selectedItem][selectedEL.getAttribute('name')]['-webkit-transform']= 'translateY('+value+'px)';
            }else if (style === 'rotate'){
                pressActions[action.selectedItem][selectedEL.getAttribute('name')]['-webkit-transform']= 'rotate('+value+'deg)';
            }else{
                pressActions[action.selectedItem][selectedEL.getAttribute('name')][style]= value;
            }
            
            updateLI();
            clickActions.saveActions();
        },
        addleft: function(){
            var newPromp = prompt('Enter a value for the left style');
            if(newPromp){
                this.updatePressActions('left', newPromp);
            }
        },
        addtop: function(){
            var newPromp = prompt('Enter a value for the top style');
            if(newPromp){
                this.updatePressActions('top', newPromp);
            }
        },
        adddelay: function(){
            var newPromp = prompt('Enter a value for the delay value');
            if(newPromp){
                this.updatePressActions('delay', newPromp);
            }
        },
        addreset: function (){
            var newPromp = prompt('This will disable the toggle action of styles, enter true or false.');
            if(newPromp){
                this.updatePressActions('disableToggle', newPromp);
            }
        },
        addspeed: function(){
            var newPromp = prompt('Enter a value for the speed value');
            if(newPromp){
                this.updatePressActions('speed', newPromp);
            }
        },
        addcolor: function(){
            var newPromp = prompt('Enter a value for the color style');
            if(newPromp){
                this.updatePressActions('color', newPromp);
            }
        },
        addbgcolor: function(){
            var newPromp = prompt('Enter a value for the background color style');
            if(newPromp){
                this.updatePressActions('background-color', newPromp);
            }
        },
        addopacity: function(){
            var newPromp = prompt('Enter a value for the opacity style');
            if(newPromp){
                this.updatePressActions('opacity', newPromp);
            }
        },
        addx: function(){
            var newPromp = prompt('Enter a value for the x value. \n This is a smoother animation compared to left.');
            if(newPromp){
                this.updatePressActions('x', newPromp);
            }
        },
        addy: function(){
            var newPromp = prompt('Enter a value for the y value. \n This is a smoother animation compared to top.');
            if(newPromp){
                this.updatePressActions('y', newPromp);
            }
        },
        addrotate: function(){
            var newPromp = prompt('Enter a rotation value.');
            if(newPromp){
                this.updatePressActions('rotate', newPromp);
            }
        },
        addwidth: function(){
            var newPromp = prompt('Enter a value for the width style');
            if(newPromp){
                this.updatePressActions('width', newPromp);
            }
        },
        addheight: function(){
            var newPromp = prompt('Enter a value for the height style');
            if(newPromp){
                this.updatePressActions('height', newPromp);
            }
        },
        custom: function(){
            var stylePrompt = prompt('Enter a style name');
            if(stylePrompt){
                var styleVal = prompt('Enter a value for the style');
                this.updatePressActions(stylePrompt, styleVal);
            }
        },
        addpointerevents: function(){
            var newPromp = prompt('Type none or initial');
            if(newPromp){
                this.updatePressActions('pointer-events', newPromp);
            }
        },
        addzindex: function(){
            var newPromp = prompt('Enter a value for the zindex');
            if(newPromp){
                this.updatePressActions('z-index', newPromp);
            }
        },
        addelement:function(elType){
            switch (elType) {
                case 'unlock':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "unlock";
                    this.save();
                break;
                case 'flashlight':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "flashlight";
                    this.save();
                break;
                case 'play':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "play";
                    this.save();
                break;
                case 'next':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "next";
                    this.save();
                break;
                case 'prev':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "prev";
                    this.save();
                break;
                case 'search':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "search";
                    this.save();
                break;
                case 'drawer':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "drawer";
                    this.save();
                break;
                case 'respring':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "respring";
                    this.save();
                break;
                case 'fpsettings':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = "fpsettings";
                    this.save();
                break;
                case 'remove':
                    if(!pressActions[action.selectedItem]){
                        pressActions[action.selectedItem] = {};
                    }
                    if(!action.savedElements.placedElements[action.selectedItem]['action']){
                        action.savedElements.placedElements[action.selectedItem]['action'] = {};
                    }
                    action.saveStorage();
                    pressActions[action.selectedItem].singleAction = null;
                    this.save();
                break;
            }
        },
        save: function(){
            clickActions.saveActions();
            removeMenu();
        }
    }

    function showActionOptions(li){
        var ac = document.getElementById('actionButtons'),
        liName = li.getAttribute('name'),
        elementDiv;
        ac.parentElement.removeChild(ac);
        menu.innerHTML += template2();
        elementDiv = document.querySelectorAll("li[name='"+liName+"']")[0];
        elementDiv.scrollIntoView();
    }

    function template(){
        return [
            "<div id='actionMenu' class='actionMenu'>",
            "<div class='actionPreview' id='actionPreview'></div>",
            "<div class='actionButtons' id='actionButtons'>",
            "<div class='actionButton' title='affectitem'>Affect Item</div>",
            "<div class='actionButton' title='addaction'>Single Action</div>",
            "<div class='actionButton' title='deleteaction'>Delete All</div>",
            "</div>",
            "</div>"
        ].join("");
    }
    function actionTemplate(){
        return [
            "<div id='actionMenu' class='actionMenu'>",
            "<div class='actionPreview' id='actionPreview'></div>",
            "<div class='actionButtons' id='actionButtons'>",
            "<div class='actionButton' name='unlock' title='addelement'>Unlock</div>",
            "<div class='actionButton' name='flashlight' title='addelement'>flashlight</div>",
            "<div class='actionButton' name='play' title='addelement'>Play Music</div>",
            "<div class='actionButton' name='next' title='addelement'>Next Song</div>",
            "<div class='actionButton' name='prev' title='addelement'>Previous Song</div>",
            "<div class='actionButton' name='search' title='addelement'>Search</div>",
            "<div class='actionButton' name='drawer' title='addelement'>Drawer</div>",
            "<div class='actionButton' name='respring' title='addelement'>Respring</div>",
            "<div class='actionButton' name='fpsettings' title='addelement'>FPSettings</div>",
            "<div class='actionButton' name='remove' title='remove'>Remove All</div>",
            "</div>",
            "</div>"
        ].join("");
    }
    function template2(){
        return [
            "<div class='actionButtons' id='actionButtons'>",
            "<div class='actionButton' title='addleft'>Left</div>",
            "<div class='actionButton' title='addx'>x</div>",
            "<div class='actionButton' title='addy'>y</div>",
            "<div class='actionButton' title='addrotate'>Rotate</div>",
            "<div class='actionButton' title='addtop'>Top</div>",
            "<div class='actionButton' title='addcolor'>Color</div>",
            "<div class='actionButton' title='addbgcolor'>BGColor</div>",
            "<div class='actionButton' title='addopacity'>Opacity</div>",
            "<div class='actionButton' title='addspeed'>Speed</div>",
            "<div class='actionButton' title='adddelay'>Delay</div>",
            "<div class='actionButton' title='addreset'>Toggle</div>",
            "<div class='actionButton' title='addwidth'>Width</div>",
            "<div class='actionButton' title='addheight'>Height</div>",
            "<div class='actionButton' title='addzindex'>zindex</div>",
            "<div class='actionButton' title='addpointerevents'>events</div>",
            "<div class='actionButton' title='custom'>Custom</div>",
            "<div class='actionButton' title='removeelement'>Remove</div>",
            "<div class='actionButton' title='affectitem'>Affect Item</div>",
            "</div>"
        ].join("");
    }

    function removeAllEvents(){
        var i, obj;
        for (i = 0; i < eventsAdded.length; i++) {
            obj = eventsAdded[i];
            obj.element.removeEventListener(obj.type, obj.action, false);
        }
        eventsAdded = [];
    }


    function addEvent(obj){
        if(obj.type){
            obj.element.addEventListener(obj.type, obj.action, false);
            eventsAdded.push(obj);
        }
    }

    function actionMenuClicked(event){
        if(event.target.title === 'actionLI'){
            clickActions.liSelected(event.target);
        }else{
            if(event.target.title){
                if(clickActions[event.target.title]){
                    clickActions[event.target.title](event.target.getAttribute('name'));
                }
            }
        }
    }

    function addEvents(menu){
        addEvent({
            type: 'click',
            action: actionMenuClicked,
            element: menu
        });
    }

    function createDragMenu(){
        if(menu){
            if(menu.parentElement){
                if(menu.parentElement.parentElement){
                    menu.parentElement.parentElement.removeChild(menu.parentElement);
                }
            }
        }
       menu = draggableMenu.create();
       menu.innerHTML += template();
       menu = doc.getElementById('actionMenu');
       addEvents(menu);

       var pressOptions = action.savedElements.placedElements['pressActions'];
       var str = "";
       if(pressOptions){
           pressActions = action.savedElements.placedElements['pressActions'];
           for(actionX in pressActions){
               if(actionX === action.selectedItem){
                   if(pressActions[actionX].singleAction){
                       str += "<li class='action'>" + pressActions[actionX].singleAction + "</li>";
                   }
                   if(pressActions[actionX].affectedItems){
                    for(var d = 0; d < pressActions[actionX].affectedItems.length; d++){
                        str += "<li class='action' title='actionLI' name='"+pressActions[actionX].affectedItems[d]+"'>"+pressActions[actionX].affectedItems[d]+"</li>";
                    }
                   }
                   menu.children[0].innerHTML = str;
               }
           }
           updateLI();
       }
    }

    function removeMenu(){
        removeAllEvents();
        if(menu){
            menu.parentElement.parentElement.removeChild(menu.parentElement);
        }
    }

    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.create = function() {
            createDragMenu();
        };
        externalMethods.removeMenu = function(){
            removeMenu();
        };
        return externalMethods;
    }
    window.actionMenu = initExternalMethods();
}(window, document));

// var actionTest = [{
//     zclock: {
//         controlById: ['item1', 'item2'],
//         action: {
//             animate: [{
//                 top: 50,
//                 left: 20
//             }],
//         }
//     }
// }];

// var dR = btoa(JSON.stringify(actionTest));

// console.log(dR);

// var elementActions = JSON.parse(atob(dR));


