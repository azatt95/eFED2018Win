var appidTZ = "5X3GP4AOPI2O";
var urlTZ = "http://api.timezonedb.com/v2.1/get-time-zone?key=" + appidTZ + "&format=json&by=position";
var xhrTZ = new XMLHttpRequest;
var objTZ = {};

var appid = "26f7524f7ce5dbc3db7bd0a33f0dfd12";
var defaultQuery = "izhevsk";

var urlW = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=" + appid + "&q=";
var xhrW = new XMLHttpRequest;
var objW = {};

var urlFC = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=" + appid + "&q=";
var xhrFC = new XMLHttpRequest;
var objFC = {};

// helper date conversion function
// converts timelapse to local date and time
// first argument is a timelapse in seconds
// second argument is timezone offset in seconds
// returns date object, use UTC-related methods
// to display date and time correctly
function localDateAndTime(timelapse, offset) {
    return new Date((timelapse + offset)*1000);
}

function getWeatherDetails(query) {
    // W (weather) -> TZ (timezone) -> FC (forecast)
    // TODO: Replace callback hell with promises
    // Weather request
    xhrW.open("GET", urlW + query);
    xhrW.send();
}

xhrW.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
        objW = JSON.parse(this.responseText);
        // Data rendering
        document.getElementById("location").innerHTML = objW.name + ", " + objW.sys.country;
        document.getElementById("temperature").innerHTML = Math.round(objW.main.temp) + " °C";
        document.getElementById("humidity-value").innerHTML = objW.main.humidity;
        document.getElementById("windspeed-value").innerHTML = objW.wind.speed;
        document.getElementById("weather").innerHTML = objW.weather[0].description;
        document.getElementById("weather-image").src = "http://openweathermap.org/img/w/" + objW.weather[0].icon + ".png";
        // TODO: Replace weather icon accordingly
        // Timezone request
        xhrTZ.open("GET", urlTZ + "&lat=" + objW.coord.lat + "&lng=" + objW.coord.lon);
        xhrTZ.send();
    }
}

xhrTZ.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
        objTZ = JSON.parse(this.responseText);
        // Data manipulation
        var localDT = localDateAndTime(objW.dt, objTZ.gmtOffset);
        // Data rendering
        // Only use UTC-related methods to display dates!
        document.getElementById("weekday").innerHTML = localDT.toLocaleDateString("ru-RU", { weekday: "long", timeZone: "UTC"})
        // Forecast request
        xhrFC.open("GET", urlFC + objW.name + "," + objW.sys.country);
        xhrFC.send();
    }
}

xhrFC.onload = function() {
    if (this.readyState === 4 && this.status === 200) {
        objFC = JSON.parse(this.responseText);
        // Data manipulation
        var dt, hr;
        var i = 0;
        var j = 0;
        var arr = [];
        for (i = 0; i < objFC.cnt; i++) {
            dt = localDateAndTime(objFC.list[i].dt, objTZ.gmtOffset);
            hr = dt.getUTCHours();
            if (typeof arr[j] === "undefined") arr[j] = {};
            if (hr >= 2 && hr < 5) { 
                arr[j].n = objFC.list[i].main.temp;
                arr[j].nightIcon = objFC.list[i].weather[0].icon;
                arr[j].wd = dt.toLocaleDateString("ru-RU", { weekday: "short", timeZone: "UTC"});
            }
            else if (hr >= 14 && hr < 17) {
                arr[j].d = objFC.list[i].main.temp;
                arr[j].dayIcon = objFC.list[i].weather[0].icon;
                arr[j].wd = dt.toLocaleDateString("ru-RU", { weekday: "short", timeZone: "UTC"});
                j++;
            }
        }
        if (JSON.stringify(arr[j]) === "{}") arr.pop();
        console.log(arr);
        // Data rendering
        var els = document.getElementsByClassName("date-block");
        var arrLen = arr.length;
        if (arrLen === 6) els[5].removeAttribute("hidden");
        else els[5].setAttribute("hidden", "");
        for (i = 0; i < arrLen; i++) {
            els[i].getElementsByClassName("day-name")[0].innerHTML = arr[i].wd;
            els[i].getElementsByClassName("night-temp")[0].innerHTML = (typeof arr[i].n !== "undefined") ? Math.round(arr[i].n) + " °C" : "-";
            els[i].getElementsByClassName("day-temp")[0].innerHTML = (typeof arr[i].d !== "undefined") ? Math.round(arr[i].d) + " °C" : "-";
            els[i].getElementsByClassName("weather-status")[0].src = "http://openweathermap.org/img/w/" + (arr[i].dayIcon || arr[i].nightIcon) + ".png";
        }
    }
}

document.getElementById("todaySearch").setAttribute("onchange", "getWeatherDetails(this.value)");
getWeatherDetails(defaultQuery);
