    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 52.227, lng: 21.011},
          zoom: 10
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
              console.log(pos.lat, pos.lng);

            // AJAX function which gets name of the city and place it in view 
            function insertCityName(location) {
                var place = $('.cityName');
                
                $.each(location.results[0].address_components, function(index, data){
                    for (var i=0; i<data.types.length; i++) {
                        if (data.types[i] == 'locality') {
                            console.log(data.long_name);
                            place.text(data.long_name);
                        }
                    }
                });            
        }
        
              // function which gets JASON from Google Maps API 
        function loadCityNameByAjax() {
            $.ajax({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=31.6384198,-8.0380185&key=AIzaSyAFBTFTTnNeL9Ctas92Ih9STq4rcmlPtyI'
//                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ pos.lat + ',' + pos.lng + '&key=AIzaSyAFBTFTTnNeL9Ctas92Ih9STq4rcmlPtyI'
            }).done(function(response){
                insertCityName(response);
                console.log('This method is --> done');
            }).fail(function(error){
                console.log(error);
                console.log('This method is --> fail');
            });
        }
              // callback of the function
              loadCityNameByAjax();
              
              ///////////////////////////////////////////////////
              // PRZEPISAĆ TO DO OSOBNEGO PLIKU KTÓRY BĘDZIE ODPOWIEDZIALNY ZA POBIERANIE POGODY Z API POGODOWEGO
            function insertWeather(weather) {
                var tempVal = $('.tempValue'),
                    iconIgm = $('.mainPicture');
                
                var tempAPI = weather.main.temp;
                tempVal.text(Math.round(tempAPI - 273.15)); 
                
                console.log(weather.weather[0].icon);
                var icon = weather.weather[0].icon;
                iconIgm.css("background-image", "url("+"http://openweathermap.org/img/w/"+ icon +".png" +")");
               
            }
              
              function loadWeatherByAjax() {
                  $.ajax({
                      url: 'http://api.openweathermap.org/data/2.5/weather?lat=31.6384198&lon=-8.0380185&APPID=503930aad7641d49d14d96dd199c7c2d'
//                      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&APPID=503930aad7641d49d14d96dd199c7c2d'
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
              
              //////////////////////////////////////////////////
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
