"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_style.default.add({
  "doric-slider": {
    margin: '4px 12px',
    display: 'block',
    height: 20
  },
  "doric-slider > input[type='range']": {
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '+1',
    opacity: 0
  },
  'doric-slider > doric-slider-track-bg': {
    position: 'absolute',
    top: 9,
    left: 10,
    bottom: 9,
    right: 10,
    backgroundColor: _theme.default.slider.track.bg.normal
  },
  'doric-slider doric-slider-track': {
    backgroundColor: _theme.default.slider.track.bg.value,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%'
  },
  'doric-slider doric-slider-track::after': {
    content: "\"\"",
    position: 'absolute',
    left: '100%',
    top: '50%',
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: _theme.default.slider.thumb.normal,
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
  }
});

var DoricSlider =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DoricSlider, _React$PureComponent);

  function DoricSlider(props) {
    var _this;

    _classCallCheck(this, DoricSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoricSlider).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var _this$props = _this.props,
          _this$props$min = _this$props.min,
          min = _this$props$min === void 0 ? 0 : _this$props$min,
          _this$props$max = _this$props.max,
          max = _this$props$max === void 0 ? 10 : _this$props$max,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? 0 : _this$props$value,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? function () {} : _this$props$onChange;
      var range = max - min;
      var dist = value - min;
      var pos = dist / range * 100;
      return _react.default.createElement("doric-slider", {
        style: {
          position: 'relative'
        }
      }, _react.default.createElement("input", _extends({
        type: "range"
      }, {
        min: min,
        max: max
      }, {
        value: value,
        onChange: onChange
      })), _react.default.createElement("doric-slider-track-bg", null, _react.default.createElement("doric-slider-track", {
        style: {
          width: "".concat(pos, "%")
        }
      })));
    });

    return _this;
  }

  return DoricSlider;
}(_react.default.PureComponent);

var _default = DoricSlider;
exports.default = _default;