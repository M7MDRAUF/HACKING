
var stat = document.getElementById('stats');
var selectedItem = null;
paperTools.select = {
    tool: null,
    init: function() {
        var path,
            pixel,
            segment,
            addedHolders,
            hitOptions = {
                segments: true,
                pixel: true,
                stroke: true,
                fill: true,
                curves: true,
                quide: true,
                tolerance: 40
            };
        this.tool = new Tool({
            onMouseDown: function(event) {
                if(paper.project.selectedItems){
                    for (var i = 0; i < paper.project.selectedItems.length; i++) {
                        paper.project.selectedItems[i].selected = false;
                    }
                }
                var hitResult = project.hitTest(event.point, hitOptions);
                if (hitResult) {
                    if(hitResult.type === 'pixel'){
                        path = hitResult.item;
                        hitResult.item.selected = true;
                        selectedItem = path;
                        var string = "";
                        string += "Width:" + Math.floor(path.bounds.width);
                        string += " Height:" + Math.floor(path.bounds.height);
                        string += " Y:" + Math.floor(path.bounds.y);
                        string += " X:" + Math.floor(path.bounds.x);
                        stat.innerHTML = string;
                        // document.getElementById('width').innerHTML = "Width:" + Math.floor(path.bounds.width);
                        // document.getElementById('height').innerHTML = "Height:" + Math.floor(path.bounds.height);
                        // document.getElementById('y').innerHTML = "Y:" + Math.floor(path.bounds.y);
                        // document.getElementById('x').innerHTML = "X:" + Math.floor(path.bounds.x);
                    }
                }else{
                    if(paper.project.selectedItems){
                        for (var i = 0; i < paper.project.selectedItems.length; i++) {
                            paper.project.selectedItems[i].selected = false;
                        }
                    }
                    stat.innerHTML = "";
                    // document.getElementById('width').innerHTML = "";
                    // document.getElementById('height').innerHTML = "";
                    // document.getElementById('y').innerHTML = "";
                    // document.getElementById('x').innerHTML = "";
                }
            },
            onMouseMove: function(event) {
                
            },
            onMouseDrag: function(event) {

                if (segment) {
                    
                } else if (path) {
                    path.position.x += event.delta.x;
                    path.position.y += event.delta.y;

                    if(path.groupRef){
                        var cornerRadius = path.groupRef._children[0];
                        cornerRadius.bounds.x = path.position.x - path.bounds.width/2;
                        cornerRadius.bounds.y = path.position.y - path.bounds.height/2;
                    }

                    var string = "";
                        string += "Width:" + Math.floor(path.bounds.width);
                        string += " Height:" + Math.floor(path.bounds.height);
                        string += " Y:" + Math.floor(path.bounds.y);
                        string += " X:" + Math.floor(path.bounds.x);
                        stat.innerHTML = string;
                    // document.getElementById('width').innerHTML = "Width:" + Math.floor(path.bounds.width);
                    // document.getElementById('height').innerHTML = "Height:" + Math.floor(path.bounds.height);
                    // document.getElementById('y').innerHTML = "Y:" + Math.floor(path.bounds.y);
                    // document.getElementById('x').innerHTML = "X:" + Math.floor(path.bounds.x);
                }else if (pixel){
                    //console.log('test');
                    // path.position.x += event.delta.x;
                    // console.log('pixel2');
                }

            },
            onMouseUp: function(event) {

            }
        });
    }
};