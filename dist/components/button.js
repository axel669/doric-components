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

var _customListeners = require('./customListeners');

var _customListeners2 = _interopRequireDefault(_customListeners);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    custom
        text
            normal
            disabled
        bg
        highlight
*/
_style2.default.add({
    "doric-button": {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        padding: '8px 16px',
        margin: 4,
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'hidden',
        color: _theme2.default.button.text.normal,
        backgroundColor: _theme2.default.button.bg.normal,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none'
    },
    "doric-button[block='true']": {
        display: 'flex',
        minWidth: 0
    },
    "doric-button[raised='true']": {
        boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)'
    },
    "doric-button[snug='true']": {
        padding: 0
    },
    "doric-button[flush='true']": {
        margin: 0
    },
    "doric-button[disabled='true']": {
        opacity: 0.6
    },
    "doric-button::after": _extends({}, _util2.default.background.after.base),
    "doric-button:focus::after": {
        backgroundColor: _theme2.default.button.hl.focus
    },
    "doric-button[data-tap-active]:not([disabled='true'])::after": _extends({}, _util2.default.background.after.colorize(_theme2.default.button.hl.normal)),
    "doric-button-content": {
        flexGrow: 1
    },
    "doric-button[primary='true']": {
        backgroundColor: _theme2.default.button.bg.primary,
        color: _theme2.default.button.text.primary
    },
    "doric-button[danger='true']": {
        backgroundColor: _theme2.default.button.bg.danger,
        color: _theme2.default.button.text.danger
    },
    "doric-button[accent='true']": {
        backgroundColor: _theme2.default.button.bg.accent,
        color: _theme2.default.button.text.danger
    },
    "doric-button[flat='true'][primary='true']": {
        backgroundColor: 'transparent',
        color: _theme2.default.button.bg.primary
    },
    "doric-button[flat='true'][danger='true']": {
        backgroundColor: 'transparent',
        color: _theme2.default.button.bg.danger
    },
    "doric-button[flat='true'][accent='true']": {
        backgroundColor: 'transparent',
        color: _theme2.default.button.bg.accent
    },
    "doric-button[action='true']": {
        borderRadius: 500
    }
});

var DoricButton = function (_React$PureComponent) {
    _inherits(DoricButton, _React$PureComponent);

    function DoricButton() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DoricButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DoricButton.__proto__ || Object.getPrototypeOf(DoricButton)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            var props = _this.props;

            var _props$onTap = props.onTap,
                tapHandler = _props$onTap === undefined ? function () {} : _props$onTap,
                _props$onKeyDown = props.onKeyDown,
                passedOKD = _props$onKeyDown === undefined ? function () {} : _props$onKeyDown,
                text = props.text,
                children = props.children,
                className = props.className,
                _props$tabIndex = props.tabIndex,
                tabIndex = _props$tabIndex === undefined ? 0 : _props$tabIndex,
                passThrough = _objectWithoutProperties(props, ['onTap', 'onKeyDown', 'text', 'children', 'className', 'tabIndex']);

            var disabled = props.disabled;

            var onTap = function onTap(evt) {
                if (disabled !== true) {
                    tapHandler(_extends({}, evt, { type: 'tap' }));
                }
            };
            var onKeyDown = function onKeyDown(evt) {
                passedOKD(evt);
                if (evt.key === ' ' || evt.key === 'Enter') {
                    onTap(evt);
                }
            };

            return _react2.default.createElement(
                'doric-button',
                _extends({ tabIndex: disabled === true ? null : tabIndex }, passThrough, { 'class': className, onKeyDown: onKeyDown }),
                _react2.default.createElement(_customListeners2.default, { listeners: { onTap: onTap } }),
                _react2.default.createElement(
                    'doric-button-content',
                    null,
                    text || children
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return DoricButton;
}(_react2.default.PureComponent);

// export default (props) => {
//     const {
//         onTap: tapHandler = (() => {}),
//         onKeyDown: passedOKD = (() => {}),
//         text,
//         children,
//         className,
//         tabIndex = 0,
//         ...passThrough
//     } = props;
//     const {disabled} = props;
//     const onTap =  evt => {
//         if (disabled !== true) {
//             tapHandler({...evt, type: 'tap'});
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
//         <doric-button tabIndex={disabled === true ? null : tabIndex} {...passThrough} class={className} onKeyDown={onKeyDown}>
//             <CustomListeners target={this} listeners={{onTap}} />
//             <doric-button-content>
//                 {text || children}
//             </doric-button-content>
//         </doric-button>
//     );
// };


exports.default = DoricButton;