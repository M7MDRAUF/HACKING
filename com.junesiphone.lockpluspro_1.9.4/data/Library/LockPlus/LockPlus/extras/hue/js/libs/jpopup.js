/*                                                                
** Creator: JunesiPhone
** Website: http://junesiphone.com
** Usage: 
    jPopup({
        type: "alert",
        message: "Test alert",
        yesButtonText: "OK",
        functionOnOk: function() {
            //do something on ok
        }
    });

    jPopup({
        type: "confirm",
        message: "Choose an option below",
        yesButtonText: "Set App",
        noButtonText: "Set Icon",
        functionOnNo: function() {
            //do something on no
        },
        functionOnOk: function() {
            //do something on ok
        }
    });

    jPopup({
        type: "input",
        message: "Enter a number for spacing between icons.",
        yesButtonText: "Apply",
        noButtonText: "Cancel",
        functionOnNo: function() {
            //do something on no
        },
        functionOnOk: function(value) {
            //value sent from input
        }
    });
*/

(function(window, doc) {
    window.createDOM = function(params) {
        var d = doc.createElement(params.type);
        if (params.className) {
            d.setAttribute('class', params.className);
        }
        if (params.id) {
            d.id = params.id;
        }
        if (params.innerHTML) {
            d.innerHTML = params.innerHTML;
        }
        if (params.attribute) {
            d.setAttribute(params.attribute[0], params.attribute[1]);
        }
        if (params.attribute2) {
            d.setAttribute(params.attribute2[0], params.attribute2[1]);
        }
        if (params.attribute3) {
            d.setAttribute(params.attribute3[0], params.attribute3[1]);
        }
        if (params.type === "img") {
            d.src = params.src;
        }
        if (params.appendChild) {
            d.appendChild(params.appendChild);
        }
        return d;
    };
}(window, document));

