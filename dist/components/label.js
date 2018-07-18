"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style.default.add({
  "doric-label": {
    display: 'block',
    padding: 2,
    color: _theme.default.label.text.normal,
    fontSize: 12
  },
  "doric-label[required]": {
    color: _theme.default.label.text.required
  },
  "doric-label[optional]": {
    color: _theme.default.label.text.optional
  },
  "doric-label:empty": {
    display: 'none'
  }
});

var _default = function _default(props) {
  return _react.default.createElement("doric-label", props);
};

exports.default = _default;