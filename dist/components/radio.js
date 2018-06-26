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

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        transform: 'translateY(-50%)',
        color: _theme2.default.radio.circleColor
    },
    "doric-button.doric-radio-item": {
        color: _theme2.default.radio.text.normal
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

var DoricRadio = function (_React$Component) {
    _inherits(DoricRadio, _React$Component);

    function DoricRadio(props) {
        _classCallCheck(this, DoricRadio);

        var _this = _possibleConstructorReturn(this, (DoricRadio.__proto__ || Object.getPrototypeOf(DoricRadio)).call(this, props));

        _initialiseProps.call(_this);

        return _this;
    }

    return DoricRadio;
}(_react2.default.Component);
// const DoricRadio = props => {
//     const {
//         selectedIndex,
//         value,
//         children,
//         onChange = (() => {}),
//         layout = {container: defaultContainer, itemProps: props => props},
//         ...rest
//     } = props;
//     const changeHandler = (index, value) =>
//         evt => {
//             if (index !== selectedIndex) {
//                 onChange({
//                     target: {
//                         selectedIndex: index,
//                         value
//                     },
//                     type: 'change'
//                 });
//             }
//         };
//     // const Container = layout.container || (props => <React.Fragment>{props.children}</React.Fragment>);
//     const Container = layout.container;
//     const Item = Container.RadioItem;
//     const itemPropsFunc = layout.itemProps;
//     let selected = false;
//     const options = React.Children.toArray(children)
//         .map((child, index) => {
//             let icon = "ion-android-radio-button-off";
//
//             const valueMatch = (value !== undefined && value === child.props.value);
//             const isSelected = selected === false && (index === selectedIndex || valueMatch === true);
//             if (isSelected === true) {
//                 icon = "ion-android-radio-button-on";
//                 selected = true;
//             }
//             const itemProps = itemPropsFunc(
//                 {index, key: index, selected: isSelected},
//                 rest
//             );
//             // console.log(Item, itemProps);
//
//             return (
//                 <Item {...itemProps}>
//                     <Button className="doric-radio-item" selected={isSelected} block onTap={changeHandler(index, child.props.value)}>
//                         <Icon icon={icon} />
//                         {child.props.label || child.props.children}
//                     </Button>
//                 </Item>
//             );
//         });
//
//     return (
//         <doric-radio-group {...rest}>
//             <Container>
//                 {options}
//             </Container>
//         </doric-radio-group>
//     );
// };

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.shouldComponentUpdate = function (nextProps) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(nextProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (_this2.props[key] !== nextProps[key] && key !== 'children') {
                    console.log('dif', key);
                    return true;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var current = _react2.default.Children.toArray(_this2.props.children);
        var next = _react2.default.Children.toArray(nextProps.children);
        if (current.length !== next.length) {
            return true;
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = 0 .to(current.length)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var i = _step2.value;

                if (current[i] !== next[i]) {
                    return true;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return false;
    };

    this.render = function () {
        var props = _this2.props;

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
                    { className: 'doric-radio-item', selected: isSelected, block: true, onTap: changeHandler(index, child.props.value) },
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
};

_grid.Grid.RadioItem = function (props) {
    return _react2.default.createElement(
        _grid.Col,
        props,
        props.children
    );
};

exports.default = DoricRadio;