function tabs(event) {
    loadHouse();
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
        if(dataTab == '0') {
            document.getElementById('form1').reset();
        } else {
            document.getElementById('form2').reset();
            change();
        }
    }
}