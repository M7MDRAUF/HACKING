/*
    To get this list of apps install on the device.
    Call listAllApps from the webview, it goes to the bundle
    which gets a list of apps and sends it as a string to window.listAllApps(string);
    the string is then turned into an array. Each item is the app name separated by ~
*/

//callback from LockPlus
window.listAllApps = function(arr){
    var d = arr.split(','),
        split, name, i;
    for(i = 0; i < d.length; i++){
        split = d[i].split('~');
        name = split[0];
        elementPanel.miscElements.applist['bundle' + (30+(i+1))] = name;
        miscEl['bundle' + (30 + (i + 1))] = d[i];
    }
}

var bundleList = {
    listAppBundles: function(){
        setTimeout(function(){
            window.location = 'js-call:listAllApps';
        },0);
    }
};