'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

_style2.default.add({
    "doric-select": {
        display: 'block',
        margin: 2,
        position: 'relative'
    },
    "doric-select > select": {
        width: '100%',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        padding: '3px 5px',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottom: '2px solid ' + _theme2.default.select.border.normal,
        color: _theme2.default.select.text.normal,
        height: 30,
        borderRadius: 0,
        fontSize: 16
    },
    "doric-select::after": {
        content: '"' + _icon2.default.icons["ion-arrow-down-b"] + '"',
        fontFamily: "Ionic",
        fontSize: 16,
        position: 'absolute',
        left: 'auto',
        top: '50%',
        right: 5,
        color: _theme2.default.select.text.normal,
        transform: 'translateY(-50%)'
    },
    "doric-select > select:focus": {
        borderBottomColor: _theme2.default.select.border.focus
    }
});
var DoricSelect = function DoricSelect(props) {
    var wrapperStyle = props.wrapperStyle,
        wrapperClassName = props.wrapperClassName,
        selectProps = _objectWithoutProperties(props, ['wrapperStyle', 'wrapperClassName']);

    return _react2.default.createElement(
        'doric-select',
        { style: wrapperStyle, 'class': wrapperClassName },
        _react2.default.createElement('select', selectProps)
    );
};

exports.default = DoricSelect;