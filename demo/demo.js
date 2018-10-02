var a = new uiSlide('.loopfixed', {
    width: '100%',   
    fixed: [1, 2, 4, 5],
    loop: true
});
var b = new uiSlide('.unloopunfixed', {
    width: '100%',
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