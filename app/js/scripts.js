window.onload = function () {
    tgSwitch();
    document.querySelector('.tabs__header').addEventListener('click', fTabs);
    document.querySelector('.tgSwitch').addEventListener('click', tgSwitch);
    document.querySelector('.button__add').addEventListener('click', save);
    document.querySelector('.button__del').addEventListener('click', del);

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

    function del() {
        localStorage.removeItem('House');
    }

    function save() {
        if (checkEmptyFields()) {//если нет пустых полей

            const getHouse = localStorage.getItem('House');//Дом[этаж][квартира]

            if (!JSON.parse(getHouse)){
                var numbFloors = document.getElementsByClassName('home__floor');
                var House = [,];
                for (let i = 0; i < numbFloors.length-1; i++) {
                    House.push([]);
                }
                alert('enter');
            }
            alert(House.length);
            //alert(House.length);
            var elements = document.forms['form1'].elements;//Получаем все элементы формы

            //Заполняем информацию о владельце
            var Owner = {
                name: elements['name'].value,
                gender: elements['gender-A'][0].checked,
                floor: elements['floor'].value,
                numbRooms: elements['numbRooms'].value,
                pets: elements['pets'].checked,
                tv: elements['tv'].checked,
                internet: elements['internet'].checked,
                numbPersons: elements['numbPersons'].value
            }

            //Есть ли свободная квартира на этаже?
            // if (House[parseInt(Owner.floor, 10)].length > 3) {
            //     alert('Этаж занят');
            //     return;
            // }

            House[0].push(Owner);

            var serialHouse = JSON.stringify(House);

            localStorage.setItem("House", serialHouse);
        }


    }

}




 function checkEmptyFields() {
    var bool = true;//для проверки каждого элемента
    var elements = document.forms['form1'].elements;//массив элементов формы form1

    //перебираем элементы и ищем с классом required
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].className.includes('required')) {
            if (elements[i].value.length == 0) {
                elements[i].style.border = "1px solid red";
                bool = false;
            } else {
                elements[i].style.border = "1px solid #E4EAEE";
            }
        }
    }
    return bool;
}

