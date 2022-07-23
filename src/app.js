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

//   function search(event) {
//    event.preventDefault();
//   let searchInput = document.querySelector(".form-control");
//   console.log(searchInput.value);
//    let h3 = document.querySelector("h3");
//    h3.innerHTML = searchInput.value;
//  }

// let form = document.querySelector("form");
// form.addEventListener("submit", search);

function convertToFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 66;
}
let farenheit = document.querySelector("#farenheit-link");
farenheit.addEventListener("click", convertToFarenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = 19;
}
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);

//weather api
function showTemperature(response) {
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

let form = document.querySelector("form");
form.addEventListener("submit", search);

let locationBtn = document.querySelector("#current-location");
locationBtn.addEventListener("click", getPosition);

let apiKey = "52a2ba2e244b3e0ea68aa04f77e27cd8";
