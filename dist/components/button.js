"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

var _customListeners = _interopRequireDefault(require("./customListeners"));

var _util = _interopRequireWildcard(require("../util"));

var _this = void 0;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
    custom
        text
            normal
            disabled
        bg
        highlight
*/
_style.default.add({
  "doric-button": {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: '8px 16px',
    margin: 4,
    position: 'relative',
    top: 0,
    left: 0,
    overflow: 'hidden',
    color: _theme.default.button.text.normal,
    backgroundColor: _theme.default.button.bg.normal,
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none'
  },
  "doric-button[block='true']": {
    display: 'flex',
    minWidth: 0
  },
  "doric-button[raised='true']": {
    boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)'
  },
  "doric-button[snug='true']": {
    padding: 0
  },
  "doric-button[flush='true']": {
    margin: 0
  },
  "doric-button[disabled='true']": {
    opacity: 0.6
  },
  "doric-button::after": _objectSpread({}, _util.default.background.after.base),
  "doric-button:focus::after": {
    backgroundColor: _theme.default.button.hl.focus
  },
  "doric-button[data-tap-active]:not([disabled='true'])::after": _objectSpread({}, _util.default.background.after.colorize(_theme.default.button.hl.normal)),
  "doric-button-content": {
    flexGrow: 1
  },
  "doric-button[primary='true']": {
    backgroundColor: _theme.default.button.bg.primary,
    color: _theme.default.button.text.primary
  },
  "doric-button[danger='true']": {
    backgroundColor: _theme.default.button.bg.danger,
    color: _theme.default.button.text.danger
  },
  "doric-button[accent='true']": {
    backgroundColor: _theme.default.button.bg.accent,
    color: _theme.default.button.text.danger
  },
  "doric-button[flat='true'][primary='true']": {
    backgroundColor: 'transparent',
    color: _theme.default.button.bg.primary
  },
  "doric-button[flat='true'][danger='true']": {
    backgroundColor: 'transparent',
    color: _theme.default.button.bg.danger
  },
  "doric-button[flat='true'][accent='true']": {
    backgroundColor: 'transparent',
    color: _theme.default.button.bg.accent
  },
  "doric-button[action='true']": {
    borderRadius: 500
  }
});

var DoricButton = function DoricButton(props) {
  var _props$onTap = props.onTap,
      tapHandler = _props$onTap === void 0 ? function () {} : _props$onTap,
      _props$onKeyDown = props.onKeyDown,
      passedOKD = _props$onKeyDown === void 0 ? function () {} : _props$onKeyDown,
      text = props.text,
      children = props.children,
      className = props.className,
      _props$tabIndex = props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
      passThrough = _objectWithoutProperties(props, ["onTap", "onKeyDown", "text", "children", "className", "tabIndex"]);

  var disabled = props.disabled;

  var onTap = function onTap(evt) {
    if (disabled !== true) {
      tapHandler(_objectSpread({}, evt, {
        type: 'tap'
      }));
    }
  };

  var onKeyDown = function onKeyDown(evt) {
    passedOKD(evt);

    if (evt.key === ' ' || evt.key === 'Enter') {
      onTap(evt);
    }
  };

  return _react.default.createElement("doric-button", _extends({
    tabIndex: disabled === true ? null : tabIndex
  }, passThrough, {
    class: className,
    onKeyDown: onKeyDown
  }), _react.default.createElement(_customListeners.default, {
    target: _this,
    listeners: {
      onTap: onTap
    }
  }), _react.default.createElement("doric-button-content", null, text || children));
};

DoricButton.pure = (0, _util.createPureClass)(DoricButton);
var _default = DoricButton;
exports.default = _default;