const gps = document.getElementById('gps');
const counter = document.getElementById('counter');
const canvas = document.getElementById('canvas');
const c = canvas.getContext("2d");

let canvasParentRect = canvas.parentElement.getBoundingClientRect();
canvas.width = canvasParentRect.width;
canvas.height = canvasParentRect.height;
const w = canvasParentRect.width * .9;
const h = canvasParentRect.height * .9;

const route = [];

// gps.innerHTML = '1234567890<br>234567890';
// counter.innerHTML = '1234';

const proportions = {};
const findProportions = () => {
    let left = Number.POSITIVE_INFINITY,
        right = Number.NEGATIVE_INFINITY,
        top = Number.POSITIVE_INFINITY,
        bottom = Number.NEGATIVE_INFINITY;

    for (let r of route) {
        if (r[0] < left) { left = r[0] }
        if (r[0] > right) { right = r[0] }
        if (r[1] < top) { top = r[1] }
        if (r[1] > bottom) { bottom = r[1] }
    }

    let scaleX = w / (right - left),
        scaleY = h / (bottom - top),
        scale = Math.min(scaleX, scaleY),
        margX = (canvas.width - ((right - left) * scale)) / 2,
        margY = (canvas.height - ((bottom - top) * scale)) / 2;

    proportions.left = left;
    proportions.top = top;
    proportions.scale = scale;
    proportions.margX = margX;
    proportions.margY = margY;

    // console.log('%c proportions:', 'background: #ffcc00; color: #003300', proportions)
}

const getPosition = (pos) => {
    let { left, top, scale, margX, margY } = proportions;
    // console.table([left, top, scale, margX, margY])
    let x = (pos[0] - left) * scale + margX,
        y = (pos[1] - top) * scale + margY;
    return [x, y];
    // console.log('%c [x, y]:', 'background: #ffcc00; color: #003300', [x, y])
}

const draw = () => {

    if (route.length > 0) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        // trasa
        c.lineWidth = 5;
        c.strokeStyle = '#ffffff';
        c.beginPath();

        // let test = [];
        // for (let r of route) {
        //     test.push(getPosition(r))
        // }
        // console.table(test)

        let pos = getPosition(route[0]);
        c.moveTo(pos[0], pos[1]);

        for (let i = 1; i < route.length; i++) {
            let pos = getPosition(route[i]);
            c.lineTo(pos[0], pos[1]);
            // console.log('%c pos:', 'background: #ffcc00; color: #003300', pos)
        }
        c.stroke();

        // tu teraz jestem
        c.fillStyle = 'red';

        pos = getPosition(route[route.length - 1]);
        c.beginPath();
        c.arc(pos[0], pos[1], 10, 0, 2 * Math.PI, false);
        c.fill();
    }
}




const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        gps.innerHTML = "Geo Location not supported by browser";
    }
}

const lastPosition = {
    x: 0,
    y: 0
}

const showPosition = (position) => {
    let location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }

    let x = location.latitude + test.x,
        y = location.longitude + test.y;

    if (lastPosition.x != x || lastPosition.y != y) {
        gps.innerHTML = x + '<br>' + y;

        route.push([x, y])
        findProportions();
        draw();
    }
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
            counter.innerHTML = '_' + timeCounter + '_';
        }, 300);
    }
}, 300
);

// const pathTest = () => {
//     let trackMouse = e => {
//         route.push([e.clientX, e.clientY])
//         // console.table(route);
//     }

//     let endTracking = () => {
//         document.removeEventListener('mousemove', trackMouse);
//         document.removeEventListener('mouseup', endTracking);
//         console.table(route);
//         findProportions();
//         draw();
//     }

//     let startTracking = () => {
//         document.addEventListener('mousemove', trackMouse);
//         document.addEventListener('mouseup', endTracking);
//     }

//     document.addEventListener('mousedown', startTracking);
// }

// pathTest()

var test = {
    x: 0,
    y: 0
}

// setInterval(() => {
//     test.x++;
//     test.y++;
// }, 500);