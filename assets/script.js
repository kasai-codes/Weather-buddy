var searchBtn = document.getElementById("search-button")
var userInput = document.getElementById("city-input")
var currentWeatherDiv = document.getElementById("current-weather")
var apiKey = c3ad8822ccefd5e84846e388debccc00

// city data
function getCity(searchedCity) {

var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ searchedCity + "&units=imperial&appid=" + apiKey
fetch(cityUrl)
.then(function (response) {

  return response.json();
  
})
.then(function (data) {
console.log(data.main.temp)

lat = data.coord.lat;
lon = data.coord.lon;

})
}

// City weather data








function clickHandler(event) {
    event.preventDefault()
var searchedCity = userInput.value ;
console.log(searchedCity)

getCity(searchedCity);
}

searchBtn.addEventListener("click", clickHandler);






















var currentWeather =`
<div id="current" class="card">
<p> Temperature: ${data.main.temp}</p>

</div>
`;

currentWeatherDiv.innerHTML = currentWeather













