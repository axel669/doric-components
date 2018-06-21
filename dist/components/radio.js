'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _grid = require('./grid');

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

_style2.default.add({
    "doric-radio-group": {
        display: 'block',
        padding: 2
    },
    ".doric-radio-item": {
        margin: 0,
        textAlign: 'left',
        paddingLeft: 20
    },
    ".doric-radio-item doric-icon": {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    }
});

var defaultContainer = function defaultContainer(props) {
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        props.children
    );
};
defaultContainer.RadioItem = function (props) {
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        props.children
    );
};
var Radio = function Radio(props) {
    var selectedIndex = props.selectedIndex,
        value = props.value,
        children = props.children,
        _props$onChange = props.onChange,
        onChange = _props$onChange === undefined ? function () {} : _props$onChange,
        _props$layout = props.layout,
        layout = _props$layout === undefined ? { container: defaultContainer, itemProps: function itemProps(props) {
            return props;
        } } : _props$layout,
        rest = _objectWithoutProperties(props, ['selectedIndex', 'value', 'children', 'onChange', 'layout']);

    var changeHandler = function changeHandler(index, value) {
        return function (evt) {
            if (index !== selectedIndex) {
                onChange({
                    target: {
                        selectedIndex: index,
                        value: value
                    },
                    type: 'change'
                });
            }
        };
    };
    // const Container = layout.container || (props => <React.Fragment>{props.children}</React.Fragment>);
    var Container = layout.container;
    var Item = Container.RadioItem;
    var itemPropsFunc = layout.itemProps;
    var selected = false;
    var options = _react2.default.Children.toArray(children).map(function (child, index) {
        var icon = "ion-android-radio-button-off";

        var valueMatch = value !== undefined && value === child.props.value;
        var isSelected = selected === false && (index === selectedIndex || valueMatch === true);
        if (isSelected === true) {
            icon = "ion-android-radio-button-on";
            selected = true;
        }
        var itemProps = itemPropsFunc({ index: index, key: index, selected: isSelected }, rest);
        // console.log(Item, itemProps);

        return _react2.default.createElement(
            Item,
            itemProps,
            _react2.default.createElement(
                _button2.default,
                { className: 'doric-radio-item', block: true, onTap: changeHandler(index, child.props.value) },
                _react2.default.createElement(_icon2.default, { icon: icon }),
                child.props.label || child.props.children
            )
        );
    });

    return _react2.default.createElement(
        'doric-radio-group',
        rest,
        _react2.default.createElement(
            Container,
            null,
            options
        )
    );
};

_grid.Grid.RadioItem = function (props) {
    return _react2.default.createElement(
        _grid.Col,
        props,
        props.children
    );
};

exports.default = Radio;