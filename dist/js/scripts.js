window.onload = function () {
    tgSwitch();
    document.querySelector('.tabs__header').addEventListener('click', fTabs);
    document.querySelector('.tgSwitch').addEventListener('click', tgSwitch);

    function fTabs(event) {
        if (event.target.className == 'tabs__tab') {
            var dataTab = event.target.getAttribute('data-tab');// номер вкладки для отображения
            //отключаем у всех класс active
            var tabs = document.getElementsByClassName('tabs__tab');
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }

            event.target.classList.add('active');
            var tabBody = document.getElementsByClassName('tabs__content');// содержимое вкладок
            for (let i = 0; i < tabBody.length; i++) {
                if (dataTab == i) {
                    tabBody[i].style.display = 'block';
                } else {
                    tabBody[i].style.display = 'none';
                }
            }
        }
    }

    function tgSwitch() {
        var floors = document.getElementsByClassName('home__floor');
        var windows = document.getElementsByClassName('home__window');
        if (document.querySelector('#cb').checked == true) {
            document.querySelector('.home').style.background = 'url(img/home/dayFoundation.jpg) no-repeat';
            for (let i = 0; i < floors.length; i++) {
                floors[i].style.background = 'url(img/home/dayFloor.jpg) no-repeat';
            }
            for (let i = 0; i < windows.length; i++) {
                windows[i].style.border = '5px solid #613007';
            }
        } else {
            document.querySelector('.home').style.background = 'url(img/home/moonFoundation.jpg) no-repeat';
            for (let i = 0; i < floors.length; i++) {
                floors[i].style.background = 'url(img/home/moonFloor.jpg) no-repeat';
            }
            for (let i = 0; i < windows.length; i++) {
                windows[i].style.border = '5px solid #3E3FC4';
            }
        }
    }
}




