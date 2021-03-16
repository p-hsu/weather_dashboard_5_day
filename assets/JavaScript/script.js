// existing DOM elements to manipulate
var currentContainer = $(".currentDay")
var fiveContainer = $(".fiveDay")
var histList = $(".history")
var srcBtn = $(".btnSrc")
var clrBtn = $(".btnClr")
// .getItem variable for stored data
var srcHistory = JSON.parse(localStorage.getItem("citiesSearched")) || [];

var apiKey = "ba2ad27df96d6b9fb43343bf0585c826";

// display time with moment.js
var renderTime = function() {
    var time = moment().format("HH:mm:ss");
    $(".time").text("Your local time is " + time);
}
renderTime();
setInterval(renderTime, 1000);


// event listener for search btn
srcBtn.click(function(e) {
    e.preventDefault;
    var newCity = $(".userInput").val();
    if (newCity) {
        srcHistory.push(newCity);
        // .setItem into data storage
        localStorage.setItem("citiesSearched", JSON.stringify(srcHistory));
        renderSrcHistory();
        getWeather(newCity);
    }else {
        alert("No city to search!");
        console.log("Empty input");
    };
})

// currrent weather API fetch
var getWeather = function (newCity) {
    // current day weather
    var apiURL ="https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + apiKey + "&units=imperial";

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                // create Date from UNIX data.dt
                var apiDate = new Date(data.dt*1000);
                console.log(apiDate);
                var today = apiDate.toLocaleDateString("en-US");
                console.log(today);
                // header element for name, date, icon
                var cityName = $("<h3/>")
                    .text(data.name + ": " + today);
                currentContainer.append(cityName);
                // img element for weather icon
                var weatherIcon = $("<img/>")
                    .attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
                    cityName.append(weatherIcon);
                // p element for city time
                var apiTime = apiDate.toLocaleTimeString("en-US", { hour12:false }).split(":");
                console.log(apiTime);
                currentContainer.append("<p>" + "Local " + data.name + " Time: " + apiTime[0] + ":" + apiTime[1] + "</p>");
                // p elements for temp, humidity, windspeed
                var currentTemp = $("<p/>")
                    .text("Temperature: " + data.main.temp + " °F ------ Feels like: " + data.main.feels_like + " °F");
                    currentContainer.append(currentTemp);
                var currentHum = $("<p/>")
                    .text("Humidity: " + data.main.humidity + "%");
                    currentContainer.append(currentHum);
                var currentWind = $("<p/>")
                    .text("Windspeed: " + data.wind.speed + " mpH");
                    currentContainer.append(currentWind);

                // UVI index API fetch
                var apiUVI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly,daily,alerts&appid=" + apiKey;

                fetch(apiUVI)
                .then (function (response){
                    if(response.ok){
                        response.json().then(function (data){
                            console.log(data)
                            var uvIndex = data.current.uvi;

                            var uviContainer = $("<p/>")
                            .text("UV Index: ");
                            currentContainer.append(uviContainer);

                            var currentUVI = $("<span/>")
                            .text(uvIndex);
                            uviContainer.append(currentUVI);

                            // set UV index class for color coded scale
                            if(uvIndex <= 2) {
                                currentUVI.addClass("low");
                            } else if(uvIndex <= 7) {
                                currentUVI.addClass("mod");
                            } else {
                                currentUVI.addClass("high")
                            };
                        });

                    }else {
                        alert("Error: " + response.statusText);
                    };
                });
            });

        }else {
            alert("Error: " + response.statusText);
        };
    });

    // 5 day projection weather
    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity +  "&appid=" + apiKey;

    fetch(forecastAPI)
    .then(function (response){
        if(response.ok){
            response.json().then(function (data){
                console.log(data)

                // first day col
                var firstCol = $("<div/>")
                .addClass("col-sm");
                // date
                var eaDate1 = new Date(data.list[4].dt*1000);
                var firstDate = eaDate1.toLocaleDateString("en-US");
                var firstHeader = $("<h5/>")
                    .text(firstDate)
                firstCol.append(firstHeader)
                // icon
                var firstIcon = $("<img/>")
                .attr("src", "http://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png");
                firstHeader.append(firstIcon)
                // temp and humidity
                firstCol.append("<p>" + "Temp: " + data.list[4].main.temp + "°F" + "</p>");
                firstCol.append("<p>" + "Humidity: " + data.list[4].main.humidity + "%" + "</p>");

                fiveContainer.append(firstCol);


                // second day col
                var secondCol = $("<div/>")
                .addClass("col-sm");
                // date
                var eaDate2 = new Date(data.list[12].dt*1000);
                var secondDate = eaDate2.toLocaleDateString("en-US");
                var secondHeader = $("<h5/>")
                    .text(secondDate)
                secondCol.append(secondHeader)
                // icon
                var secondIcon = $("<img/>")
                .attr("src", "http://openweathermap.org/img/wn/" + data.list[12].weather[0].icon + ".png");
                secondHeader.append(secondIcon)
                // temp and humidity
                secondCol.append("<p>" + "Temp: " + data.list[12].main.temp + "°F" + "</p>");
                secondCol.append("<p>" + "Humidity: " + data.list[12].main.humidity + "%" + "</p>");

                fiveContainer.append(secondCol);


                // third day col
                var thirdCol = $("<div/>")
                .addClass("col-sm");
                var eaDate3 = new Date(data.list[20].dt*1000);
                var thirdDate = eaDate3.toLocaleDateString("en-US");
                var thirdHeader = $("<h5/>")
                    .text(thirdDate)
                thirdCol.append(thirdHeader)
                // icon
                var thirdIcon = $("<img/>")
                .attr("src", "http://openweathermap.org/img/wn/" + data.list[20].weather[0].icon + ".png");
                thirdHeader.append(thirdIcon)
                // temp and humidity
                thirdCol.append("<p>" + "Temp: " + data.list[20].main.temp + "°F" + "</p>");
                thirdCol.append("<p>" + "Humidity: " + data.list[20].main.humidity + "%" + "</p>");

                fiveContainer.append(thirdCol);


                // fourth day col
                var fourthCol = $("<div/>")
                .addClass("col-sm");
                var eaDate4 = new Date(data.list[28].dt*1000);
                var fourthDate = eaDate4.toLocaleDateString("en-US");
                var fourthHeader = $("<h5/>")
                    .text(fourthDate)
                fourthCol.append(fourthHeader)
                // icon
                var fourthIcon = $("<img/>")
                .attr("src", "http://openweathermap.org/img/wn/" + data.list[28].weather[0].icon + ".png");
                fourthHeader.append(fourthIcon)
                // temp and humidity
                fourthCol.append("<p>" + "Temp: " + data.list[28].main.temp + "°F" + "</p>");
                fourthCol.append("<p>" + "Humidity: " + data.list[28].main.humidity + "%" + "</p>");

                fiveContainer.append(fourthCol);


                // fifth day col
                var fifthCol = $("<div/>")
                .addClass("col-sm");
                var eaDate5 = new Date(data.list[36].dt*1000);
                var fifthDate = eaDate5.toLocaleDateString("en-US");
                var fifthHeader = $("<h5/>")
                    .text(fifthDate)
                fifthCol.append(fifthHeader)
                // icon
                var fifthIcon = $("<img/>")
                .attr("src", "http://openweathermap.org/img/wn/" + data.list[36].weather[0].icon + ".png");
                fifthHeader.append(fifthIcon)
                // temp and humidity
                fifthCol.append("<p>" + "Temp: " + data.list[36].main.temp + "°F" + "</p>");
                fifthCol.append("<p>" + "Humidity: " + data.list[36].main.humidity + "%" + "</p>");

                fiveContainer.append(fifthCol);


            });
        }else {
            alert("Error: " + response.statusText);
        }
    })


};




function renderSrcHistory() {
    histList.html("");
    if (srcHistory !== "" || srcHistory !== null) {
        for (var i = 0; i < srcHistory.length; i++) {
            // create and append list el with class
            var histItem = $("<li/>")
                .addClass("list-group-item")
                .text(srcHistory[i]);
            histList.append(histItem);
        }
    }else {
        return;
    };
}

clrBtn.click(function(e) {
    e.preventDefault;
    histList.html("");
    localStorage.clear();
    console.log("localStorage cleared");
})