function moveUpForInput(event) {
    var offsetFromCenter = event.target.getBoundingClientRect().top - ((screen.height / 2) - 40);
    setTimeout(function(){
        /* 
            Take a second and see if iOS moves the window.
            If it does, let it do it's thing. This happens on iOS12 iPXS Max.
            Otherwise just move the body as it's animated.
        */
        if(window.scrollY == 0){
            if (Math.sign(offsetFromCenter) != -1) {
                document.body.style.webkitTransform = 'translateY(' + -offsetFromCenter + 'px)';
            }
        }
    }, 0);
}

function resetMoveForInput() {
    document.body.style.webkitTransform = 'translateY(0px)';
}

