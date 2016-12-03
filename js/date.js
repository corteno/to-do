function displayDate(){
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    var title = document.getElementById('app-title');

    var currentMonth = new Date();
    var currentDay = new Date();
    var currentDate = new Date();

    currentMonth = months[currentMonth.getMonth()];
    currentDay = days[currentDay.getDay()];
    currentDate = currentDate.getDate();

    var daySpan = document.createElement('span');
    var dateSpan = document.createElement('span');
    var monthDiv = document.createElement('div');

    daySpan.className = 'day';
    dateSpan.className = 'date';
    monthDiv.className = 'month';

    daySpan.appendChild(document.createTextNode(currentDay + ', '));
    dateSpan.appendChild(document.createTextNode(appendEnd(currentDate)));
    monthDiv.appendChild(document.createTextNode(currentMonth));

    title.appendChild(daySpan);
    title.appendChild(dateSpan);
    title.appendChild(monthDiv);

    console.log(appendEnd(1));



}

//Appends the date endings
function appendEnd(date){

    if(date % 10 == '1'){
        return date + 'st';
    } else if(date % 10 == '2'){
        return date + 'nd';
    } else if (date % 10 == '3'){
        return date + 'rd';
    } else {
        return date + 'th';
    }
}

displayDate();
