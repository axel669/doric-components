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

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _customListeners = require('./customListeners');

var _customListeners2 = _interopRequireDefault(_customListeners);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var size = 30;
_style2.default.add({
    "doric-toggle": {
        display: 'flex',
        position: 'relative',
        top: 0,
        left: 0,
        paddingLeft: size * 2 + 10,
        alignItems: 'center'
    },
    "doric-toggle[disabled='true']": {
        opacity: 0.7
    },
    "doric-toggle::after": _extends({}, _util2.default.background.after.base),
    "doric-toggle[data-tap-active]:not([disabled='true'])::after": _extends({}, _util2.default.background.after.colorize(_theme2.default.toggle.hl)),
    "doric-toggle > doric-toggle-content": {
        flexGrow: 1,
        padding: 5
    },
    "doric-toggle > doric-toggle-thumb": {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: size * 2 + 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    "doric-toggle-thumb > div": {
        position: 'relative',
        top: 0,
        left: 0,
        width: size * 2,
        height: 20,
        backgroundColor: _theme2.default.toggle.track.offColor,
        transition: 'background-color 100ms linear',
        borderRadius: 5
    },
    "doric-toggle-thumb > div::after": {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: 20,
        backgroundColor: _theme2.default.toggle.thumb.offColor,
        transition: 'transform 100ms linear',
        borderRadius: 5
    },
    "doric-toggle-thumb[on='true'] > div": {
        backgroundColor: _theme2.default.toggle.track.onColor
    },
    "doric-toggle-thumb[on='true'] > div::after": {
        backgroundColor: _theme2.default.toggle.thumb.onColor,
        transform: 'translateX(' + size + 'px)'
    },
    "doric-toggle[toggleRight='true']": {
        paddingLeft: 0,
        paddingRight: size * 2 + 10
    },
    "doric-toggle[toggleRight='true'] > doric-toggle-thumb": {
        left: 'auto',
        right: 0
    },
    "doric-toggle[alignRight]": {
        textAlign: 'right'
    }
});

exports.default = function (props) {
    var label = props.label,
        children = props.children,
        on = props.on,
        _props$onChange = props.onChange,
        onChange = _props$onChange === undefined ? function () {} : _props$onChange,
        _props$onKeyDown = props.onKeyDown,
        passedOKD = _props$onKeyDown === undefined ? function () {} : _props$onKeyDown,
        _props$tabIndex = props.tabIndex,
        tabIndex = _props$tabIndex === undefined ? 0 : _props$tabIndex,
        passThrough = _objectWithoutProperties(props, ['label', 'children', 'on', 'onChange', 'onKeyDown', 'tabIndex']);

    var disabled = props.disabled;

    var onTap = function onTap(evt) {
        if (disabled !== true) {
            onChange(_extends({}, evt, { type: 'change', value: on === false }));
        }
    };
    var onKeyDown = function onKeyDown(evt) {
        passedOKD(evt);
        if (evt.key === ' ' || evt.key === 'Enter') {
            onTap(evt);
        }
    };

    return _react2.default.createElement(
        'doric-toggle',
        _extends({ tabIndex: disabled === true ? null : tabIndex }, passThrough, { onKeyDown: onKeyDown }),
        _react2.default.createElement(_customListeners2.default, { listeners: { onTap: onTap } }),
        _react2.default.createElement(
            'doric-toggle-content',
            null,
            label || children
        ),
        _react2.default.createElement(
            'doric-toggle-thumb',
            { on: on },
            _react2.default.createElement('div', null)
        )
    );
};