const gps = document.getElementById('gps');
const counter = document.getElementById('counter');

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        gps.innerHTML = "Geo Location not supported by browser";
    }
}

const showPosition = (position) => {
    let location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    gps.innerHTML = location.latitude + '<br>' + location.longitude
}

var timeCounter = 0;

setInterval(() => {
    getLocation();
    timeCounter++;
    counter.innerHTML = timeCounter;
}, 2000);