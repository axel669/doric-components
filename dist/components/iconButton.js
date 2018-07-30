"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("./button.js"));

var _icon = _interopRequireDefault(require("./icon.js"));

var _util = require("../util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var DoricIconButton = function DoricIconButton(_ref) {
  var text = _ref.text,
      icon = _ref.icon,
      props = _objectWithoutProperties(_ref, ["text", "icon"]);

  var space = text === undefined || text === null ? "" : "\xA0";

  var newText = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_icon.default, {
    icon: icon
  }), space, text);

  return _react.default.createElement(_button.default, _extends({
    text: newText
  }, props));
};

DoricIconButton.pure = (0, _util.createPureClass)(DoricIconButton);
var _default = DoricIconButton;
exports.default = _default;