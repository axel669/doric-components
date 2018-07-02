'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style2.default.add({
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
        imageSize = _ref$imageSize === undefined ? 'contain' : _ref$imageSize;

    var style = {
        backgroundImage: 'url("' + source + '")',
        height: height,
        backgroundSize: imageSize
    };
    return _react2.default.createElement('doric-image', { style: style });
};
DoricImage.pure = (0, _util.createPureClass)(DoricImage);

exports.default = DoricImage;