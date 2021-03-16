# weather_dashboard_5_day

## A weather app 

This project provides the user with a simple weather dashboard that will display the current weather of a certain city as well as a 5 day projection.

## Project Status

There are several areas in need of debugging:

* localStorage items will only temporarily clear -> need to look into `remove()`
* list of recently searched cities do not populate on page load -> look into `window.onload`
* list of recently searched cities need `addEventListener()`
* both weather disaply sections will add on from a second search -> also look into `remove()`

### Project-build aspects

The following was used to build the code for this day planner:

1. HTML and CSS
2. Bootstrap used to build main section for DOM manipulation as commented in `index.html`
3. Moment.js used to display user local time
4. API call using the [OpenWeather API](https://openweathermap.org/api)
5. JQuery used for DOM manipulation in `script.js`

### Functionality

The following lists all functions within the project:

*Please also refer to the **Project Status** section*

* user input area for entering and searching a "city name"
* list of recently searched cities
* this list can be cleared by using the **"Clear History"** button
* current weather displayed showing:
    * city name
    * date and local time
    * weather icon
    * temp, humidity, wind speed
    * UV index with color coded scale
* 5 day projection forecast showing:
    * date
    * weather icon
    * temp and humidity

### Process

* HTML and CSS markup written first
* pseudocode using comments in `script.js` to process logic of functionalities and DOM manipulation
* console.log used for API calls and debugging code


## Installation

1. Clone this repository onto local workspace
2. Open Terminal (MacOS) or Git Bash (Windows) and change location to where you want the cloned directory
3. Type `git clone` and paste copied respository
4. Directory should include the following:
    * assets folder
        * images folder
        * javascript folder: `script.js`
        * css folder: `style.css`
    * `index.html`
    * `README.md`

## Screenshot

**Weather Dashboard Application**

![Screenshot of Application:](/assets/Images/weather_app.png)


## Deployment

Please use the following link to deploy live URL of this project:

[Weather App](https://p-hsu.github.io/weather_dashboard_5_day/)

## Credit

* Original code written by Pamela Hsu
* Full-stack Bootcamp Program @ [Washington University, Saint Louis](https://bootcamp.tlcenter.wustl.edu/) through [© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand](https://www.trilogyed.com/)
* Animated GIF created using screencastify
