

function addImageToPaper(divid){

  // bounds = view.center._owner;
  // console.log(view);
  // var x, y, width, height;
  //     x = bounds.x;
  //     y = bounds.y;
  //     width = bounds.width;
  //     height = 300;

      var raster = new Raster(divid);
        raster.position = view.center;
        raster.scale(0.2);

      // var radius = 20;
      // var path2 = createRoundedRect(x,y,width,height,radius);
      // path2.clipMask = false;
      // path2.fillColor = 'blue';

        

      //   console.log(raster);
      //   console.log(raster.size);
      //   console.log(raster.nextSibling);
      //   console.log(raster.previousSibling);

      //   path2.bounds.x = raster.bounds.x;
      //   path2.bounds.y = raster.bounds.y;
      //   path2.bounds.width = 100;
      //   path2.bounds.height = 300;


        //raster.previousSibling.clipMask = true;

}

//store added images for reference
var addedImages = [];

//generate random id for image
function generateRandom(){
    var random = Math.floor(Math.random() * 1000) + 1, // 1 - 1000
        name = 'tempImage';
    return name + random;
}

// when image is selected generate random id, send to paper 
// paper wants the image in the dom so add it, but hide it
function addImage(e){
    var reader = new FileReader();
        reader.onload = function(e){
            var image = document.createElement('img'),
                random = generateRandom();
                if(addedImages.includes(random)){
                    random = generateRandom();
                    addedImages.push(random);
                }else{
                    addedImages.push(random);
                }
                image.src = e.target.result;
                image.className = 'uploadedImages'; 
                image.id = random; //random
                document.body.appendChild(image);
                addImageToPaper(random);
                setTimeout(function(){
                  document.body.removeChild(image);
                },1000);
        }
        reader.readAsDataURL(e.target.files[0]);
}

//detect when image is uploaded
document.getElementById('imagefile').addEventListener('change', function(e){
    addImage(e);
});
