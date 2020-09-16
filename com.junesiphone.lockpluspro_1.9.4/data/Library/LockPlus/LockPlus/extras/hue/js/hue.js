(function(window, doc) {
    var hueController = {
        hue: jsHue(),
        user: null,
        lights: null,
        groups: null,
        bridgeList: doc.getElementById('bridgeList'),
        lightList: doc.getElementById('lightList'),
        groupList: doc.getElementById('groupList'),
        statusDiv: doc.getElementById('status'),
        displayLights: function() {
            this.lightList.innerHTML = "";
            Object.keys(hueController.lights).forEach(function(key) {
                var div = doc.createElement('div');
                div.innerHTML = hueController.lights[key].name;
                div.title = hueController.lights[key].state.on;
                FastClick.attach(div);
                this.lightList.appendChild(div);
                div.onclick = function() {
                    hueController.toggleLight(this.innerHTML);
                };
            });
        },
        displayGroups: function() {
            this.groupList.innerHTML = "";
            Object.keys(hueController.groups).forEach(function(key) {
                var div = doc.createElement('div');
                div.innerHTML = hueController.groups[key].name;
                div.title = hueController.groups[key].state.all_on;
                FastClick.attach(div);
                this.groupList.appendChild(div);
                div.onclick = function() {
                    hueController.toggleGroup(this.innerHTML);
                };
            });
        },
        getLights: function(forceUpdate) {
            if (!this.lights || forceUpdate) {
                hueController.user.getLights().then(function(hueLights) {
                    hueController.lights = hueLights;
                    hueController.displayLights();
                });
            }
        },
        getGroups: function(forceUpdate) {
            if (!this.groups || forceUpdate) {
                hueController.user.getGroups().then(function(hueLights) {
                    hueController.groups = hueLights;
                    hueController.displayGroups();
                });
            }
        },
        toggleGroup: function(groupName) {
            Object.keys(hueController.groups).forEach(function(key) {
                if (hueController.groups[key].name === groupName) {
                    hueController.user.setGroupState(hueController.groups[key].name, {
                        on: !hueController.groups[key].state.all_on
                    });
                    hueController.getGroups(true);
                }
            });
        },
        toggleLight: function(lightName) {
            for (light in hueController.lights) {
                if (hueController.lights[light].name === lightName) {
                    hueController.user.setLightState(light, {
                        on: !hueController.lights[light].state.on
                    });
                    hueController.getLights(true);
                }
            }
        },
        listBridges: function(bridges, bridge) {
            this.bridgeList.innerHTML = "";
            var div, i;
            for (i = 0; i < bridges.length; i++) {
                div = document.createElement('div');
                div.innerHTML = bridges[i].internalipaddress;
                div.onclick = function() {
                    hueController.createUserOnBridge(div.innerHTML);
                };
                this.bridgeList.appendChild(div);
            }
        },
        createUserOnBridge: function(ip) {
            var hue = this.hue;
            hue.discover().then(function(bridges) {
                if (bridges.length > 0) {
                    bridge = hue.bridge(ip);
                    localStorage.bridgeIP = ip;
                    bridge.createUser('june#test').then(data => {
                        if (data[0].error) {
                            jPopup({
                                type: "alert",
                                message: "Error Connecting:<br><br> You must press the link button on your Hue Bridge. " + "<br><br>*Error: " + data[0].error.description + "*",
                                yesButtonText: "OK",
                                functionOnOk: function() {
                                    //just close
                                }
                            });
                            hueController.statusDiv.innerHTML = "Not Connected";
                        } else {
                            username = data[0].success.username;
                            localStorage.setItem('hueUser', username);
                            hueController.user = bridge.user(username);
                            hueController.getLights();
                            hueController.statusDiv.innerHTML = "Connected";
                        }
                    });
                }
            });
        },
        getBridge: function() {
            var hue = this.hue,
                bridgeIP, bridge, username;
            hue.discover().then(function(bridges) {
                if (bridges.length === 0) {
                    hueController.bridgeList.innerHTML = "No Hue";
                } else {
                    hueController.listBridges(bridges);
                    if (localStorage.hueUser) {
                        bridge = hue.bridge(localStorage.bridgeIP);
                        hueController.user = bridge.user(localStorage.hueUser);
                        hueController.getLights();
                        hueController.getGroups();
                        hueController.statusDiv.innerHTML = "Connected";
                    }
                }
            });
        },
        init: function() {
            this.getBridge();
        }
    };
    hueController.init();
}(window, document));