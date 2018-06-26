'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setFunctionName = undefined;

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Number.prototype.to = function (end) {
    var array = [];
    var current = this + 0;

    while (current < end) {
        array.push(current);
        current += 1;
    }

    return array;
};

var setFunctionName = function setFunctionName(func, name) {
    Object.defineProperty(func, 'name', { value: name, writable: false });
};
exports.setFunctionName = setFunctionName;
exports.default = {
    background: {
        after: {
            base: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                content: '""',
                transition: 'background-color 250ms linear'
            },
            colorize: function colorize(color) {
                return {
                    backgroundColor: color,
                    transition: 'none'
                };
            }
        }
    },
    color: {
        primaryBlue: "#2196F3"
    }
};