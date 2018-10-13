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
        var repeat = function (length, method) {
            for (var i = 0; i < length; i++) {
                method(i);
            };
        };
        var style = function(el, style, callback) {
            for(var i in style) {
                el.style[i] = style[i];
            };
            function _fn() {
                var result = false;
                var bool = [];
                for(var i in style) {
                    bool.push(el.style[i] === style[i]);
                };
                result = bool.indexOf(false) === -1;
                if(callback) {
                    (!result) && (requestAnimationFrame(_fn));
                    (result) && (callback());
                }
            };
            (callback)&&(_fn());
        };
        var ease = function(n) {
            n *= 2;
            if (n < 1) return 0.5 * n * n;
            return - 0.5 * (--n * (n - 2) - 1);
        };
        var position = function(el, time, de, st, fixed, bool) {
            var stop = false;
            var startx = st;
            var destx = de;
            var duration = time;
            var start = null;
            var end = null;
            // if(bool) {
            //         startx = el.style.transform === 'none'?-el.style.marginLeft.replace(/[^0-9]/g, ''):-el.style.transform.replace(/[^0-9]/g, '');
            // } else {
            //     startx = st;
            // };
            function startAnim(timeStamp) {
                start = timeStamp;
                end = start + duration;
                draw(timeStamp);
            };

            function draw(now) {
                if (stop) return;
                if (now - start >= duration) stop = true;
                var p = (now - start) / duration;
                val = utils.ease(p);
                var x = Math.round(startx + (destx - startx) * val);
                if(fixed) {
                    utils.style(el, {'transform': 'none'});
                    // build error ``
                    // utils.style(el, {'marginLeft': `${x}px`});
                    utils.style(el, {'marginLeft': x + 'px'});
                } else {
                    utils.style(el, {'marginLeft': 'auto'});
                    // build error ``
                    // utils.style(el, {'transform': `translateX(${x}px)`});
                    utils.style(el, {'transform': 'translateX(' + x + 'px)'});
                }
                requestAnimationFrame(draw);
            };
            requestAnimationFrame(startAnim);
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
            style: style,
            ease: ease,
            position: position,
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
            ctr.indLast = ctr.itemLength%option.direct === 0;
            utils.style(ctr.slide, {'overflow': 'hidden', 'position': 'relative'});
            utils.style(ctr.wrap, {'display': 'flex', 'width': ctr.slideWidth + 'px'});
            utils.repeat(ctr.itemLength, 
                function(i) {
                    utils.style(ctr.item[i], {'zIndex': option.zIndex ? 1 : undefined, 'flexShrink': 0, 'width': 1/option.view * 100 + '%'})
                }
            );
            if (option.loop) {
                ctr.cloneLength = option.view;
                ctr.afterClone = [];
                ctr.beforeClone = [];
                utils.repeat(ctr.cloneLength, 
                    function(i){
                        var _a = ctr.item[i].cloneNode(true);
                        var _b = ctr.item[ctr.itemLength - 1 - i].cloneNode(true);
                        _a.classList.add('clone');
                        _b.classList.add('clone');
                        ctr.wrap.append(_a);
                        ctr.wrap.prepend(_b);
                        ctr.afterClone.push(_a);
                        ctr.beforeClone.push(_b);
                    }
                );
            };
        }());

        var move = function (i, x) {
            if (option.double || !ctr.ing) {
                var _currentIdx;
                var _cloneCurrentIdx;
                var _fixed;
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
                    if(!ctr.indLast&&idx !== 0){
                        _currentIdx = 0;
                        _cloneCurrentIdx = idx;
                    } else {
                        _currentIdx = ctr.itemLength - 1;
                        _cloneCurrentIdx = ctr.itemLength;
                    };
                } else if(_currentIdx > ctr.itemLength - 1) {
                    if(!ctr.indLast&&idx !== ctr.itemLength - 1){
                        _currentIdx = ctr.itemLength - 1;
                        _cloneCurrentIdx = idx;
                    } else {
                        _currentIdx = 0;
                        _cloneCurrentIdx = - 1;
                    };
                } else {
                    _currentIdx = _currentIdx;
                    _cloneCurrentIdx = idx;
                };
                (!option.loop) && (_cloneCurrentIdx = idx);
                if (option.indicator) {
                    ctr.indicators[Math.ceil(idx / option.direct)].classList.remove(option.currentClassName);
                    ctr.indicators[Math.ceil(_currentIdx / option.direct)].classList.add(option.currentClassName);
                };
                if (option.zIndex) {
                    utils.style(ctr.item[idx], {'zIndex': '1'});
                    utils.style(ctr.item[_currentIdx], {'zIndex': '2'});
                };
                ctr.item[idx].classList.remove(option.currentClassName);
                ctr.item[_currentIdx].classList.add(option.currentClassName);
                if (option.fixed !== false) {
                    if (option.fixed.indexOf(_currentIdx) !== -1) {
                        _fixed = true;
                        ctr.slide.classList.add(option.fixedClassName);
                    } else {
                        _fixed = false;
                        ctr.slide.classList.remove(option.fixedClassName);
                    };
                };
                var touchX = x === undefined ? 0 : x;
                var de = Math.round(Number(-ctr.itemWidth * (_currentIdx + _infiniteNum)));
                var st = Math.round(Number(-ctr.itemWidth * (_cloneCurrentIdx + _infiniteNum) + touchX));
                new utils.position(ctr.wrap, option.animationTime, de, st, _fixed, option.double && ctr.ing);
                ing();
                idx = _currentIdx;
                return 'work done';
            } else {
                return 'work false';
            };
        };
        var touch = function () {
            var bool;
            var start;
            var margin;
            var transformX;
            var direct;
            var movex;
            var movey;
            ctr.slide.ontouchstart = function (e) {
                bool = true;
                movex = 0;
                movey = e.touches[0].screenY;
                start = -e.touches[0].screenX;
                transformX = ctr.wrap.style.transform.replace('translateX(', '');
                transformX = Number(transformX.replace('px)', ''));
                margin = Number(ctr.wrap.style.marginLeft.replace('px', ''));
            };
            ctr.slide.ontouchmove = function (e) {
                if (bool && option.double || !ctr.ing) {
                    movex = start + e.touches[0].screenX;
                    ctr.wrap.style.transitionDuration = '0s';
                    (ctr.wrap.style.transform !== 'none') && (ctr.wrap.style.transform = 'translateX(' + Number(transformX + movex) + 'px)');
                    (ctr.wrap.style.marginLeft !== 'auto') && (ctr.wrap.style.marginLeft = Number(margin + movex) + 'px');
                    (Math.abs(movex) > option.touchSafeWidth) && (autoStop());
                    bool = 'ing';
                }
            };
            ctr.slide.ontouchend = function () {
                if (bool === 'ing') {
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
                    bool = false;
                }
            };
        };
        var indicator = function () {
            if (option.indicator) {
                ctr.indicator = document.createElement('span');
                ctr.indicators = ctr.indicator.childNodes;
                ctr.slide.append(ctr.indicator);
                ctr.indicator.classList.add(option.indicatorClassName);
                // for (var i = 0; i < (ctr.indLast?ctr.itemLength / option.direct:ctr.itemLength / option.direct+1); i++) {
                //     var _idc = document.createElement('i');
                //     ctr.indicator.append(_idc);
                //     _idc.setAttribute('data-index', i);
                //     _idc.onclick = function () {
                //         autoStop();
                //         if(!ctr.indLast && i === Math.floor(ctr.itemLength / option.direct + 1)) {
                //             move(ctr.itemLength - 1);
                //         } else {
                //             move(Number(this.getAttribute('data-index') * option.direct));
                //         }
                //         clearTimeout(ctr.btnSto);
                //         ctr.btnSto = setTimeout(function () {
                //             autoStart();
                //         }, option.autoTime);
                //     };
                // }
                utils.repeat((ctr.indLast?ctr.itemLength / option.direct:ctr.itemLength / option.direct+1), function(i) {
                    var _idc = document.createElement('i');
                    ctr.indicator.append(_idc);
                    _idc.setAttribute('data-index', i);
                    _idc.onclick = function () {
                        autoStop();
                        if(!ctr.indLast && i === Math.floor(ctr.itemLength / option.direct + 1)) {
                            move(ctr.itemLength - 1);
                        } else {
                            move(Number(this.getAttribute('data-index') * option.direct));
                        }
                        clearTimeout(ctr.btnSto);
                        ctr.btnSto = setTimeout(function () {
                            autoStart();
                        }, option.autoTime);
                    };
                });
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