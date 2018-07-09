"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style.default.add({
  "doric-image": {
    display: 'block',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
});

var DoricImage = function DoricImage(_ref) {
  var source = _ref.source,
      height = _ref.height,
      _ref$imageSize = _ref.imageSize,
      imageSize = _ref$imageSize === void 0 ? 'contain' : _ref$imageSize;
  var style = {
    backgroundImage: "url(\"".concat(source, "\")"),
    height: height,
    backgroundSize: imageSize
  };
  return _react.default.createElement("doric-image", {
    style: style
  });
};

DoricImage.pure = (0, _util.createPureClass)(DoricImage);
var _default = DoricImage;
exports.default = _default;