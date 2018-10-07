;(function() {
    var root = this;
    var utils = (function() {
        var ready = function(fn) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
              fn();
            } else {
              document.addEventListener('DOMContentLoaded', fn);
            }
          }
        var repeat = function(el, method, arg) {
            for(var i = 0; i < el.length; i++) {
                method(el[i], arg);
            };
        };
        // var style = function(el, arg, time) {
        //     var styleTxt = '';
        //     var value = new Object;
        //     var exProp = el.getAttribute('style') === null?'':el.getAttribute('style');
        //     var _val = (function() {
        //         if (exProp === '') {
        //             return false;
        //         };
        //         var a = exProp.split(';');
        //         for(var i = 0; i < a.length; i++) {
        //             var _a = a[i].split(':');
        //             if(_a[0] !== '') {
        //                 value[_a[0].replace(/(^\s*)|(\s*$)/, '')] = _a[1].replace(/(^\s*)|(\s*$)/, '');;
        //             }
        //         };
        //     }());
        //     value = Object.assign(value, arg);
        //     for (var i in value) {
        //         if(value[i] !== undefined) {
        //             styleTxt +=  i + ': ' + value[i] + ';';
        //         };
        //     };
        //     if (time === undefined) {
        //         el.setAttribute('style', styleTxt);
        //     };
        //     if (time > 0) {
        //         el.setAttribute('style', styleTxt);
        //         // clearTimeout(root.sto1);
        //         // root.sto1 = setTimeout(function() {
        //         setTimeout(function() {
        //             el.setAttribute('style', exProp);
        //         }, time);
        //     }
        //     if (time < 0) {
        //         // clearTimeout(root.sto2);
        //         // root.sto2 = setTimeout(function() {
        //         setTimeout(function() {
        //             el.setAttribute('style', styleTxt);
        //         }, -time);
        //     };
        // };
        var style = function(el, arg, callback) {
            var styleTxt = '';
            var value = new Object;
            var exProp = el.getAttribute('style') === null?'':el.getAttribute('style');
            var _val = (function() {
                if (exProp === '') {
                    return false;
                };
                var a = exProp.split(';');
                for(var i = 0; i < a.length; i++) {
                    var _a = a[i].split(':');
                    if(_a[0] !== '') {
                        value[_a[0].replace(/(^\s*)|(\s*$)/, '')] = _a[1].replace(/(^\s*)|(\s*$)/, '');;
                    }
                };
            }());
            value = Object.assign(value, arg);
            for (var i in value) {
                if(value[i] !== undefined) {
                    styleTxt +=  i + ': ' + value[i] + ';';
                };
            };
            (callback !== undefined) && (callback());
            el.setAttribute('style', styleTxt);
        };
        var transition = function(el, fn) {
            el.removeEventListener("transitionend", function() {
                fn();
              }, false);
            el.addEventListener("transitionend", function() {
                fn();
              }, false);
        };
        var returnOption = function(opt) {
            var option = {};
            option.ltr = true;
            option.startIndex = 0;
            option.slideEa = 1;

            option.loop = false;
            option.double = false;

            option.auto = true;
            option.autoIng = false;
            option.autoTime = 3000;

            option.width = '100%',

            option.zIndex = true;
            option.currentClassName = 'current';
            option.fixedClassName = 'fixed';

            option.fixed = false;
            option.center = false;

            option.touchSafeWidth = 50;

            option.button = true;
            option.buttonLeftClassName = 'leftBtn';
            option.buttonRightClassName = 'rightBtn';

            option.indicator = true;
            option.indicatorClassName = 'indicator';

            option.animation = 'margin-left';
            option.animationTime = 499;
            option = Object.assign(option, opt);
            option.direct = option.ltr?option.slideEa:-option.slideEa;
            return option;
        }
        return {
            ready: ready,
            returnOption: returnOption,
            transition: transition,
            style: style,
            repeat: repeat
        }
    }());

    var uiSlide = function(e, opt) {
        var elem = document.querySelector(e);
        var length = elem.length;
        
        if(length === 0) {
            return false;
        };
        var ctr = new Object;

        var idx = 0;
        var option = utils.returnOption(opt);
        var ing = function() {
            ctr.ing = true;
            ctr.ingSto = setTimeout(function() {
                ctr.ing = false;
            }, option.animationTime);
        };
        var init = (function() {
            ctr.siv;
            ctr.ingSto;
            ctr.aniSto;
            ctr.ing = false;
            ctr.slide = elem;
            ctr.slideWidth = ctr.slide.offsetWidth;
            ctr.wrap = ctr.slide.children[0];
            // ctr.item = ctr.wrap.childNodes;
            ctr.item = Array.prototype.slice.call(ctr.wrap.children);
            ctr.itemLength = ctr.item.length;
            utils.style(ctr.slide, {'overflow': 'hidden', 'position': 'relative'});
            utils.style(ctr.wrap, {'display': 'flex', 'width': ctr.slideWidth+'px','transition-property': option.animation});
            utils.repeat(ctr.item, utils.style, {'z-index': option.zIndex?1:undefined,'flex-shrink': '0', 'width': option.width});
            if(option.loop) {
                ctr.cloneLength = Math.floor(ctr.slideWidth / ctr.item[0].offsetWidth);
                ctr.afterClone = [];
                ctr.beforeClone = [];
                for(var i = 0; i < ctr.cloneLength; i++) {
                    var _a = ctr.item[i].cloneNode(true);
                    var _b = ctr.item[ctr.itemLength - 1 - i].cloneNode(true);
                    // utils.style(_b, {'margin-left': -ctr.item[ctr.itemLength - 1].offsetWidth+'px'});
                    // (option.center && (Math.floor(ctr.cloneLength / 2) === i)) && (utils.style(_b, {'margin-left': 0}));
                    // utils.style(_b, {'position': 'absolute'});
                    _a.classList.add('clone');
                    _b.classList.add('clone');
                    ctr.wrap.append(_a);
                    ctr.wrap.prepend(_b);
                    ctr.afterClone.push(_a);
                    ctr.beforeClone.push(_b);
                };
            };
            // utils.repeat(ctr.item, utils.style, {'z-index': option.zIndex?1:undefined,'flex-shrink': '0', 'width': option.width});
        }());
        
        var move = function(i, x) {
            // var start = null;
            // function act(timestamp) {
            //     if (!start) start = timestamp;
            //     var progress = timestamp - start;
            //     if (progress < option.animationTime) {
            //         utils.style(ctr.wrap, {'transition-duration': progress / opt.animationTime, 'margin-left': - 1/progress * (ctr.itemWidth * (_currentIdx + _infiniteNum)) + 'px'});
            //         window.requestAnimationFrame(act);
            //     } else {
            //         utils.style(ctr.wrap, {'transition-duration': 0});
            //     };
            // };
            function act() {
                var exx = x === undefined ? 0:x;
                function callback() {
                    ctr.wrap.style.transitionDuration = option.animationTime / 1000 + 's';
                    ctr.wrap.style.marginLeft = -ctr.itemWidth * (_currentIdx + _infiniteNum) + 'px';
                };
                ctr.wrap.style.transitionDuration = '0s';
                ctr.wrap.style.marginLeft = -ctr.itemWidth * (_cloneCurrentIdx + _infiniteNum) + exx + 'px';
                clearTimeout(ctr.aniSto);
                ctr.aniSto = setTimeout(callback, 10);
            };
            // function act(t) {
            //     clearTimeout(ctr.aniSto);
            //     utils.style(ctr.wrap, {'margin-left': -ctr.itemWidth * (_cloneCurrentIdx + _infiniteNum) + 'px', 'transition-duration': option.animationTime / 1000 + 's'});
            //     ctr.aniSto = setTimeout(function() {
            //         utils.style(ctr.wrap, {'margin-left': -ctr.itemWidth * (_currentIdx + _infiniteNum) + 'px', 'transition-duration': 0});
            //     }, t);
            // };
            if (option.double || !ctr.ing) {
                i = i === false?idx-option.direct:i;
                i = i === true?idx+option.direct:i;
                var _currentIdx = i === undefined?idx+option.direct:i;
                var _cloneCurrentIdx = _currentIdx;
                if (_cloneCurrentIdx < 0) {
                    _cloneCurrentIdx = ctr.itemLength;
                } else if (_cloneCurrentIdx > ctr.itemLength - 1) {
                    _cloneCurrentIdx = - 1;
                } else {
                    _cloneCurrentIdx = idx;
                };
                _currentIdx = (_currentIdx > ctr.itemLength - 1)?0:_currentIdx;
                _currentIdx = (_currentIdx < 0)?ctr.itemLength - 1:_currentIdx;
                ctr.itemWidth = ctr.item[idx].offsetWidth;
                var _infiniteNum = ctr.cloneLength === undefined?0:ctr.cloneLength;
                _infiniteNum = option.center?_infiniteNum - Math.floor(_infiniteNum / 2):_infiniteNum;
                act();
                if(option.indicator) {
                    ctr.indicators[idx/option.direct].classList.remove(option.currentClassName);
                    ctr.indicators[_currentIdx/option.direct].classList.add(option.currentClassName);
                };
                // utils.style(ctr.item[idx], {'z-index': '1'});
                // utils.style(ctr.item[_currentIdx], {'z-index': '2'});
                ctr.item[idx].style.zIndex = 1;
                ctr.item[_currentIdx].style.zIndex = 2;
                ctr.item[idx].classList.remove(option.currentClassName);
                ctr.item[_currentIdx].classList.add(option.currentClassName);
                // utils.style(ctr.item[_currentIdx], {'z-index': '2', 'position': 'relative'});
                if (option.fixed !== false) {
                    ctr.slide.classList.remove(option.fixedClassName);
                    for(var i in option.fixed) {
                        if (_currentIdx === option.fixed[i]) {
                            ctr.slide.classList.add(option.fixedClassName);
                        }
                    };
                };
                idx = _currentIdx;
                ing();
                return 'work done';
            } else {
                return 'work false';
            };
        };
        var touch = function() {
            var start;
            var position;
            var direct;
            var movex;
            var movey;
            ctr.slide.ontouchstart = function(e) {
                movex = 0;
                movey = e.touches[0].screenY;
                start = -e.touches[0].screenX;
                position = Number(ctr.wrap.style.marginLeft.replace('px', ''));
            };
            ctr.slide.ontouchmove = function(e) {
                if(option.double || !ctr.ing) {
                    movex = start + e.touches[0].screenX;
                    ctr.wrap.style.transitionDuration =  '0s';
                    ctr.wrap.style.marginLeft =  position + movex + 'px';
                    (Math.abs(movex) > option.touchSafeWidth) && (autoStop());
                }
            };
            ctr.slide.ontouchend = function() {
                if (movex < -option.touchSafeWidth) {
                    direct = true;
                } else if (movex > option.touchSafeWidth) {
                    direct = false;
                } else if (movex >= -option.touchSafeWidth && movex <= option.touchSafeWidth) {
                    direct = idx;
                };
                (!option.autoIng) && (autoStart());
                (direct !== undefined) && (move(direct, movex));
            };
        };
        var indicator = function() {
            if(option.indicator) {
                ctr.indicator = document.createElement('span');
                ctr.indicators = ctr.indicator.childNodes;
                ctr.slide.append(ctr.indicator);
                ctr.indicator.classList.add(option.indicatorClassName);
                for(var i = 0; i < ctr.itemLength / option.direct; i++) {
                    var _idc = document.createElement('i');
                    ctr.indicator.append(_idc);
                    _idc.setAttribute('data-index', i);
                    _idc.onclick = function() {
                        autoStop();
                        move(Number(this.getAttribute('data-index') * option.direct));
                        clearTimeout(ctr.btnSto);
                        ctr.btnSto = setTimeout(function() {
                            autoStart();
                        }, option.autoTime);
                    };
                }
            }
        }();
        var button = function() {
            if(option.button) {
                ctr.buttonLeft = document.createElement('button');
                ctr.buttonRight = document.createElement('button');
                ctr.buttonLeft.classList.add(option.buttonLeftClassName);
                ctr.buttonRight.classList.add(option.buttonRightClassName);
                ctr.buttonLeft.innerText = '이전 슬라이드 보기';
                ctr.buttonRight.innerText = '이후 슬라이드 보기';
                ctr.buttonLeft.onclick = function() {
                    autoStop();
                    move(false);
                    clearTimeout(ctr.btnSto);
                    ctr.btnSto = setTimeout(function() {
                        autoStart();
                    }, option.autoTime);
                };
                ctr.buttonRight.onclick = function() {
                    autoStop();
                    move();
                    clearTimeout(ctr.btnSto);
                    ctr.btnSto = setTimeout(function() {
                        autoStart();
                    }, option.autoTime);
                };
                ctr.slide.append(ctr.buttonLeft);
                ctr.slide.append(ctr.buttonRight);
            }
        }();
        var autoStop = function() {
            if(option.auto) {
                clearInterval(ctr.siv);
                option.autoIng = false;
            };
        };
        var autoStart = function() {
            if(option.auto) {
                autoStop();
                option.autoIng = true;
                ctr.siv = setInterval(function() {
                    move();
                }, option.autoTime);
            };
        };
        var start = function() {
            move(option.startIndex);
            autoStart();
            touch();
        };
        utils.ready(start);
        return {
            move: move,
            autoStart: autoStart,
            autoStop: autoStop,
            index: function(){return idx;}
        }
    };
    root.uiSlide = uiSlide;

}());