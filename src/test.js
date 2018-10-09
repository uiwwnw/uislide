; (function () {
    var root = this;
    var utils = (function () {
        var ready = function (fn) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            };
        }
        var repeat = function (el, method, arg) {
            for (var i = 0; i < el.length; i++) {
                method(el[i], arg);
            };
        };
        var returnOption = function (opt) {
            var option = {};
            option.ltr = true;
            option.startIndex = 0;
            
            option.loop = false;
            option.double = false;
            
            option.auto = true;
            option.autoIng = false;
            option.autoTime = 3000;
            
            option.view = 1;
            option.slideNumber = 1;

            option.zIndex = true;
            option.currentClassName = 'current';
            option.fixedClassName = 'fixed';

            option.fixed = false;
            option.center = false;

            option.touchSafeWidth = 40;

            option.button = true;
            option.buttonLeftClassName = 'leftBtn';
            option.buttonRightClassName = 'rightBtn';

            option.indicator = true;
            option.indicatorClassName = 'indicator';

            option.animationTime = 499;
            option = Object.assign(option, opt);
            option.direct = option.ltr ? option.slideNumber : -option.slideNumber;
            return option;
        }
        return {
            ready: ready,
            returnOption: returnOption,
            repeat: repeat
        }
    }());

    var uiSlide = function (e, opt) {
        var elem = document.querySelector(e);
        var length = elem.length;

        if (length === 0) {
            return false;
        };
        var ctr = new Object;

        var idx = 0;
        var option = utils.returnOption(opt);
        var ing = function () {
            ctr.ing = true;
            ctr.ingSto = setTimeout(function () {
                ctr.ing = false;
            }, option.animationTime);
        };
        var init = (function () {
            ctr.siv;
            ctr.ingSto;
            ctr.aniSto;
            ctr.ing = false;
            ctr.slide = elem;
            ctr.slideWidth = ctr.slide.offsetWidth;
            ctr.wrap = ctr.slide.children[0];
            ctr.item = Array.prototype.slice.call(ctr.wrap.children);
            ctr.itemWidth = ctr.slideWidth / option.view;
            ctr.itemLength = ctr.item.length;
            // utils.style(ctr.slide, { 'overflow': 'hidden', 'position': 'relative' });
            // utils.style(ctr.wrap, {'display': 'flex', 'width': ctr.slideWidth + 'px', 'transition-property': 'transform', 'will-change': 'transform' });
            // utils.repeat(ctr.item, utils.style, { 'z-index': option.zIndex ? 1 : undefined, 'flex-shrink': '0', 'width': 1/option.view * 100 + '%' });
            ctr.slide.style.overFlow = 'hidden';
            ctr.slide.style.position = 'relative';
            ctr.wrap.style.display = 'flex';
            ctr.wrap.style.width = ctr.slideWidth + 'px';
            ctr.wrap.style.transitionProperty = 'transform';
            ctr.wrap.style.willChange = 'transform';
            for(var i = 0; i < ctr.itemLength; i++) {
                ctr.item[i].style.zIndex = option.zIndex ? 1 : undefined;
                ctr.item[i].style.flexShrink = 0;
                ctr.item[i].style.width = 1/option.view * 100 + '%';
            }
            if (option.loop) {
                ctr.cloneLength = option.view;
                ctr.afterClone = [];
                ctr.beforeClone = [];
                for (var i = 0; i < ctr.cloneLength; i++) {
                    var _a = ctr.item[i].cloneNode(true);
                    var _b = ctr.item[ctr.itemLength - 1 - i].cloneNode(true);
                    _a.classList.add('clone');
                    _b.classList.add('clone');
                    ctr.wrap.append(_a);
                    ctr.wrap.prepend(_b);
                    ctr.afterClone.push(_a);
                    ctr.beforeClone.push(_b);
                };
            };
        }());

        var move = function (i, x) {
            function act() {
                function _act(idx, time, x) {
                    var exx = x === undefined ? 0 : x;
                    var _width = Number(-ctr.itemWidth * (idx + _infiniteNum) + exx);
                    ctr.wrap.style.transitionDuration = time + 's';
                    if (option.fixed !== false && option.fixed.indexOf(_currentIdx) !== -1) {
                        ctr.wrap.style.transitionProperty = 'margin-left';
                        ctr.wrap.style.willChange = 'margin-left';
                        ctr.wrap.style.transform = 'none';
                        ctr.wrap.style.marginLeft = _width + 'px';
                    } else {
                        ctr.wrap.style.transitionProperty = 'transform';
                        ctr.wrap.style.willChange = 'transform';
                        ctr.wrap.style.marginLeft = 'auto';
                        ctr.wrap.style.transform = 'translateX(' + _width + 'px)';
                    };
                };
                (option.loop && _cloneCurrentIdx !== _currentIdx) && (_act(_cloneCurrentIdx, 0, x));
                clearTimeout(ctr.aniSto);
                ctr.aniSto = setTimeout(function() {
                    _act(_currentIdx, option.animationTime / 1000);
                }, 20);
            };
            if (option.double || !ctr.ing) {
                var _currentIdx;
                var _cloneCurrentIdx = _currentIdx;
                var _infiniteNum = ctr.cloneLength === undefined ? 0 : ctr.cloneLength;
                _infiniteNum = option.center ? _infiniteNum - Math.floor(_infiniteNum / 2) : _infiniteNum;
                if(i === false) {
                    _currentIdx = idx - option.direct;
                } else if (i === true || i === undefined) {
                    _currentIdx = idx + option.direct;
                } else {
                    _currentIdx = i;
                };
                if (_currentIdx < 0) {
                    _currentIdx = ctr.itemLength - 1;
                    _cloneCurrentIdx = ctr.itemLength;
                } else if(_currentIdx > ctr.itemLength - 1) {
                    _currentIdx = 0;
                    _cloneCurrentIdx = - 1;
                } else {
                    _currentIdx = _currentIdx;
                    _cloneCurrentIdx = idx;
                };
            
                if (option.indicator) {
                    ctr.indicators[idx / option.direct].classList.remove(option.currentClassName);
                    ctr.indicators[_currentIdx / option.direct].classList.add(option.currentClassName);
                };
                if (option.zIndex) {
                    ctr.item[idx].style.zIndex = 1;
                    ctr.item[_currentIdx].style.zIndex = 2;
                };
                ctr.item[idx].classList.remove(option.currentClassName);
                ctr.item[_currentIdx].classList.add(option.currentClassName);
                if (option.fixed !== false) {
                    if (option.fixed.indexOf(_currentIdx) !== -1) {
                        ctr.slide.classList.add(option.fixedClassName);
                    } else {
                        ctr.slide.classList.remove(option.fixedClassName);
                    };
                };
                act();
                ing();
                idx = _currentIdx;
                return 'work done';
            } else {
                return 'work false';
            };
        };
        var touch = function () {
            var start;
            var margin;
            var transformX;
            var direct;
            var movex;
            var movey;
            ctr.slide.ontouchstart = function (e) {
                movex = 0;
                movey = e.touches[0].screenY;
                start = -e.touches[0].screenX;
                transformX = ctr.wrap.style.transform.replace('translateX(', '');
                transformX = Number(transformX.replace('px)', ''));
                margin = Number(ctr.wrap.style.marginLeft.replace('px', ''));
            };
            ctr.slide.ontouchmove = function (e) {
                if (option.double || !ctr.ing) {
                    movex = start + e.touches[0].screenX;
                    ctr.wrap.style.transitionDuration = '0s';
                    (ctr.wrap.style.transform !== 'none') && (ctr.wrap.style.transform = 'translateX(' + Number(transformX + movex) + 'px)');
                    (ctr.wrap.style.marginLeft !== 'auto') && (ctr.wrap.style.marginLeft = Number(margin + movex) + 'px');
                    (Math.abs(movex) > option.touchSafeWidth) && (autoStop());
                }
            };
            ctr.slide.ontouchend = function () {
                if (movex < -option.touchSafeWidth) {
                    direct = true;
                } else if (movex > option.touchSafeWidth) {
                    direct = false;
                } else if (movex === 0) {
                    direct = undefined;   
                } else {
                    direct = idx;
                };
                (!option.autoIng) && (autoStart());
                (direct !== undefined) && (move(direct, movex));
            };
        };
        var indicator = function () {
            if (option.indicator) {
                ctr.indicator = document.createElement('span');
                ctr.indicators = ctr.indicator.childNodes;
                ctr.slide.append(ctr.indicator);
                ctr.indicator.classList.add(option.indicatorClassName);
                for (var i = 0; i < ctr.itemLength / option.direct; i++) {
                    var _idc = document.createElement('i');
                    ctr.indicator.append(_idc);
                    _idc.setAttribute('data-index', i);
                    _idc.onclick = function () {
                        autoStop();
                        move(Number(this.getAttribute('data-index') * option.direct));
                        clearTimeout(ctr.btnSto);
                        ctr.btnSto = setTimeout(function () {
                            autoStart();
                        }, option.autoTime);
                    };
                }
            }
        }();
        var button = function () {
            if (option.button) {
                ctr.buttonLeft = document.createElement('button');
                ctr.buttonRight = document.createElement('button');
                ctr.buttonLeft.classList.add(option.buttonLeftClassName);
                ctr.buttonRight.classList.add(option.buttonRightClassName);
                ctr.buttonLeft.innerText = '이전 슬라이드 보기';
                ctr.buttonRight.innerText = '이후 슬라이드 보기';
                ctr.buttonLeft.onclick = function () {
                    autoStop();
                    move(false);
                    clearTimeout(ctr.btnSto);
                    ctr.btnSto = setTimeout(function () {
                        autoStart();
                    }, option.autoTime);
                };
                ctr.buttonRight.onclick = function () {
                    autoStop();
                    move();
                    clearTimeout(ctr.btnSto);
                    ctr.btnSto = setTimeout(function () {
                        autoStart();
                    }, option.autoTime);
                };
                ctr.slide.append(ctr.buttonLeft);
                ctr.slide.append(ctr.buttonRight);
            }
        }();
        var autoStop = function () {
            if (option.auto) {
                clearInterval(ctr.siv);
                option.autoIng = false;
            };
        };
        var autoStart = function () {
            if (option.auto) {
                autoStop();
                option.autoIng = true;
                ctr.siv = setInterval(function () {
                    move();
                }, option.autoTime);
            };
        };
        var start = function () {
            move(option.startIndex);
            autoStart();
            touch();
        };
        utils.ready(start);
        return {
            move: move,
            autoStart: autoStart,
            autoStop: autoStop,
            index: function () { return idx; }
        }
    };
    root.uiSlide = uiSlide;
}());