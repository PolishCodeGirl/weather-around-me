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

              // callback function from 'js/locationAPI.js' which is responsible for showing location name
              getCityName(pos);
              
              // callback function from 'js/weatherAPI.js' which is responsible for showing weather conditions
              getWeatherConditions(pos);
              
              
            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            map.setCenter(pos);
              
              // Place a draggable marker on the map
              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat,pos.lng),
                map: map,
                draggable:true,
                title:"Drag me!"
            });
              
              // Move maker for another position
              marker.addListener('click', function toggleBounce() {
                  if (marker.getAnimation() !== null) {
                      marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
              }); 
              
              
              // Get new coordinates (latitude and longitude) after mooving marker
              google.maps.event.addListener(marker, 'dragend', function (event) {
                  var newPos = {
                      lat: this.getPosition().lat(),
                      lng: this.getPosition().lng()
                  };
                  
                  // set new coordinates to function responsible for getting and showing location name and weather conditions
                  getCityName(newPos);
                  getWeatherConditions(newPos);
              });
              
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
