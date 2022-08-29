var apiKey = 'ecfb80b8030fbc68e1a4388e75400358';//my key
var apiKey2 = '485bbc753e29e9770f09ca55c32c6d79' //instructor provided key
var apiKey3 = '8a42d43f7d7dc180da5b1e51890e67dc'
var currentTemp = document.getElementById('current-temp')
var searchBtn = document.getElementById('add')   

function getCoordinates(event){
    event.preventDefault();
    var city =document.getElementById('cityinput').value
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
        }
      getWeather(currentCity)
      saveCity(currentCity);
    createButton(currentCity);
    });
    
    
}
function saveCity(currentCity){
var cityArray = JSON.parse(localStorage.getItem('cityInfo'))
if(!cityArray) cityArray = [];
for (city of cityArray){
    if (city.name === currentCity.name) return; // prevent duplicate cities
}
cityArray.push(currentCity);
localStorage.setItem('cityInfo', JSON.stringify(cityArray))


}
function createButton({name,lat,lon}) {  //destructured to prevent repeating the currentCity.xx
var button = document.createElement('button');
button.textContent= name;
button.setAttribute('data-lon', lon);
button.dataset.lat= lat;  //another way to code line 39
document.getElementById('search-city').appendChild(button);

}
function getHistory () {
   var cityArray = JSON.parse(localStorage.getItem('cityInfo'));
   console.log(cityArray); 
   for (let city of cityArray) createButton(city)
}

//OneCall API
function getWeather({name,lat,lon}){
    
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey3}&units=imperial`
fetch  (weatherURL).then(response=>{ //another way to write the fetch function with arrow
    return response.json();
}).then(data=>{
    console.log(data);
    displayCurrentWeather(data.current);
    displayForcastWeather(data.daily);
})   

}  

// for the current weather in a city
function displayCurrentWeather(currentWeather){
console.log(currentWeather)
currentTemp.textContent = currentWeather.temp;

} 

// for the 5-day forcast in the same city
function  displayForcastWeather(forcastWeather) {
    console.log(forcastWeather)
    for(var i = 0;  i < 5; i++) {
        console.log(forcastWeather[i].temp.day)
        console.log(forcastWeather[i].humidity)
        console.log(forcastWeather[i].wind_speed)
        console.log(forcastWeather[i].uvi)
        //var dayname = new Date(value.dt * 1000).toLocaleDateString(“en”, { weekday: “long”, });
       // var futureDateEl = document.createElement('h3');
        //futureDateEl.textContent = 
        //document.body.appendChild(futureDateEl);
        var tempEl = document.createElement('p');
        tempEl.textContent = 'TEMP: '+forcastWeather[i].temp.day;
        document.body.appendChild(tempEl)
        var humidityEl = document.createElement('p');
        humidityEl.textContent = 'HUM: '+forcastWeather[i].humidity;
        document.body.appendChild(humidityEl)
        var windSpeedEl = document.createElement('p');
       windSpeedEl.textContent = 'WIND: '+forcastWeather[i].wind_speed;
        document.body.appendChild(windSpeedEl)
        var uviEl = document.createElement('p');
        uviEl.textContent = 'UVI: '+forcastWeather[i].uvi;
         document.body.appendChild(uviEl)

     };
        
}

   

getHistory()

searchBtn.addEventListener('click', getCoordinates);
button.addEventListener('click', displayCurrentWeather);