/* global createDOM */
(function(doc) {
    var jPopup = function(j) {
        var buttonEvents = [],
            removeEvents = function(){
                var i, event;
                for (i = 0; i < buttonEvents.length; i++) {
                    event = buttonEvents[i];
                    event.div.removeEventListener(event.event, event.callback);
                }
                event = buttonEvents = null;
            },
            registerPopupEvents = function(div, params) {
                buttonEvents.push({
                    div: div,
                    event: params.event,
                    callback: params.callback
                });
                div.addEventListener(params.event, params.callback);
            },
            addEventToButton = function(button, popup, type, returnvalue) {
                registerPopupEvents(button, {
                    event: type,
                    callback: function(el) {
                        if (el.target.id === "jSystemNo") {
                            if (j.functionOnNo) {
                                j.functionOnNo();
                            }
                        }else if (el.target.id === "jSystemYes" || el.target.id === "jSystemOK") {
                            if (j.functionOnOk) {
                                if (returnvalue) {
                                    j.functionOnOk(doc.getElementById('jSystemInput').value);
                                } else {
                                    j.functionOnOk();
                                }
                            }
                        }else if (el.target.id === "jSystemYesExtra" || el.target.id === "jSystemNoExtra" || el.target.id === 'jSystemExtra') {
                            
                            if(el.target.id === 'jSystemYesExtra'){
                                if (returnvalue) {
                                    j.functionOnOk(doc.getElementById('jSystemInput').value);
                                }else{
                                    j.functionOnOk();
                                }
                            }else if (el.target.id === 'jSystemNoExtra'){
                                j.functionOnNo();
                            }else if (el.target.id === 'jSystemExtra'){
                                j.functionOnExtra();
                            }
                        }
                        if (!j.dontCloseOnYes) {
                            removeEvents();
                            doc.body.removeChild(popup);
                        }
                    }
                });
            },
            alertPop = function() {
                var systemPopup = createDOM({
                        type: 'div',
                        id: 'jSystemPopup'
                    }),
                    systemMessage = createDOM({
                        type: 'div',
                        id: 'jSystemMessage',
                        innerHTML: j.message
                    }),
                    systemOptions = createDOM({
                        type: 'div',
                        className: 'jSystemOptions'
                    }),
                    systemOK = createDOM({
                        type: 'div',
                        id: 'jSystemOK',
                        innerHTML: j.yesButtonText,
                        attribute: ['title', j.yesButtonText]
                    });

                systemPopup.appendChild(systemMessage);
                systemOptions.appendChild(systemOK);
                systemPopup.appendChild(systemOptions);
                doc.body.appendChild(systemPopup);
                addEventToButton(systemOK, systemPopup, 'click');
                systemPopup = systemOK = systemMessage = systemOptions = null;
            },
            confirmPop = function() {
                var systemPopup = createDOM({
                        type: 'div',
                        id: 'jSystemPopup'
                    }),
                    systemMessage = createDOM({
                        type: 'div',
                        id: 'jSystemMessage',
                        innerHTML: j.message
                    }),
                    systemOptions = createDOM({
                        type: 'div',
                        className: 'jSystemOptions'
                    }),
                    systemYes = createDOM({
                        type: 'div',
                        id: 'jSystemYes',
                        innerHTML: j.yesButtonText,
                        attribute: ['title', j.yesButtonText]
                    }),
                    systemNo = createDOM({
                        type: 'div',
                        id: 'jSystemNo',
                        innerHTML: j.noButtonText,
                        attribute: ['title', j.noButtonText]
                    });

                systemPopup.appendChild(systemMessage);
                systemOptions.appendChild(systemYes);
                systemOptions.appendChild(systemNo);
                systemPopup.appendChild(systemOptions);
                doc.body.appendChild(systemPopup);
                addEventToButton(systemYes, systemPopup, 'click');
                addEventToButton(systemNo, systemPopup, 'click');
                systemPopup = systemMessage = systemOptions = systemYes = systemNo = null;
            },
            triButton = function() {
                var systemPopup = createDOM({
                        type: 'div',
                        id: 'jSystemPopup'
                    }),
                    systemMessage = createDOM({
                        type: 'div',
                        id: 'jSystemMessage',
                        innerHTML: j.message
                    }),
                    systemOptions = createDOM({
                        type: 'div',
                        className: 'jSystemOptions'
                    }),
                    systemYes = createDOM({
                        type: 'div',
                        id: 'jSystemYesExtra',
                        innerHTML: j.yesButtonText,
                        attribute: ['title', j.yesButtonText]
                    }),
                    systemNo = createDOM({
                        type: 'div',
                        id: 'jSystemNoExtra',
                        innerHTML: j.noButtonText,
                        attribute: ['title', j.noButtonText]
                    });
                    systemExtra = createDOM({
                        type: 'div',
                        id: 'jSystemExtra',
                        innerHTML: j.extraButtonText,
                        attribute: ['title', j.extraButtonText]
                    });

                systemPopup.appendChild(systemMessage);
                systemOptions.appendChild(systemYes);
                systemOptions.appendChild(systemNo);
                systemOptions.appendChild(systemExtra);

                systemPopup.appendChild(systemOptions);
                doc.body.appendChild(systemPopup);

                addEventToButton(systemYes, systemPopup, 'click');
                addEventToButton(systemNo, systemPopup, 'click');
                addEventToButton(systemExtra, systemPopup, 'click');

                systemPopup = systemMessage = systemOptions = systemYes = systemNo = null;
            },
            inputPop = function() {
                var systemPopup = createDOM({
                        type: 'div',
                        id: 'jSystemPopup'
                    }),
                    systemMessage = createDOM({
                        type: 'div',
                        id: 'jSystemMessage',
                        innerHTML: j.message
                    }),
                    systemOptions = createDOM({
                        type: 'div',
                        className: 'jSystemOptions'
                    }),
                    systemInput = createDOM({
                        type: 'input',
                        className: 'jSystemInput',
                        id: 'jSystemInput'
                    }),
                    systemYes = createDOM({
                        type: 'div',
                        id: 'jSystemYes',
                        innerHTML: j.yesButtonText,
                        attribute: ['title', j.yesButtonText]
                    }),
                    systemNo = createDOM({
                        type: 'div',
                        id: 'jSystemNo',
                        innerHTML: j.noButtonText,
                        attribute: ['title', j.noButtonText]
                    });

                systemPopup.appendChild(systemMessage);
                systemOptions.appendChild(systemInput);
                systemOptions.appendChild(systemYes);
                systemOptions.appendChild(systemNo);
                systemPopup.appendChild(systemOptions);
                doc.body.appendChild(systemPopup);
                addEventToButton(systemYes, systemPopup, 'click', true);
                addEventToButton(systemNo, systemPopup, 'click');
                systemPopup = systemMessage = systemOptions = systemInput = systemYes = systemNo = null;
            };
        switch (j.type) {
            case "confirm":
                confirmPop();
                break;
            case "tributton":
                triButton();
                break;
            case "alert":
                alertPop();
                break;
            case "input":
                inputPop();
                break;
            default:
                return;
        }
    }
    window.jPopup = jPopup;
}(document));