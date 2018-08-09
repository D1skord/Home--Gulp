window.onload = function () {
    tgSwitch();
    loadHouse();
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

    function loadHouse() {
        getHouse = localStorage.getItem('House');

        //Если жителей в доме нет, то выходим из функции
        if (!JSON.parse(getHouse)) {
            return;
        }
        house = JSON.parse(localStorage['House']);

        var houseHtml = [,];//дом[этаж][окно] - связанный с элементами html
        var floors = document.getElementsByClassName('home__floor');

        houseHtml[0] = floors[0].getElementsByClassName('home__window');
        //каждому этажу houseHtml добавляем массив окон
        for (let i = 1; i < house.length; i++) {
            houseHtml.push(floors[i].getElementsByClassName('home__window'));
        }
        console.log(houseHtml[0,0]);
        for (let i = 0; i < house.length; i++) {
            for (let j = 0; j < house[i].length; j++) {
                if(house[i, j]) {
                    houseHtml[i, j].style.background = 'yellow';
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
            var house = [,];
            house[0] = [];//house.push([]); на 0 индексе дает nill

            if (!JSON.parse(getHouse)){
                var numbFloors = document.getElementsByClassName('home__floor');
                for (let i = 0; i < numbFloors.length-1; i++) {
                    house.push([]);
                }
                alert('enter');
            } else {
                house = JSON.parse(localStorage['House']);
            }
            alert(house.length);

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
            // выбранный этаж = индекс в доме: 2 = 3; 3 = 2; 5 = 0; 1 = 4;
            if (house[house.length - parseInt(Owner.floor, 10)].length >= 3) {
                alert('Этаж занят');
                return;
            }

            house[house.length - parseInt(Owner.floor, 10)].push(Owner);

            var serialHouse = JSON.stringify(house);

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

