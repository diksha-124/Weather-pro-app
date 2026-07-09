// =========================================
// WeatherPro - script.js
// =========================================

// -------- OpenWeather API --------
const API_KEY = "8f7192e3546426331968d00eeb12d9e6";

// -------- Elements --------
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const countryName = document.getElementById("countryName");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const wind = document.getElementById("wind");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const previewTemp = document.getElementById("previewTemp");
const previewCondition = document.getElementById("previewCondition");
const previewLocation = document.getElementById("previewLocation");


const weatherIcon = document.getElementById("weatherIcon");
const previewIcon = document.getElementById("previewIcon");

const currentDateTime = document.getElementById("currentDateTime");

const themeBtn = document.querySelector(".theme-btn");

const dashboard = document.querySelector(".dashboard");

// =========================================
// Search Events
// =========================================

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);

    }

});

cityInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

// =========================================
// Weather Function
// =========================================

async function getWeather(city) {

    try {

        dashboard.style.opacity = ".5";

        const apiKey = "8f7192e3546426331968d00eeb12d9e6";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {

            throw new Error("City not found");

        }

        const data = await response.json();

        updateUI(data);

    }

    catch (error) {

        alert(error.message);

    }

    finally {

        dashboard.style.opacity = "1";

    }

}

// =========================================
// Update UI
// =========================================


function updateUI(data) {

    //cityName.innerHTML = data.name;

    //country.innerHTML = data.sys.country;

    //countryName.innerHTML = data.sys.country;

    //temperature.innerHTML = Math.round(data.main.temp) + "°C";

    //condition.innerHTML = data.weather[0].main;

    //feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";

    //humidity.innerHTML = data.main.humidity + "%";

    //pressure.innerHTML = data.main.pressure + " hPa";

    //visibility.innerHTML = (data.visibility / 1000) + " km";

    //wind.innerHTML = data.wind.speed + " km/h";

    //sunrise.innerHTML = convertTime(data.sys.sunrise);

    //sunset.innerHTML = convertTime(data.sys.sunset);

    //const icon = data.weather[0].icon;

    //weatherIcon.src =
    //    `https://openweathermap.org/img/wn/${icon}@4x.png`;

    //previewIcon.src =
    //    `https://openweathermap.org/img/wn/${icon}@4x.png`;






    cityName.innerHTML = data.name;
    country.innerHTML = data.sys.country;
    countryName.innerHTML = data.sys.country;

    temperature.innerHTML = Math.round(data.main.temp) + "°C";

    condition.innerHTML = data.weather[0].description;

    feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";

    humidity.innerHTML = data.main.humidity + "%";

    pressure.innerHTML = data.main.pressure + " hPa";

    visibility.innerHTML = (data.visibility / 1000).toFixed(1) + " km";

    wind.innerHTML = data.wind.speed + " m/s";

    sunrise.innerHTML = convertTime(data.sys.sunrise);

    sunset.innerHTML = convertTime(data.sys.sunset);

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    previewIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    setTheme(data.weather[0].main);








    previewTemp.innerHTML = Math.round(data.main.temp) + "°C";
    previewCondition.innerHTML = data.weather[0].description;
    previewLocation.innerHTML = data.name + ", " + data.sys.country;


}

// =========================================
// Time Converter
// =========================================

function convertTime(unix) {

    const date = new Date(unix * 1000);

    return date.toLocaleTimeString([], {

        hour: '2-digit',

        minute: '2-digit'

    });

}



// =========================================
// Dynamic Theme
// =========================================

function setTheme(weather) {

    weather = weather.toLowerCase();

    if (weather.includes("clear")) {

        //document.body.style.background =
        //    "linear-gradient(135deg,#ffb347,#ffcc33)";

        document.body.style.background =
            "linear-gradient(135deg, #1f2937, #374151, #4b5563)";

    }

    else if (weather.includes("cloud")) {

        document.body.style.background =
            "linear-gradient(135deg,#4b6cb7,#182848)";

    }

    else if (weather.includes("rain")) {

        document.body.style.background =
            "linear-gradient(135deg,#314755,#26a0da)";

    }

    else if (weather.includes("snow")) {

        document.body.style.background =
            "linear-gradient(135deg,#d7d2cc,#304352)";

    }

    else if (weather.includes("thunder")) {

        document.body.style.background =
            "linear-gradient(135deg,#141e30,#243b55)";

    }

    else {

        document.body.style.background =
            "#081420";

    }

}

// =========================================
// Live Date & Time
// =========================================

function updateDateTime() {

    const now = new Date();

    currentDateTime.innerHTML =

        now.toLocaleDateString([], {

            weekday: "long",

            month: "long",

            day: "numeric"

        })

        +

        " • "

        +

        now.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });

}

updateDateTime();

setInterval(updateDateTime, 1000);

// =========================================
// Theme Toggle
// =========================================

let darkMode = true;

themeBtn.addEventListener("click", function () {

    darkMode = !darkMode;

    if (!darkMode) {

        document.body.style.filter = "invert(.96) hue-rotate(180deg)";

    }

    else {

        document.body.style.filter = "none";

    }

});

// =========================================
// Default Weather
// =========================================

getWeather("London");