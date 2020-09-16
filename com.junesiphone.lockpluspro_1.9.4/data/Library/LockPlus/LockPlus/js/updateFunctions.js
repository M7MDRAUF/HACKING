function lockplusWeather(weather) {
    injectedWeather = JSON.parse(weather);
    refreshAllInfo();
    return true;
}

function lockplusSystem(system) {
    injectedSystem = JSON.parse(system);
    options.twentyfour = (injectedSystem.twentyfour == "yes") ? true : false;
    options.celsius = (injectedSystem.celsius == "celsius") ? true : false;
}

function lockplusMusic(music) {
    injectedMusic = JSON.parse(music);
    setTimeout(function() {
        updateMusicElements();
    }, 1000);
}