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

var _icon = _interopRequireDefault(require("./icon"));

var _customListeners = _interopRequireDefault(require("./customListeners"));

var _util = _interopRequireWildcard(require("../util"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_style.default.add({
  "doric-checkbox": {
    position: 'relative',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 3,
    paddingLeft: 25,
    userSelect: 'none',
    cursor: 'pointer'
  },
  "doric-checkbox::after": _objectSpread({}, _util.default.background.after.base),
  "doric-checkbox:focus::after": {
    backgroundColor: _theme.default.checkbox.hl.focus
  },
  "doric-checkbox[disabled='true']": {
    opacity: 0.7
  },
  "doric-checkbox[data-tap-active]:not([disabled='true'])::after": _objectSpread({}, _util.default.background.after.colorize(_theme.default.checkbox.hl.normal)),
  "doric-checkbox::before": {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    fontSize: 22,
    paddingLeft: 3,
    paddingRight: 3,
    fontFamily: "Ionic",
    display: 'flex',
    alignItems: 'center',
    content: "\"".concat(_icon.default.icons["ion-android-checkbox-outline-blank"], "\""),
    color: _theme.default.checkbox.checkColor
  },
  "doric-checkbox[checked='true']::before": {
    content: "\"".concat(_icon.default.icons["ion-android-checkbox"], "\"")
  },
  "doric-checkbox-content": {
    flexGrow: 1
  },
  "doric-checkbox[checkRight]": {
    paddingLeft: 3,
    paddingRight: 25
  },
  "doric-checkbox[checkRight]::before": {
    left: 'auto',
    right: 0
  },
  "doric-checkbox[alignRight]": {
    textAlign: 'right'
  }
});

var DoricCheckbox = function DoricCheckbox(props) {
  var checked = props.checked,
      label = props.label,
      children = props.children,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange,
      _props$onKeyDown = props.onKeyDown,
      passedOKD = _props$onKeyDown === void 0 ? function () {} : _props$onKeyDown,
      _props$tabIndex = props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
      fowardRef = props.fowardRef,
      passThrough = _objectWithoutProperties(props, ["checked", "label", "children", "onChange", "onKeyDown", "tabIndex", "fowardRef"]);

  var disabled = props.disabled;

  var onTap = function onTap(evt) {
    if (disabled !== true) {
      var e = _objectSpread({}, evt, {
        type: 'change',
        checked: checked === false
      });

      e.target = evt.target;
      e.target.value = e.checked;
      onChange(e);
    }
  };

  var onKeyDown = function onKeyDown(evt) {
    passedOKD(evt);

    if (evt.key === ' ' || evt.key === 'Enter') {
      onTap(evt);
    }
  };

  return _react.default.createElement("doric-checkbox", _extends({
    tabIndex: disabled === true ? null : tabIndex
  }, passThrough, {
    checked: checked,
    onKeyDown: onKeyDown,
    ref: forwardRef
  }), _react.default.createElement(_customListeners.default, {
    listeners: {
      onTap: onTap
    }
  }), _react.default.createElement("doric-checkbox-content", null, label || children));
};

DoricCheckbox.pure = (0, _util.createPureClass)(DoricCheckbox);
var _default = DoricCheckbox;
exports.default = _default;