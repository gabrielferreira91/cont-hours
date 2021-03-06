let inputEnterHour = document.querySelector('#hourEnter');
let inputEnterMinute = document.querySelector('#minuteEnter');

let inputEndHour = document.querySelector('#hourEnd');
let inputEndMinute = document.querySelector('#minuteEnd');

let totalHour = document.querySelector('.totalHour')
let totalMinute = document.querySelector('.totalMinute')

let arrayForNumbers = [];
let formatted = [];

function getTimes(){
    arrayForNumbers.length = 0;  
    formatted.length = 0;  
    
        
    let enterHour = parseInt(inputEnterHour.value);
    let enterMinute = parseInt(inputEnterMinute.value);
    let endHour = parseInt(inputEndHour.value);
    let endMinute = parseInt(inputEndMinute.value);   
    

    let totalMinutes = calcHoursWorked(enterHour,enterMinute,endHour,endMinute);
    let resultHour = convertMinuteInHourReturnHour(totalMinutes);
    let resultMinute = convertMinuteInHourReturnMinute(totalMinutes);
   
    arrayForNumbers.push(resultHour);
    arrayForNumbers.push(resultMinute);

    arrayForNumbers.forEach(num => {
        formatted.push(
          num.toLocaleString('pt-BR', {//this is the function that formats the numbers
            minimumIntegerDigits: 2, //change this to your minimum length
            useGrouping: false
          })
        )
    })
   
    if(validatedTime(enterHour, enterMinute) && validatedTime(endHour, endMinute))
    {
        if (totalMinutes >= 0) {
            setTimes(formatted[0], formatted[1]);
        } else {
            msgError()
        } 
    }else {
        return msgError();
    }
 }


function setTimes(resultHour, resultMinute){   
    totalHour.textContent = resultHour;
    totalMinute.textContent = resultMinute;
}

function convertHourInMinute(hour){
    return hour*60
}

function convertMinuteInHourReturnHour(minute){
    return Math.floor(minute/60)
}
function convertMinuteInHourReturnMinute(minute){
    return minute % 60
}

function calcHoursWorked(enterHour, enterMinute, endHour, endMinute){
    let hourEnter = convertHourInMinute(enterHour);
    let resultEnter = hourEnter + enterMinute;

    let hourEnd = convertHourInMinute(endHour);
    let resultEnd = hourEnd + endMinute;

    return resultEnd - resultEnter
}


function validatedTime(hour, minute){
    if (hour >= 0 && hour <=24 ) { 
        if (minute >= 0 && minute < 60) {
            return true
        }
        return false
    }  
    return false    
}

function msgError(){
    totalHour.textContent = 'HORAS';
    totalMinute.textContent = 'INV??LIDAS';
}