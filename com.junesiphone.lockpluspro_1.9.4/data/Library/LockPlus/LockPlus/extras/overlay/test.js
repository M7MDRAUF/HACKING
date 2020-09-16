function createRoundedRect(x,y,width,height,radius){
    var radius = new Size(radius, radius);
    return  new paper.Path.Rectangle(new paper.Rectangle(x, y, width, height), radius);
}

var x, y, width, height;
    x = 0;
    y = 0;
    width = 100;
    height = 100;

    var radius = 20;
    
    var raster2 = new Raster('SMR4.PNG');
    raster2.position = view.center;
    raster2.scale(0.5);
    raster2.setBounds(x, y, width, height);

    var path = createRoundedRect(x,y,width,height,radius);
    //path.clipMask = true;
    path.fillColor = 'blue';

    var group = new Group(path, raster2);
        group.clipped = true;
        console.log(group._children);

    var path2 = createRoundedRect(x+100,y,width,height,radius);
        path2.fillColor = 'red'