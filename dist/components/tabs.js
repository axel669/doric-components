'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tab = exports.Tabs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _customListeners = require('./customListeners');

var _customListeners2 = _interopRequireDefault(_customListeners);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_style2.default.add({
    "doric-tab-bar": {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
    },
    "doric-tab-title": {
        display: 'table-cell',
        borderBottom: '2px solid ' + _theme2.default.tabs.tab.border.normal,
        color: _theme2.default.tabs.tab.text.normal,
        backgroundColor: _theme2.default.tabs.tab.bg.normal,
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 7,
        cursor: 'pointer',
        position: 'relative'
    },
    "doric-tab-content": {
        display: 'block'
    },
    "doric-tab-content[active='false']": {
        display: 'none'
    },
    "doric-tab-title[active='true']": {
        borderBottomColor: _theme2.default.tabs.tab.border.active,
        color: _theme2.default.tabs.tab.text.active,
        backgroundColor: _theme2.default.tabs.tab.bg.active
    },
    "doric-tab-title::after": _extends({}, _util2.default.background.after.base),
    "doric-tab-title[data-tap-active]::after": _extends({}, _util2.default.background.after.colorize(_theme2.default.tabs.tab.hl.normal))
});

var Tabs = function (_React$Component) {
    _inherits(Tabs, _React$Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _initialiseProps.call(_this);

        return _this;
    }

    return Tabs;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentDidUpdate = function (prevProps) {
        if (prevProps.selectedIndex !== _this2.props.selectedIndex) {
            var child = _this2.children[_this2.props.selectedIndex];
            var onActive = child.props.onActive || function () {};
            onActive(child);
        }
    };

    this.changeTab = function (index) {
        var _props$onChange = _this2.props.onChange,
            onChange = _props$onChange === undefined ? function () {} : _props$onChange;


        onChange({
            target: {
                selectedIndex: index
            },
            tab: _this2.children[index],
            type: 'change'
        });
    };

    this.render = function () {
        var selectedIndex = _this2.props.selectedIndex;

        var children = _react2.default.Children.toArray(_this2.props.children);
        _this2.children = children;

        var tabs = children.map(function (_ref, index) {
            var props = _ref.props;
            return _react2.default.createElement(
                'doric-tab-title',
                { active: index === selectedIndex, key: index },
                _react2.default.createElement(_customListeners2.default, { listeners: { onTap: function onTap() {
                            return _this2.changeTab(index);
                        } } }),
                props.label
            );
        });

        var content = children.map(function (child, index) {
            return _react2.default.createElement(
                'doric-tab-content',
                { active: index === selectedIndex, key: index },
                child.props.children
            );
        });

        return _react2.default.createElement(
            'doric-tabs',
            null,
            _react2.default.createElement(
                'doric-tab-bar',
                null,
                tabs
            ),
            content
        );
    };
};

var Tab = function Tab() {
    return null;
};

exports.Tabs = Tabs;
exports.Tab = Tab;