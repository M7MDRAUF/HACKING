(function(window, doc){
	var screenClass = doc.querySelector('.screen'),
		phoneClass = doc.querySelector('.phone'),
		gridsClass = doc.querySelector('.grids'),
		wallpaperDiv = doc.getElementById('wallpaper');

	if(window.innerHeight == 812){ //iPX Height: 812 Width: 375
		screenClass.style.height = "689px";
		phoneClass.style.height = "689px";
		gridsClass.style.height = "689px";
		gridsClass.style.overflow = "visible";
		wallpaperDiv.style.height = "689px";
		wallpaperDiv.style.backgroundSize = "contain";
		createGrid(20, 20);
	}else if(window.innerHeight == 896){ //iPX XS Max Height: 896 Width: 414
		screenClass.style.height = "689px";
		phoneClass.style.height = "689px";
		gridsClass.style.height = "689px";
		gridsClass.style.overflow = "visible";
		wallpaperDiv.style.height = "689px";
		wallpaperDiv.style.backgroundSize = "contain";
		createGrid(20, 20);
	}else if(window.innerHeight === 1024){
		//ipad?
		gridsClass.style.webkitTransform = 'scale(1.5)';
		screenClass.style.webkitTransform = 'scale(1.5)';
		wallpaperDiv.style.webkitTransform = 'scale(1.5)';
		//createGrid(20,20);
	}else if(window.innerHeight === 1366){
		//ipad?
		gridsClass.style.webkitTransform = 'scale(1.8)';
		screenClass.style.webkitTransform = 'scale(1.8)';
		wallpaperDiv.style.webkitTransform = 'scale(1.8)';
		//createGrid(20,20);
	}else{
		createGrid(20,20);
	}

	//web creator
	if(!mobilecheck()){
		doc.body.style.backgroundColor = "#141414";
		doc.getElementById('webOptions').style.display = 'block';
		doc.getElementById('iPhoneX').addEventListener('click',function(){
			screenClass.style.height = "689px";
			phoneClass.style.height = "689px";
			gridsClass.style.height = "689px";
			gridsClass.style.overflow = "visible";
			wallpaperDiv.style.height = "689px";
			wallpaperDiv.style.backgroundSize = "contain";
			doc.getElementById('grids').innerHTML = "";
			createGrid(20, 20);
		});
		doc.getElementById('iPhone').addEventListener('click',function(){
			screenClass.style.height = "568px";
			phoneClass.style.height = "568px";
			gridsClass.style.height = "568px";
			gridsClass.style.overflow = "visible";
			wallpaperDiv.style.height = "568px";
			wallpaperDiv.style.backgroundSize = "contain";
			doc.getElementById('grids').innerHTML = "";
			createGrid(20, 20);
		});
	}
}(window, document));