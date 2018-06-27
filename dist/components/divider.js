'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style2.default.add({
    "doric-divide": {
        display: 'block',
        height: 0,
        borderBottom: '2px solid ' + _theme2.default.divider.border.normal,
        margin: '12px 0px'
    }
});
var DoricDivider = function DoricDivider(props) {
    return _react2.default.createElement('doric-divide', props);
};

exports.default = DoricDivider;