## demo

#### [jsfiddle's demo](https://jsfiddle.net/uiwwnw/uqxtzjds/embedded/result/#Result)
#### [uiwwnw's blog](https://uiwwnw.github.io/jekyll/update/2018/10/02/uislide.html)


## 설명

uiSlide

## How to use

```javascript

var a = new uiSlide(selector);

// option
var a = new uiSlide(selector, {
    ltr:true, // slide direct
    startIndex:0, // slide start index

    loop:false, // infinite loop

    auto:true, // auto start 
    autoTime:2000, // auto slide duration
    animationTime:700 // animation duration

    zIndex:true, // current slide z-index higher
    currentClassName:'current', // current slide class name
    fixed:false,
    fixedClassName:'fixed', // fixed 아이템이 current일때 slide class name

    button:true, // button 
    buttonLeftClassName:'leftBtn',
    buttonRightClassName:'rightBtn',

    indicator:true, // indicator
    indicatorClassName:'indicator'
});

// callback, method
a.move(index); // move to slide 
a.autoStart(); // auto start
a.autoStop(); // auto stop
a.index(); // current slide index

```
## AUTHOR

uiwwnw &lt;[uiwwnw@icloud.com](mailto:uiwwnw@icloud.com)&gt;

## LICENSE

[MIT](https://uiwwnw.mit-license.org)