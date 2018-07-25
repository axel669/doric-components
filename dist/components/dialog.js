"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialogify = exports.dialog = void 0;

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.array.index-of");

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

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _autobindDecorator = _interopRequireDefault(require("autobind-decorator"));

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _baseComponent = require("./baseComponent.js");

var _button = _interopRequireDefault(require("./button.js"));

var _grid = _interopRequireDefault(require("./grid.js"));

var _input = _interopRequireDefault(require("./input.js"));

var _theme = _interopRequireDefault(require("../theme.js"));

var _style = _interopRequireDefault(require("../style.js"));

var _util = require("../util.js");

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

_style.default.add({
  "doric-dialog-overlay": {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
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

var DoricDialogOverlay = function DoricDialogOverlay(_ref) {
  var children = _ref.children;
  return _react.default.createElement("doric-dialog-overlay", null, children);
};

var DoricDialogContainer = function DoricDialogContainer(props) {
  return _react.default.createElement("doric-dialog-container", props);
};

var DoricDialogTitle = function DoricDialogTitle(props) {
  return _react.default.createElement("doric-dialog-title", props);
};

var DoricDialogContent = function DoricDialogContent(props) {
  return _react.default.createElement("doric-dialog-content", props);
};

var DoricDialogActions = function DoricDialogActions(props) {
  return _react.default.createElement("doric-dialog-actions", props);
};

var DoricDialog = function DoricDialog(_ref2) {
  var title = _ref2.title,
      content = _ref2.content,
      actions = _ref2.actions,
      props = _objectWithoutProperties(_ref2, ["title", "content", "actions"]);

  return _react.default.createElement(DoricDialogContainer, props, _react.default.createElement(DoricDialogTitle, null, title), _react.default.createElement(DoricDialogContent, null, content), _react.default.createElement(DoricDialogActions, null, actions));
};

var DoricAlert = function DoricAlert(_ref3) {
  var msg = _ref3.msg,
      _ref3$title = _ref3.title,
      title = _ref3$title === void 0 ? "Alert" : _ref3$title,
      close = _ref3.close;
  return _react.default.createElement(DoricDialog, {
    title: title,
    content: msg,
    actions: _react.default.createElement(_button.default, {
      block: true,
      text: "Ok",
      onTap: function onTap() {
        return close();
      }
    })
  });
};

var DoricConfirm = function DoricConfirm(_ref4) {
  var msg = _ref4.msg,
      _ref4$title = _ref4.title,
      title = _ref4$title === void 0 ? "Confirm" : _ref4$title,
      close = _ref4.close;

  var actions = _react.default.createElement(_grid.default, null, _react.default.createElement(_grid.default.col, {
    size: 6
  }, _react.default.createElement(_button.default, {
    block: true,
    text: "Cancel",
    flat: true,
    danger: true,
    onTap: function onTap() {
      return close(false);
    }
  })), _react.default.createElement(_grid.default.col, {
    size: 6
  }, _react.default.createElement(_button.default, {
    block: true,
    text: "OK",
    flat: true,
    primary: true,
    onTap: function onTap() {
      return close(true);
    }
  })));

  return _react.default.createElement(DoricDialog, {
    title: title,
    content: msg,
    actions: actions
  });
};

var DoricSpinner = function DoricSpinner(_ref5) {
  var msg = _ref5.msg,
      _ref5$width = _ref5.width,
      width = _ref5$width === void 0 ? 60 : _ref5$width,
      _ref5$height = _ref5.height,
      height = _ref5$height === void 0 ? 60 : _ref5$height,
      _ref5$type = _ref5.type,
      type = _ref5$type === void 0 ? "Circles" : _ref5$type;

  var content = _react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement("div", null, msg), _react.default.createElement(_reactLoaderSpinner.default, {
    width: width,
    height: height,
    type: type
  }));

  return _react.default.createElement(DoricDialog, {
    style: {
      width: 'auto'
    },
    title: null,
    content: content,
    actions: null
  });
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
    _this.link = _this.createLinks('value');
    return _this;
  }

  _createClass(DoricPrompt, [{
    key: "close",
    value: function close() {
      this.props.close(null);
    }
  }, {
    key: "submit",
    value: function submit() {
      this.props.close(this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          msg = _this$props.msg,
          placeholder = _this$props.placeholder,
          title = _this$props.title,
          close = _this$props.close;

      var content = _react.default.createElement(_input.default.text, {
        label: msg,
        value: this.state.value,
        onChange: this.link.value,
        placeholder: placeholder
      });

      var actions = _react.default.createElement(_grid.default, null, _react.default.createElement(_grid.default.col, {
        size: 6
      }, _react.default.createElement(_button.default, {
        block: true,
        danger: true,
        text: "Cancel",
        onTap: this.close
      })), _react.default.createElement(_grid.default.col, {
        size: 6
      }, _react.default.createElement(_button.default, {
        block: true,
        primary: true,
        text: "Ok",
        onTap: this.submit
      })));

      return _react.default.createElement(DoricDialog, {
        title: title,
        content: content,
        actions: actions
      });
    }
  }]);

  return DoricPrompt;
}(_baseComponent.PureBaseComponent), (_applyDecoratedDescriptor(_class.prototype, "close", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "close"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [_autobindDecorator.default], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype)), _class);
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
      _this2.dialog = {
        show: function show(element) {
          var close = null;
          var res = new Promise(function (resolve) {
            var id = "".concat(Date.now(), "_").concat(Math.random());

            close = function close() {
              var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
              var dialogs = dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this2)));
              dialogPrivate.set(_assertThisInitialized(_assertThisInitialized(_this2)), dialogs.filter(function (d) {
                return d.id !== id;
              }));

              _this2.forceUpdate();

              resolve(value);
            };

            dialogPrivate.get(_assertThisInitialized(_assertThisInitialized(_this2))).push({
              id: id,
              close: close,
              element: element
            });

            _this2.forceUpdate();
          });
          res.close = close;
          return res;
        },
        alert: function alert(msg, title) {
          return _this2.dialog.show(_util.component.bindProps({
            msg: msg,
            title: title
          }, DoricAlert));
        },
        confirm: function confirm(msg, title) {
          return _this2.dialog.show(_util.component.bindProps({
            msg: msg,
            title: title
          }, DoricConfirm));
        },
        prompt: function prompt(msg, title, placeholder) {
          return _this2.dialog.show(_util.component.bindProps({
            msg: msg,
            title: title,
            placeholder: placeholder
          }, DoricPrompt));
        },
        spinner: function spinner(msg, spinnerProps) {
          return _this2.dialog.show(_util.component.bindProps(_objectSpread({
            msg: msg
          }, spinnerProps), DoricSpinner));
        }
      };
      return _this2;
    }

    _createClass(_class2, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(_react.default.Fragment, null, _get(_getPrototypeOf(_class2.prototype), "render", this).call(this), dialogPrivate.get(this).map(function (dialog) {
          return _react.default.createElement(DoricDialogOverlay, {
            key: dialog.id
          }, _react.default.createElement(dialog.element, {
            close: dialog.close
          }));
        }));
      }
    }]);

    return _class2;
  }(Component), _defineProperty(_class2, "displayName", "DialogWrapped:".concat(Component.name || "NamelessComponent")), _temp;
};

exports.dialogify = dialogify;
var dialog = DoricDialog;
exports.dialog = dialog;
dialog.title = DoricDialogTitle;
dialog.content = DoricDialogContent;
dialog.actions = DoricDialogActions;