var searchBtn = document.getElementById("search-button");
var userInput = document.getElementById("city-input");
var currentWeatherDiv = document.getElementById("current-weather");
var weatherMain = document.getElementById("weather-main")
var weatherTitle = document.getElementById("weather-main-title")
var weatherMaininfo = document.getElementById("weather-main-info")
var forecast = document.getElementById("forecast-cards")
var storedCityName =document.getElementById("storedcity")
var apiKey = "e24a48d117f9490365fee8813aa9239b";
// empty variable to store searched city, empty array to store them as an array and empty strin
var searchedCity;
var cities = [];
var fiveDayCards = "";

// saving searched cities
function storeUserInput(searchedCity) {
    cities.push(searchedCity);

    localStorage.setItem("city-searched", JSON.stringify(cities));
}

function clickHandler(event) {
    event.preventDefault()
    searchedCity = userInput.value.trim();
    console.log(searchedCity)

    storeUserInput(searchedCity);

    if (searchedCity) {
        getCity(searchedCity);
        userInput.value = "";


    }
    getCity(searchedCity);

}

// print searched cities as button from local storage
function printUserInput(event) {

    var storedUserInput = JSON.parse(localStorage.getItem("city-searched"))
    if (searchedCity) {
        storedCityName.innerHTML = "";

        for (var i = 0; i < storedUserInput.length; i++) {
            const storedInput = document.createElement("button");
            storedInput.setAttribute("class", "cityBtn");
            storedInput.textContent = storedUserInput[i];
            storedInput.addEventListener("click", function () {

                getCity(storedInput.textContent);
            });

            storedCityName.append(storedInput);
        }
    }
}

// city cord. data
function getCity(searchedCity) {

    var cityUrlRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=" + apiKey;

    fetch(cityUrlRequest)
        .then(function (response) {

            return response.json();

        })
        .then(function (data) {
            console.log(data)
            lat = data.coord.lat;
            lon = data.coord.lon;

            getWeather(lat, lon);
        })
}
// City weather data
function getWeather(lat, lon) {
    var weatherUrlRequest =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    fetch(weatherUrlRequest)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {



            // console.log(data)
            var iconsUrl = " http://openweathermap.org/img/wn" + weatherIcons + "@2x.png"
            var weatherIcons = data.current.weather[0].icon;

            // diplays icons for main card
            var currentWeatherMain = `
        <div id="city-name">
        <h2>${searchedCity}</h2>
        <img class="icons" src"${iconsUrl}" 
        </div>`;

            weatherTitle.innerHTML = currentWeatherMain;

            var currentWeatherMain = `
        <div id="dynamic-weather">
            <p>Temperature: ${data.current.temp}°F</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_speed} MPH</p>
            <p>UV Index: <span class="uvi-now" data-cuvi="${data.current.uvi}">${data.current.uvi}</span></p>
            </div>
        `
            weatherMaininfo.innerHTML = currentWeatherMain;

            for (var i = 0; i < data.daily.length; i++) {
                if (i === 5) {
                    // break used to exit loop 
                    break;
                }
                var dailyIcon = data.daily[i].weather[0].icon;
                var dailyURL = "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png";

                var now = moment(data.daily[i].dt * 1000).format("ll");

                fiveDayCards += `
      
      <div class="forecast-card">
      <img class="daily-forecast-icon" src="${dailyURL}" alt="current weather icon"/>
      <p class="now">${now}</p>
      <p>Temp: ${data.daily[i].temp.day}°F</p>
      <p>Humidity: ${data.daily[i].humidity}%</p>
      <p>Wind: ${data.daily[i].wind_speed} MPH</p>
      <p>UVI: <span class="uvi-forecast" data-uvi="${data.daily[i].uvi}">${data.daily[i].uvi}</span></p>
      </div>
      
      `;


                forecast.innerHTML = fiveDayCards;
            }
            // stops from repeating itself
            fiveDayCards = "";

        })
}

searchBtn.addEventListener("click", clickHandler);





// fetch(cityUrl)
// .then(function (response) {

//   return response.json();
// getCity();


// })
// .then(function (data) {
// console.log("hi")

// var currentWeather =`
// <div id="current" class="card">
// <p> Temperature: ${data.main.temp}</p>

// </div>
// `;
// currentWeatherDiv.innerHTML = currentWeather;

// })
// }




































