//const crypto = window.crypto;
//const sessionId = crypto.randomBytes(16).toString("hex");
const randomValues = crypto.getRandomValues(new Uint8Array(16));
let sessionId = Array.from(randomValues).map(byte => byte.toString(16).padStart(2, '0')).join('');


sessionStorage.setItem('sessionId', sessionId);

//start the session 
fetch("/api", {
    method: "get"
});

//initialize local storage objects
let staticDataObj = { 'data': [] };
let activityDataObj = { 
    'errors': [],
    'mouseActivity': [],
    'keyboardActivity': [],
    'idleTime': [],
    'additionalData': []
};
localStorage.setItem("staticData", JSON.stringify(staticDataObj));
localStorage.setItem("activityData", JSON.stringify(activityDataObj));

let imageFlag = true; 
//Figure out if images are enabled

function imagesOn() {
    var pixel = new Image();
    pixel.src = 'clear.png';
    
    //$(document).ready(
        $(pixel).on('load', function() {
            if (pixel.width < 0) {
                console.log("images are disabled");
                //document.body.className += (document.body.className != '') ? ' enabled' : 'enabled';
                imageFlag = false;
            }
        })
    //)
}

//CSS Check
function cssCheck() {
    const test = document.createElement('div');
    test.style.display = 'none';
    document.body.appendChild(test);
    const getStyle = window.getComputedStyle(test);
    if(getStyle.display == 'none') {
        return true;
    }
    else {
        return false;
    }
}

let startTime;

//static data / performance data
window.onload = () => {
    let userAgent = navigator.userAgent;
    let language = navigator.language;
    let cookiesEnabled = navigator.cookieEnabled;
    let jsEnabled = true;
    let screenHeight = window.screen.height;
    let screenWidth = window.screen.width;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    //get the time the user entered the page
    startTime = new Date();

    //performance data

    
    setTimeout(function() {
        let timingObj = performance.getEntriesByType("navigation")[0];
        let pageStart = timingObj["loadEventStart"];
        let pageEnd = timingObj["loadEventEnd"];
        let totalLoadTime = timingObj["loadEventEnd"] - timingObj["loadEventStart"];


        //Helper function to set the class if the image is loaded
        /*
        if(body.classList.contains('enabled')) {
            imagesEnabled = true;
        }
        console.log(imagesEnabled);
        */
        imagesOn();
        console.log(imageFlag);

        //Check for CSS
        let cssEnabled = cssCheck();
        console.log(cssEnabled);

        let staticData = {
            "User Agent": userAgent,
            "Language": language,
            "Cookies Enabled": cookiesEnabled,
            "JavaScript Enabled": jsEnabled,
            "Images Enabled": imageFlag,
            "CSS Enabled": cssEnabled,
            "Screen Height": screenHeight,
            "Screen Width": screenWidth,
            "Window Width": windowWidth,
            "Window Height": windowHeight,
            "Timing Object": timingObj,
            "Page Load Start": pageStart,
            "Page Load End": pageEnd,
            "Total Load Time": totalLoadTime,
            "Session Id": sessionStorage.getItem('sessionId'),
            "Date": new Date()
        }

        let localStorageVal = JSON.parse(localStorage.getItem('staticData'));
        localStorageVal.data.push(staticData);
        //console.log(localStorageVal);
        localStorage.setItem("staticData", JSON.stringify(localStorageVal));

    }, 0);
}

//capture all other errors
window.onerror = function(event) {
    let date = new Date();
    let obj = {
        "Error": event,
        "type": "error",
        "errorType": "general",
        "date": date,
        "User Agent": navigator.userAgent,
        "Session Id": sessionStorage.getItem('sessionId')
    }

    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.errors.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
}
//capture HTTP errors
window.addEventListener('error', function(event) {
    let date = new Date();
    let obj = {
        "Error": event,
        "type": "error",
        "errorType": "http",
        "date": date,
        "User Agent": navigator.userAgent,
        "Session Id": sessionStorage.getItem('sessionId')
    }
    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.errors.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
}, true);


//activity data

