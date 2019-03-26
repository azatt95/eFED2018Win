var dataObject = {
    defaultQuery: 'izhevsk',
    localDateAndTime: function(timelapse, offset) {
        return new Date((timelapse + offset)*1000);
    },
    urlCW: 'https://api.openweathermap.org/data/2.5/weather?units=metric'
            + '&lang=ru&APPID=' + '26f7524f7ce5dbc3db7bd0a33f0dfd12' + '&q=',
    urlFC: 'https://api.openweathermap.org/data/2.5/forecast?units=metric'
            + '&lang=ru&APPID=' + '26f7524f7ce5dbc3db7bd0a33f0dfd12' + '&q=',
    urlTZ: 'https://api.timezonedb.com/v2.1/get-time-zone?key='
            + '5X3GP4AOPI2O' + '&format=json&by=position',
    currentWeatherObject: {},
    timezoneObject: {},
    forecastObject: {},
    renderCurrentWeather: function() {
        document.getElementById('location').innerHTML = this.currentWeatherObject.name + ', ' + this.currentWeatherObject.sys.country;
        document.getElementById('temperature').innerHTML = Math.round(this.currentWeatherObject.main.temp) + ' °C';
        document.getElementById('humidity-value').innerHTML = this.currentWeatherObject.main.humidity;
        document.getElementById('windspeed-value').innerHTML = this.currentWeatherObject.wind.speed;
        document.getElementById('weather').innerHTML = this.currentWeatherObject.weather[0].description;
        document.getElementById('weather-image').src = 'http://openweathermap.org/img/w/' + this.currentWeatherObject.weather[0].icon + '.png';
    },
    renderTimezone: function() {
        var localDT = this.localDateAndTime(this.currentWeatherObject.dt, this.timezoneObject.gmtOffset);
        document.getElementById('weekday').innerHTML = localDT.toLocaleDateString('ru-RU', { weekday: 'long', timeZone: 'UTC'})
    },
    renderForecast: function() {
        var dt, hr;
        var i = 0;
        var j = 0;
        var arr = [];
        for (i = 0; i < this.forecastObject.cnt; i++) {
            dt = this.localDateAndTime(this.forecastObject.list[i].dt, this.timezoneObject.gmtOffset);
            hr = dt.getUTCHours();
            if (typeof arr[j] === 'undefined') arr[j] = {};
            if (hr >= 2 && hr < 5) { 
                arr[j].n = this.forecastObject.list[i].main.temp;
                arr[j].nightIcon = this.forecastObject.list[i].weather[0].icon;
                arr[j].wd = dt.toLocaleDateString('ru-RU', { weekday: 'short', timeZone: 'UTC'});
            }
            else if (hr >= 14 && hr < 17) {
                arr[j].d = this.forecastObject.list[i].main.temp;
                arr[j].dayIcon = this.forecastObject.list[i].weather[0].icon;
                arr[j].wd = dt.toLocaleDateString('ru-RU', { weekday: 'short', timeZone: 'UTC'});
                j++;
            }
        }
        if (typeof arr[j] !== 'undefined' && 
            Object.keys(arr[j]).length === 0) arr.pop();
        var els = document.getElementsByClassName('date-block');
        var arrLen = arr.length;
        if (arrLen === 6) els[5].removeAttribute('hidden');
        else els[5].setAttribute('hidden', '');
        for (i = 0; i < arrLen; i++) {
            els[i].getElementsByClassName('day-name')[0].innerHTML = arr[i].wd;
            els[i].getElementsByClassName('night-temp')[0].innerHTML = (typeof arr[i].n !== 'undefined') ? Math.round(arr[i].n) + ' °C' : '-';
            els[i].getElementsByClassName('day-temp')[0].innerHTML = (typeof arr[i].d !== 'undefined') ? Math.round(arr[i].d) + ' °C' : '-';
            els[i].getElementsByClassName('weather-status')[0].src = 'http://openweathermap.org/img/w/' + (arr[i].dayIcon || arr[i].nightIcon) + '.png';
        }
    },
    renderEverything: function() {
        this.renderCurrentWeather();
        this.renderTimezone();
        this.renderForecast();
    },
    fetchRequest: function(query) {
        that = this;
        fetch(that.urlCW + query).then(function(response) {
            if (response.status !== 200) {
                throw new Error('Fetch: ' + response.status + ' ' + 
                response.statusText);
            }
            return response.json();
            }).then(function(data) {
                that.currentWeatherObject = data;
                return fetch(that.urlTZ + '&lat=' + 
                             that.currentWeatherObject.coord.lat + '&lng=' + 
                             that.currentWeatherObject.coord.lon);
            }).then(function(response) {
                if (response.status !== 200) {
                    throw new Error('Fetch: ' + response.status + ' ' + 
                    response.statusText);
                }
                return response.json();
            }).then(function(data) {
                that.timezoneObject = data;
                return fetch(that.urlFC + that.currentWeatherObject.name + 
                             ',' + that.currentWeatherObject.sys.country);
            }).then(function(response) {
                if (response.status !== 200) {
                    throw new Error('Fetch: ' + response.status + ' ' + 
                    response.statusText);
                }
                return response.json();
            }).then(function(data) {
                that.forecastObject = data;
                that.renderEverything();
            });
    }
}

document.getElementById('todaySearch').addEventListener('change', function(event) {
    dataObject.fetchRequest(event.target.value);
});

dataObject.fetchRequest(dataObject.defaultQuery);
