/*var info = document.getElementById('info');
var footer = document.getElementById('info-footer');
info.onclick = showInfo(footer);

function showInfo(obj){
    console.log(obj.classList);
    /!*obj.classList.toggle('hide-footer');*!/
    if(hasClass(obj, 'hide-footer')){
        obj.className -= 'hide-footer';

    } else {
        obj.classname += 'hide-footer';
    }
}

function hasClass(element, cls) {
    console.log(element.className);
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}*/

$(document).ready(function () {
    $('#info').click(function () {
        $('#info-footer').toggleClass('hide-footer');
    });
});
