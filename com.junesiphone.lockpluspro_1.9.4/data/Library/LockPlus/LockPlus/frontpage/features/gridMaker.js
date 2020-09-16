/*
    var grid = gridMaker({
        itemCount: 17,
        itemWidth : 45,
        holderWidth: 281,
        leftGap: 10,
        topGap: 5,
        topOffset: 35
    });

    Returns something like:
    0: {top:35, left:30.5}
    1: {top:35, left:85.5}
    2: {top:35, left:140.5}
    3: {top:35, left:195.5}
    4: {top:35, left:250.5}
    5: {top:90, left:30.5}
    6: {top:90, left:85.5}
    7: {top:90, left:140.5}
    ...
*/
(function() {
    var gridMaker = function(obj) {
        function createGridObject(amountOfItems, widthOfItem, widthOfHolder, itemGapLeft, itemGapTop, topMargin){
            var perItems = [],
                widthOfItemWithPadding = widthOfItem + itemGapLeft,
                numberOfColumns = Math.floor(widthOfHolder/(widthOfItemWithPadding + itemGapLeft)),
                numberOfRows = Math.ceil(amountOfItems / Math.floor(widthOfHolder/widthOfItemWithPadding)),
                columnCount = 0,
                rowCount = 0,
                topValue = 0,
                leftValue = 0,
                estWidth, offset;

                estWidth = widthOfItemWithPadding * numberOfColumns + itemGapLeft * (numberOfColumns-2);
                offset = (widthOfHolder - estWidth)/2;

            for (var i = 0; i < amountOfItems; i++) {
                columnCount += 1;
                rowCount += 1;
                perItems.push({
                    top: topValue + topMargin,
                    left:leftValue + offset
                });
                leftValue += widthOfItemWithPadding + itemGapLeft
                if(rowCount == numberOfColumns){
                    leftValue = 0;
                    rowCount = 0;
                }
                if(columnCount == numberOfColumns){
                    topValue += widthOfItem + itemGapTop;
                    columnCount = 0;
                }
            }
            return perItems;
        }
        if(obj){
            return createGridObject(obj.itemCount, obj.itemWidth, obj.holderWidth, obj.leftGap, obj.topGap, obj.topOffset);
        }
    }
    window.gridMaker = gridMaker;
}());
