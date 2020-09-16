function closeOptions() {
    var optionsC = document.getElementById('optionsContainer'),
        optionsM = document.getElementById('optionsMenu');
    optionsC.style.display = 'none';
    optionsM.scrollTop = 0;
}

function loadiFrame(url) {
    document.getElementById('optionsContainer').style.display = 'none';
    document.getElementById('overlayMaker').src = url;
    document.getElementById('overlayMaker').style.display = 'block';
}

document.getElementById('optionsMenu').addEventListener("click", function(el){
    switch(el.target.title){
        case 'tetris':
            location.href = './extras/tetris/index.html';
            break;
        case 'todo':
            location.href = './extras/todo/index.html';
            break;
        case 'stopwatch':
            location.href = './extras/stopwatch/index.html';
            break;
        case 'crappybird':
            location.href = './extras/crappybird/index.html';
            break;
        case 'towerdefense':
            location.href = 'https://lockplus.us/towerdefense';
            break;
        case 'dokaphoto':
            location.href = 'https://doka.photo/';
            break;
        case 'savewall':
            location.href = 'js-call:openWall';
            break;
        case 'setavatar':
            location.href = 'js-call:avatarPic';
            break;
        case 'overlay':
            //location.href = '/Library/LockPlus/LockPlus/extras/overlay/index.html';
            loadiFrame('./extras/overlay/index.html');
            break;
        case 'respring':
            location.href = 'js-call:respring';;
            break;
        case 'huelights':
            loadiFrame('./extras/hue/index.html');
            break;
        case 'close':
            closeOptions();
            break;
    }
});