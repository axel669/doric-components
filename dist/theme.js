"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutableUpdateValues = _interopRequireDefault(require("immutable-update-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

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
          customTheme = _objectWithoutProperties(_DoricTheme, ["__global"]);

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
            if (!_iteratorNormalCompletion && _iterator.return != null) {
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
      var keyList = new Set(_toConsumableArray(Object.keys(baseTheme)).concat(_toConsumableArray(Object.keys(customTheme))));
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var key = _step2.value;

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

        for (var _iterator2 = keyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return {
        v: _objectSpread({}, baseTheme, customTheme)
      };
    }();

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return baseTheme;
}();

var theme = (0, _immutableUpdateValues.default)({}, Object.keys(themeValues).reduce(function (theme, key) {
  theme["".concat(key, ".$set")] = themeValues[key];
  return theme;
}, {}), true);
var _default = theme;
exports.default = _default;