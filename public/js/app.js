//document.addEventListener("DOMContentLoaded", function(){
//
//});

$(function() {
    var more = $(".showMore"),
        back = $(".showLess"),
        mapBtn = $(".mapBtn"),
        forecastBnt = $(".forecastBtn"),
        header = $('header'),
        fiveDaysBtn = $('.show5Days'),
        hourlyBtn = $('.showHourly');
    var shortWeather = $(".shortWeather"),
        longWeather = $(".longWeather"),
        googleMap = $(".googleMap"),
        hourlyWeather = $(".hourlyWeather"),
        fiveDaysWeather = $(".fiveDaysWeather"),
        dailyWeather = $('.weatherArticle'),
        forecastWeather = $('.forecastArticle');
    
    
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
            var map = document.getElementById('map');
            
            if(longWeather.is(':visible')){
                longWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    //var map = document.getElementById('map');
                    google.maps.event.trigger(map, 'resize');
                });
            }
            else if (shortWeather.is(':visible')){
                shortWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    google.maps.event.trigger(map, 'resize');
                });
            }
            else if (hourlyWeather.is(':visible')) {
                hourlyWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    google.maps.event.trigger(map, 'resize');
                });
            }
            else if (fiveDaysWeather.is(':visible')) {
                fiveDaysWeather.fadeOut(function(){
                    googleMap.fadeIn();
                    google.maps.event.trigger(map, 'resize');
                });
            }
        });
        
        // event for 'FORECAST' button
        forecastBnt.on('click', function(){
            // change footer button depends on which view is on the screen
            if ($(this).text() == "FORECAST") {
                $(this).text("DAILY");
            }
            else {
                $(this).text("FORECAST");
            }
                
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
            else if(hourlyWeather.is(':visible')){
                hourlyWeather.fadeOut(function(){
                    shortWeather.fadeIn();
                });
            }
            else if (fiveDaysWeather.is(':visible')){
                fiveDaysWeather.fadeOut(function(){
                    shortWeather.fadeIn();
                });
            }
        });
        
        //event for '5 DAYS' button
        fiveDaysBtn.on('click', function(){
            if(hourlyWeather.is(':visible')) {
                hourlyWeather.fadeOut(function(){
                    fiveDaysWeather.fadeIn();
                });
            }
        });
        
         //event for 'HOURLY' button
        hourlyBtn.on('click', function(){
            if(fiveDaysWeather.is(':visible')) {
                fiveDaysWeather.fadeOut(function(){
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
            else if (hourlyWeather.is(':visible')){
                hourlyWeather.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                });
            }
            else if (fiveDaysWeather.is(':visible')){
                fiveDaysWeather.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                });
            }
        }
    }
    
    
    //?????? POPRAWIC
    function showViewsOnTablet() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            mapBtn.on('click', function(){
                if (longWeather.is(':visible')) {
                    longWeather.fadeOut(function(){
                        googleMap.fadeIn();
                        var map = document.getElementById('map');
                        google.maps.event.trigger(map, 'resize');
                        mapBtn.attr('disabled', 'disabled');
                    });
                }
            });
            
            back.on('click', function(){
                googleMap.fadeOut(function(){
                    longWeather.fadeIn();
                    mapBtn.removeAttr('disabled');
                });
            });
            
            header.on('click', function(){
                if (googleMap.is(':visible')) {
                    googleMap.fadeOut(function(){
                        longWeather.fadeIn();
                        mapBtn.removeAttr('disabled');
                    });
                }
                else if (hourlyWeather.is(':visible')) {
                    hourlyWeather.fadeOut(function(){
                        dailyWeather.fadeIn();
                    });
                }
               
            });
            
            forecastBnt.on('click', function(){
                // change view 
                if(shortWeather.is(':visible')) {
                    dailyWeather.fadeOut(function(){
                        hourlyWeather.fadeIn();
                        fiveDaysWeather.fadeIn();
                        console.log("I do not know why it does work");
                    });
                }
                else if (googleMap.is(':visible')){
                    googleMap.fadeOut(function(){
                        forecastWeather.fadeIn();
                    });
                } 
                // FIND OUT WHAT IT DOESN'T WORK
                else if (forecastWeather.is(':visible')) {
                    forecastWeather.fadeOut(function(){
                        dailyWeather.fadeIn();
                        console.log("I do not know why it does not work");
                    });
                }
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
    showViewsOnTablet();
    
    function showMapOnDesktop() {
        var weather = $('.weatherArticle');
        var map = $('.mapArticle');
        var hourlyTable = hourlyWeather.find('.tableWeather'),
            fiveDaysTable = fiveDaysWeather.find('.tableWeather');
        
        if (window.matchMedia("(min-width: 992px)").matches) {
            // put mainWeatherView & googleMaps next each other
            weather.addClass('pull-left');
            map.addClass('pull-right');
            
            // put hourlyWeather & 5DaysWeather next each other 
            hourlyWeather.addClass('pull-left');
            fiveDaysWeather.addClass('pull-right');
            
            var hourlyName = $('<h2>Hourly weather</h2>').css('text-align', 'center');
            var fiveDaysName = $('<h2>Next days</h2>').css('text-align', 'center');
            
            hourlyTable.before(hourlyName);
            fiveDaysTable.before(fiveDaysName);
   
        }
    }
    
    showMapOnDesktop();
    
});