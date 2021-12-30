var searchBtn = document.getElementById("search-button");
var userInput = document.getElementById("city-input");
var currentWeatherDiv = document.getElementById("current-weather");
var apiKey = e24a48d117f9490365fee8813aa9239b;

// city data
function getCity(searchedCity) {

var cityUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ searchedCity + "&units=imperial&appid=" + apiKey;
fetch(cityUrl)
.then(function (response) {

  return response.json();
  var currentWeather =`
<div id="current" class="card">
<p> Temperature: ${data.main.temp}</p>

</div>
`;

currentWeatherDiv.innerHTML = currentWeather
})
.then(function (data) {
console.log(data.main.temp)

})
}



// lat = data.coord.lat;
// lon = data.coord.lon;



// City weather data








function clickHandler(event) {
    event.preventDefault()
var searchedCity = userInput.value ;
console.log(searchedCity)

getCity(searchedCity);
}

searchBtn.addEventListener("click", clickHandler);




































