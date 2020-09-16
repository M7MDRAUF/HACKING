/*                                                                
         ,---._                                                         
       .-- -.' \                                                        
       |    |   :,-.----.            ,-.----.                ,-.----.   
       :    ;   |\    /  \    ,---.  \    /  \          ,--, \    /  \  
       :        ||   :    |  '   ,'\ |   :    |       ,'_ /| |   :    | 
       |    :   :|   | .\ : /   /   ||   | .\ :  .--. |  | : |   | .\ : 
       :         .   : |: |.   ; ,. :.   : |: |,'_ /| :  . | .   : |: | 
       |    ;   ||   |  \ :'   | |: :|   |  \ :|  ' | |  . . |   |  \ : 
   ___ l         |   : .  |'   | .; :|   : .  ||  | ' |  | | |   : .  | 
 /    /\    J   ::     |`-'|   :    |:     |`-':  | : ;  ; | :     |`-' 
/  ../  `..-    ,:   : :    \   \  / :   : :   '  :  `--'   \:   : :    
\    \         ; |   | :     `----'  |   | :   :  ,      .-./|   | :    
 \    \      ,'  `---'.|             `---'.|    `--`----'    `---'.|    
  "---....--'      `---`               `---`                   `---`    
         
** Creator: JunesiPhone
** Website: http://junesiphone.com
** Usage: 

jPopup({
    type: "alert",
    message: "This app is already placed.",
    okButtonText: "OK"
});

jPopup({
    type: "confirm",
    message: "Choose an option below",
    yesButtonText: "Set App",
    noButtonText: "Set Icon",
    functionOnNo: function() {
        
    },
    functionOnOk: function() {
        
    }
});

*/

(function() {
    var doc = document,
        jPopup = function (j) {
        var createDOM = function (params) {
                var d = document.createElement(params.type);
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
                return d;
            },
            registerPopupEvents = function (div, params) {
                div.addEventListener(params.event, params.callback);
            },
            addEventToButton = function(button, popup, type, returnvalue){
                registerPopupEvents(button, {
                    event: type,
                    callback: function (el) {
                        if(el.target.id === "jSystemNo"){
                            if (j.functionOnNo) {
                                j.functionOnNo();
                            }
                        }else if (el.target.id === "jSystemOk"){
                            if (j.functionOnOk) {
                                j.functionOnOk();
                            }
                        }else if (el.target.id === "jSystemYes"){
                            if (j.functionOnOk) {
                                if(returnvalue){
                                    j.functionOnOk(document.getElementById('jSystemInput').value);
                                }else{
                                    j.functionOnOk();
                                }
                            }
                        }
                        if (!j.dontCloseOnYes) {
                            popup.remove();
                        }
                    }
                });
            },
            fakeClick = function (element){
                if (document.createEvent) {
                   var e = document.createEvent("MouseEvents");
                    e.initMouseEvent("click", true, true, window,
                                     0, 0, 0, 0, 0, false, false, false,
                                     false, 0, null);

                    element.dispatchEvent(e);
              } else if (element.fireEvent) {
                    element.fireEvent("onclick");
              }
            },
            alertPop = function (){
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
                        innerHTML: j.okButtonText,
                        attribute: ['title', j.okButtonText]
                    });

                systemPopup.appendChild(systemMessage);
                systemOptions.appendChild(systemOK);
                systemPopup.appendChild(systemOptions);
                doc.body.appendChild(systemPopup);
                addEventToButton(systemOK, systemPopup, 'click');
            },
            confirmPop = function () {
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
            },
            inputPop = function () {
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
            };
        switch (j.type) {
        case "confirm":
            confirmPop();
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
}());
