var temp = document.getElementById('temp')
var cityname= document.getElementById('city-name')
var searchform = document.getElementById('search-form')
var cityinput= document.getElementById('city-input')
var forecastcontainer = document.getElementById('forecast-container'); 
var apiKey = "fcdb77bcab0f5e656f374a185e3665bd"

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
      .then(response => response.json())
      .then(data=> displayWeather(data))
    
}
function getCoordinates(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data=> {
        console.log(data)
        var lat = data[0].lat
        var lon = data [0].lon
        getWeather(lat,lon)
        getForecast(lat,lon)
    })

    
}
//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

function getForecast(lat, lon) {
    console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
      .then(response => response.json())
      .then(data => displayForecast(data))
       
     }
function displayWeather(data){
    console.log(data)
    cityname.textContent=data.name
    temp.textContent= data.main.temp
}


 function displayForecast(data){
    console.log(data)
    forecastcontainer.innerHTML = '';
    var dailyForecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    //console.log('Number of items in forecastData:', forecastData.length);
   // var forecastData = data.list.slice(0, 5); 


    dailyForecastData.forEach(item => {
        var forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-item');

        var forecastDate = new Date(item.dt * 1000); 

        var dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        var formattedDate = forecastDate.toLocaleDateString('en-US', dateOptions);

        var forecastTemp = document.createElement('p');
        forecastTemp.textContent = `${formattedDate}: ${item.main.temp} °F`;

        forecastDiv.appendChild(forecastTemp);
        forecastcontainer.appendChild(forecastDiv);
    });

 }

  



searchform.addEventListener("submit", (event) =>{
    event.preventDefault()
    console.log(cityinput.value)
getCoordinates(cityinput.value)
} )



//function add (a,b){
//     return a + b
// }
// var num = 234
// add(1,num)