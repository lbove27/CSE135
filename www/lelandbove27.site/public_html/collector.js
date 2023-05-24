//initialize local storage objects
let staticDataObj = { 'data': [] };
let activityDataObj = { 
    'errors': [],
    'mouseActivity': [],
    'keyboardActivity': [],
    'idleTime': []
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
            "Total Load Time": totalLoadTime
        }

        let localStorageVal = JSON.parse(localStorage.getItem('staticData'));
        localStorageVal.data.push(staticData);
        console.log(localStorageVal);
        localStorage.setItem("staticData", JSON.stringify(localStorageVal));

    }, 0);
}

//capture all other errors
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log(msg);
    console.log(url);
    console.log(lineNo);
    console.log(columnNo);
    console.log(error);
}
//capture HTTP errors
window.addEventListener('error', function(event) {
    console.log(event);
}, true);


//activity data

//Mouse Movement
window.addEventListener("mousemove", (event) => {
    let x = event.screenX;
    let y = event.screenY;
});

//Clicks
window.addEventListener("scroll", (event) => {
    const tScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset * 100) / tScroll;
});


//Keyboard activity 
window.addEventListener("keydown", (event) => {
    console.log(event);
    let key = event.key;
});


//Idle time counting 
let time = 0;
let counter;

function startTimer() {
    counter = setInterval(() => {
        time += 1000; 
    }, 1000);
}

function restartTimer() {
    clearInterval(counter);
    if(time >= 2000) {
        //get information to send for idle time
        console.log(time);
    }
    time = 0; 
    startTimer();
}

startTimer();

document.addEventListener('mousemove', restartTimer);
document.addEventListener('scroll', restartTimer);
document.addEventListener('keydown', restartTimer);


//additional data (time user enters, leaves, and which page)
window.addEventListener('unload', (event) => {
    //remember to add the startTime from above
    let endTime = new Date();
    let page = window.location.href;

});

//send data / store in local storage / retrieve from local storage every minute 
setInterval(function() {

    //send static data
    //if statement that checks if there is anything there 
    let staticData = JSON.parse(localStorage.getItem("staticData"));
    
    //console.log("got here and didn't send data");
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
    


}, 10000); 
