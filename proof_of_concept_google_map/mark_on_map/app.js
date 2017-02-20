var marker;

function initMap() {
    var myLatlng = new google.maps.LatLng(52.22737883,21.01100922);
    var mapOptions = {
      zoom: 6,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        draggable:true,
        title:"Drag me!"
    });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

