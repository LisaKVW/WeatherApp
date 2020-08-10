//greetings

let hello = document.querySelector("h1");
let now = new Date();
let hours = now.getHours();
if (hours < 12) {
  hello.innerHTML = "Good Morning! ☀️";
} else if (hours < 18) {
  hello.innerHTML = "Good Afternoon! ☀️";
} else {
  hello.innerHTML = "Good Evening! 🌕";
}

// time&date

function formatDate(date) {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let month = months[now.getMonth()];
  let today = now.getDate();
  return `${day}, ${month} ${today} ${formatHours(now)}`;
}
// forecast time
function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${minutes}`;
}

let updateTodayDay = document.querySelector("#date1");
updateTodayDay.innerHTML = formatDate();

// search city - Show current weather for location + location
// document.querySelector("#current-location").innerHTML = response.data.name; = the city you want to search will
//show up as your searched city on the app in #current-location

function showWeather(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  let actualWeatherLocation = document.querySelector("#temperature-posted");
  actualWeatherLocation.innerHTML = Math.round(celsiusTemperature);

  let inspectWind = response.data.wind.speed;
  let realWind = document.querySelector("#wind");
  realWind.innerHTML = `Wind ${inspectWind} Km/H`;

  let inspectHumidity = response.data.main.humidity;
  let realHumidity = document.querySelector("#humidity");
  realHumidity.innerHTML = `Humidity ${inspectHumidity} %`;

  let actualWeatherIcon = document.querySelector("#weather-icon");
  actualWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];

    forecastElement.innerHTML += `
         <div class="row">
<div class="col" id="date2">
<h6> 
   ${formatHours(forecast.dt * 1000)}
</h6>
<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
<div class="weather=forceast-temp">
 <strong> ${Math.round(forecast.main.temp_max)} ℃ </strong>
 </div>`;
  }
}
// searched city to be connected to apiUrl

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;

  searchCity(city);
}
// api to find weather city and forecast

function searchCity(city) {
  let apiKey = "47b783e374dd1d17b34b52141082af29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrlFor = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlFor).then(showForecast);
}
// emoji - quick current location

function myLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "47b783e374dd1d17b34b52141082af29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

//fahrenheit click

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let actualWeatherLocation = document.querySelector("#temperature-posted");

  //remove active link from celsius
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  actualWeatherLocation.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let actualWeatherLocation = document.querySelector("#temperature-posted");
  actualWeatherLocation.innerHTML = Math.round(celsiusTemperature);
}

//current emoji button
let button = document.querySelector("#location-emoji");
button.addEventListener("click", getCurrentPosition);

// form search submit button - to submmit location
let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

//Default city on load
searchCity("New York");
