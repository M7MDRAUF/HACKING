var localStorageWallpaperText = (isios2) ? 'ALTwallpaper' : 'wallpaper',
    localStoragePlacedText = (isios2) ? 'ALTplacedElements' : 'placedElements';

action.saveStorage = function (specialPurpose) { //save savedElements object to localStorage
    if (specialPurpose === 'wallpaper') {
        localStorage.setItem(localStorageWallpaperText, action.wallpaper);
    } else {
        localStorage.setItem(localStoragePlacedText, JSON.stringify(action.savedElements));
    }
};

