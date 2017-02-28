//document.addEventListener("DOMContentLoaded", function(){
//
//});

$(function() {
    var more = $(".showMore");
    var back = $(".showLess");
    var mapBtn = $(".mapBtn");
    var forecastBnt = $(".forecastBtn");
    var header = $('header');
    var shortWeather = $(".shortWeather");
    var longWeather = $(".longWeather");
    var googleMap = $(".googleMap");
    var hourlyWeather = $(".hourlyWeather");
    var dailyWeather = $('.weatherArticle');
    
    
    function detailWeather() {
        
        // event for 'MORE' button      
        more.on('click', function(){
            shortWeather.fadeOut(function(){
                longWeather.fadeIn();
            });
            //shortWeather.hide();
            console.log("ja też działam :)");
        });
        
        // event for 'BACK' button
        back.on('click', showFirstView);
        
        // event for header
        header.on('click', showFirstView);
        
        // event for 'MAP' button 
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
        
        forecastBnt.on('click', function(){
            if (shortWeather.is(':visible')){
                shortWeather.fadeOut(function(){
                    hourlyWeather.fadeIn();
                });
            }
            else if (longWeather.is(':visible')){
                longWeather.fadeOut(function(){
                    hourlyWeather.fadeIn();
                });
            }
            else if (googleMap.is(':visible')){
                googleMap.fadeOut(function(){
                    hourlyWeather.fadeIn();
                });
            }
        });
        
        
        // function shows main view on mobile depends on which view is on the screen 
        function showFirstView () {
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
            else if(hourlyWeather.is(':visible')){
                hourlyWeather.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                });
            }
        }
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
            
            header.on('click', function(){
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
    
    function showForecastOnTablet() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            forecastBnt.on('click', function(){
                dailyWeather.fadeOut(function(){
                    hourlyWeather.fadeIn();
                });
            });
            
//            back.on('click', function(){
//                googleMap.fadeOut(function(){
//                    longWeather.fadeIn();
//                });
//            });
//            
//            header.on('click', function(){
//                googleMap.fadeOut(function(){
//                    longWeather.fadeIn();
//                });
//            });
        }
    }
    
    detailWeather();
    showMapOnTablet();
    showForecastOnTablet();
    
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