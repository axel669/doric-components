'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var thumbOverride = {
    "WebkitAppearance": 'none',
    width: 20,
    height: 20,
    border: '1px solid black'
};

_style2.default.add({
    "doric-slider > input[type='range']::-webkit-slider-thumb": thumbOverride,
    "doric-slider > input[type='range']::-moz-range-thumb": thumbOverride
});

exports.default = function (props) {
    var _props$min = props.min,
        min = _props$min === undefined ? 0 : _props$min,
        _props$max = props.max,
        max = _props$max === undefined ? 100 : _props$max,
        _props$value = props.value,
        value = _props$value === undefined ? min : _props$value,
        _props$onChange = props.onChange,
        onChange = _props$onChange === undefined ? function () {} : _props$onChange,
        passThrough = _objectWithoutProperties(props, ['min', 'max', 'value', 'onChange']);

    var changeHandler = function changeHandler(evt) {
        return onChange(evt.target.value);
    };

    return _react2.default.createElement(
        'doric-slider',
        passThrough,
        _react2.default.createElement('input', _extends({ type: 'range' }, { min: min, max: max, value: value }, { onChange: changeHandler }))
    );
};