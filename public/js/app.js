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
    
// ------------------------------------------------------------------- 
    // function change button name from 'FORECAST' to 'DAILY' and 'DAILY' to 'FORECAST' depends on which view is on the screen 
    function btnChange () {
        if (forecastBnt.text() == "FORECAST") {
            forecastBnt.text("DAILY");
        }
        else {
            forecastBnt.text("FORECAST");
        }
    }
        
// --------------------------------------------------------------------
    
    function detailWeather() {
        
        // event for 'MORE' button      
        more.on('click', function(){
            shortWeather.fadeOut(function(){
                longWeather.fadeIn();
            });
            //shortWeather.hide();
        });
        
        // event for 'BACK' button
        back.on('click', showFirstView);
        
        // event for header
        header.on('click', showFirstView);
        
        // event for 'MAP' button 
        mapBtn.on('click', function(){
            
            function showMap () {
                googleMap.fadeIn();
                var map = document.getElementById('map');
                google.maps.event.trigger(map, 'resize');
            }
            
            if(longWeather.is(':visible')){
                longWeather.fadeOut(function(){
                    showMap();
                });
            }
            else if (shortWeather.is(':visible')){
                shortWeather.fadeOut(function(){
                    showMap();
                });
            }
            else if (hourlyWeather.is(':visible')) {
                hourlyWeather.fadeOut(function(){
                    showMap();
                    btnChange();
                });
            }
            else if (fiveDaysWeather.is(':visible')) {
                fiveDaysWeather.fadeOut(function(){
                    showMap();
                    btnChange();
                });
            }
        });
        
        // event for 'FORECAST' button
        forecastBnt.on('click', function(){
            if (shortWeather.is(':visible')){
                shortWeather.fadeOut(function(){
                    hourlyWeather.fadeIn();
                    btnChange();
                });
            }
            else if (longWeather.is(':visible')){
                longWeather.fadeOut(function(){
                    hourlyWeather.fadeIn();
                    btnChange();
                });
            }
            else if (googleMap.is(':visible')){
                googleMap.fadeOut(function(){
                    hourlyWeather.fadeIn();
                    btnChange();
                });
            }
            else if(hourlyWeather.is(':visible')){
                hourlyWeather.fadeOut(function(){
                    shortWeather.fadeIn();
                    btnChange();
                });
            }
            else if (fiveDaysWeather.is(':visible')){
                fiveDaysWeather.fadeOut(function(){
                    shortWeather.fadeIn();
                    btnChange();
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
        

// ---------------------------------------------------------------       
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
                    btnChange();
                });
            }
            else if (fiveDaysWeather.is(':visible')){
                fiveDaysWeather.fadeOut(1000, function(){
                    shortWeather.fadeIn(1000);
                    btnChange();
                });
            }
        }
    }
    
// --------------------------------------------------------------   
    //?????? POPRAWIC
    function showViewsOnTablet() {
        var hourlyTable = hourlyWeather.find('.tableWeather'),
            fiveDaysTable = fiveDaysWeather.find('.tableWeather');
        
        // --------------------------
        function showGoogleMap() {
            googleMap.fadeIn();
            var map = document.getElementById('map');
            google.maps.event.trigger(map, 'resize');
            mapBtn.attr('disabled', 'disabled');
        }
        // --------------------------
        
        if (window.matchMedia("(min-width: 768px)").matches) {
            mapBtn.on('click', function(){
                if (longWeather.is(':visible')) {
                    longWeather.fadeOut(function(){
                        showGoogleMap();
                    });
                }
                else if (hourlyWeather.is(':visible')) {
                    hourlyWeather.fadeOut(function(){
                        fiveDaysWeather.fadeOut();
                        dailyWeather.fadeIn(function(){
                            longWeather.fadeOut();
                            shortWeather.fadeIn();
                            showGoogleMap();
                        });
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
                // popracować nad bardziej płynnym przejściem 
                else if (hourlyWeather.is(':visible')) {
                    (hourlyWeather).fadeOut(function(){
                        fiveDaysWeather.fadeOut();
                        dailyWeather.fadeIn(function(){
                            longWeather.fadeIn();
                        });
                    });
                }
            });
            
            forecastBnt.on('click', function(){
                // change view 
                if(shortWeather.is(':visible')) {
                    dailyWeather.fadeOut(function(){
                        hourlyWeather.fadeIn();
                        fiveDaysWeather.fadeIn();
                        googleMap.fadeOut();
                        mapBtn.removeAttr('disabled');
                        console.log("I do not know why it does work");
                    });
                }
                // FIND OUT WHAT DOESN'T WORK
//                else if (forecastWeather.is(':visible')) {
//                    forecastWeather.fadeOut(function(){
//                        dailyWeather.fadeIn();
//                        console.log("I do not know why it does not work");
//                    });
//                }
                else if (hourlyWeather.is(':visible')) {
                    hourlyWeather.fadeOut(function(){
                        fiveDaysWeather.fadeOut();
                        dailyWeather.fadeIn();
                        googleMap.fadeOut(function(){
                            longWeather.fadeIn();
                            mapBtn.removeAttr('disabled');
                        });
                        console.log("I do not know why it does not work");
                    });
                }
            });
            
            
            // show titles for each forecast 
            var hourlyName = $('<h2>Hourly weather</h2>').css('text-align', 'center');
            var fiveDaysName = $('<h2>Next days</h2>').css('text-align', 'center');
            
            hourlyTable.before(hourlyName);
            fiveDaysTable.before(fiveDaysName);
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
    
// ---------------------------------------------------------------------
    
    detailWeather();
    showViewsOnTablet();
    
//---------------------------------------------------------------------- 
    
    function showMapOnDesktop() {
        var weather = $('.weatherArticle');
        var map = $('.mapArticle');
        
        if (window.matchMedia("(min-width: 992px)").matches) {
            // put mainWeatherView & googleMaps next each other
            weather.addClass('pull-left');
            map.addClass('pull-right');
            
            // put hourlyWeather & 5DaysWeather next each other 
            hourlyWeather.addClass('pull-left');
            fiveDaysWeather.addClass('pull-right');
   
        }
    }
    
    showMapOnDesktop();
    
});