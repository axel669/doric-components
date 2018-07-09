"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("./button"));

var _icon = _interopRequireDefault(require("./icon"));

var _grid = require("./grid");

var _style = _interopRequireDefault(require("../style"));

var _theme = _interopRequireDefault(require("../theme"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_style.default.add({
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
    color: _theme.default.radio.circleColor
  },
  "doric-button.doric-radio-item": {
    color: _theme.default.radio.text.normal
  }
});

var defaultContainer = function defaultContainer(props) {
  return _react.default.createElement(_react.default.Fragment, null, props.children);
};

defaultContainer.RadioItem = function (props) {
  return _react.default.createElement(_react.default.Fragment, null, props.children);
};

var DoricRadio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DoricRadio, _React$Component);

  function DoricRadio(_props) {
    var _this;

    _classCallCheck(this, DoricRadio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoricRadio).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldComponentUpdate", function (nextProps) {
      var _arr = Object.keys(nextProps);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];

        if (_this.props[key] !== nextProps[key] && key !== 'children') {
          console.log('dif', key);
          return true;
        }
      }

      var current = _react.default.Children.toArray(_this.props.children);

      var next = _react.default.Children.toArray(nextProps.children);

      if (current.length !== next.length) {
        return true;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = 0 .to(current.length)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          if (current[i] !== next[i]) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var props = _this.props;

      var selectedIndex = props.selectedIndex,
          value = props.value,
          children = props.children,
          _props$onChange = props.onChange,
          onChange = _props$onChange === void 0 ? function () {} : _props$onChange,
          _props$layout = props.layout,
          layout = _props$layout === void 0 ? {
        container: defaultContainer,
        itemProps: function itemProps(props) {
          return props;
        }
      } : _props$layout,
          rest = _objectWithoutProperties(props, ["selectedIndex", "value", "children", "onChange", "layout"]);

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

      var Container = layout.container;
      var Item = Container.RadioItem;
      var itemPropsFunc = layout.itemProps;
      var selected = false;

      var options = _react.default.Children.toArray(children).map(function (child, index) {
        var icon = "ion-android-radio-button-off";
        var valueMatch = value !== undefined && value === child.props.value;
        var isSelected = selected === false && (index === selectedIndex || valueMatch === true);

        if (isSelected === true) {
          icon = "ion-android-radio-button-on";
          selected = true;
        }

        var itemProps = itemPropsFunc({
          index: index,
          key: index,
          selected: isSelected
        }, rest);
        return _react.default.createElement(Item, itemProps, _react.default.createElement(_button.default, {
          className: "doric-radio-item",
          selected: isSelected,
          block: true,
          onTap: changeHandler(index, child.props.value)
        }, _react.default.createElement(_icon.default, {
          icon: icon
        }), child.props.label || child.props.children));
      });

      return _react.default.createElement("doric-radio-group", rest, _react.default.createElement(Container, null, options));
    });

    return _this;
  }

  return DoricRadio;
}(_react.default.Component);

_grid.Grid.RadioItem = function (props) {
  return _react.default.createElement(_grid.Col, props, props.children);
};

var _default = DoricRadio;
exports.default = _default;