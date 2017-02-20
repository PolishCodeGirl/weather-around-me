function initMap() {
        var uluru = {lat: 52.227, lng: 21.011};
        var map = new google.maps.Map(document.getElementById('myMap'), {
          zoom: 5,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }