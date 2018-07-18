"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _react = _interopRequireDefault(require("react"));

var _autobindDecorator = _interopRequireDefault(require("autobind-decorator"));

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _baseComponent = require("./baseComponent.js");

var _button = _interopRequireDefault(require("./button.js"));

var _grid = _interopRequireDefault(require("./grid.js"));

var _input = _interopRequireDefault(require("./input.js"));

var _theme = _interopRequireDefault(require("../theme.js"));

var _style = _interopRequireDefault(require("../style.js"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

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
    width: '60vmin',
    animationName: 'doric-dialog-enter',
    animationDuration: '150ms',
    borderRadius: 5,
    border: "4px double ".concat(_theme.default.dialog.border.normal),
    backgroundColor: _theme.default.dialog.bg.normal
  },
  "doric-dialog-container.spinner": {
    width: 'auto'
  },
  "doric-dialog-content": {
    maxHeight: '40vh',
    overflow: 'auto',
    display: 'block',
    padding: 5
  },
  "doric-dialog-title": {
    display: 'block',
    padding: 5,
    fontSize: 20,
    paddingBottom: 15
  },
  "doric-dialog-actions": {
    display: 'block',
    marginTop: 15
  },
  "doric-dialog-title:empty, doric-dialog-actions:empty": {
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
  var content = _ref.content,
      actions = _ref.actions,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? null : _ref$title,
      className = _ref.className;
  return _react.default.createElement("doric-dialog-wrapper", null, _react.default.createElement("doric-dialog-container", {
    class: className
  }, _react.default.createElement("doric-dialog-title", null, title), _react.default.createElement("doric-dialog-content", null, content), _react.default.createElement("doric-dialog-actions", null, actions)));
};

console.log(_button.default);
var alerts = {
  content: function content(_ref2) {
    var msg = _ref2.msg;
    return _react.default.createElement("div", {
      style: {
        width: '100%'
      }
    }, msg);
  },
  actions: function actions(_ref3) {
    var close = _ref3.close;
    return _react.default.createElement(_button.default, {
      primary: true,
      block: true,
      text: "OK",
      onTap: function onTap() {
        return close(null);
      }
    });
  }
};
var confirms = {
  content: function content(_ref4) {
    var msg = _ref4.msg;
    return _react.default.createElement("div", null, msg);
  },
  actions: function actions(_ref5) {
    var close = _ref5.close;
    return _react.default.createElement(_grid.default, null, _react.default.createElement(_grid.default.col, {
      size: 6
    }, _react.default.createElement(_button.default, {
      block: true,
      text: "Cancel",
      danger: true,
      onTap: function onTap() {
        return close(false);
      }
    })), _react.default.createElement(_grid.default.col, {
      size: 6
    }, _react.default.createElement(_button.default, {
      block: true,
      text: "OK",
      primary: true,
      onTap: function onTap() {
        return close(true);
      }
    })));
  }
};
var DoricPrompt = (_class =
/*#__PURE__*/
function (_PureBaseComponent) {
  _inherits(DoricPrompt, _PureBaseComponent);

  function DoricPrompt(props) {
    var _this;

    _classCallCheck(this, DoricPrompt);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DoricPrompt).call(this, props));
    _this.state = {
      value: ""
    };
    return _this;
  }

  _createClass(DoricPrompt, [{
    key: "update",
    value: function update(evt) {
      var value = evt.target.value;
      this.setStatef({
        value: value
      });
      this.props.setValue(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          msg = _this$props.msg,
          placeholder = _this$props.placeholder;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, msg), _react.default.createElement(_input.default.text, {
        value: this.state.value,
        onChange: this.update,
        placeholder: placeholder
      }));
    }
  }]);

  return DoricPrompt;
}(_baseComponent.PureBaseComponent), (_applyDecoratedDescriptor(_class.prototype, "update", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "update"), _class.prototype)), _class);

