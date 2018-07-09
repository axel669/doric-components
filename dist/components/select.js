"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _icon = _interopRequireDefault(require("../components/icon"));

var _style = _interopRequireDefault(require("../style"));

var _theme = _interopRequireDefault(require("../theme"));

var _util = _interopRequireWildcard(require("../util"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

_style.default.add({
  "doric-select": {
    display: 'block',
    margin: 2,
    position: 'relative'
  },
  "doric-select > select": {
    width: '100%',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    padding: '3px 5px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottom: "2px solid ".concat(_theme.default.select.border.normal),
    color: _theme.default.select.text.normal,
    height: 30,
    borderRadius: 0,
    fontSize: 16
  },
  "doric-select::after": {
    content: "\"".concat(_icon.default.icons["ion-arrow-down-b"], "\""),
    fontFamily: "Ionic",
    fontSize: 16,
    position: 'absolute',
    left: 'auto',
    top: '50%',
    right: 5,
    color: _theme.default.select.text.normal,
    transform: 'translateY(-50%)'
  },
  "doric-select > select:focus": {
    borderBottomColor: _theme.default.select.border.focus
  }
});

var DoricSelect = function DoricSelect(props) {
  var wrapperStyle = props.wrapperStyle,
      wrapperClassName = props.wrapperClassName,
      selectProps = _objectWithoutProperties(props, ["wrapperStyle", "wrapperClassName"]);

  return _react.default.createElement("doric-select", {
    style: wrapperStyle,
    class: wrapperClassName
  }, _react.default.createElement("select", selectProps));
};

DoricSelect.pure = (0, _util.createPureClass)(DoricSelect);
var _default = DoricSelect;
exports.default = _default;