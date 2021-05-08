let currentDate = new Date();
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[currentDate.getDay()];
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} ${currentHour}:${currentMinutes}`;
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchForCity);
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
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
function searchForCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searchCity").value;
  let apiKey = "450b95d136116b24f43a09a0e5741a8f";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}ºC`;
  document.querySelector("h1").innerHTML = response.data.name;
  console.log(response.data.name);
}
function showPosition(position) {
  let apiKey = "450b95d136116b24f43a09a0e5741a8f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#geo-button");
button.addEventListener("click", getCurrentPosition);
