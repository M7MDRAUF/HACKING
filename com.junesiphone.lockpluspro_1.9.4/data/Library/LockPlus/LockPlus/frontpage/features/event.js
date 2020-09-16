// (function() {
//     multipleTap({
//         div: document.body,
//         taps: 3,
//         callback: function(e){
//             setTimeout(function(){
//                 mainMenu.create();
//             },0);
//         }
//     });
// }());

var imageSelector = document.getElementById('imageSelector');

function deleteImage(divName){
  if(lStorage['iconImageLocations'][divName]){
    location.href = 'frontpage:deleteImage:' + lStorage['iconImageLocations'][divName];
  }
  lStorage['iconImageLocations'][divName] = null;
  lStorage.saveStorage();
}

function picChanged() {
    var file = imageSelector.files[0];
    location.href = 'frontpage:moveImage:' + file.name;

    setTimeout(function(){
      var divel = globalVars.changedImage;
      document.getElementById(divel.id).style.backgroundImage = "url(file:///var/mobile/Documents/FrontPageImages/" + file.name + ")";
      setTimeout(function(){
        deleteImage(divel.id);
        lStorage['iconImageLocations'][divel.id] = file.name;
        lStorage.saveStorage();
      },1000);
    },1000);

}
imageSelector.addEventListener('change', picChanged, false);

function animateIcon(on, divEl, event){
    var opacity = divEl.style.opacity;
    var zIndexOld = divEl.style.zIndex;
    if(opacity === "" || opacity > 0){
        var grow = 1.0 + 0.2,
        standard = 1.0;

        divEl.style.transition = 'transform 0.2s ease-in-out';
        if(on){
            divEl.style.webkitTransform = "scale(" + grow + ") translateZ(" + zIndexOld + "px)";
            divEl.style.opacity = 0.7;
        }else{
            divEl.style.webkitTransform = "scale(" + standard + ") translateZ(" + zIndexOld + "px)";
            divEl.style.opacity = 1.0;
        }
    }    
}


var iconPressureOptions = {
    start: function(event){
        //alert('test2');
        //alert('test3');
        animateIcon(true, event.target);
        setTimeout(function(){
            animateIcon(false, event.target);
        },400);
        
    },
    end: function(event){
        if(!deepPressIcon){
            //appQuickMenu.closeMenu();
        }
        deepPressIcon = false;
    },
    startDeepPress: function(event){
        deepPressIcon = true;
        appQuickMenu.createMenu({
            event: this,
        });
    },
    endDeepPress: function(){
       // alert('t3sd43');
        //alert("test");
        //isScrolling = false;
        deepPressIcon = false;
    },
    change: function(force, event){
       // alert('t3sd3');
        // this is called every time there is a change in pressure
        // force will always be a value from 0 to 1 on mobile and desktop
    },
    unsupported: function(){
       // alert('test');
        // NOTE: this is only called if the polyfill option is disabled!
        // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
};
var boxPressureOptions = {
    start: function(event){
        //alert('test2');
        //alert('test3');
    },
    end: function(event){
        if(!deepPressIcon){
            //appQuickMenu.closeMenu();
        }
        deepPressIcon = false;
    },
    startDeepPress: function(event){
        deepPressIcon = true;
        appQuickMenu.createMenu({
            event: this,
        });
    },
    endDeepPress: function(){
       // alert('t3sd43');
        //alert("test");
        //isScrolling = false;
        deepPressIcon = false;
    },
    change: function(force, event){
       // alert('t3sd3');
        // this is called every time there is a change in pressure
        // force will always be a value from 0 to 1 on mobile and desktop
    },
    unsupported: function(){
       // alert('test');
        // NOTE: this is only called if the polyfill option is disabled!
        // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
};
setTimeout(function(){
    var elem;
    Object.keys(savedElements.placedElements).forEach(function(key){
        if(key.substring(0, 7) === 'fpplace'){
            elem = document.getElementById(key);
            Pressure.set(elem, iconPressureOptions);
        }
        if(key.substring(0, 3) === 'box'){
            try{
                var hasURL = savedElements.placedElements[key]['data-image'];
                if(hasURL){
                    elem = document.getElementById(key);
                    Pressure.set(elem, boxPressureOptions);
                }
            }catch(err){}
        }
    });
},3000);
