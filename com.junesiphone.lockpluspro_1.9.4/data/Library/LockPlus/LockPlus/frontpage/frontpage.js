
var FPI = {};

function setFPIInfo(info, label, parse) {
    if (parse) {
        FPI[label] = JSON.parse(info);
    } else {
        FPI[label] = info;
    }
}

function appsInstalled() {
    FPDrawer.reloadDrawer();
}

function updatePlaceHolders(bundle){
    var badge = FPI.bundle[bundle].badge,
        label = FPI.bundle[bundle].name,
        allBundleIds = document.querySelectorAll('div[bundleid]'),
        div = null;
        badge = (badge > 0) ? badge : "";
    for (var index = 0; index < allBundleIds.length; index++) {
        if(allBundleIds[index].id){
            div = allBundleIds[index];
            if(div.id.substring(0, 7) === 'fpplace'){
                if(div.getAttribute('bundleid') === bundle){
                    //badge
                    if(div.children[0]){
                        if(div.children[0].className === 'FPBadge'){
                            div.children[0].innerHTML = badge;
                        }
                    }
                    //label
                    if(div.children[1]){
                        if(lStorage['labelBadges']){
                            if(div.children[1].className === 'FPLabel'){
                                div.children[1].innerHTML = badge + ' ' + label;
                            }
                        }
                    }
                }
            }
        }
    }
}

function getBadgeValue(bundle){
    var badge = 0;
    try{
        if(FPI.bundle[bundle]){
            if(FPI.bundle[bundle].badge > 0){
                badge = FPI.bundle[bundle].badge;
            }
        }
    }catch(err){}
    return badge;
}
function updateLockPlusBadges(){
        injectedSystem.mailBadge = getBadgeValue('com.apple.mobilemail');
        injectedSystem.smsBadge = getBadgeValue('com.apple.MobileSMS');
        injectedSystem.phoneBadge = getBadgeValue('com.apple.mobilephone');
        injectedSystem.whatsBadge = getBadgeValue('net.whatsapp.WhatsApp');
        injectedSystem.telegramBadge = getBadgeValue('ph.telegra.Telegraph');
        injectedSystem.fbMessengerBadge = getBadgeValue('com.facebook.Messenger');
        injectedSystem.discord = getBadgeValue('com.hammerandchisel.discord');
        injectedSystem.viber = getBadgeValue('com.viber');
        injectedSystem.instagram = getBadgeValue('com.burbn.instagram');
        injectedSystem.facebook = getBadgeValue('com.facebook.Facebook');
        injectedSystem.gmail = getBadgeValue('com.google.Gmail');
        injectedSystem.outlook = getBadgeValue('com.microsoft.Office.Outlook');
        injectedSystem.airmail = getBadgeValue('com.airmailapp.iphone');
        injectedSystem.ymail = getBadgeValue('com.yahoo.Aerogram');
        injectedSystem.snapchat = getBadgeValue('com.toyopagroup.picaboo');
        injectedSystem.reddit = getBadgeValue('com.reddit.Reddit');
        injectedSystem.googleplus = getBadgeValue('com.google.GoogleMobile');
        injectedSystem.linkedin = getBadgeValue('com.linkedin.LinkedIn');
        injectedSystem.slack = getBadgeValue('com.tinyspeck.chatlyio');
        injectedSystem.telegramXBadge = getBadgeValue('org.telegram.TelegramHD');
        injectedSystem.spark = getBadgeValue('com.readdle.smartemail');
        injectedSystem.twitter = getBadgeValue('com.atebits.Tweetie2');
        injectedSystem.tweetbot4 = getBadgeValue('com.tapbots.Tweetbot4');
        injectedSystem.youtube = getBadgeValue('com.google.ios.youtube');
}

function badgeUpdated(bundle) {
    try{
    FPDrawer.updateBadge(bundle);
    }catch(err){}
    updatePlaceHolders(bundle);
    updateLockPlusBadges();
}

function deviceUnlocked() {
    FPI.system["unlocked"] = "yes";
}

function selectedImageFromFP(img) {
    var bundleID = null;
    var bimg = 'url("' + img + '")';
    if(globalVars.changingBadgeImage){
        globalVars.changingBadgeImage = false;
        lStorage.badgeImage = img;
        addStyleString('.FPBadge{background-image:'+bimg+'!important;}', 'bgImageBadge');  
    }else if(globalVars.changingUnderlayImage){
        lStorage.underlayImage = bimg;
        addStyleString('.underlayClass{background-image:'+bimg+'!important;}', 'underlayImage');  
    }else if(globalVars.changingOverlayImage){
        lStorage.overlayImage = bimg;
        addStyleString('.overlayClass{background-image:'+bimg+'!important;}', 'overlayImage'); 
    }else{
        if(globalVars.changingIconDiv.getAttribute('bundleid')){
            bundleID = globalVars.changingIconDiv.getAttribute('bundleid');
        }else{
            bundleID = globalVars.changingIconDiv.id;
        }
        lStorage.replaceIconLocation('iconImageLocations', bundleID, img);
        globalVars.changingIconDiv.style.backgroundImage = "url('" + img + "')";
        globalVars.changingIconImage = false;
    }
    globalVars.changingOverlayImage = false;
    globalVars.changingUnderlayImage = false;
    lStorage.saveStorage();
    FPDrawer.reloadDrawer();
    // loadCWApps();
}

