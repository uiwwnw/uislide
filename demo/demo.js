var a = new uiSlide('.loopfixed', {
    fixed: [1, 2, 4, 5],
    double: true,
    loop: true
});
var b = new uiSlide('.unloopunfixed', {
    autoTime: 3600,
    indicator: false,
    button: false
});
var c = new uiSlide('.width3loopfixed', {
    width: 'calc(100% / 3)',
    loop: true,
    autoTime: 4400,
    fixed: [5, 8],
    center: true
});
var d = new uiSlide('.width3loopfixed3', {
    width: 'calc(100% / 3)',
    slideEa: 3,
    loop: true,
    autoTime: 7000,
    animationTime: 2300,
    fixed: [5, 8],
    center: true
});