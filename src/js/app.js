// general const
const form = document.querySelector('#form')
const currentLocationBtn = document.querySelector('.btn-current-location')
let celsius = null
const fahrenheitLink = document.querySelector('#fahrenheit-link')
const celsiusLink = document.querySelector('#celsius-link')


//event listener
form.addEventListener('submit', displayCity)
currentLocationBtn.addEventListener('click', currentGeoLocation)
fahrenheitLink.addEventListener('click', showFahrenheitTemp)
celsiusLink.addEventListener('click', showCelsiusTemp)

// Function

// displayCIty
function displayCity(event) {
  event.preventDefault()
  const searchCityInput = document.querySelector('.search-city')
  search(searchCityInput.value)
  searchCityInput.value = ''
}

// search
function search(city) {
  let apiKey = '94d5f2539167e3ce89a6d05f892abf09'
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayCityAndTemp)

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast)
}

// current Geo location

function currentGeoLocation(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(searchLocation)
}

function searchLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let apiKey = "94d5f2539167e3ce89a6d05f892abf09";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityAndTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayDate() {
  let now = new Date()

  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  let day = days[now.getDay()]
  let month = months[now.getMonth()]
  let year = now.getFullYear()
  let cdate = now.getDate()
  let hours = now.getHours()
  let minutes = now.getMinutes()

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  return `${day}, ${cdate}.${month}.${year}, ${hours}:${minutes}`
}

// displayCityandTemp
function displayCityAndTemp(response) {
  
  const showCityElement = document.querySelector('.current-location')

  showCityElement.innerHTML = response.data.name

  let showDate = document.querySelector('.current-time')

  showDate.innerHTML = displayDate()

  const description = document.querySelector('.current-description')

  description.innerHTML = response.data.weather[0].description

  const humidity = document.querySelector('.humidity')
  const wind = document.querySelector('.wind')

  humidity.innerHTML = Math.round(response.data.main.humidity)
  wind.innerHTML = Math.round(response.data.wind.speed)

  celsius = response.data.main.temp
  let tempElement = document.querySelector('.temperature')

  tempElement.innerHTML = Math.round(celsius)

  let icons = document.querySelector('.icons')
  icons.setAttribute(
    'src',
    `img/png/${response.data.weather[0].description}.png`
  )
  icons.setAttribute('alt', response.data.weather[0].description)
}

// Temperature

function showFahrenheitTemp(event) {
  event.preventDefault()
  let fahrenheitConv = (celsius * 9) / 5 + 32
  celsiusLink.classList.remove('active')
  fahrenheitLink.classList.add('active')

  let temperatureElement = document.querySelector('.temperature')

  temperatureElement.innerHTML = Math.round(fahrenheitConv)
}

function showCelsiusTemp(event) {
  event.preventDefault()
  fahrenheitLink.classList.remove('active')
  celsiusLink.classList.add('active')
  let temperatureElement = document.querySelector('.temperature')

  temperatureElement.innerHTML = Math.round(celsius)
  }

  function formatHours(timestramp) {
    let date = new Date(timestramp)
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    if (hours < 10) {
      hours = `0${hours}`
    }
    return `${hours} : ${minutes}`
  } 
  function displayForecast(response) {
    let forecastElement = document.querySelector('#forecast')
    forecastElement.innerHTML = null
    let forecast = null

    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index]
      forecastElement.innerHTML += `
      <div class="fore-con">
      <h3 class="forecast-title">
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img class="forecast-icon" rel="stylesheet" src="img/png/${forecast.weather[0].description}.png" alt="${
        forecast.weather[0].description
      }" />
      <div class="weather-forecast-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(
        forecast.main.temp_min
      )}°
      </div>
      </div>
  `
    }
  }
//search
search('London')
