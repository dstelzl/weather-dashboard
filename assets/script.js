var apiKey = 'ecfb80b8030fbc68e1a4388e75400358';//my key
var currentTemp = document.getElementById('current-temp')
   

function getCoordinates(){
    
    var city =   'chicago'     //  document.getElementById('city')
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getWeather(data[0].lat, data[0].lon)
    });
}


function getWeather(lat, lon){
    var apiKey2 = '485bbc753e29e9770f09ca55c32c6d79' //instructor provided key
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=imperial`
fetch  (weatherURL).then(response=>{ //another way to write the fetch function with arrow
    return response.json();
}).then(data=>{
    console.log(data);
    displayCurrentWeather(data.current);
    displayForcastWeather(data.daily);
})   

}  
function displayCurrentWeather(currentWeather){
console.log(currentWeather)
currentTemp.textContent = currentWeather.temp;
} 
function  displayForcastWeather(forcastWeather) {
    console.log(forcastWeather)
    for(var i = 0;  i < 5; i++) {
        console.log(forcastWeather[i].temp.day)
        console.log(forcastWeather[i].humidity)
        console.log(forcastWeather[i].wind_speed)
        console.log(forcastWeather[i].uvi)



     };
        
}



getCoordinates();
