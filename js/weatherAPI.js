function getWeatherConditions(pos) {
    
    // AJAX function which gets weather conditions from finding city and place it in view
    function insertWeather(weather) {
        var tempVal = $('.tempValue'),
            iconIgm = $('.mainPicture'),
            description = $('.tempDescription'),
            pressureVal = $('.pressureValue'),
            humidityVal = $('.humidityValue'),
            windVal = $('.windValue'),
            visibilityVal = $('.visibilityValue');
        
        console.log(weather.main.pressure);
        console.log(weather.main.humidity);
        console.log(weather.weather[0].description);
        console.log(weather.wind.speed);
        console.log(weather.visibility);
                
        pressureVal.text(weather.main.pressure);
        description.text(weather.weather[0].description);
        humidityVal.text(weather.main.humidity);
        windVal.text(weather.wind.speed);
        visibilityVal.text(weather.visibility);
                
        var tempAPI = weather.main.temp;
        tempVal.text(Math.round(tempAPI - 273.15)); 
                
        console.log(weather.weather[0].icon);
        var icon = weather.weather[0].icon;
        iconIgm.css("background-image", "url("+"http://openweathermap.org/img/w/"+ icon +".png" +")");
               
    }
    
    // AJAX function which gets weather conditions for next 5 times every 3 hours from finding city and place it in view
    function insertHourlyWeather(weather) {
        var hour = $('.hour'),
            hourIcon = $('.hourIcon'),
            hourTemp = $('.hourTemp');
        
        console.log('HERE!!! -->' + weather.list[0].main.temp);
        console.log('HERE!!! -->' + weather.list[0].dt_txt);
        console.log('HERE!!! -->' + weather.list[0].weather[0].icon);
        
        hour.text(weather.list[0].dt_txt);
        
        var tempHourAPI = weather.list[0].main.temp;
        hourTemp.text(Math.round(tempHourAPI - 273.15));
        
        var icon = weather.list[0].weather[0].icon;
        hourIcon.css("background-image", "url("+"http://openweathermap.org/img/w/"+ icon +".png" +")");
        
        ////////
        // NAPISAC PĘTLĘ ITERUJĄCĄ 4 RAZY, KTORA STWORZY I APPENDUJE KOLEJNE WIERSZE DO TABELI
        
    }
    
    // function which gets JASON from OpenWeatherMap API               
    function loadWeatherByAjax() {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&APPID=503930aad7641d49d14d96dd199c7c2d'
        }).done(function(response){
            insertWeather(response);
            console.log('This metod is working too!!!');
        }).fail(function(error){
            console.log(error);
            console.log('This method is --> fail');
        });
    }
    
    function loadForecastWeatherByAjax() {
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + pos.lat + '&lon=' + pos.lng + '&APPID=503930aad7641d49d14d96dd199c7c2d'
        }).done(function(response){
            insertHourlyWeather(response);
            console.log('Loaded');
        }).fail(function(error){
            console.log(error);
            console.log('Failed');
        });
    }
              
    
    // callback
    loadWeatherByAjax();
    loadForecastWeatherByAjax();
}