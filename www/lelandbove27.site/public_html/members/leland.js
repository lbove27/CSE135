let removeAnimationButton = document.getElementById('toggle-animation');

removeAnimationButton.addEventListener('click', () => {
    console.log("done");
    let animation = document.getElementById('animation');
    animation.style.display = "none";
    let noAnimation = document.getElementById('no-animation');
    noAnimation.style.display = "block";
});

let addAnimationButton = document.getElementById('add-animation');

addAnimationButton.addEventListener('click', () => {
    console.log("done");
    let animation = document.getElementById('animation');
    animation.style.display = "block";
    let noAnimation = document.getElementById('no-animation');
    noAnimation.style.display = "none";
});