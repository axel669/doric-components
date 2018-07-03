"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _style = _interopRequireDefault(require("../style"));

var _theme = _interopRequireDefault(require("../theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style.default.add({
  "doric-divide": {
    display: 'block',
    height: 0,
    borderBottom: "2px solid ".concat(_theme.default.divider.border.normal),
    margin: '12px 0px'
  }
});

var DoricDivider = function DoricDivider(props) {
  return _react.default.createElement("doric-divide", props);
};

var _default = DoricDivider;
exports.default = _default;