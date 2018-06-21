'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GridBreak = exports.Col = exports.Grid = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var gridStyle = {
    "doric-grid": {
        display: 'block'
    },
    "doric-grid::before": {
        content: '" "',
        display: 'table'
    },
    "doric-grid::after": {
        content: '" "',
        display: 'table',
        clear: 'both'
    },
    "doric-col": {
        float: 'left'
    }
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = 1 .to(13)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        var width = (i / 12 * 100).toPrecision(8);
        gridStyle['doric-col.w' + i] = {
            width: width + '%'
        };
        gridStyle['doric-col.offset' + i] = {
            marginLeft: width + '%'
        };
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

_style2.default.add(gridStyle);

var Grid = exports.Grid = function Grid(_ref) {
    var children = _ref.children;

    return _react2.default.createElement(
        'doric-grid',
        null,
        children
    );
};
var Col = function Col(_ref2) {
    var _ref2$size = _ref2.size,
        size = _ref2$size === undefined ? 1 : _ref2$size,
        _ref2$offset = _ref2.offset,
        offset = _ref2$offset === undefined ? null : _ref2$offset,
        props = _objectWithoutProperties(_ref2, ['size', 'offset']);

    var className = 'w' + size;
    if (offset !== null) {
        className = className + ' offset' + offset;
    }
    return _react2.default.createElement('doric-col', _extends({ 'class': className }, props));
};
exports.Col = Col;
var GridBreak = exports.GridBreak = function GridBreak() {
    return _react2.default.createElement('doric-col', { 'class': 'w12' });
};