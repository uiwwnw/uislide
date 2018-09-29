;(function() {
    var root = this;
    var utils = (function() {
        var repeat = function(el, method, arg) {
            for(var i = 0; i < el.length; i++) {
                method(el[i], arg);
            };
        };
        var style = function(el, arg) {
            var _style = '';
            var value = new Object;
            var exProp = el.getAttribute('style') === null?'':el.getAttribute('style');
            var _val = (function() {
                if (exProp === '') {
                    return false;
                };
                var trim = exProp.replace(/(\s*)/g, '');
                var a = trim.split(';');
                for(var i = 0; i < a.length; i++) {
                    var _a = a[i].split(':');
                    if(_a[0] !== '') {
                        value[_a[0]] = _a[1];
                    }
                };
            }());
            value = Object.assign(value, arg);
            for (var i in value) {
                _style +=  i + ': ' + value[i] + ';';
            };
            el.setAttribute('style', _style);
        };
        var returnOption = function(opt) {
            var option = {};
            option.ltr = true;
            option.direct = option.ltr?1:-1;
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
        var elem = document.querySelectorAll(e);
        var ctr = new Array;
        var length = elem.length;
        if(length === 0) {
            return false;
        };

        var idx = 0;
        var option = utils.returnOption(opt);
        var init = function() {
            for(var i = 0; i < length; i++) {
                var _ctr = new Object;
                _ctr.slide = elem[i];
                _ctr.wrap = _ctr.slide.childNodes[0];
                _ctr.item = _ctr.wrap.childNodes;
                utils.style(_ctr.slide, {'overflow': 'hidden'});
                utils.style(_ctr.wrap, {'display': 'flex'});
                utils.repeat(_ctr.item, utils.style, {'flex-shrink': '0'});
                ctr.push(_ctr);
            };
        }();
        var move = function() {
        };
        return {
            move: move
        }
    };
    root.uiSlide = uiSlide;

}());