//static data / performance data
window.onload = () => {
    let userAgent = navigator.userAgent;
    let language = navigator.language;
    let cookiesEnabled = navigator.cookieEnabled;
    let jsEnabled = true;
    //to do this, try seeing if there is some sort of displacement for a small image
    //let imagesEnabled =
    //try changing the style of something in css and then checking that attribute on load 
    //let cssEnabled = 
    let screenHeight = window.screen.height;
    let screenWidth = window.screen.width;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let staticData = {
        "User Agent": userAgent,
        "Language": language,
        "Cookies Enabled": cookiesEnabled
        //continue
    }

    //performance data
    setTimeout(function() {
        let timingObj = performance.getEntriesByType("navigation")[0];
        let pageStart = timingObj["loadEventStart"];
        let pageEnd = timingObj["loadEventEnd"];
        let totalLoadTime = timingObj["loadEventEnd"] - timingObj["loadEventStart"];
    }, 0);
}

//capture all other errors
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log(msg);
    console.log(url);
    console.log(lineNo);
    console.log(columnNo);
    console.log(error);
    alert('hi');
}
//capture HTTP errors
window.addEventListener('error', function(event) {
    console.log(event);
}, true);


//activity data

//Mouse Movement
window.addEventListener("mousemove", (event) => {
    let x = event.screenX
    let y = event.screenY
});

//Clicks
window.addEventListener("scroll", (event) => {
    const tScroll = document.body.scrollHeight - window.innerHeight;
    console.log((window.pageYOffset * 100) / tScroll);
});


//Keyboard activity 
window.addEventListener("keydown", (event) => {
    console.log(event);
    let key = event.key;
});


//Idle time





