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
    autoTime: 3400,
    fixed: [5, 8],
    center: true
});