function selectedImageFromFPCancelled() {
    globalVars.changingIconImage = false;
    globalVars.changingBadgeImage = false;
}

function loadWeather() {
    injectedWeather.conditionCode = FPI.weather.conditionCode;
    injectedWeather.temperature = FPI.weather.temperature;
    injectedWeather.high = FPI.weather.high;
    injectedWeather.low = FPI.weather.low;
    injectedWeather.city = FPI.weather.city;
    injectedWeather.windSpeed = FPI.weather.windSpeed;
    injectedWeather.windDirection = FPI.weather.windDirection;
    injectedWeather.humidity = FPI.weather.humidity;
    injectedWeather.windChill = FPI.weather.windChill;
    injectedWeather.visibility = FPI.weather.visibility;
    injectedWeather.chanceofrain = FPI.weather.chanceofrain;
    injectedWeather.feelsLike = FPI.weather.feelsLike;
    injectedWeather.celsius = FPI.weather.celsius;
    injectedWeather.dewPoint = FPI.weather.dewPoint;
    injectedWeather.sunriseTime = FPI.weather.sunriseTime;
    injectedWeather.sunsetTime = FPI.weather.sunsetTime;
    injectedWeather.updateTimeString = FPI.weather.updateTimeString;
    injectedWeather.precipitationForecast = FPI.weather.precipitationForecast;
    injectedWeather.name = FPI.weather.city;
    injectedWeather.dayForecasts = FPI.weather.dayForecasts;
    injectedWeather.hourlyForecasts = FPI.weather.hourlyForecasts;
    injectedWeather.pressure = parseFloat(FPI.weather.pressure).toFixed(2);
    injectedWeather.airQualityIndex = FPI.weather.airQualityIndex;
    injectedWeather.heatIndex = parseFloat(FPI.weather.heatIndex).toFixed(2);
    injectedWeather.pressureRising = FPI.weather.pressureRising;
    injectedWeather.county = FPI.weather.county;
    injectedWeather.country = FPI.weather.country;
    injectedWeather.countryAbbreviation = FPI.weather.countryAbbreviation;
    injectedWeather.stateAbbreviation = FPI.weather.stateAbbreviation;
    injectedWeather.uvIndex = FPI.weather.uvIndex;
}

function loadBattery() {
    injectedSystem.battery = FPI.battery.percent;
    injectedSystem.chargetext = FPI.battery.chargetext;
}

function FPIloaded() {
    updateLockPlusBadges();
    setTimeout(function(){
        FPDrawer.createDrawer();
    },300);
}

function todayDismissed(){
    document.body.style.opacity = 1;
}
function loadSystem() {
    injectedSystem.systemVersion = FPI.system.systemVersion;
    injectedSystem.deviceName = FPI.system.deviceName;
    injectedSystem.ipaddress = "0.0.0.0";
    injectedSystem.events = FPI.system.events;
    options.twentyfour = (FPI.system.twentyfour == 'yes') ? true : false;
    injectedSystem.health = FPI.system.health;
}
function loadFolders() {}
function loadAlarms() {
    //TODO
    //alarm is FPI.alarm.allalarms (object)
    // and FPI.alarm.allalarms[COUNT].time
    injectedSystem.alarmDay = 5;
    injectedSystem.alarmString = "10:00 PM";
    injectedSystem.alarmHour = "10";
    injectedSystem.alarmMinute = "00";
}
function loadMemory() {
    //injectedSystem.ramFree = FPI.memory.ramFree;
    //injectedSystem.ramUsed = FPI.memory.ramUsed;
    //injectedSystem.ramAvailable = FPI.memory.ramAvailable;
}
function loadStatusBar() {
    injectedSystem.wifiName = FPI.statusbar.wifiName;
    injectedSystem.wifiRSSI = FPI.statusbar.wifiRSSI;
    injectedSystem.wifiBars = FPI.statusbar.wifiBars;
    injectedSystem.signalName = FPI.statusbar.signalName;
    injectedSystem.signalStrength = FPI.statusbar.signalStrength;
    injectedSystem.signalBars = FPI.statusbar.signalBars;
}
function loadApps() {}
function loadMusic() {
    injectedMusic.musicBundle = FPI.music.musicBundle;
    injectedMusic.title = (FPI.music.title === '(null)') ? '' : FPI.music.title;
    injectedMusic.album = (FPI.music.album === '(null)') ? '' : FPI.music.album;
    injectedMusic.artist = (FPI.music.artist === '(null)') ? '' : FPI.music.artist;
    injectedMusic.albumArt = FPI.music.albumArt;
    injectedMusic.isPlaying = FPI.music.isPlaying;
    injectedMusic.duration = FPI.music.duration;
    injectedMusic.elapsed = FPI.music.elapsed;
    injectedMusic.durationSec = FPI.music.durationSec;
    injectedMusic.elapsedSec = FPI.music.elapsedSec;
    updateMusicElements();
}
function loadSettings() {}
function deviceLocked() {}
function loadNotifications() {}
function loadSwitcher() {}
function viewRotated(direction) {}