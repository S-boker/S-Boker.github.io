$(document).ready(function () {
    
    // Get Location 
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        weather(lat, long);
    }

    function error() {
        console.log('There was an error');
    }

    // Call Weather
    function weather(lat, long) {
        $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`, function(data) {
            updateDOM(data);
        });
    }

    // Update Dom
    function updateDOM(data) {
        var temp = Math.round((data.main.temp_max)*(9/5))+32;
        $('#city').html(data.name);
        $('#temp').html(temp);
        $('#desc').html(data.weather[0].description);
        $('#icon').attr('src', data.weather[0].icon);
    }
});