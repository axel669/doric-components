'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customListeners = require('./customListeners');

var _customListeners2 = _interopRequireDefault(_customListeners);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_style2.default.add({
    "doric-collapse": {
        display: 'block',
        border: '1px solid ' + _theme2.default.collapse.border.normal,
        borderRadius: 2,
        margin: 4,
        overflow: 'hidden'
    },
    "doric-collapse-title": {
        display: 'block',
        cursor: 'pointer',
        backgroundColor: _theme2.default.collapse.title.bg.normal,
        position: 'relative',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
    },
    "doric-collapse-title::after": {
        content: '"' + _icon2.default.icons["ion-chevron-left"] + '"',
        position: 'absolute',
        top: '50%',
        left: 'auto',
        right: 12,
        transform: 'translateY(-50%)',
        fontFamily: "Ionic",
        fontSize: 16,
        color: _theme2.default.collapse.title.text.normal,
        transition: 'transform 100ms linear'
    },
    "doric-collapse[open='true'] doric-collapse-title::after": {
        transform: 'translateY(-50%) rotate(-90deg)'
    },
    "doric-collapse-content": {
        display: 'block',
        marginTop: 4
    },
    "doric-collapse[open='false'] > doric-collapse-content": {
        display: 'none'
    },
    "doric-collapse-title > doric-button": {
        borderRadius: 0,
        textAlign: 'left',
        color: _theme2.default.collapse.title.text.normal
    }
});

var Collapse = function (_React$Component) {
    _inherits(Collapse, _React$Component);

    function Collapse(props) {
        _classCallCheck(this, Collapse);

        var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = { open: false };
        return _this;
    }

    return Collapse;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.toggle = function () {
        var open = _this2.state.open === false;
        _this2.setState(function () {
            return { open: open };
        });
    };

    this.render = function () {
        var _props = _this2.props,
            title = _props.title,
            children = _props.children,
            props = _objectWithoutProperties(_props, ['title', 'children']);

        var open = _this2.state.open;


        return _react2.default.createElement(
            'doric-collapse',
            _extends({}, props, { open: open }),
            _react2.default.createElement(
                'doric-collapse-title',
                null,
                _react2.default.createElement(_button2.default, { text: title, onTap: _this2.toggle, block: true, flush: true })
            ),
            _react2.default.createElement(
                'doric-collapse-content',
                null,
                children
            )
        );
    };
};

exports.default = Collapse;