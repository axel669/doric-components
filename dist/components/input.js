"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

var _util = require("../util");

var _style$add;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputTypes = ['text', 'number', 'password', 'tel', 'email'];
var inputSelectors = inputTypes.map(function (type) {
  return "doric-input[type='".concat(type, "'] > input");
}).join(', ');

_style.default.add((_style$add = {
  "doric-input": {
    margin: 2,
    display: 'block',
    position: 'relative'
  },
  "doric-input > input, doric-input > textarea": {
    width: '100%',
    fontFamily: "Roboto, Arial"
  },
  "doric-input > textarea": {
    height: 75
  }
}, _defineProperty(_style$add, "".concat(inputSelectors, ", doric-input > textarea"), {
  border: '2px solid transparent',
  borderBottom: "2px solid ".concat(_theme.default.input.border.normal),
  backgroundColor: 'transparent',
  padding: '5px 7px',
  fontSize: 13,
  color: _theme.default.input.text.normal
}), _defineProperty(_style$add, "doric-input > input:focus, doric-input > textarea:focus", {
  borderBottomColor: _theme.default.input.border.focus
}), _defineProperty(_style$add, "doric-input-label", {
  display: 'block',
  padding: 2,
  color: _theme.default.input.label.text.normal,
  fontSize: 12
}), _defineProperty(_style$add, "doric-input-label[required='true']", {
  color: _theme.default.input.label.text.required
}), _defineProperty(_style$add, "doric-input-label[optional='true']", {
  color: _theme.default.input.label.text.optional
}), _defineProperty(_style$add, "doric-input > input[disabled]", {
  backgroundColor: _theme.default.input.bg.disabled,
  borderColor: _theme.default.input.bg.disabled
}), _style$add));

var DoricInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DoricInput, _React$PureComponent);

  function DoricInput(props) {
    var _this;

    _classCallCheck(this, DoricInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoricInput).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUpdate", function (nextProps) {
      if (_this.props.loaderType !== nextProps.loaderType) {
        _this.refreshLoader(nextProps.loaderType);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "refreshLoader", function (type) {
      _this.loader = _react.default.createElement("div", {
        style: {
          position: 'absolute',
          left: 'auto',
          right: 4,
          bottom: 0
        }
      }, _react.default.createElement(_reactLoaderSpinner.default, {
        type: type,
        width: 20,
        height: 20
      }));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var _this$props = _this.props,
          wrapperStyle = _this$props.wrapperStyle,
          wrapperClassName = _this$props.wrapperClassName,
          value = _this$props.value,
          _this$props$label = _this$props.label,
          label = _this$props$label === void 0 ? null : _this$props$label,
          required = _this$props.required,
          optional = _this$props.optional,
          _this$props$loader = _this$props.loader,
          loader = _this$props$loader === void 0 ? false : _this$props$loader,
          _this$props$loaderTyp = _this$props.loaderType,
          loaderType = _this$props$loaderTyp === void 0 ? 'Oval' : _this$props$loaderTyp,
          _this$props$onChange = _this$props.onChange,
          onChange = _this$props$onChange === void 0 ? function () {} : _this$props$onChange,
          type = _this$props.type,
          Element = _this$props.Element,
          passThrough = _objectWithoutProperties(_this$props, ["wrapperStyle", "wrapperClassName", "value", "label", "required", "optional", "loader", "loaderType", "onChange", "type", "Element"]);

      var labelElem = label === null ? null : _react.default.createElement("doric-input-label", {
        required: required,
        optional: optional
      }, label);
      var loaderElem = loader !== true ? null : _this.loader;
      return _react.default.createElement("doric-input", {
        type: type,
        class: wrapperClassName,
        style: wrapperStyle
      }, labelElem, _react.default.createElement(Element, _extends({}, passThrough, {
        type: type,
        value: value,
        onChange: onChange
      })), loaderElem);
    });

    _this.refreshLoader(props.loaderType || "Oval");

    return _this;
  }

  return DoricInput;
}(_react.default.PureComponent);

var inputs = {
  textarea: function DoricTextarea(props) {
    return _react.default.createElement(DoricInput, _extends({}, props, {
      type: "textarea",
      Element: "textarea"
    }));
  }
};

var _loop = function _loop() {
  var type = inputTypes[_i];

  inputs[type] = function (props) {
    return _react.default.createElement(DoricInput, _extends({}, props, {
      type: type,
      Element: "input"
    }));
  };

  (0, _util.setFunctionName)(inputs[type], "Doric".concat(type.slice(0, 1).toUpperCase()).concat(type.slice(1), "Input"));
};

for (var _i = 0; _i < inputTypes.length; _i++) {
  _loop();
}

var _default = inputs;
exports.default = _default;