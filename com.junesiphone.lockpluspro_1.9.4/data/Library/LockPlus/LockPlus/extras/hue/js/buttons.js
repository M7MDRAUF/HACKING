(function(window, doc) {
    function clearAll() {
        localStorage.removeItem('bridgeIP');
        localStorage.removeItem('hueUser');
        location.href = location.href;
    }

    function help() {
        jPopup({
            type: "alert",
            message: "You must have a Phillips Hue bridge to use this. <br><br>Connecting:<br> Make sure your phone is on the same network as your Hue. If so you will see an ip address in the Bridges menu. Go to your Hue and hold the link button, then tap the ip address. When connected you will see your lights in the light list and it will say connected. <br><br>Resetting: <br> Clear Info will clear all info stored and will reset all rooms.<br><br>Lights: <br> To toggle a light just tap it, to toggle multiple lights at once add a room.<br><br>Rooms: <br> To add a room press the add button, name the room. Once the room appears tap it to toggle all lights on or off, or add lights. To add a light press add, then select the light you wish to add.",
            yesButtonText: "OK",
            functionOnOk: function() {
                //do something on ok
            }
        });
    }

    function exit() { //for LockPlus only.
        //location.href = "file:///Library/LockPlus/LockPlus/index.html";
        parent.document.location.reload();
    }

    doc.getElementById('clearALL').addEventListener('touchend', clearAll, false);
    doc.getElementById('help').addEventListener('touchend', help, false);
    doc.getElementById('exit').addEventListener('touchend', exit, false);
}(window, document));