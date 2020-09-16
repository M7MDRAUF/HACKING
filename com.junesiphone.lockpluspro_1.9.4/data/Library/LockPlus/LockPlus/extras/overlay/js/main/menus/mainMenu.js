var helpers = {
    createDOM : function (params) {
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
    fakeClick: function (element){
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
    centerx: function(){
        var path, bounds, width, height, x, y,
        sizeRef = document.getElementById('sizeRef');
        path = paper.project.selectedItems[0];
        bounds = path.bounds;
        width = bounds.width;
        height = bounds.height;
        x = sizeRef.offsetWidth/2 - width/2;
        y = bounds.y;
        path.setBounds(x, y, width, height);
        if(path.groupRef){
            var cornerRadius = path.groupRef._children[0];
            cornerRadius.bounds.x = path.position.x - path.bounds.width/2;
            cornerRadius.bounds.y = path.position.y - path.bounds.height/2;
        }
    },
    popupValue: function (name){
        if(paper.project.selectedItems.length > 0){
            jPopup({
                type: "input",
                message: "Enter a number below for " + name + " value",
                yesButtonText: "Apply",
                noButtonText: "Cancel",
                functionOnNo: function() {
                    //alert('cancel');
                },
                functionOnOk: function(value) {
                    var currentPath;
                        currentPath = paper.project.selectedItems[0];
                        var bounds = currentPath.bounds;
                        if(name === 'width'){
                            var oldWidth = currentPath.bounds.width,
                                newWidth = Number(value),
                                oldHeight = currentPath.bounds.height,
                                percent,
                                finalWidth,
                                finalHeight;
                            if(oldWidth < newWidth){
                                percent = (newWidth - oldWidth) / oldWidth * 100;
                                finalWidth = oldWidth + ((oldWidth / 100) * percent);
                                finalHeight = oldHeight + ((oldHeight / 100) * percent);
                            }else{
                                percent = (oldWidth - newWidth) / oldWidth * 100;
                                finalWidth = oldWidth - ((oldWidth / 100) * percent);
                                finalHeight = oldHeight - ((oldHeight / 100) * percent);
                            }
                            bounds.width = finalWidth;
                            bounds.height = finalHeight;
                            //document.getElementById('height').innerHTML = "height:" + bounds.height;
                        }else{
                            bounds[name] = Number(value);
                        }
                        
                        if(bounds.x <= 0){
                            bounds.x = 0;
                        }
                        if(bounds.y <= 0){
                            bounds.y = 0;
                        }

                        currentPath.setBounds(bounds.x, bounds.y, bounds.width, bounds.height);
                        
                        // groupRef is used by cornerRadius.
                        // it is a group with an image and a path to mask the image.
                        if(currentPath.groupRef){
                            var cornerRadius = currentPath.groupRef._children[0];
                            cornerRadius.bounds.x = bounds.x;
                            cornerRadius.bounds.y = bounds.y;
                            cornerRadius.bounds.width = bounds.width;
                            cornerRadius.bounds.height = bounds.height;
                        }
                }
            });
        }
    }
};

(function(window, doc) {
    var addItemsButtons = {
        name: "Options",
        width: function(){
            helpers.popupValue('width');
        },
        height: function(){
            helpers.popupValue('height');
        },
        y: function(){
            helpers.popupValue('y');
        },
        x: function(){
            helpers.popupValue('x');
        },
        center_x: function(){
            helpers.centerx();
        },
        add_Image: function(){
            helpers.fakeClick(document.getElementById('imagefile'));
        },
        corner_Radius: function(){
            if(paper.project.selectedItems.length > 0){
                jPopup({
                    type: "input",
                    message: "Enter a number below for corner radius value",
                    yesButtonText: "Apply",
                    noButtonText: "Cancel",
                    functionOnNo: function() {
                        
                    },
                    functionOnOk: function(radius) {
                        var currentPath = paper.project.selectedItems[0];
                            cornerRadius.makeRadius(currentPath, radius);
                    }
                });
            }else{
                jPopup({
                    type: "alert",
                    message: "You must select an item.",
                    okButtonText: "OK"
                });
            }
        },
        save: function(){
            if(paper.project.selectedItems){
                for (var i = 0; i < paper.project.selectedItems.length; i++) {
                    paper.project.selectedItems[i].selected = false;
                }
            }
            setTimeout(function(){
                jPopup({
                    type: "confirm",
                    message: "Do you wish to save this to your photos?",
                    yesButtonText: "Yes",
                    noButtonText: "No",
                    functionOnNo: function() {
                        
                    },
                    functionOnOk: function() {
                        var filename = "Test";
                        var canvas = doc.getElementById('canvas');
                        var lnk = document.createElement('a'), e;
                        lnk.download = filename;
                        lnk.href = canvas.toDataURL("image/png;base64");
                        helpers.fakeClick(lnk);
                    }
                });
            },1000);
            
        },
        exit: function(){
            
            //parent.document.location.reload();
            //parent.document.getElementById('screenElements').style.pointerEvents = "none";
            parent.document.location.reload();
            //location.href = location.href;
        }
    };
    function createMenu(){
        parent.document.getElementById('screenElements').style.pointerEvents = "none";
        var children = parent.document.getElementById('screenElements').children;
        for (var i = 0; i < children.length; i++){
            children[i].style.zIndex = Number(children[i].style.zIndex) + 3;
        }
        
        basicWindow.removeAllWindows();
        cloudView.removeCloud();
        var mainWindow = basicWindow.makeWindow({
            title: addItemsButtons.name,
            id: 'mainMenu',
            className: 'mainMenu',
            width: '95%',
            height: '140',
            bgcolor: 'transparent',
            color: 'white',
            center: false,
            centerHorizontally: true,
            centerVertically: false,
            bottom: 50,
            backButton: false,
            backTo: function(){
                mainMenu.create();
            },
            beforeRemove: function(){
                parent.document.location.reload();
                //location.href = '/Library/LockPlus/LockPlus/index.html';
                cloudView.removeCloud();
            }
        });
        cloudView.makeCloud({
            parentWindow: mainWindow,
            cloudItems: addItemsButtons,
            id: 'mainMenuCloud'
        });
    }
    function initExternalMethods(){
        var externalMethods = {};
        externalMethods.create = function(){
            createMenu();
        };
        return externalMethods;
    }
    window.mainMenu = initExternalMethods();
}(window, document));

mainMenu.create();