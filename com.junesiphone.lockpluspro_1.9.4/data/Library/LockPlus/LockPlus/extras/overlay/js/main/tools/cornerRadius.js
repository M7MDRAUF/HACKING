var cornerRadius = {};

cornerRadius.makeRadius = function(image, radius){
    var path, bounds, x, y, width, height, group;
    bounds = image.bounds;
    x = bounds.x;
    y = bounds.y;
    width = bounds.width;
    height = bounds.height;

    path = createRoundedRect(x,y,width,height,radius);
    path.fillColor = 'blue';

    /*
        here a group is used for the clipping
        path.clipMask = true; would clip everything.

        group.clipped:
        Specifies whether the group item is to be clipped. 
        When setting to true, the first child in the group 
        is automatically defined as the clipping mask.
    */
    group = new Group(path, image);
    group.clipped = true;
    
    /*
        Add a reference to be used when item is moved.
        or styles are added
    */
    image.groupRef = group;
};
