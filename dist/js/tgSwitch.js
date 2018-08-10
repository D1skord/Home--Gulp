function tgSwitch() {
    var floors = document.getElementsByClassName('home__floor');
    var windows = document.getElementsByClassName('home__floor__window');
    if (document.querySelector('#cb').checked == true) {
        document.querySelector('.home').style.background = 'url(img/home/dayFoundation.jpg) no-repeat';
        for (let i = 0; i < floors.length; i++) {
            floors[i].style.background = 'url(img/home/dayFloor.jpg) no-repeat';
        }
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.border = '5px solid #613007';
        }
        return true;
    } else {
        document.querySelector('.home').style.background = 'url(img/home/moonFoundation.jpg) no-repeat';
        for (let i = 0; i < floors.length; i++) {
            floors[i].style.background = 'url(img/home/moonFloor.jpg) no-repeat';
        }
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.border = '5px solid #3E3FC4';
        }
    }
    return false;
}

