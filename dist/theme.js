'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var niceBlue = '#1d62d5';
var normalHL = 'rgba(0, 0, 0, 0.4)';
var focusHL = 'rgba(0, 0, 0, 0.125)';
var baseTheme = {
    'body.bg.normal': '#f0f0f0',
    'body.text.normal': 'black',

    'button.hl.normal': normalHL,
    'button.hl.focus': focusHL,
    'button.bg.normal': 'transparent',
    'button.text.normal': 'black',
    'button.bg.primary': niceBlue,
    'button.text.primary': 'white',
    'button.bg.danger': '#F44336',
    'button.text.danger': 'white',
    'button.bg.accent': '#FF4081',
    'button.text.accent': 'white',

    'card.bg.normal': 'white',
    'card.border.normal': 'white',

    'checkbox.checkColor': niceBlue,
    'checkbox.hl.normal': normalHL,
    'checkbox.hl.focus': focusHL,

    'collapse.title.bg.normal': niceBlue,
    'collapse.title.text.normal': 'white',
    'collapse.border.normal': 'lightgray',

    'divider.border.normal': 'lightgray',

    'input.border.normal': 'lightgray',
    'input.border.focus': niceBlue,
    'input.text.normal': 'black',
    'input.label.text.normal': 'black',
    'input.label.text.optional': niceBlue,
    'input.label.text.required': '#F44336',
    'input.bg.disabled': 'lightgray',

    'radio.circleColor': niceBlue,
    'radio.text.normal': 'black',

    'select.border.normal': 'lightgray',
    'select.border.focus': niceBlue,
    'select.text.normal': 'black',

    'slider.track.bg.normal': 'lightgray',
    'slider.track.bg.value': niceBlue,
    'slider.thumb.normal': niceBlue,

    'tabs.tab.hl.normal': normalHL,
    'tabs.tab.bg.normal': 'white',
    'tabs.tab.bg.active': 'white',
    'tabs.tab.border.normal': 'lightgray',
    'tabs.tab.border.active': niceBlue,
    'tabs.tab.text.normal': 'black',
    'tabs.tab.text.active': niceBlue,

    'toggle.hl.normal': normalHL,
    'toggle.hl.focus': focusHL,
    'toggle.thumb.on': niceBlue,
    'toggle.thumb.off': '#666768',
    'toggle.track.on': '#79aafb',
    'toggle.track.off': 'lightgray'
};

var themeValues = function () {
    if (typeof DoricTheme !== 'undefined') {
        var _ret = function () {
            var _DoricTheme = DoricTheme,
                __global = _DoricTheme.__global,
                customTheme = _objectWithoutProperties(_DoricTheme, ['__global']);

            var endsWithOne = function endsWithOne(str, values) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        if (str.endsWith(value) === true) {
                            return value;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return undefined;
            };

            var values = {};
            var globalNames = Object.keys(__global);
            var keyList = new Set([].concat(_toConsumableArray(Object.keys(baseTheme)), _toConsumableArray(Object.keys(customTheme))));

            var _loop = function _loop(key) {
                var globalValue = function () {
                    var keyName = endsWithOne(key, globalNames);
                    if (keyName !== undefined) {
                        return __global[keyName];
                    }
                    return undefined;
                }();
                var value = customTheme[key] || globalValue;
                if (value !== undefined) {
                    customTheme[key] = value;
                }
            };

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = keyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    _loop(key);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return {
                v: _extends({}, baseTheme, customTheme)
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    return baseTheme;
}();

var theme = (0, _update2.default)({}, Object.keys(themeValues).reduce(function (theme, key) {
    theme[key + '.$set'] = themeValues[key];
    return theme;
}, {}), true);

exports.default = theme;