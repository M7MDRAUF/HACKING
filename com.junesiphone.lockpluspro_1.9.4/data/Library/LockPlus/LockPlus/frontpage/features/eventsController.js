/*
    EventsController.addEvent(elem, {
          event: 'touchstart',
          callback: touchStarted,
          label: 'icon'
      });

      EventsController.removeEvents({
            label: 'menu'
        });

*/
(function(window) {
    var buttonEvents = [];
    function removeAllEvents(){
        var i, event;
        for (i = 0; i < buttonEvents.length; i++) {
            event = buttonEvents[i];
            event.div.removeEventListener(event.event, event.callback);
        }
        event = buttonEvents = null;
    }
    function removeEventByLabel(label){
        for (i = 0; i < buttonEvents.length; i++) {
            event = buttonEvents[i];
            if(event.label === label){
                event.div.removeEventListener(event.event, event.callback);
            }
        }
    }
    function removeEvents(obj){
        if(!obj){
            removeAllEvents();
            return;
        }

        if(obj.label){
            removeEventByLabel(obj.label);
        }
    }
    function addEvent(div, params){
        buttonEvents.push({
            div: div,
            event: params.event,
            callback: params.callback,
            label: params.label
        });
        div.addEventListener(params.event, params.callback);
    }
    function initExternalMethods() {
        var externalMethods = {};
        externalMethods.addEvent = function(div, param, label) {
          addEvent(div, param, label);
        };
        externalMethods.removeEvents = function(label) {
          removeEvents(label);
        };
        return externalMethods;
    }
    window.EventsController = initExternalMethods();
  }(window));