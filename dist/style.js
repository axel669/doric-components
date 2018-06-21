'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    "html, body": {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: _theme2.default.body.bg.normal,
        color: _theme2.default.body.text.normal,
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

exports.default = style;