;(function() {
    var root = this;
    var utils = (function() {
        var repeat = function(el, method, arg) {
            for(var i = 0; i < el.length; i++) {
                method(el[i], arg);
            };
        };
        var style = function(el, arg, time) {
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
            el.setAttribute('style', styleTxt);
            if (time !== undefined) {
                setTimeout(function() {
                    el.setAttribute('style', exProp);
                }, time);
            }
        };
        var returnOption = function(opt) {
            var option = {};
            option.ltr = true;
            option.startIndex = 0;

            option.loop = false;

            option.auto = true;
            option.autoTime = 2000;

            option.zIndex = true;
            option.currentClassName = 'current';
            option.fixedClassName = 'fixed';

            option.fixed = false;

            option.button = true;
            option.buttonLeftClassName = 'leftBtn';
            option.buttonRightClassName = 'rightBtn';

            option.direct = option.ltr?1:-1;
            option.animation = 'margin-left';
            option.animationTime = 700;
            option = Object.assign(option, opt);
            return option;
        }
        return {
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
            ctr.sto = setTimeout(function() {
                ctr.ing = false;
            }, option.animationTime);
        };
        var init = (function() {
            ctr.siv;
            ctr.sto;
            ctr.ing = false;
            ctr.slide = elem;
            ctr.slideWidth = ctr.slide.offsetWidth;
            ctr.wrap = ctr.slide.childNodes[0];
            ctr.item = ctr.wrap.childNodes;
            ctr.itemLength = ctr.item.length;
            utils.style(ctr.slide, {'overflow': 'hidden', 'position': 'relative'});
            utils.style(ctr.wrap, {'display': 'flex', 'width': ctr.slideWidth+'px','transition': option.animation + ' 0s ease'});
            utils.repeat(ctr.item, utils.style, {'z-index': option.zIndex?1:undefined,'flex-shrink': '0', 'width': option.width});
            // utils.repeat(ctr.item, utils.style, {'z-index': option.zIndex?1:undefined,'flex-shrink': '0', 'width': option.width});
        }());
        var move = function(i) {
            if (!ctr.ing) {
                var _exIdx = idx;
                i = i === false?idx-option.direct:i;
                i = i === true?idx+option.direct:i;
                var _currentIdx = i === undefined?idx+option.direct:i;
                _currentIdx = (_currentIdx > ctr.itemLength - 1)?0:_currentIdx;
                _currentIdx = (_currentIdx < 0)?ctr.itemLength - 1:_currentIdx;
                var _width = ctr.item[idx].offsetWidth;
                utils.style(ctr.wrap, {'margin-left': -_width * _currentIdx + 'px'});
                utils.style(ctr.wrap, {'transition-duration': option.animationTime / 1000 + 's'}, option.animationTime);
                // if(_currentIdx !== _exIdx) {
                //     utils.style(ctr.item[_exIdx], {'z-index': '0'});
                //     utils.style(ctr.item[_exIdx], {'z-index': '1'}, option.animationTime);
                // };
                utils.style(ctr.item[_exIdx], {'z-index': '1'});
                utils.style(ctr.item[_currentIdx], {'z-index': '2'});
                ctr.item[_exIdx].classList.remove(option.currentClassName);
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
        var button = function() {
            if(option.button) {
                if(ctr.buttonLeft === undefined) {
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
        move(option.startIndex);
        autoStart();
        return {
            move: move,
            autoStart: autoStart,
            autoStop: autoStop
        }
    };
    root.uiSlide = uiSlide;

}());