//Mouse Movement
window.addEventListener("mousemove", (event) => {
    let x = event.x;
    let y = event.y;
    let type = 'mousemove';

    let obj = {
        'type': type,
        'x': x,
        'y': y,
        "Session Id": sessionStorage.getItem('sessionId')
    }

    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.mouseActivity.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
});

window.addEventListener("mousedown", (event) => {
    let mouseButton;
    let x = event.x;
    let y = event.y;
    
    if(event.button == 1) {
        mouseButton = 'middle';
    }
    else if(event.button == 2) {
        mouseButton = 'right';
    }
    else {
        mouseButton = 'left';
    }

    let obj = {
        'mouseButton': mouseButton,
        'x': x,
        'y': y,
        'type': 'click',
        "Session Id": sessionStorage.getItem('sessionId')
    }

    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.mouseActivity.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
});

//Clicks
window.addEventListener("scroll", (event) => {
    const tScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset * 100) / tScroll;
    
    let obj = {
        'scrollPercentage': scrollPercentage,
        'type': 'scroll',
        "Session Id": sessionStorage.getItem('sessionId')
    }
    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.mouseActivity.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
});


//Keyboard activity 
window.addEventListener("keydown", (event) => {
    console.log(event);
    let key = event.key;
    let keyEvent = event;

    let obj = {
        'type': 'key press',
        'key': key,
        'keyEvent': keyEvent,
        "Session Id": sessionStorage.getItem('sessionId')
    }

    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.keyboardActivity.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));
});


//Idle time counting 
let time = 0;
let counter;
let startIdle = 0;

function startTimer() {
    let date = new Date();
    startIdle = date.getTime();
    counter = setInterval(() => {
        time += 1000; 
    }, 1000);
}

function restartTimer() {
    clearInterval(counter);
    if(time >= 2000) {
        //get information to send for idle time
        console.log(time);
        console.log(startIdle);
        let obj = {
            'startTime': startIdle,
            'duration': time,
            'type': 'idle',
            "Session Id": sessionStorage.getItem('sessionId')
        }
        let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
        localStorageVal.idleTime.push(obj);
        localStorage.setItem("activityData", JSON.stringify(localStorageVal));

    }
    time = 0; 
    startTimer();
}

startTimer();

document.addEventListener('mousemove', restartTimer);
document.addEventListener('scroll', restartTimer);
document.addEventListener('keydown', restartTimer);

let endTime;
let page;
//additional data (time user enters, leaves, and which page)
window.addEventListener('beforeunload', async (event) => {
    event.preventDefault();
    //remember to add the startTime from above
    endTime = new Date(); 
    page = window.location.href;

    let totalTimeSpent = (endTime - startTime) / 1000;

    let obj = {
        'startTime': startTime,
        'endTime': endTime,
        'totalTimeSpent': totalTimeSpent,
        'page': page,
        'type': 'unload',
        "Session Id": sessionStorage.getItem('sessionId')
    }

    let localStorageVal = JSON.parse(localStorage.getItem('activityData'));
    localStorageVal.additionalData.push(obj);
    localStorage.setItem("activityData", JSON.stringify(localStorageVal));

    let activityData = JSON.parse(localStorage.getItem("activityData"));

    await fetch("/api/activity", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    }).then((response) => {
        localStorage.setItem("activityData", JSON.stringify(activityDataObj));
    });
    event.returnValue = 'Thanks!';
});

//send data / store in local storage / retrieve from local storage every minute 
setInterval(function() {

    let staticData = JSON.parse(localStorage.getItem("staticData"));
    let activityData = JSON.parse(localStorage.getItem("activityData"));
    
    //send static data
    console.log(staticData.data.length);
    if(staticData.data.length > 0) {
        //add cookie to staticData[0]
        console.log("sent data");
        fetch("/api/static", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staticData)
        }).then((response) => {
            localStorage.setItem("staticData", JSON.stringify(staticDataObj));
        });
    }
    
    //send activity data 
    
    console.log("sent activity data");
    fetch("/api/activity", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(activityData)
    }).then((response) => {
        localStorage.setItem("activityData", JSON.stringify(activityDataObj));
    });

}, 10000); 
