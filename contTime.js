let inputEnterHour = document.querySelector('#hourEnter')
let inputEnterMinute = document.querySelector('#minuteEnter')

let inputEndHour = document.querySelector('#hourEnd')
let inputEndMinute = document.querySelector('#minuteEnd')

let inputValue = document.querySelector('.hourValue')

let totalHour = document.querySelector('.totalHour')
let totalMinute = document.querySelector('.totalMinute')

let calcTimeButton = document.querySelector('.calcTime')

let totalValue = document.querySelector('.totalValue')

let arrayForNumbers = []
let formatted = []

//TROCAR DE INPUT AUTOMATICAMENTE
let container1 = document.getElementsByClassName('timeWorked')[0]
container1.onkeyup = function (e) {
  let target = e.srcElement
  let maxLength = 2
  let myLength = target.value.length
  if (myLength >= maxLength) {
    let next = target
    while ((next = next.nextElementSibling)) {
      if (next == null) break
      if (next.tagName.toLowerCase() == 'input') {
        next.focus()
        break
      }
    }
  }
}

inputEnterMinute.onkeyup = function (e) {
  let target = e.srcElement
  let myLength = target.value.length
  let max = 2

  if (myLength >= max) {
    inputEndHour.focus()
  }
}

inputEndMinute.onkeyup = function (e) {
  let target = e.srcElement
  let myLength = target.value.length
  let max = 2

  if (myLength >= max) {
    inputValue.focus()
  }
}

//TROCAR DE INPUT AUTOMATICAMENTE TERMINA

function getTimes() {
  arrayForNumbers.length = 0
  formatted.length = 0

  let enterHour = parseInt(inputEnterHour.value)
  let enterMinute = parseInt(inputEnterMinute.value)
  let endHour = parseInt(inputEndHour.value)
  let endMinute = parseInt(inputEndMinute.value)
  let hourValue = parseFloat(inputValue.value)

  let totalMinutes = calcHoursWorked(enterHour, enterMinute, endHour, endMinute)
  let resultHour = convertMinuteInHourReturnHour(totalMinutes)
  let resultMinute = convertMinuteInHourReturnMinute(totalMinutes)

  let valueTotal = calcValueHour(hourValue, totalMinutes)

  setValue(valueTotal)

  console.log(valueTotal)

  arrayForNumbers.push(resultHour)
  arrayForNumbers.push(resultMinute)

  arrayForNumbers.forEach(num => {
    formatted.push(
      num.toLocaleString('pt-BR', {
        //this is the function that formats the numbers
        minimumIntegerDigits: 2, //change this to your minimum length
        useGrouping: false
      })
    )
  })

  if (
    validatedTime(enterHour, enterMinute) &&
    validatedTime(endHour, endMinute)
  ) {
    if (totalMinutes >= 0) {
      setTimes(formatted[0], formatted[1])
    } else {
      msgError()
    }
  } else {
    return msgError()
  }
}

function setTimes(resultHour, resultMinute) {
  totalHour.textContent = resultHour
  totalMinute.textContent = resultMinute
}

function convertHourInMinute(hour) {
  return hour * 60
}

function convertMinuteInHourReturnHour(minute) {
  return Math.floor(minute / 60)
}
function convertMinuteInHourReturnMinute(minute) {
  return minute % 60
}

function calcValueHour(value, time) {
  if (value >= 0) {
    return (value * time) / 60
  } else {
    return 0
  }
}

function setValue(value) {
  value = parseFloat(value.toFixed(2))
  totalValue.textContent = value.toFixed(2)
}

function calcHoursWorked(enterHour, enterMinute, endHour, endMinute) {
  let hourEnter = convertHourInMinute(enterHour)
  let resultEnter = hourEnter + enterMinute

  let hourEnd = convertHourInMinute(endHour)
  let resultEnd = hourEnd + endMinute

  return resultEnd - resultEnter
}

function validatedTime(hour, minute) {
  if (hour >= 0 && hour <= 24) {
    if (minute >= 0 && minute < 60) {
      return true
    }
    return false
  }
  return false
}

function msgError() {
  totalHour.textContent = ''
  totalMinute.textContent = 'INVÁLIDO'
  totalValue.textContent = '0.00'
}
