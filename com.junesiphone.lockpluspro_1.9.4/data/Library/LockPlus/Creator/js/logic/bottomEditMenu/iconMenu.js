
action.populateIcons = function () {
    var i,
        img;
    $('.iconList').empty();
    for (i = 0; i < constants.iconList.length; i += 1) {
        img = document.createElement('img');
        img.src = 'weather/real/' + constants.iconList[i] + '.png';
        img.id = constants.iconList[i];
        $('.iconList').append(img);
    }
    $('.iconList').toggle('display');
};
action.setNewIcon = function (name, val) {
    setTimeout(function(){
        if (!val) {
            $('.iconList').toggle('display');
        }
        //$('.icon').attr('src', 'http://junesiphone.com/weather/IconSets/'+name+'/39.png');
        $('.icon').attr('src', 'weather/real/' + name + '.png');
        action.savedElements.iconName = name;
        action.saveStorage();
    },0);
    
};
$('.iconList').on('click', function (event) { //grab clicks from toolpanel
    if (event.target.id != "") {
        action.setNewIcon(event.target.id);
    } else {
        $('.iconList').toggle('display');
    }
});