var prompts = function prompts() {
  var value = "";
  return {
    content: function content(_ref6) {
      var msg = _ref6.msg,
          placeholder = _ref6.placeholder;
      return _react.default.createElement(DoricPrompt, {
        msg: msg,
        placeholder: placeholder,
        setValue: function setValue(v) {
          return value = v;
        }
      });
    },
    actions: function actions(_ref7) {
      var close = _ref7.close;
      return _react.default.createElement(_grid.default, null, _react.default.createElement(_grid.default.col, {
        size: 6
      }, _react.default.createElement(_button.default, {
        block: true,
        danger: true,
        text: "Cancel",
        onTap: function onTap() {
          return close(null);
        }
      })), _react.default.createElement(_grid.default.col, {
        size: 6
      }, _react.default.createElement(_button.default, {
        block: true,
        primary: true,
        text: "OK",
        onTap: function onTap() {
          return close(value);
        }
      })));
    }
  };
};

var dialogPrivate = new WeakMap();

var dialogify = function dialogify(Component) {
  var _class2, _temp;

  return _temp = _class2 =
  /*#__PURE__*/
  function (_Component) {
    _inherits(_class2, _Component);

    function _class2(props) {
      var _this2;

      _classCallCheck(this, _class2);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(_class2).call(this, props));
      dialogPrivate.set(_assertThisInitialized(_assertThisInitialized(_this2)), []);

      var scheduleUpdate = function scheduleUpdate() {
        return _this2.forceUpdate();
      };

      _this2.dialogs = {
        show: function show(_ref8, dialogProps, props) {
          var content = _ref8.content,
              _ref8$actions = _ref8.actions,
              actions = _ref8$actions === void 0 ? function () {
            return null;
          } : _ref8$actions;
          var closeMethod = null;
          var value = new Promise(function (resolve) {
            var id = "".concat(Date.now(), "_").concat(Math.random());

            var close = function close(value) {
              var dialogs = dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this2)));
              dialogPrivate.set(_assertThisInitialized(_assertThisInitialized(_this2)), dialogs.filter(function (d) {
                return d.id !== id;
              }));
              scheduleUpdate();
              resolve(value);
            };

            dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this2))).push({
              id: id,
              close: close,
              content: content,
              actions: actions,
              dialogProps: dialogProps,
              props: props
            });
            closeMethod = close;
            scheduleUpdate();
          });
          value.close = closeMethod;
          return value;
        }
      };

      _this2.dialogs.alert = function (msg, title) {
        return _this2.dialogs.show(alerts, {
          title: title
        }, {
          msg: msg
        });
      };

      _this2.dialogs.confirm = function (msg, title) {
        return _this2.dialogs.show(confirms, {
          title: title
        }, {
          msg: msg
        });
      };

      _this2.dialogs.prompt = function (msg, title, placeholder) {
        return _this2.dialogs.show(prompts(), {
          title: title
        }, {
          msg: msg
        });
      };

      _this2.dialogs.spinner = function (msg) {
        var spinnerProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        return _this2.dialogs.show({
          content: function content(props) {
            return _react.default.createElement("div", {
              style: {
                textAlign: 'center',
                padding: 5
              }
            }, msg, _react.default.createElement(_reactLoaderSpinner.default, spinnerProps));
          }
        }, {
          className: 'spinner'
        });
      };

      return _this2;
    }

    _createClass(_class2, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Fragment, null, _get(_getPrototypeOf(_class2.prototype), "render", this).call(this), dialogPrivate.get(this).map(function (dialog) {
          return _react.default.createElement(DoricDialog, _extends({
            key: dialog.id
          }, dialog.dialogProps, {
            content: _react.default.createElement(dialog.content, _extends({}, dialog.props, {
              close: dialog.close
            })),
            actions: _react.default.createElement(dialog.actions, _extends({}, dialog.props, {
              close: dialog.close
            }))
          }));
        }));
      }
    }]);

    return _class2;
  }(Component), _defineProperty(_class2, "displayName", "DialogWrapped:".concat(Component.name || "NamelessComponent")), _temp;
};

var _default = dialogify;
exports.default = _default;