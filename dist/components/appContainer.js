"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _autobindDecorator = _interopRequireDefault(require("autobind-decorator"));

var _button = _interopRequireDefault(require("./button.js"));

var _icon = _interopRequireDefault(require("./icon.js"));

var _style2 = _interopRequireDefault(require("../style.js"));

var _util = require("../util.js");

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var animTime = 200;

_style2.default.add({
  "doric-app-menu-overlay": {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1100
  },
  "doric-app-menu-overlay[display='false']": {
    transform: 'translateX(-150%)'
  },
  "doric-app-menu-wrapper": {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    // bottom: 0,
    paddingBottom: 10,
    width: 320,
    maxWidth: '60vw',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.35)',
    transition: "transform ".concat(animTime, "ms linear, opacity ").concat(animTime, "ms linear")
  },
  "doric-app-menu-wrapper[open='false']": {
    opacity: 0,
    transform: 'translateX(-100%)'
  },
  "doric-app-menu-wrapper[open='true']": {
    opacity: 1,
    transform: 'translateX(0%)'
  },
  "doric-app-menu doric-button": {
    borderRadius: 0,
    display: 'flex',
    margin: 0,
    textAlign: 'left'
  }
});

var AppMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppMenu, _React$Component);

  function AppMenu(props) {
    var _this;

    _classCallCheck(this, AppMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppMenu).call(this, props));
    _this.state = {
      show: false
    };
    return _this;
  }

  _createClass(AppMenu, [{
    key: "componentWillUpdate",
    value: function () {
      var _componentWillUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(newProps, newState) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(newProps.open !== this.state.show)) {
                  _context.next = 5;
                  break;
                }

                if (!(newProps.open === false)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return (0, _util.wait)(animTime + 10);

              case 4:
                this.setState(function () {
                  return {
                    show: newProps.open
                  };
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function componentWillUpdate(_x, _x2) {
        return _componentWillUpdate.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Menu = _this$props.Menu,
          open = _this$props.open,
          toggle = _this$props.toggle;
      var show = this.state.show;

      if (Menu === null) {
        return null;
      }

      return _react.default.createElement("doric-app-menu-overlay", {
        "app-menu": true,
        onClick: toggle,
        display: open || show
      }, _react.default.createElement("doric-app-menu-wrapper", {
        open: open,
        onClick: function onClick(evt) {
          return evt.stopPropagation();
        }
      }, _react.default.createElement("doric-app-menu", null, _react.default.createElement(Menu, {
        toggle: toggle
      }))));
    }
  }]);

  return AppMenu;
}(_react.default.Component);

_style2.default.add({
  "doric-app-titlebar": {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.35)',
    backgroundColor: "#1d62d5",
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: '40px',
    zIndex: 900
  },
  "doric-button[app-titlebar]": {
    width: 40,
    height: 40,
    borderRadius: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 0,
    color: 'white'
  },
  "doric-button[app-titlebar][right]": {
    left: 'auto',
    right: 0
  }
});

var noOP = function noOP() {};

var AppContainer = (_class =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(AppContainer, _React$Component2);

  function AppContainer(props) {
    var _this2;

    _classCallCheck(this, AppContainer);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props));
    _this2.state = {
      menuOpen: false
    };
    return _this2;
  }

  _createClass(AppContainer, [{
    key: "toggleMenu",
    value: function () {
      var _toggleMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var menuOpen;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                menuOpen = this.state.menuOpen; // await wait(1);

                _context2.next = 3;
                return (0, _util.animFrame)();

              case 3:
                this.setState(function () {
                  return {
                    menuOpen: menuOpen === false
                  };
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function toggleMenu() {
        return _toggleMenu.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          title = _this$props2.title,
          _this$props2$menu = _this$props2.menu,
          menu = _this$props2$menu === void 0 ? null : _this$props2$menu,
          _this$props2$back = _this$props2.back,
          back = _this$props2$back === void 0 ? false : _this$props2$back,
          _this$props2$onBack = _this$props2.onBack,
          onBack = _this$props2$onBack === void 0 ? noOP : _this$props2$onBack,
          _this$props2$options = _this$props2.options,
          options = _this$props2$options === void 0 ? false : _this$props2$options,
          _this$props2$onOption = _this$props2.onOptions,
          onOptions = _this$props2$onOption === void 0 ? noOP : _this$props2$onOption,
          titleProps = _this$props2.titleProps,
          contentProps = _this$props2.contentProps;
      var menuOpen = this.state.menuOpen;

      var leftButton = function () {
        if (menu !== null) {
          return _react.default.createElement(_button.default, {
            "app-titlebar": true,
            onTap: _this3.toggleMenu
          }, _react.default.createElement(_icon.default, {
            icon: "ion-navicon-round"
          }));
        }

        if (back !== false) {
          var _style = {
            width: 'auto',
            padding: '0px 8px',
            fontSize: 12
          };
          return _react.default.createElement(_button.default, {
            style: _style,
            "app-titlebar": true,
            onTap: onBack
          }, _react.default.createElement(_icon.default, {
            icon: "ion-chevron-left",
            style: {
              fontSize: 12
            }
          }), "\xA0", back);
        }

        return null;
      }(); // const optionButton = options && (
      //     <Button app-titlebar right onTap={onOptions}>
      //         <Icon icon="ion-more" />
      //     </Button>
      // );


      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("doric-app-titlebar", null, leftButton, title), _react.default.createElement(AppMenu, {
        Menu: menu,
        open: menuOpen,
        toggle: this.toggleMenu
      }), _react.default.createElement("div", {
        style: {
          paddingTop: 45
        }
      }, children));
    }
  }]);

  return AppContainer;
}(_react.default.Component), (_applyDecoratedDescriptor(_class.prototype, "toggleMenu", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "toggleMenu"), _class.prototype)), _class);
var _default = AppContainer;
exports.default = _default;