function getWeatherConditions(pos) {
    var table = $('.hourlyTable');
    var tableFor5Days = $('.fiveDaysTable');
    
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
// -------------------------------------------------------------
    
    // AJAX function which gets weather conditions for next 5 times every 3 hours from finding city and place it in view
    function insertHourlyWeather(weather) {
        var hour = $('.hour'),
            hourIcon = $('.hourIcon'),
            hourTemp = $('.hourTemp');
        var table = $('.hourlyTable');
        
//        console.log('HERE!!! -->' + weather.list[0].main.temp);
//        console.log('HERE!!! -->' + weather.list[0].dt_txt);
//        console.log('HERE!!! -->' + weather.list[0].weather[0].icon);
//        
//        hour.text(weather.list[0].dt_txt);
//        
//        var tempHourAPI = weather.list[0].main.temp;
//        hourTemp.text(Math.round(tempHourAPI - 273.15));
//        
//        var icon = weather.list[0].weather[0].icon;
//        hourIcon.css("background-image", "url("+"http://openweathermap.org/img/w/"+ icon +".png" +")");
        
        
        //ZASTANOWIĆ SIĘ CZY WPISAC OD ZERA NA SZTYWNO (KOD NA GÓRZE) I DOPISYWAC KOLEJNE LINIKI, CZY OD RAZU ITEROWAĆ OD ZERA DO ZADANEJ WIELOŚCI 
        for (var i=0; i<=4; i++) {
            var newRow = $('<tr>');
            
            // used slice() method to cut information from JASON from format"2017-03-02 03:00:00" to "03:00:00"
            var tdHour = $('<td><span class="hour">'+ (weather.list[i].dt_txt).slice(11,16) +'</span></td>');
        
            var tempHourAPI = weather.list[i].main.temp;
            var tdTemp = $('<td><span class="hourTemp">'+ Math.round(tempHourAPI - 273.15) +'</span>&deg;C</td>');

            var icon = weather.list[i].weather[0].icon;
            var address = "http://openweathermap.org/img/w/"+ icon +".png";
            var tdIcon = $('<td><span class="hourIcon" style="background-image: url('+ address +'")></span></td>');
            
            newRow.append(tdHour);
            newRow.append(tdIcon);
            newRow.append(tdTemp);
            
            table.append(newRow);
        }
    }
// -----------------------------------------------------------------
    
    // AJAX function which gets weather conditions for next 5 days from finding city and place it in view
    function insert5DaysWeather(weather) {
        for (var i=0; i<weather.list.length; i++) {
            if ((weather.list[i].dt_txt.indexOf("12:00:00")) != -1) {
                console.log(weather.list[i].dt_txt.indexOf("12:00:00"));
                
                var newRow = $('<tr>');
                
                var tdHour = $('<td><span class="hour">'+ (weather.list[i].dt_txt).slice(11,16) +'</span></td>');
                
                var tempHourAPI = weather.list[i].main.temp;
                var tdTemp = $('<td><span class="hourTemp">'+ Math.round(tempHourAPI - 273.15) +'</span>&deg;C</td>');

                var icon = weather.list[i].weather[0].icon;
                var address = "http://openweathermap.org/img/w/"+ icon +".png";
                var tdIcon = $('<td><span class="hourIcon" style="background-image: url('+ address +'")></span></td>');

                newRow.append(tdHour);
                newRow.append(tdIcon);
                newRow.append(tdTemp);

                tableFor5Days.append(newRow);
                
            }
        }
        
        // method which returns the day of the week (0-6, Sunday(0)-Saturday(6)) for the specified date according to local time.  
        var currentDate = new Date();
        var day = currentDate.getDay();
        console.log(day);
        
        // array for all days in week
        var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var j=0;
        
        // loop which gets names of the next 5 days 
        for (var i=0; i<5; i++) {
            if(day == weekDays.length-1) {
                day = -1;
            }
            day++;
            console.log(day);
            var nextDay = weekDays[day];
            console.log(nextDay);
        }
    }
// -----------------------------------------------------------------
    
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
            table.empty(); // table.empty() --> removes all rows from forecast table everytime when we change location 
            //tableFor5Days.empty();
            insertHourlyWeather(response); // loaded all informations about forecast everytime when we change location
            //insert5DaysWeather(response);
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