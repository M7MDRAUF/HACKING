function makeMenuDraggable(menuButton) {
    menuButton.draggable({
        stop: function(event, ui) {
            var halfWidth = $('#roundmenu').width() / 2; // These are probably the same but you never know
            var horizontalCenter = ui.position.left + halfWidth;
            var newLeft = $('#roundmenu').position().left;
            var newTop = $('#roundmenu').position().top;
            var smallestDistance = screen.width - horizontalCenter; // Distance to right

            newLeft = screen.width - halfWidth;
            if (horizontalCenter < smallestDistance) { // Distance to left
                smallestDistance = horizontalCenter;
                newLeft = 0 - halfWidth;
            }

            if (newTop + $('#roundmenu').height() > screen.height - 10) { // Below the bottom
                newTop = (screen.height - 10) - $('#roundmenu').height();
            } else if (newTop < 0) { // Above the top
                newTop = 4;
            }

            $('#roundmenu').animate({
                left: newLeft,
                top: newTop
            }, 700, 'easeOutElastic');
        }
    });
}

function createMenuAndButtons() {
    var rMenu, redo, undo, enable, container;
    container = $('#container');

    rMenu = $('<div id="roundmenu"></div>');
    redo = $('<div id="redomenu">Redo</div>');
    undo = $('<div id="undomenu">Undo</div>');
    enable = $('<div id="enablemenu">Unlock</div>');
    container.append(rMenu);
    container.append(redo);
    container.append(undo);
    container.append(enable);

    makeMenuDraggable(rMenu);

    rMenu.click(function() {
        menuLayout.close();
        mainMenu.create();
    });

    redo.click(function() {
        action.redo();
    });
    undo.click(function() {
        action.undo();
    });
    enable.click(function() {
        for (var i = 0; i < menu.disabledItems.length; i++) {
            document.getElementById(menu.disabledItems[i]).style.pointerEvents = "initial";
        }
        document.getElementById('enablemenu').style.display = 'none';
    });
}

var menu = {
    touching: false,
    disabledItems: [],
    element: document.getElementById("menu"),
    toggleMenu: function() {
        if (menu.element.style.display === "none") {
            menu.element.style.display = "block";
        } else {
            menu.element.style.display = "none";
        }
    },
    toggle: function() {
        menu.toggleMenu(); //open menu
        bottomMenu.closeBottomMenu(); //close menus
        jsWidgets.removeWidgetMenu(); //close menus
    },
    init: function() {
        createMenuAndButtons();
    }
};

menu.init();