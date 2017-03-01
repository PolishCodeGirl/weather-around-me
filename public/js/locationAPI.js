function getCityName(pos){
    
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
//             url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7856656,-73.966853&key=AIzaSyAFBTFTTnNeL9Ctas92Ih9STq4rcmlPtyI'
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ pos.lat + ',' + pos.lng + '&key=AIzaSyAFBTFTTnNeL9Ctas92Ih9STq4rcmlPtyI'
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
}