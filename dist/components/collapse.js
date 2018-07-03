"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _customListeners = _interopRequireDefault(require("./customListeners"));

var _icon = _interopRequireDefault(require("./icon"));

var _button = _interopRequireDefault(require("./button"));

var _util = _interopRequireDefault(require("../util"));

var _style = _interopRequireDefault(require("../style"));

var _theme = _interopRequireDefault(require("../theme"));

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

_style.default.add({
  "doric-collapse": {
    display: 'block',
    border: "1px solid ".concat(_theme.default.collapse.border.normal),
    borderRadius: 2,
    margin: 4,
    overflow: 'hidden'
  },
  "doric-collapse-title": {
    display: 'block',
    cursor: 'pointer',
    backgroundColor: _theme.default.collapse.title.bg.normal,
    position: 'relative',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
  },
  "doric-collapse-title::after": {
    content: "\"".concat(_icon.default.icons["ion-chevron-left"], "\""),
    position: 'absolute',
    top: '50%',
    left: 'auto',
    right: 12,
    transform: 'translateY(-50%)',
    fontFamily: "Ionic",
    fontSize: 16,
    color: _theme.default.collapse.title.text.normal,
    transition: 'transform 100ms linear'
  },
  "doric-collapse[open='true'] doric-collapse-title::after": {
    transform: 'translateY(-50%) rotate(-90deg)'
  },
  "doric-collapse-content": {
    display: 'block',
    marginTop: 4
  },
  "doric-collapse[open='false'] > doric-collapse-content": {
    display: 'none'
  },
  "doric-collapse-title > doric-button": {
    borderRadius: 0,
    textAlign: 'left',
    color: _theme.default.collapse.title.text.normal
  }
});

var DoricCollapse =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DoricCollapse, _React$Component);

  function DoricCollapse(_props) {
    var _this;

    _classCallCheck(this, DoricCollapse);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoricCollapse).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {
      var open = _this.state.open === false;

      _this.setState(function () {
        return {
          open: open
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var _this$props = _this.props,
          title = _this$props.title,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["title", "children"]);

      var open = _this.state.open;
      return _react.default.createElement("doric-collapse", _extends({}, props, {
        open: open
      }), _react.default.createElement("doric-collapse-title", null, _react.default.createElement(_button.default, {
        text: title,
        onTap: _this.toggle,
        block: true,
        flush: true
      })), _react.default.createElement("doric-collapse-content", null, children));
    });

    _this.state = {
      open: false
    };
    return _this;
  }

  return DoricCollapse;
}(_react.default.Component);

var _default = DoricCollapse;
exports.default = _default;