//document.addEventListener("DOMContentLoaded", function(){
//
//});

$(function() {
    var more = $(".showMore");
    var back = $(".showLess");
    var mapBtn = $(".mapBtn");
    var shortWeather = $(".shortWeather");
    var longWeather = $(".longWeather");
    var googleMap = $(".googleMap");
    
    
    function detailWeather() {
              
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
    
    
    //?????? POPRAWIC
    function showMapOnTablet() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            mapBtn.on('click', function(){
                longWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    var map = document.getElementById('map');
                    google.maps.event.trigger(map, 'resize');
                });
            });
            
            back.on('click', function(){
                googleMap.fadeOut(function(){
                    longWeather.fadeIn();
                });
            });
        }
        
//        tablet.addListener(function(event){
//            if(event.matches){
//                googleMap.toggleClass("hidden");
//            }
//            else {
//                googleMap.addClass("show");
//            }
//        });
    }
    
    detailWeather();
    showMapOnTablet();
    
    function showMapOnDesktop() {
        var weather = $('.weatherArticle');
        var map = $('.mapArticle');
        if (window.matchMedia("(min-width: 992px)").matches) {
           weather.addClass('pull-left');
            map.addClass('pull-right');
        }
    }
    
    showMapOnDesktop();
    
});