function loadHouse() {

    tgSwitch();//отобразить дом в выбранном режиме

    getHouse = localStorage.getItem('House');

    //Если жителей в доме нет, то выходим из функции
    if (!JSON.parse(getHouse)) {
        return;
    }
    house = JSON.parse(localStorage['House']);

    houseHtml = [,];//дом[этаж][окно] - связанный с элементами html
    var floors = document.getElementsByClassName('home__floor');

    houseHtml[0] = floors[0].getElementsByClassName('home__floor__window');
    //каждому этажу houseHtml добавляем массив окон
    for (let i = 1; i < house.length; i++) {
        houseHtml.push(floors[i].getElementsByClassName('home__floor__window'));
    }

    for (let i = 0; i < house.length; i++) {
        for (let j = 0; j < house[i].length; j++) {
            if(house[i][j]) {
                if (house[i][j].gender) {
                    houseHtml[i][j].setAttribute(
                        "style", "background-image: url('img/home/boy.jpg'); background-repeat: no-repeat; background-position: right center; background-position-x: 20px;");
                } else {
                    houseHtml[i][j].setAttribute(
                        "style", "background-image: url('img/home/girl.jpg'); background-repeat: no-repeat; background-position: right center;");
                }
            }
        }
    }
    tgSwitch();//отобразить дом в выбранном режиме
}

function save() {
    //если нет пустых полей
    if (!checkEmptyFields()) {
        return;
    }

    const getHouse = localStorage.getItem('House');//Дом[этаж][квартира]
    house = [,];
    house[0] = [];//house.push([]); на 0 индексе дает nill

    if (!JSON.parse(getHouse)){
        var numbFloors = document.getElementsByClassName('home__floor');
        for (let i = 0; i < numbFloors.length-1; i++) {
            house.push([]);
        }
    } else {
        house = JSON.parse(localStorage['House']);
    }

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

    //если этаж введен некорректно
    if ((parseInt(Owner.floor, 10) <= 0) || (parseInt(Owner.floor, 10) > house.length) || isNaN(parseInt(Owner.floor, 10)) ) {
        alert('Floor is missing!');
        return;
    }

    let tmp = false;
    for (let i = 0; i < 3; i++) {
        if (house[house.length - parseInt(Owner.floor, 10)][i] === null || house[house.length - parseInt(Owner.floor, 10)][i] === undefined){
            tmp = true;
        }
    }
    if(!tmp) {
        alert('Busy!');
        return;
    }

    let check = false;
    for (let i = 0; i < 3; i++) {
        if (house[house.length - parseInt(Owner.floor, 10)][i] == null) {
            house[house.length - parseInt(Owner.floor, 10)][i] = Owner;
            check = true;
            break;
        }
    }
    if (!check){
        house[house.length - parseInt(Owner.floor, 10)].push(Owner);
    }

    var serialHouse = JSON.stringify(house);

    localStorage.setItem("House", serialHouse);

alert('Complete!');
location.reload();
}

function clearHome(params) {
    var windows = document.getElementsByClassName('home__floor__window');
    if (tgSwitch) {
        for (let i = 0; i < windows.length; i++) {
            if (tgSwitch) {
                windows[i].style.border = '5px solid #3E3FC4';
            } else {
                windows[i].style.border = '5px solid #613007';
            }
            windows[i].style.background = '#F8BCCA';
        }
    }
}

//отображает отфильтрованный массив filterHouse
function loadFilterHouse(filterHouse) {
clearHome();
    var floors = document.getElementsByClassName('home__floor');

        houseHtml[0] = floors[0].getElementsByClassName('home__floor__window');
        //каждому этажу houseHtml добавляем массив окон
        for (let i = 1; i < house.length; i++) {
            houseHtml.push(floors[i].getElementsByClassName('home__floor__window'));
        }

        for (let i = 0; i < filterHouse.length; i++) {
            for (let j = 0; j < 3; j++) {
                if(filterHouse[i][j]) {
                    if (filterHouse[i][j].gender) {
                        houseHtml[i][j].setAttribute(
                            "style", "background-image: url('img/home/boy.jpg'); background-repeat: no-repeat; background-position: right center; background-position-x: 20px; border = 5px solid #613007;");
                    } else {
                        houseHtml[i][j].setAttribute(
                            "style", "background-image: url('img/home/girl.jpg'); background-repeat: no-repeat; background-position: right center; border = 5px solid #613007;");
                    }
                }
            }
        }

    var windows = document.getElementsByClassName('home__floor__window');
    if (tgSwitch) {
        for (let i = 0; i < windows.length; i++) {
            if (tgSwitch) {
                windows[i].style.border = '5px solid #3E3FC4';
            } else {
                windows[i].style.border = '5px solid #613007';
            }
        }
    }
}

//Филтрует дом в массиве и вызывает функцию для его отображения
function change(event) {

    var elements = document.forms['form2'].elements;
    //Формирование обьекта для поиска
    criterias = {
        name: elements['name'].value,
        gender: elements['gender-F'][0].checked,
        numbRooms: elements['numbRooms'].value,
        pets: elements['pets'].checked,
        tv: elements['tv'].checked,
        internet: elements['internet'].checked,
        floor: elements['floor'].value
    }

    var filterHouse = [,];
    filterHouse[0] = [];
    for (let i = 0; i < house.length-1; i++) {
        filterHouse.push([]);
    }

    for (let i = 0; i < house.length; i++) {
        for (let j = 0; j < 3; j++) {
            if(house[i][j]) {
                if(compr(house[i][j], criterias)) {
                    filterHouse[i][j] = house[i][j];
                }
            }
        }
    }
    loadFilterHouse(filterHouse);
}




//срваниваем 2 объекта
function compr(obj1, obj2) {
    var bool = true;
    if (obj1.name != obj2.name && obj2.name != '') return false;
    if (obj1.gender != obj2.gender) return false;
    if (obj1.numbRooms != obj2.numbRooms && obj2.numbRooms != 'dis') return false;
    if (obj1.pets != obj2.pets) return false;
    if (obj1.tv != obj2.tv) return false;
    if (obj1.internet != obj2.internet) return false;
    if (obj1.floor != obj2.floor && obj2.floor != '') return false;
    return bool;
}