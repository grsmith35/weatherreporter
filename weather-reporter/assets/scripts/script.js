var selectedLocation ="";

var getWeather = function(location) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=22344e77771f38619b49b3b24f69e00a")
     .then(function(response) {
         return response.json();
     })
     .then(function(response) {
         var latEl = response.coord.lat;
         var lonEl = response.coord.lon;
         fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely&units=imperial&appid=22344e77771f38619b49b3b24f69e00a")
         .then(function(weatherResponse) {
             return weatherResponse.json();
         })
         .then(function(weatherResponse) {
             //console.log(weatherResponse);
             displayWeather(weatherResponse);
         })
     })   
}

var displayWeather = function(weather) {
    var today = moment().format("L");
    var todaylocation = document.querySelector("#locationHolder");
    var temperature = document.querySelector("#tempHolder");
    var wind = document.querySelector("#windHolder");
    var humidity = document.querySelector("#humidityHolder");
    var uvindex = document.querySelector("#uvindexHolder");
    todaylocation.textContent = selectedLocation + " - " + today;
    var today = weather.current;
    var fivedays = weather.daily;
    console.log(today);
    console.log(fivedays);
    temperature.textContent = "Temperature: " + today.temp + "\u00b0 F";
    wind.textContent = "Wind: " + today.wind_speed + " MPH";
    humidity.textContent = "Humidity: " + today.humidity + "%";
    var uvindicator = today.uvi;
    if(uvindicator < 4) {
        uvindex.classList = "alert alert-success"
    }
    else if(uvindicator > 4 && uvindicator < 8) {
        uvindex.classList = "alert alert-warning"
    }
    else {
        uvindex.classList = "alert alert-danger" 
    }
    uvindex.textContent = "UV Index: " + today.uvi;
    var daystoShow = document.querySelector("#days");
    daystoShow.innerHTML = "";
    for(var i = 0; i < 5; i++) {
        var date = moment(moment(), "LL").add(1, 'days').format("L");
        var newDiv = document.createElement("div");
        newDiv.classList = "col-md-2 card bg-dark m-1 text-white";
        var theDate = document.createElement("h5");
        theDate.classList = "row card-title";
        theDate.textContent = date;
        newDiv.appendChild(theDate);
        var tempLine = document.createElement("div");
        tempLine.classList = "row";
        tempLine.textContent = "Temp: " + fivedays[i].temp.day + "\u00b0 F";
        newDiv.appendChild(tempLine);
        var windLine = document.createElement("div");
        windLine.classList = "row";
        windLine.textContent = "Wind: " + fivedays[i].wind_speed + " MPH";
        newDiv.appendChild(windLine);
        var humidLine = document.createElement("div");
        humidLine.classList = "row";
        humidLine.textContent = "Humidity: " + fivedays[i].humidity + " %";
        newDiv.appendChild(humidLine);
        daystoShow.appendChild(newDiv);

    }

}

var testfun = function() {
    var buttonId = event.target.getAttribute("id")
    if(buttonId === "search") {
        buttonId = document.querySelector("#inputBox").value;
        selectedLocation = buttonId;
    }
    else {
        selectedLocation = buttonId;
    }
    selectedLocation = selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1);
    getWeather(selectedLocation);
}


document.getElementById("buttons").addEventListener("click", testfun)