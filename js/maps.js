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
              
              
              // Get new coordinates (latitude and longitude) after moving marker
              google.maps.event.addListener(marker, 'dragend', function (event) {
                  var newPos = {
                      lat: this.getPosition().lat(),
                      lng: this.getPosition().lng()
                  };
                  
                  // set new coordinates to function responsible for getting and showing location name and weather conditions
                  getCityName(newPos);
                  getWeatherConditions(newPos);
              });
              
              ///////////////////////////////////////////////
              /// PROBA DLA WPISYWANIA MIEJSCA W WYSZUKIWARCE
              // Create the search box and link it to the UI element.
//        var input = document.getElementById('pac-input');
//        var searchBox = new google.maps.places.SearchBox(input);
//        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//        // Bias the SearchBox results towards current map's viewport.
//        map.addListener('bounds_changed', function() {
//          searchBox.setBounds(map.getBounds());
//        });
//
//        var markers = [];
//        // Listen for the event fired when the user selects a prediction and retrieve
//        // more details for that place.
//        searchBox.addListener('places_changed', function() {
//          var places = searchBox.getPlaces();
//
//          if (places.length == 0) {
//            return;
//          }
//
//          // Clear out the old markers.
//          markers.forEach(function(marker) {
//            marker.setMap(null);
//          });
//          markers = [];
//
//          // For each place, get the icon, name and location.
//          var bounds = new google.maps.LatLngBounds();
//          places.forEach(function(place) {
//            if (!place.geometry) {
//              console.log("Returned place contains no geometry");
//              return;
//            }
//            var icon = {
//              url: place.icon,
//              size: new google.maps.Size(71, 71),
//              origin: new google.maps.Point(0, 0),
//              anchor: new google.maps.Point(17, 34),
//              scaledSize: new google.maps.Size(25, 25)
//            };
//
//            // Create a marker for each place.
//            markers.push(new google.maps.Marker({
//              map: map,
//              icon: icon,
//              title: place.name,
//              position: place.geometry.location
//            }));
//
//            if (place.geometry.viewport) {
//              // Only geocodes have viewport.
//              bounds.union(place.geometry.viewport);
//            } else {
//              bounds.extend(place.geometry.location);
//            }
//          });
//          map.fitBounds(bounds);
//        });
//              
//              // get new
//              function GetLatlong() {
//                  var geocoder = new google.maps.Geocoder();
//                  var address = document.getElementById('pac-input').value;
//                  
//                  // proba pobrania nowych współrzędnych z wpisanej lokalizacji
//                  geocoder.geocode({ 'address': address }, function (results, status) {
//                      if (status == google.maps.GeocoderStatus.OK) {
//                          var newPos = {
//                              lat: results[0].geometry.location.lat(),
//                              lng: results[0].geometry.location.lng()
//                          };
//                      }
//                        // set new coordinates to function responsible for getting and showing location name and weather conditions
//                        getCityName(newPos);
//                        getWeatherConditions(newPos);
//                  });
//              }
              
              //////////////////////////////////////////////
              
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
