"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("./button.js"));

var _theme = _interopRequireDefault(require("../theme.js"));

var _style = _interopRequireDefault(require("../style.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_style.default.add({
  "doric-dialog-base": {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'visible',
    width: 0,
    height: 0
  },
  "doric-dialog-wrapper": {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    animationName: 'doric-dialog-fade-in'
  },
  "doric-dialog-container": {
    position: 'absolute',
    top: '10vh',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70vmin',
    animationName: 'doric-dialog-enter',
    animationDuration: '150ms',
    border: "4px double ".concat(_theme.default.dialog.border.normal),
    backgroundColor: _theme.default.dialog.bg.normal
  },
  "doric-dialog-content": {
    maxHeight: '35vh',
    overflow: 'auto',
    display: 'block',
    padding: 5
  },
  "doric-dialog-title": {
    display: 'block',
    padding: 5,
    fontSize: 20
  },
  "doric-dialog-title:empty": {
    display: 'none'
  },
  '@keyframes doric-dialog-enter': {
    from: {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-25%)'
    },
    to: {
      opacity: 1,
      transform: 'translateX(-50%)'
    }
  }
});

var DoricDialog = function DoricDialog(_ref) {
  var children = _ref.children,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? null : _ref$title;
  return _react.default.createElement("doric-dialog-wrapper", null, _react.default.createElement("doric-dialog-container", null, _react.default.createElement("doric-dialog-title", null, title), _react.default.createElement("doric-dialog-content", null, children)));
};

var dialogPrivate = new WeakMap();

var dialogify = function dialogify(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, props));
      dialogPrivate.set(_assertThisInitialized(_assertThisInitialized(_this)), []);

      var scheduleUpdate = function scheduleUpdate() {
        return _this.setState(function () {
          return {};
        });
      };

      _this.dialogs = {
        show: function show(element, dialogProps, props) {
          return new Promise(function (resolve) {
            var id = "".concat(Date.now(), "_").concat(Math.random());

            var close = function close(value) {
              var dialogs = dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this)));
              dialogPrivate.set(_assertThisInitialized(_assertThisInitialized(_this)), dialogs.filter(function (d) {
                return d.id !== id;
              }));
              scheduleUpdate();
              resolve(value);
            };

            dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this))).push({
              id: id,
              close: close,
              element: element,
              dialogProps: dialogProps,
              props: props
            });
            scheduleUpdate();
          });
        }
      };

      _this.dialogs.alert = function (msg, title) {
        return _this.dialogs.show(function (_ref2) {
          var close = _ref2.close;
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, msg), _react.default.createElement(_button.default, {
            text: "OK",
            block: true,
            onTap: function onTap() {
              return close(null);
            }
          }));
        }, {
          title: title
        });
      };

      return _this;
    }

    _createClass(_class, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Fragment, null, _get(_getPrototypeOf(_class.prototype), "render", this).call(this), JSON.stringify(this.props), JSON.stringify(this.state), dialogPrivate.get(this).map(function (dialog) {
          return _react.default.createElement(DoricDialog, _extends({
            key: dialog.id
          }, dialog.dialogProps), _react.default.createElement(dialog.element, _extends({}, dialog.props, {
            close: dialog.close
          })));
        }));
      }
    }]);

    return _class;
  }(Component), _defineProperty(_class, "displayName", "DialogWrapped:".concat(Component.name || "NamelessComponent")), _temp;
};

var _default = dialogify;
exports.default = _default;