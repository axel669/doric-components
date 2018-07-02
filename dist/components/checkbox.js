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

_style2.default.add({
    "doric-checkbox": {
        position: 'relative',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        paddingLeft: 25,
        userSelect: 'none',
        cursor: 'pointer'
    },
    "doric-checkbox::after": _extends({}, _util2.default.background.after.base),
    "doric-checkbox:focus::after": {
        backgroundColor: _theme2.default.checkbox.hl.focus
    },
    "doric-checkbox[disabled='true']": {
        opacity: 0.7
    },
    "doric-checkbox[data-tap-active]:not([disabled='true'])::after": _extends({}, _util2.default.background.after.colorize(_theme2.default.checkbox.hl.normal)),
    "doric-checkbox::before": {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        fontSize: 22,
        paddingLeft: 3,
        paddingRight: 3,
        fontFamily: "Ionic",
        display: 'flex',
        alignItems: 'center',
        content: '"' + _icon2.default.icons["ion-android-checkbox-outline-blank"] + '"',
        color: _theme2.default.checkbox.checkColor
    },
    "doric-checkbox[checked='true']::before": {
        content: '"' + _icon2.default.icons["ion-android-checkbox"] + '"'
    },
    "doric-checkbox-content": {
        flexGrow: 1
    },
    "doric-checkbox[checkRight]": {
        paddingLeft: 3,
        paddingRight: 25
    },
    "doric-checkbox[checkRight]::before": {
        left: 'auto',
        right: 0
    },
    "doric-checkbox[alignRight]": {
        textAlign: 'right'
    }
});

var DoricCheckbox = function DoricCheckbox(props) {
    var checked = props.checked,
        label = props.label,
        children = props.children,
        _props$onChange = props.onChange,
        onChange = _props$onChange === undefined ? function () {} : _props$onChange,
        _props$onKeyDown = props.onKeyDown,
        passedOKD = _props$onKeyDown === undefined ? function () {} : _props$onKeyDown,
        _props$tabIndex = props.tabIndex,
        tabIndex = _props$tabIndex === undefined ? 0 : _props$tabIndex,
        passThrough = _objectWithoutProperties(props, ['checked', 'label', 'children', 'onChange', 'onKeyDown', 'tabIndex']);

    var disabled = props.disabled;

    var onTap = function onTap(evt) {
        if (disabled !== true) {
            var e = _extends({}, evt, {
                type: 'change',
                checked: checked === false
            });
            e.target = evt.target;
            e.target.value = e.checked;
            onChange(e);
        }
    };
    var onKeyDown = function onKeyDown(evt) {
        passedOKD(evt);
        if (evt.key === ' ' || evt.key === 'Enter') {
            onTap(evt);
        }
    };

    return _react2.default.createElement(
        'doric-checkbox',
        _extends({ tabIndex: disabled === true ? null : tabIndex }, passThrough, { checked: checked, onKeyDown: onKeyDown }),
        _react2.default.createElement(_customListeners2.default, { listeners: { onTap: onTap } }),
        _react2.default.createElement(
            'doric-checkbox-content',
            null,
            label || children
        )
    );
};
DoricCheckbox.pure = (0, _util.createPureClass)(DoricCheckbox);

exports.default = DoricCheckbox;