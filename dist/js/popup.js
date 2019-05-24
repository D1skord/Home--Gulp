var floor;
var win;
function popap(event) {
    document.querySelector('.tgSwitch').style.display = 'none';
    tgSwitch();
    document.querySelector('.popup').style.display = 'block';
    if (event.target.className == 'home__floor__window') {
        var winNum = event.target.getAttribute('data-winNum');
        //парсим data-winNum и преобразуем в int
        floor = parseInt(winNum.split(',')[0], 10);
        win = parseInt(winNum.split(',')[1], 10);
        room = house[5 - floor][win-1];

        //Если в квартире никого, то кидаем на форму с добавление жителя
        if(!room) {tgSwitch();
            closePopup(); return;};

        //выделяем выбранное окно
        houseHtml[5 - floor][win-1].style.border = '5px solid #00C200';

        document.querySelector('.info').style.display = 'none';//скрываем табы

        //для сокращения
        var popup = document.querySelector('.popup');


        popup.querySelector('.popup__header__name').innerHTML = room.name;//парсим имя жителя
        //если true, то мужская иконка и пол
        if (room.gender) {
            popup.querySelector('.popup__header__icon').style.backgroundImage = "url('../img/home/boy.jpg')";
            popup.querySelector('div[name="gender"]').innerHTML = 'Male';
        } else {
            popup.querySelector('.popup__header__icon').style.backgroundImage = "url('../img/home/girl.jpg')";
            popup.querySelector('div[name="gender"]').innerHTML = 'Female';
        }
        popup.querySelector('div[name="numbRooms"]').innerHTML = room.numbRooms;
        popup.querySelector('div[name="numbPersons"]').innerHTML = room.numbPersons;
        popup.querySelector('div[name="floor"]').innerHTML = room.floor;
        var addit = "";//строка для доп инфы
        if (room.pets) { addit += 'Pets, ' }
        if (room.tv) { addit += 'TV, ' }
        if (room.internet) { addit += 'Internet, ' }

        //Если строка не пустая, то убираем запятую в конце иначе '-'
        if (addit) {
            addit = addit.slice(0, -2);
        } else {
            addit = '&#8212';//длинное тире
        }
        popup.querySelector('div[name="addit"]').innerHTML = addit;
    }
}

function closePopup() {
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.info').style.display = 'block';
    document.querySelector('.tgSwitch').style.display = 'block';
    tgSwitch();//убираем выделенную рамку

}

function personDel(event) {
    var winNum = event.target.getAttribute('data-winNum');
        //парсим data-winNum и преобразуем в int
        delete house[5 - floor][win-1];
        var serialHouse = JSON.stringify(house);

        localStorage.setItem("House", serialHouse);
        alert('Complete!');
        location.reload();
}