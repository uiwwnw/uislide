var a = new uiSlide('.loopfixed', {
    fixed: [1, 2, 4, 5],
    double: true,
    loop: true
});
var b = new uiSlide('.unloopunfixed', {
    autoTime: 3600,
    indicator: false,
    fixed: [5, 8],
    button: false
});
var c = new uiSlide('.width3loopfixed', {
    view: 3,
    loop: true,
    autoTime: 4400,
    fixed: [5, 8],
    center: true
});
var d = new uiSlide('.width3loopfixed3', {
    view: 3,
    slideNumber: 2,
    loop: true,
    autoTime: 7000,
    animationTime: 1000,
    center: true
});