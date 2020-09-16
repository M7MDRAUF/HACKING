/* 

    Animations
    fsAnimation.checkAnimations is called by the tweak. It will pass info from settings
    letting the function know which animations are enabled.

*/

function isDay(){
  var hours = new Date().getHours();
  return hours > 6 && hours < 20;
}

var fsAnimations = {
  rain: ['rain.html', 'rainwclouds.html', 'rainangleright.html', 'rainangleleft.html'],
  clouds: ['clouds.html', 'clouds2.html', 'clouds3.html', 'clouds4.html'],
  cloudsNight: ['cloudsNight.html'],
  sun: ['sun.html'],
  snow: ['snow.html', 'snow1.html'],
  moon: ['moon.html', 'stars.html'],
  thunderstorm: ['thunderstorm.html', 'thunderstormwclouds.html'],
  weather: false,
  birds: false,
  mp4: false,
  space: false,
  fireflies: false,
  spaceroad: false,
  spiral: false,
  globe: false,
  gif: false,
  createFrame: function(id, url, width) {
    var frame = document.createElement('iframe');
        frame.frameBorder = 0;
        frame.width = width;
        frame.height = screen.height;
        frame.style.pointerEvents = "none";
        frame.id = id;
        document.body.appendChild(frame);
        setTimeout(function(){
          frame.setAttribute("src", url);
        }, 0);
  },
  getRandomURL: function(type) {
    var random = Math.floor(Math.random() * type.length);
        return type[random];
  },
  getWeatherURL: function() {
    var array = null,
        picked = null,
        code = (injectedWeather.conditionCode === undefined) ? 34 : Number(injectedWeather.conditionCode);

        //32:sunny
        //36:hot
        //25:cold
        //24:windy
    if([32, 36, 25, 24].indexOf(code) > -1){
        if(isDay()){
          array = fsAnimations.sun;
        }else{
          array = fsAnimations.moon;
        }
    }else if([0, 19, 20, 21, 22, 26, 27, 28, 29, 30, 44, 34, 33].indexOf(code) > -1){
      //27:mostly cloudy (night)
      //29:partly cloudy (night)
      //33:fair (night)
      if([27, 29, 33].indexOf(code) > -1){
        array = fsAnimations.cloudsNight;
      }else{
        array = fsAnimations.clouds;
      }
    }else if([8, 9, 10, 11, 12, 17, 18, 35].indexOf(code) > -1){
        array = fsAnimations.rain;
    }else if([5, 6, 7, 13, 14, 15, 16, 41, 42, 43, 46].indexOf(code) > -1){
        array = fsAnimations.snow;
    }else if([31].indexOf(code) > -1){
        array = fsAnimations.moon;
    }else if([1, 2, 3, 4, 37, 38, 39, 45, 47].indexOf(code) > -1){
        array = fsAnimations.thunderstorm;
    }
    picked = this.getRandomURL(array);

    return picked;
  },
  showCharging: function(html){
    //location.href = 'js-call:debugThis:showCharging';
    if(!document.getElementById('batteryAnimation')){
      this.createFrame('batteryAnimation', 'extras/animation/batteryAnimations/' + html + '/index.html', 320);
    }
  },
  removeCharging: function(){
    //location.href = 'js-call:debugThis:removeCharging';
    if(document.getElementById('batteryAnimation')){
      document.getElementById('batteryAnimation').parentElement.removeChild(document.getElementById('batteryAnimation'));
    }
  },
  removeBGAnimation: function(){
    //location.href = 'js-call:debugThis:removeBackgroundAnimations';
    if(document.getElementById('backgroundAnimation')){
      document.getElementById('backgroundAnimation').parentElement.removeChild(document.getElementById('backgroundAnimation'));
    }
  },
  showBGAnimation: function(html){
    if(document.getElementById('backgroundAnimation')){
      return;
    }
    setTimeout(function(){
      var dir = 'extras/animation/backgroundAnimations/',
        ext = '/index.html',
        size = 320,
        fullURL = "";
      if(html === 'weather'){
        ext = "/" + fsAnimations.getWeatherURL();
      }
      if(html === 'birds'){
        size = screen.width;
      }
      fullURL = dir + html + ext;
      fsAnimations.createFrame('backgroundAnimation', fullURL, size);
    }, 1000);
  },
  testLoaded: function(){
    return "Loaded";
  }
};

//fsAnimations.showBGAnimation('weather');