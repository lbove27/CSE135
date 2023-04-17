let light = document.getElementById('light-mode');
light.addEventListener('click', () => {
    let body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = "white";
    body.style.color = "black";
});

let dark = document.getElementById('dark-mode');
dark.addEventListener('click', () => {
    let body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor = "black";
    body.style.color = "white";
    console.log('hi');
});