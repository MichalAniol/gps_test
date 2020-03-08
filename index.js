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




getLocation();

var timeCounter = 0;
var checkingGeo = null;
const waitForPromision = setInterval(() => {
    if (gps.innerHTML != '') {
        clearInterval(waitForPromision)

        checkingGeo = setInterval(() => {
            getLocation();
            timeCounter++;
            counter.innerHTML = timeCounter;
        }, 300);
    }
}, 300
);