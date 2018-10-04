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
        var style = function(el, arg, time, sto) {
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
            if (time === undefined) {
                el.setAttribute('style', styleTxt);
            };
            if (time > 0) {
                el.setAttribute('style', styleTxt);
                clearTimeout(sto);
                sto = setTimeout(function() {
                    el.setAttribute('style', exProp);
                }, time);
            }
            if (time < 0) {
                clearTimeout(sto);
                sto = setTimeout(function() {
                    el.setAttribute('style', styleTxt);
                }, -time);
            };
        };
        var returnOption = function(opt) {
            var option = {};
            option.ltr = true;
            option.startIndex = 0;

            option.loop = false;

            option.auto = true;
            option.autoTime = 3000;

            option.zIndex = true;
            option.currentClassName = 'current';
            option.fixedClassName = 'fixed';

            option.fixed = false;
            option.center = false;

            option.button = true;
            option.buttonLeftClassName = 'leftBtn';
            option.buttonRightClassName = 'rightBtn';

            option.indicator = true;
            option.indicatorClassName = 'indicator';

            option.direct = option.ltr?1:-1;
            option.animation = 'margin-left';
            option.animationTime = 499;
            option = Object.assign(option, opt);
            return option;
        }
        return {
            ready: ready,
            returnOption: returnOption,
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
            utils.style(ctr.wrap, {'display': 'flex', 'width': ctr.slideWidth+'px','transition': option.animation + ' 0s ease'});
            utils.repeat(ctr.item, utils.style, {'z-index': option.zIndex?1:undefined,'flex-shrink': '0', 'width': option.width});
            if(option.loop) {
                ctr.cloneLength = Math.floor(ctr.slideWidth / ctr.item[0].offsetWidth);
                ctr.afterClone = [];
                ctr.beforeClone = [];
                for(var i = 0; i < ctr.cloneLength; i++) {
                    var _a = ctr.item[i].cloneNode(true);
                    var _b = ctr.item[ctr.itemLength - 1 - i].cloneNode(true);
                    utils.style(_b, {'margin-left': -ctr.item[ctr.itemLength - 1].offsetWidth+'px'});
                    (option.center && (Math.floor(ctr.cloneLength / 2) === i)) && (utils.style(_b, {'margin-left': 0}));
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
        var move = function(i) {
            if (!ctr.ing) {
                i = i === false?idx-option.direct:i;
                i = i === true?idx+option.direct:i;
                var _currentIdx = i === undefined?idx+option.direct:i;
                var _cloneCurrentIdx = _currentIdx;
                _currentIdx = (_currentIdx > ctr.itemLength - 1)?0:_currentIdx;
                _currentIdx = (_currentIdx < 0)?ctr.itemLength - 1:_currentIdx;
                var _width = ctr.item[idx].offsetWidth;
                if(option.loop && _cloneCurrentIdx > ctr.itemLength - ctr.cloneLength - 1) {
                    utils.style(ctr.wrap, {'margin-left': -_width * _cloneCurrentIdx + 'px'});
                    utils.style(ctr.wrap, {'margin-left': -_width * _currentIdx + 'px'}, -Number(option.animationTime + 1), ctr.aniSto);
                    utils.style(ctr.wrap, {'transition-duration': option.animationTime / 1000 + 's'}, option.animationTime, ctr.aniSto);
                } else if(option.loop && _cloneCurrentIdx < 0) {
                    utils.style(ctr.wrap, {'margin-left': -_width * Number(ctr.itemLength - 1 - _cloneCurrentIdx) + 'px'});
                    utils.style(ctr.wrap, {'margin-left': -_width * _currentIdx + 'px', 'transition-duration': option.animationTime / 1000 + 's'}, -1, ctr.aniSto);
                    utils.style(ctr.wrap, {'margin-left': -_width * _currentIdx + 'px'}, -Number(option.animationTime + 1), ctr.aniSto);
                } else {
                    utils.style(ctr.wrap, {'margin-left': -_width * _currentIdx + 'px'});
                    utils.style(ctr.wrap, {'transition-duration': option.animationTime / 1000 + 's'}, option.animationTime, ctr.aniSto);
                };
                if(option.indicator) {
                    ctr.indicators[idx].classList.remove(option.currentClassName);
                    ctr.indicators[_currentIdx].classList.add(option.currentClassName);
                };
                utils.style(ctr.item[idx], {'z-index': '1'});
                utils.style(ctr.item[_currentIdx], {'z-index': '2'});
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
                return 'work done'
            } else {
                return 'work false';
            };
        };
        var indicator = function() {
            if(option.indicator) {
                ctr.indicator = document.createElement('span');
                ctr.indicators = ctr.indicator.childNodes;
                ctr.slide.append(ctr.indicator);
                ctr.indicator.classList.add(option.indicatorClassName);
                for(var i = 0; i < ctr.itemLength; i++) {
                    var _idc = document.createElement('i');
                    ctr.indicator.append(_idc);
                    _idc.setAttribute('data-index', i);
                    _idc.onclick = function() {
                        autoStop();
                        move(Number(this.getAttribute('data-index')));
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
            };
        };
        var autoStart = function() {
            if(option.auto) {
                autoStop();
                ctr.siv = setInterval(function() {
                    move();
                }, option.autoTime);
            };
        };
        var start = function() {
            move(option.startIndex);
            autoStart();
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