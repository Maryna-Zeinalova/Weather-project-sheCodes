function displayDate() {
  let now = new Date();
  let dateTime = document.querySelector(".date-time");
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "june",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }

  dateTime.innerHTML = `${month} ${now.getDate()}, ${hour}:${minutes}`;
}
displayDate();

function convertToFarenheit(event) {
  event.preventDefault();
  farenheit.classList.add("active");
  celcius.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", convertToFarenheit);

function convertToCelcius(event) {
  event.preventDefault();
  farenheit.classList.remove("active");
  celcius.classList.add("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//weather api
function showTemperature(response) {
  celsiusTemp = response.data.main.temp;

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temp}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity-prop");
  humidityElement.innerHTML = `${humidity}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind-prop");
  windElement.innerHTML = `${windSpeed}`;

  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let iconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.innerHTML = `<img id="wicon" src="${iconUrl}" alt="Weather icon">`;

  let cityElement = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${cityElement}`;
  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".form-control");

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function startPage(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="weather-forecast-day">${day}</div>
            <img
              id="wicon"
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt="Weather icon"
            />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-max">26</span>°
              <span class="weather-forecast-min">19</span>°
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", search);
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", search);

let locationBtn = document.querySelector("#current-location");
locationBtn.addEventListener("click", getPosition);

let apiKey = "9b81de7ae752c035dcdf31ce35d734cc";

let celsiusTemp = null;

startPage("Dnipro");
