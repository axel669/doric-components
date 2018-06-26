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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var DoricCheckbox = function (_React$PureComponent) {
    _inherits(DoricCheckbox, _React$PureComponent);

    function DoricCheckbox() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DoricCheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DoricCheckbox.__proto__ || Object.getPrototypeOf(DoricCheckbox)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            var props = _this.props;

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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return DoricCheckbox;
}(_react2.default.PureComponent);

// export default (props) => {
//     const {
//         checked,
//         label,
//         children,
//         onChange = (() => {}),
//         onKeyDown: passedOKD = (() => {}),
//         tabIndex = 0,
//         ...passThrough
//     } = props;
//     const {disabled} = props;
//     const onTap = evt => {
//         if (disabled !== true) {
//             const e = {
//                 ...evt,
//                 type: 'change',
//                 checked: checked === false
//             };
//             e.target = evt.target;
//             e.target.value = e.checked;
//             onChange(e);
//         }
//     };
//     const onKeyDown = evt => {
//         passedOKD(evt);
//         if (evt.key === ' ' || evt.key === 'Enter') {
//             onTap(evt);
//         }
//     };
//
//     return (
//         <doric-checkbox tabIndex={disabled === true ? null : tabIndex} {...passThrough} checked={checked} onKeyDown={onKeyDown}>
//             <CustomListeners listeners={{onTap}} />
//             <doric-checkbox-content>
//                 {label || children}
//             </doric-checkbox-content>
//         </doric-checkbox>
//     );
// };


exports.default = DoricCheckbox;