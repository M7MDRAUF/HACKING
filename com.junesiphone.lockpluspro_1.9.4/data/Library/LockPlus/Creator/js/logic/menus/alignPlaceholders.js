(function(window, doc) {

    var grid = null,
        panelPlaceholders = [],
        spacing = {
            y_spacing : 10,
            x_spacing : 10,
            margin_top: 10,
            margin_left: 0
        };

    function containsPlaceholders(){
        var placeHolders = [],
            hasPlaceHolders = false,
            i;
        placeHolders = action.savedElements.placedElements[action.selectedItem]['data-vars'];
        for (i = 0; i < placeHolders.length; i++) {
            if(placeHolders[i].substring(0, 7) === 'fpplace'){
                panelPlaceholders.push(placeHolders[i]);
                hasPlaceHolders = true;
            }
        }
        return hasPlaceHolders;
    }

    function updateGrid(){
        var panelElement = doc.getElementById(action.selectedItem),
            placeHolder = doc.getElementById(panelPlaceholders[0]),
            i;
            if(panelElement && placeHolder){
                grid = gridMaker({
                    itemCount: panelPlaceholders.length,
                    itemWidth : parseInt(placeHolder.style.width, 10),
                    holderWidth: parseInt(panelElement.style.width),
                    leftGap: spacing['x_spacing'],
                    topGap: spacing['y_spacing'],
                    topOffset: spacing['margin_top'],
                    leftOffset: spacing['margin_left']
                });
            }
            for (i = 0; i < panelPlaceholders.length; i++) {
                action.setCss(panelPlaceholders[i], 'top', grid[i].top);
                action.setCss(panelPlaceholders[i], 'left', grid[i].left);
            }
    }

    function createMenuWithRanges(){
        var obj = {
            name: "Grid_Align",
            'x_spacing': {
                min: 0,
                max: 50,
                step:0,
                start: 10,
            },
            'y_spacing':{
                min: 0,
                max: 50,
                step:0,
                start: 10,
            },
            'margin_top':{
                min: 0,
                max: 50,
                step:0,
                start: 10,
            },
            'margin_left':{
                min: 0,
                max: 200,
                step:0,
                start: 10,
            }
        };
        menuLayout.generateMenu({
            dict: obj,
            backAction: function(){
                menuLayout.close();
            },
            clickAction: function(){
            },
            rangeAction: function(range){
                var inputElement = range.el;
                    spacing[inputElement.id] = Number(inputElement.value);
                    updateGrid();
            }
        });
    }

    function createGridOptions(){
            updateGrid();
            createMenuWithRanges();
    }

    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.setup = function(){
            panelPlaceholders = [];
            var hasPlaceHolders = containsPlaceholders();
            if(hasPlaceHolders){
                createGridOptions();
            }else{
                alert('Panel does not contain placeholders to align.');
            }
        };
        return externalMethods;
    }
    window.alignPlaceholders = initExternalMethods();
}(window, document));

