"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(require("./theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  "html, body": {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundColor: _theme.default.body.bg.normal,
    color: _theme.default.body.text.normal,
    fontFamily: "Roboto"
  },
  "*": {
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent'
  },
  ":focus": {
    outline: 'none'
  }
};
Object.defineProperty(style, 'add', {
  enumerable: false,
  value: function value(styles) {
    Object.keys(styles).forEach(function (selector) {
      style[selector] = styles[selector];
    });
  }
});
var _default = style;
exports.default = _default;