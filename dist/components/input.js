'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style$add;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputTypes = ['text', 'number', 'password', 'tel', 'email'];
var inputSelectors = inputTypes.map(function (type) {
    return 'doric-input[type=\'' + type + '\'] > input';
}).join(', ');
_style2.default.add((_style$add = {
    "doric-input": {
        margin: 2,
        display: 'block'
    },
    "doric-input > input, doric-input > textarea": {
        width: '100%',
        fontFamily: "Roboto, Arial"
    },
    "doric-input > textarea": {
        height: 75
    }
}, _defineProperty(_style$add, inputSelectors + ', doric-input > textarea', {
    border: '2px solid transparent',
    borderBottom: '2px solid ' + _theme2.default.input.border.normal,
    backgroundColor: 'transparent',
    padding: '5px 7px',
    fontSize: 13,
    color: _theme2.default.input.text.normal
}), _defineProperty(_style$add, "doric-input > input:focus, doric-input > textarea:focus", {
    borderBottomColor: _theme2.default.input.border.focus
}), _style$add));
var TextInput = function TextInput(props, type, Element) {
    var wrapperStyle = props.wrapperStyle,
        wrapperClassName = props.wrapperClassName,
        value = props.value,
        _props$onChange = props.onChange,
        onChange = _props$onChange === undefined ? function () {} : _props$onChange,
        passThrough = _objectWithoutProperties(props, ['wrapperStyle', 'wrapperClassName', 'value', 'onChange']);

    return _react2.default.createElement(
        'doric-input',
        { type: type, 'class': wrapperClassName, style: wrapperStyle },
        _react2.default.createElement(Element, _extends({}, passThrough, { type: type, value: value, onChange: onChange }))
    );
};

var inputs = {
    textarea: function textarea(props) {
        return TextInput(props, 'textarea', 'textarea');
    }
};

var _loop = function _loop(type) {
    inputs[type] = function (props) {
        return TextInput(props, type, 'input');
    };
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = inputTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var type = _step.value;

        _loop(type);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

exports.default = inputs;