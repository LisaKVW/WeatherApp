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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${today} ${hours}:${minutes}`;
}

let updateTodayDay = document.querySelector("#date1");
updateTodayDay.innerHTML = formatDate();

// search city - Show current weather for location + location
// document.querySelector("#current-location").innerHTML = response.data.name; = the city you want to search will
//show up as your searched city on the app in #current-location

function showWeather(response) {
  console.log(response);
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let temperature = Math.round(response.data.main.temp);
  let actualWeatherLocation = document.querySelector("#temperature-posted");
  actualWeatherLocation.innerHTML = `${temperature} ℃ `;

  let inspectWind = response.data.wind.speed;
  let realWind = document.querySelector("#wind");
  realWind.innerHTML = `Wind ${inspectWind} Km/H`;

  let inspectHumidity = response.data.main.humidity;
  let realHumidity = document.querySelector("#humidity");
  realHumidity.innerHTML = `Humidity ${inspectHumidity} %`;
}

// searched city to be connected to apiUrl

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box").value;

  searchCity(city);
}

function searchCity(city) {
  let apiKey = "47b783e374dd1d17b34b52141082af29";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
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

let button = document.querySelector("#location-emoji");
button.addEventListener("click", getCurrentPosition);

// form search submit button - to submmit location
let form = document.querySelector("#location-form");
form.addEventListener("submit", search);

// last updated

// upcoming days
