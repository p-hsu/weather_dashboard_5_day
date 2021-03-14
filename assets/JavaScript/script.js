// existing DOM elements to manipulate
var currentContainer = $(".currentDay")
var fiveContainer = $(".fiveDay")
var histList = $(".history")
var srcBtn = $(".btnSrc")
var clrBtn = $(".btnClr")

// display date with moment.js
var today = moment().format("dddd, MMMM Do YYYY");
$(".date").text("Today is " + today);

// .getItem variable for stored data
var srcHistory = JSON.parse(localStorage.getItem("citiesSearched")) || [];

// event listener for search btn
srcBtn.click(function(e) {
    e.preventDefault;
    var newCity = $(".userInput").val();
    if (newCity == "" || newCity == null) {
        alert("No city to search!");
        console.log("Empty input");
    }else {
        srcHistory.push(newCity);
        // .setItem into data storage
        localStorage.setItem("citiesSearched", JSON.stringify(srcHistory));
        renderSrcHistory();
    };
})

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