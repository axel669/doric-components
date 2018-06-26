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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_style2.default.add({
    "doric-slider": {
        margin: '4px 12px',
        display: 'block',
        height: 20
    },
    "doric-slider > input[type='range']": {
        WebkitAppearance: 'none',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '+1',
        opacity: 0
    },
    'doric-slider > doric-slider-track-bg': {
        position: 'absolute',
        top: 9,
        left: 10,
        bottom: 9,
        right: 10,
        backgroundColor: _theme2.default.slider.track.bg.normal
    },
    'doric-slider doric-slider-track': {
        backgroundColor: _theme2.default.slider.track.bg.value,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
    },
    'doric-slider doric-slider-track::after': {
        content: '""',
        position: 'absolute',
        left: '100%',
        top: '50%',
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: _theme2.default.slider.thumb.normal,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
    }
});

var DoricSlider = function (_React$PureComponent) {
    _inherits(DoricSlider, _React$PureComponent);

    function DoricSlider(props) {
        _classCallCheck(this, DoricSlider);

        var _this = _possibleConstructorReturn(this, (DoricSlider.__proto__ || Object.getPrototypeOf(DoricSlider)).call(this, props));

        _this.render = function () {
            var _this$props = _this.props,
                _this$props$min = _this$props.min,
                min = _this$props$min === undefined ? 0 : _this$props$min,
                _this$props$max = _this$props.max,
                max = _this$props$max === undefined ? 10 : _this$props$max,
                _this$props$value = _this$props.value,
                value = _this$props$value === undefined ? 0 : _this$props$value,
                _this$props$onChange = _this$props.onChange,
                onChange = _this$props$onChange === undefined ? function () {} : _this$props$onChange;


            var range = max - min;
            var dist = value - min;
            var pos = dist / range * 100;

            return _react2.default.createElement(
                'doric-slider',
                { style: { position: 'relative' } },
                _react2.default.createElement('input', _extends({ type: 'range' }, { min: min, max: max }, { value: value, onChange: onChange })),
                _react2.default.createElement(
                    'doric-slider-track-bg',
                    null,
                    _react2.default.createElement('doric-slider-track', { style: { width: pos + '%' } })
                )
            );
        };

        return _this;
    }

    return DoricSlider;
}(_react2.default.PureComponent);

exports.default = DoricSlider;