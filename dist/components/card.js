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

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

_style2.default.add({
    "doric-card": {
        display: 'block',
        margin: 4,
        boxShadow: ['2px 0px 2px rgba(0, 0, 0, 0.25)', '0px 2px 2px rgba(0, 0, 0, 0.25)', '-2px 0px 2px rgba(0, 0, 0, 0.25)', '0px -2px 2px rgba(0, 0, 0, 0.25)'].join(', '),
        backgroundColor: _theme2.default.card.bg.normal,
        overflow: 'hidden',
        border: '1px solid ' + _theme2.default.card.border.normal,
        borderRadius: 2,
        padding: 12,
        position: 'relative',
        top: 0,
        left: 0
    },
    "doric-card > :first-child": {
        marginTop: -12
    },
    "doric-card > :last-child": {
        marginBottom: -12
    },
    "doric-card > [data-card-flush], doric-card-media": {
        marginLeft: -12,
        marginRight: -12
    },
    "doric-card-title, doric-card-actions": {
        display: 'block',
        margin: '12px 0px',
        padding: 12
    },
    "doric-card-media + doric-card-title": {
        marginTop: 0
    },
    "doric-card-title + doric-card-media": {
        marginTop: -12
    },
    "doric-card-media": {
        height: 180,
        display: 'block',
        marginBottom: 12
    },
    "doric-card-title::before": {
        content: '" "',
        display: 'table'
    },
    "doric-card-title::after": {
        content: '" "',
        display: 'table',
        clear: 'both'
    },
    "doric-card > doric-card-actions[data-divider]": {
        borderTop: '2px solid ' + _theme2.default.divider.color
    },
    "doric-card-actions :first-child": {
        marginLeft: 0
    },
    ".doric-title-main": {
        fontSize: 22,
        marginBottom: 8
    },
    ".doric-title-subtitle": {
        float: 'left',
        color: '#666'
    },
    ".doric-title-icon": {
        width: 48,
        height: 48,
        float: 'left',
        borderRadius: 24,
        marginRight: 8,
        overflow: 'hidden'
    }
});

var DoricCard = function DoricCard(props) {
    var _props$title = props.title,
        title = _props$title === undefined ? null : _props$title,
        _props$sideImage = props.sideImage,
        sideImage = _props$sideImage === undefined ? null : _props$sideImage,
        passThrough = _objectWithoutProperties(props, ['title', 'sideImage']);

    var titleElem = null;
    var actionElem = null;
    var sideImg = null;

    if (title !== null) {
        titleElem = _react2.default.createElement(
            'doric-card-title',
            null,
            title
        );
    }

    if (sideImage !== null) {
        sideImg = _react2.default.createElement(
            'doric-card-side-image',
            null,
            _react2.default.createElement(_image2.default, { height: '100%', source: sideImage, imageSize: 'cover' })
        );
    }

    return _react2.default.createElement(
        'doric-card',
        _extends({}, passThrough, { 'side-img': sideImage !== null }),
        props.children,
        sideImg
    );
};

var DoricCardTitle = function (_React$PureComponent) {
    _inherits(DoricCardTitle, _React$PureComponent);

    function DoricCardTitle() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DoricCardTitle);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DoricCardTitle.__proto__ || Object.getPrototypeOf(DoricCardTitle)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            var _this$props = _this.props,
                main = _this$props.main,
                subtitle = _this$props.subtitle,
                _this$props$icon = _this$props.icon,
                icon = _this$props$icon === undefined ? null : _this$props$icon;

            var iconElement = icon === null ? null : _react2.default.createElement(
                'div',
                { className: 'doric-title-icon' },
                _react2.default.createElement(_image2.default, { source: icon, width: '100%', height: '100%', imageSize: 'cover' })
            );

            return _react2.default.createElement(
                'doric-card-title',
                { 'data-card-flush': true },
                iconElement,
                _react2.default.createElement(
                    'div',
                    { className: 'doric-title-main' },
                    main
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'doric-title-subtitle' },
                    subtitle
                )
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return DoricCardTitle;
}(_react2.default.PureComponent);

DoricCard.actions = function DoricCardActions(props) {
    var divider = props.divider;

    return _react2.default.createElement(
        'doric-card-actions',
        { 'data-card-flush': true, 'data-divider': divider },
        props.children
    );
};
DoricCard.media = function DoricCardMedia(props) {
    return _react2.default.createElement('doric-card-media', props);
};
DoricCard.title = DoricCardTitle;

exports.default = DoricCard;