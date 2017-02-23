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
    
    // function which gets JASON from OpenWeatherMap API               
    function loadWeatherByAjax() {
        $.ajax({
//            url: 'http://api.openweathermap.org/data/2.5/weather?lat=40.7856656&lon=-73.966853&APPID=503930aad7641d49d14d96dd199c7c2d'
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&APPID=503930aad7641d49d14d96dd199c7c2d'
        }).done(function(response){
            insertWeather(response);
            console.log('This metod is working too!!!');
        }).fail(function(error){
            console.log(error);
            console.log('This method is --> fail');
        });
    }
              
              // callback
              loadWeatherByAjax();
}