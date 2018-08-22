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

var size = 30;

_style.default.add({
  "doric-toggle": {
    display: 'flex',
    position: 'relative',
    top: 0,
    left: 0,
    paddingLeft: size * 2 + 10,
    alignItems: 'center'
  },
  "doric-toggle[disabled='true']": {
    opacity: 0.7
  },
  "doric-toggle::after": _objectSpread({}, _util.default.background.after.base),
  "doric-toggle[data-tap-active]:not([disabled='true'])::after": _objectSpread({}, _util.default.background.after.colorize(_theme.default.toggle.hl.normal)),
  "doric-toggle:focus::after": {
    backgroundColor: _theme.default.toggle.hl.focus
  },
  "doric-toggle > doric-toggle-content": {
    flexGrow: 1,
    padding: 5
  },
  "doric-toggle > doric-toggle-thumb": {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: size * 2 + 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  "doric-toggle-thumb > div": {
    position: 'relative',
    top: 0,
    left: 0,
    width: size * 2,
    height: 20,
    backgroundColor: _theme.default.toggle.track.off,
    transition: 'background-color 100ms linear',
    borderRadius: 5
  },
  "doric-toggle-thumb > div::after": {
    content: "\"\"",
    position: 'absolute',
    top: 0,
    left: 0,
    width: size,
    height: 20,
    backgroundColor: _theme.default.toggle.thumb.off,
    transition: 'transform 100ms linear',
    borderRadius: 5
  },
  "doric-toggle-thumb[on='true'] > div": {
    backgroundColor: _theme.default.toggle.track.on
  },
  "doric-toggle-thumb[on='true'] > div::after": {
    backgroundColor: _theme.default.toggle.thumb.on,
    transform: "translateX(".concat(size, "px)")
  },
  "doric-toggle[toggleRight='true']": {
    paddingLeft: 0,
    paddingRight: size * 2 + 10
  },
  "doric-toggle[toggleRight='true'] > doric-toggle-thumb": {
    left: 'auto',
    right: 0
  },
  "doric-toggle[alignRight]": {
    textAlign: 'right'
  }
});

var DoricToggle = function DoricToggle(props) {
  var label = props.label,
      children = props.children,
      on = props.on,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange,
      _props$onKeyDown = props.onKeyDown,
      passedOKD = _props$onKeyDown === void 0 ? function () {} : _props$onKeyDown,
      _props$tabIndex = props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
      forwardRef = props.forwardRef,
      passThrough = _objectWithoutProperties(props, ["label", "children", "on", "onChange", "onKeyDown", "tabIndex", "forwardRef"]);

  var disabled = props.disabled;

  var onTap = function onTap(evt) {
    if (disabled !== true) {
      var e = _objectSpread({}, evt, {
        type: 'change',
        on: on === false
      });

      e.target = evt.target;
      e.target.value = e.on;
      onChange(e);
    }
  };

  var onKeyDown = function onKeyDown(evt) {
    passedOKD(evt);

    if (evt.key === ' ' || evt.key === 'Enter') {
      onTap(evt);
    }
  };

  return _react.default.createElement("doric-toggle", _extends({
    tabIndex: disabled === true ? null : tabIndex
  }, passThrough, {
    onKeyDown: onKeyDown,
    ref: forwardRef
  }), _react.default.createElement(_customListeners.default, {
    listeners: {
      onTap: onTap
    }
  }), _react.default.createElement("doric-toggle-content", null, label || children), _react.default.createElement("doric-toggle-thumb", {
    on: on
  }, _react.default.createElement("div", null)));
};

DoricToggle.pure = (0, _util.createPureClass)(DoricToggle);
var _default = DoricToggle;
exports.default = _default;