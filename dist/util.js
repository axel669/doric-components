"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.animFrame = exports.wait = exports.component = exports.createPureClass = exports.setFunctionName = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("./theme"));

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

Number.prototype.to = function (end) {
  var array = [];
  var current = this + 0;

  while (current < end) {
    array.push(current);
    current += 1;
  }

  return array;
};

var wait = function wait(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

exports.wait = wait;

var animFrame = function animFrame() {
  return new Promise(function (resolve) {
    return requestAnimationFrame(resolve);
  });
};

exports.animFrame = animFrame;

var setFunctionName = function setFunctionName(func, name) {
  Object.defineProperty(func, 'name', {
    value: name,
    writable: false
  });
  return func;
};

exports.setFunctionName = setFunctionName;

var createPureClass = function createPureClass(func) {
  var GenClass =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(GenClass, _React$PureComponent);

    function GenClass() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, GenClass);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GenClass)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
        return func(_this.props);
      });

      return _this;
    }

    return GenClass;
  }(_react.default.PureComponent);

  setFunctionName(GenClass, "".concat(func.name, "Pure"));
  return GenClass;
};

exports.createPureClass = createPureClass;
var component = {
  bindProps: function bindProps(props, Component) {
    return setFunctionName(function (newProps) {
      return _react.default.createElement(Component, _extends({}, props, newProps));
    }, "Bound:".concat(Component.name));
  }
};
exports.component = component;
var _default = {
  background: {
    after: {
      base: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        content: "\"\"",
        transition: 'background-color 250ms linear'
      },
      colorize: function colorize(color) {
        return {
          backgroundColor: color,
          transition: 'none'
        };
      }
    }
  },
  color: {
    primaryBlue: "#2196F3"
  }
};
exports.default = _default;