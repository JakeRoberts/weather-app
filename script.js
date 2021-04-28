var keyApi ="75d2b2e181f4b10c03546c09f3dde0ce";
var searchBtn = document.querySelector("#search-button");



function searchValue () {
    var searchValue = document.querySelector("#search-value").value;
    console.log(searchValue);
    getWeather(searchValue);
}

function getWeather (searchValue) {
    var queryLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue +  "&appid=75d2b2e181f4b10c03546c09f3dde0ce";

    fetch(queryLink)
    .then(function (response) {
        return response.json()
    }).then(function(data) {
        console.log(data);
        let name = data.name;
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        getWeatherData (name, lat, lon);
    });
}
//imperial converts celcius to fahrenheit
function getWeatherData (name, lat, lon) {
    var queryLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +  "&lon=" + lon + "&appid=75d2b2e181f4b10c03546c09f3dde0ce&units=imperial";

    fetch(queryLink)
    .then(function (response) {
        return response.json()
    }).then(function(data) {
        console.log(data);
        displayCurrentWeather (name, data);
        displayforecast (data.daily); 
    });
}

function displayCurrentWeather (name, data) {
    // takes date time from data and converts to javascript object. then converts to a string
   var date = (new Date(data.current.dt*1000)).toLocaleDateString();
   var temp = data.current.temp;
   var humidity = data.current.humidity;
   var windspeed = data.current.wind_speed;
   var uvi = data.current.uvi;
   var icon = data.current.weather[0].icon;
   var uviIntensity;
    if (uvi < 3) {
        uviIntensity = "low";
    }
    else if (uvi < 6) {
        uviIntensity = "moderate";
    }
    else if (uvi < 8) {
        uviIntensity = "high";
    }
    else if (uvi < 11) {
        uviIntensity = "veryHigh";
    }
    else uviIntensity = "extreme";
   // ``= template literal. creates string which you can insert variables
   var html = `
    <h2>${name}, ${date}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@4x.png">
    <p>temp: ${temp}&deg;F</p>
    <p>humidity: ${humidity}%</p>
    <p>windspeed: ${windspeed}mph</p>
    <p>uvindex: <span class= "${uviIntensity}">${uvi}</span></p>
   `;
   document.querySelector("#today").innerHTML = html;
}

function displayforecast (data) {
    console.log(data);
    var html = "";
    for (let index = 0; index < 5; index++) {
        const d = data[index];
        const date = (new Date(d.dt*1000)).toLocaleDateString();
        const icon = d.weather[0].icon;
        const temp = d.temp.day;
        const humidity = d.humidity;
        const windspeed = d.wind_speed;
        html += `
        <div>
        <h3>${date}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>temp: ${temp}&deg;F</p>
        <p>humidity: ${humidity}%</p>
        <p>windspeed: ${windspeed}mph</p>
        </div>
        `;
    }
    document.querySelector("#forecast").innerHTML = html;
}

searchBtn.addEventListener("click", searchValue);