var apiKey = "ecfb80b8030fbc68e1a4388e75400358"; //my key
var apiKey2 = "485bbc753e29e9770f09ca55c32c6d79"; //instructor provided key
var apiKey3 = "8a42d43f7d7dc180da5b1e51890e67dc";
var currentTemp = document.getElementById("current-temp");
var searchBtn = document.getElementById("add");
var searchForm = document.querySelector("searchForm");
var currentUVI = document.getElementById("current-uvi");
var searchHistory = document.getElementById("search-history");
function getCoordinates(event) {
  event.preventDefault();
  var city = document.getElementById("cityinput").value;
  console.log(city);
  var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentCity = {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon,
      };
      getWeather(currentCity);
      saveCity(currentCity);
    });
}
function saveCity(currentCity) {
  var cityArray = JSON.parse(localStorage.getItem("cityInfo"));
  if (!cityArray) cityArray = [];
  console.log(currentCity);
  for (city of cityArray) {
    if (city.name === currentCity.name) return; // prevent duplicate cities
    console.log(city.name, currentCity.name);
  }
  cityArray.push(currentCity);
  localStorage.setItem("cityInfo", JSON.stringify(cityArray));
  createButton(currentCity);
}
function createButton({ name, lat, lon }) {
  //destructured to prevent repeating the currentCity.xx
  var button = document.createElement("button");
  button.textContent = name;
  button.setAttribute("data-lon", lon);
  button.dataset.lat = lat; //another way to code line 39
  var searchContainer = document
    .getElementById("search-history")
    .appendChild(button);
}
function getHistory() {
  var cityArray = JSON.parse(localStorage.getItem("cityInfo"));
  if (cityArray) {
    for (let city of cityArray) createButton(city);
  }
}

//OneCall API
function getWeather({ name, lat, lon }) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey3}&units=imperial`;
  fetch(weatherURL)
    .then((response) => {
      //another way to write the fetch function with arrow
      return response.json();
    })
    .then((data) => {
      document.getElementById("city").textContent = name;
      displayCurrentWeather(data.current);
      displayForcastWeather(data.daily);
    });
  //var weatherIcon = "http://openweathermap.org/img/wn" + icon + "@2x.png";
}

// for the current weather in a city
function displayCurrentWeather(currentWeather) {
  document.getElementById("date").textContent = new Date(
    currentWeather.dt * 1000
  ).toLocaleDateString(); //FORMAT DATE

  console.log(currentWeather);
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" +
        currentWeather.weather[0].icon +
        ".png"
    );
  currentTemp.textContent = `Temp: ${currentWeather.temp}`;
  document.getElementById("current-humid").textContent =
    "Humidity: " + currentWeather.humidity;
  document.getElementById(
    "current-wind"
  ).textContent = `Wind: ${currentWeather.wind_speed}`;
  currentUVI.textContent = `UV Index:${currentWeather.uvi}`;
  if (currentWeather.uvi > 3 && currentWeather.uvi < 7)
    currentUVI.style.backgroundColor = "#FFEB7A";
  if (currentWeather.uvi <= 3) currentUVI.style.backgroundColor = "#90EE90";
  if (currentWeather.uvi >= 7) currentUVI.style.backgroundColor = "#FFCCCB";
}

// for the 5-day forcast in the same city
function displayForcastWeather(forcastWeather) {
  document.getElementById("five-day-forcast").innerHTML = "";

  for (var i = 0; i < 5; i++) {
    var dayEl = document.createElement("div");
    dayEl.classList.add("col-2");
    dayEl.classList.add("p-4");
    dayEl.classList.add("bg-info");
    dayEl.classList.add("ml-5");
    var dateEl = document.createElement("p");

    dateEl.textContent = new Date(
      forcastWeather[i].dt * 1000
    ).toLocaleDateString();
    dayEl.appendChild(dateEl);
    var iconEl = document.createElement("img");
    iconEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" +
        forcastWeather[i].weather[0].icon +
        ".png"
    );

    dayEl.appendChild(iconEl);
    var tempEl = document.createElement("p");
    tempEl.textContent = "TEMP: " + forcastWeather[i].temp.day;
    dayEl.appendChild(tempEl);
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "HUM: " + forcastWeather[i].humidity;
    dayEl.appendChild(humidityEl);
    var windSpeedEl = document.createElement("p");
    windSpeedEl.textContent = "WIND: " + forcastWeather[i].wind_speed;
    dayEl.appendChild(windSpeedEl);
    var uviEl = document.createElement("p");
    uviEl.textContent = "UVI: " + forcastWeather[i].uvi;
    dayEl.appendChild(uviEl);
    document.getElementById("five-day-forcast").appendChild(dayEl);
  }
}
function getPrevCity(event) {
  if (event.target.matches("button")) {
    var city = {
      name: event.target.textContent,
      lat: event.target.dataset.lat,
      lon: event.target.dataset.lon,
    };
    getWeather(city);
  }
}

getHistory();

searchBtn.addEventListener("click", getCoordinates);

searchHistory.addEventListener("click", getPrevCity);
