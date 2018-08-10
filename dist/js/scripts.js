var house = [,];
var houseHtml = [,];
var criterias;

window.onload = function () {
    loadHouse();
    addEventListenerFilters();
    document.querySelector('.tabs__header').addEventListener('click', tabs);
    document.querySelector('.tgSwitch').addEventListener('click', tgSwitch);
    document.querySelector('.button__add').addEventListener('click', save);
    document.querySelector('.home').addEventListener('click', popap);
    document.querySelector('.button__person-delete').addEventListener('click', personDel);
    document.querySelector('.popup__header__close').addEventListener('click', closePopup);
    document.querySelector('.button__reset-filter').addEventListener('click', resetFilters);



function resetFilters() {
    loadHouse();
}

function addEventListenerFilters() {
    var elements = document.forms['form2'].elements;

    elements['name'].addEventListener("change", change);
    elements['gender-F'][0].addEventListener("change", change);
    elements['gender-F'][1].addEventListener("change", change);
    elements['numbRooms'].addEventListener("change", change);
    elements['pets'].addEventListener("change", change);
    elements['tv'].addEventListener("change", change);
    elements['internet'].addEventListener("change", change);
    elements['floor'].addEventListener("change", change);
}

}


function checkEmptyFields() {
    var bool = true;//для проверки каждого элемента
    var elements = document.forms['form1'].elements;//массив элементов формы form1

    //перебираем элементы и ищем с классом required
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].className.includes('required')) {
            if ((elements[i].value.length == 0) || (elements[i].value == 'dis')) {
                elements[i].style.border = "1px solid red";
                bool = false;
            } else {
                elements[i].style.border = "1px solid #E4EAEE";
            }
        }
    }
    return bool;
}

