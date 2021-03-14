// existing DOM elements to manipulate
let currentContainer = $(".currentDay")
let currentSpan = $(".currentSpan")
let fiveContainer = $(".fiveDay")
let fiveSpan = $("fiveSpan")
let histContainer = $(".history")
let srcBtn = $(".btn")

// display date with moment.js
let today = moment().format("dddd, MMMM Do YYYY");
$(".date").text("Today is " + today);

// empty array to store items
let storedCities = []
// list search history
for (let i = 0; i < localStorage.length; i++)
    const oldCities = localStorage.getItem(i)
    if (storedCities !== null || storedCities !== 0) {
        //create li element add class "list-group-element"
        const cityList = $("<li/>").addClass("list-group-element").text(oldCities)
        historyBox.append("cityList")
    };

// save search location
// click event for search button
srcBtn.click(function (e) {
    e.preventDefault
    let newCity = $(".userInput").val();
    localStorage.setItem("storedCities", newCity)

    let userCity = $(".userInput").val.trim();
    if (userCity) {
        getCurrentWeather(userCity);

        currentSpan.textContent(userCity)
        fiveSpan.textContent(userCity)
    };
})

//function for fetching current day weather
//let getCurrentWeather = function (pull item) {
    //let currentApiUrl = "url" + pullitem + "query";
//}
    //fetch(currentApiUrl)
        //.then(function (response) {
            //if(response.ok) {
                //console.log(response);
                //response.json()
            //}
        //})