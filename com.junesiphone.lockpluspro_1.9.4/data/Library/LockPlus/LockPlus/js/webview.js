//location.href = "js-call:debugThis:Test";
function loadFontFromWeb(font, ext) {}

function webviewDownloadTheme(target) {
    mainTarget = target;
    localStorage.themeName = mainTarget;
    window.location = 'js-call:jsDownloadTheme';
}

function webviewUnlock() {
    window.location = 'js-call:unlockPhone';
}

function webviewFlashlight() {
    window.location = 'js-call:toggleFlashlight';
}

function webviewRespring(){
    location.href = 'js-call:respring';
}

function webviewPlayMusic() {
    window.location = 'js-call:playmusic';
}

function webviewNextMusic() {
    window.location = 'js-call:nexttrack';
}

function webviewPrevMusic() {
    window.location = 'js-call:prevtrack';
}

function webviewOpenApp(bundle) {
    window.location = 'js-call:openApp:' + bundle;
}

function openURL(url) { //called from widgets
    //urlToOpen = url;
    window.location = 'js-call:openLPPUrl:' + url.replace('https://', '').replace('http://', '');
}

function webviewHasWeather() {
    //window.location = 'js-call:containsWeather';
    //alert('Yes');
}

function webviewloadThemeView() {
    window.location = 'js-call:loadThemeView';
}

function disableDimTimer() {
    window.location = 'js-call:disableDimTimer';
}

function webviewReloadWeather() {
    window.location = "js-call:reloadWeather";
}

function webviewUpdateWeather() {
    window.location = "js-call:updateWeather";
}

function openMenu() {
    window.location = "js-call:showMiniMenu";
}

function themeName(name) {
    localStorage.themeName = name;
}

function loadCreator() {
    disableDimTimer();
    setTimeout(function() {
        location.href = "https://lockplus.us/creator";
    }, 0);
}



function returnTarget() {
    return mainTarget;
}

function returnApp() { //returns app to open
    return appToOpen;
}

function returnURL() { //returns url to open
    return urlToOpen;
}


/* 
   Obj-c doesn't like to keep order of dictionaries. I parse the dictionary, convert to JSON, then call function loadingTheme()
   here. It parses the JSON then calls loadTheme in loaded.js. We pass thedict which is the JSON but also a string showing
   the order in which elements should show. 
*/
function loadingTheme(dict, order) {
    var elOrder = order.split(' ');
    var values = JSON.parse(dict);
    action.loadTheme(values, elOrder);
    return true;
}

//Called when theme isn't downloaded.
function reloadHTML() {
    location.href = location.href;
}


//WTF
function wallpaperSet() {
    wallpaperSet = true;
}

function alertTest(something) {
    var word = (something) ? something : "test";
    if (word === "yes") {
        wallpaperSet = true;
    } else {
        alert(word);
    }
}