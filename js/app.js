//document.addEventListener("DOMContentLoaded", function(){
//
//});

$(function() {
    function detailWeather() {
        var more = $(".showMore");
        var back = $(".showLess");
        var mapBtn = $(".mapBtn");
        var shortWeather = $(".shortWeather");
        var longWeather = $(".longWeather");
        var googleMap = $(".googleMap");
        
        more.on('click', function(){
            shortWeather.fadeOut(function(){
                longWeather.fadeIn();
            });
            //shortWeather.hide();
            console.log("ja też działam :)");
        });
        
        back.on('click', function(){
            if (longWeather.is(':visible')) {
                longWeather.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                });
            } 
            else if (googleMap.is(':visible')) {
                googleMap.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                });
            }
            
            //longWeather.hide();
            console.log("działa");
        });
        
        mapBtn.on('click', function(){
            if(!shortWeather.is(':visible')){
                longWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    var map = document.getElementById('map');
                    google.maps.event.trigger(map, 'resize');
                });
            }
            else if (!longWeather.is(':visible')){
                shortWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    var map = document.getElementById('map');
                    google.maps.event.trigger(map, 'resize');
                });
            }
            console.log("Mapa działa!!!");
        });
    }
    
    detailWeather();
    
});