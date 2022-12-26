function showTemp(response) {
  let currentTemp = document.querySelector("#temp-now");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  console.log(currentTemp);
  console.log(response);
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `${response.data.name}`;
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${response.data.weather[0].description}`;
  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = `Precipitation: ${response.data.main.precipitation}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let datePlace = document.querySelector("#current-date");
  datePlace.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-tape-on");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;

  let apiKey = "0253ff28a88d857c4ea41ede9adb9d05";
  let city = searchInput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let cityCurrent = document.querySelector("#search-button");
cityCurrent.addEventListener("click", search);

function retrievePosition(position) {
  let apiKey = "0253ff28a88d857c4ea41ede9adb9d05";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let currentlyTemp = document.querySelector("#currently-button");
currentlyTemp.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(retrievePosition)
);
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
