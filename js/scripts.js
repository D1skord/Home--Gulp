window.onload = function () {
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

    function tgSwitch(event) {
        var cb = document.querySelector('.cb');
        var slider = document.querySelector('.tgSwitch__slider');
        if (cb.checked == false) {
            cb.setAttribute('checked', true);
            slider.setAttribute("style", "-webkit-transform: translateX(91px)");
        } else {
            slider.setAttribute("style", "-webkit-transform: translateX(0px)");
            cb.setAttribute('checked', false);
        }
    }
}



