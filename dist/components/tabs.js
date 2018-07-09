"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _customListeners = _interopRequireDefault(require("./customListeners"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

var _util = _interopRequireDefault(require("../util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_style.default.add({
  "doric-tab-bar": {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%'
  },
  "doric-tab-title": {
    display: 'table-cell',
    borderBottom: "2px solid ".concat(_theme.default.tabs.tab.border.normal),
    color: _theme.default.tabs.tab.text.normal,
    backgroundColor: _theme.default.tabs.tab.bg.normal,
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
    borderBottomColor: _theme.default.tabs.tab.border.active,
    color: _theme.default.tabs.tab.text.active,
    backgroundColor: _theme.default.tabs.tab.bg.active
  },
  "doric-tab-title::after": _objectSpread({}, _util.default.background.after.base),
  "doric-tab-title[data-tap-active]::after": _objectSpread({}, _util.default.background.after.colorize(_theme.default.tabs.tab.hl.normal))
});

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(_props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate", function (prevProps) {
      if (prevProps.selectedIndex !== _this.props.selectedIndex) {
        var child = _this.children[_this.props.selectedIndex];

        var onActive = child.props.onActive || function () {};

        onActive(child);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeTab", function (index) {
      var _this$props$onChange = _this.props.onChange,
          onChange = _this$props$onChange === void 0 ? function () {} : _this$props$onChange;
      onChange({
        target: {
          selectedIndex: index
        },
        tab: _this.children[index],
        type: 'change'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var selectedIndex = _this.props.selectedIndex;

      var children = _react.default.Children.toArray(_this.props.children);

      _this.children = children;
      var tabs = children.map(function (_ref, index) {
        var props = _ref.props;
        return _react.default.createElement("doric-tab-title", {
          active: index === selectedIndex,
          key: index
        }, _react.default.createElement(_customListeners.default, {
          listeners: {
            onTap: function onTap() {
              return _this.changeTab(index);
            }
          }
        }), props.label);
      });
      var content = children.map(function (child, index) {
        return _react.default.createElement("doric-tab-content", {
          active: index === selectedIndex,
          key: index
        }, child.props.children);
      });
      return _react.default.createElement("doric-tabs", null, _react.default.createElement("doric-tab-bar", null, tabs), content);
    });

    return _this;
  }

  return Tabs;
}(_react.default.Component);

exports.Tabs = Tabs;

var Tab = function Tab() {
  return null;
};

exports.Tab = Tab;