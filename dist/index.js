"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

require("gesturesjs");

var _ssjs = _interopRequireDefault(require("ssjs"));

var _style = _interopRequireDefault(require("./style.js"));

var _baseComponent = require("./components/baseComponent.js");

var _button = _interopRequireDefault(require("./components/button.js"));

var _card = _interopRequireDefault(require("./components/card.js"));

var _checkbox = _interopRequireDefault(require("./components/checkbox.js"));

var _collapse = _interopRequireDefault(require("./components/collapse.js"));

var _divider = _interopRequireDefault(require("./components/divider.js"));

var _flex = _interopRequireDefault(require("./components/flex.js"));

var _grid = _interopRequireDefault(require("./components/grid.js"));

var _icon = _interopRequireDefault(require("./components/icon.js"));

var _image = _interopRequireDefault(require("./components/image.js"));

var _input = _interopRequireDefault(require("./components/input.js"));

var _label = _interopRequireDefault(require("./components/label.js"));

var _radio = _interopRequireDefault(require("./components/radio.js"));

var _select = _interopRequireDefault(require("./components/select.js"));

var _slider = _interopRequireDefault(require("./components/slider.js"));

var _tabs = require("./components/tabs.js");

var _toggle = _interopRequireDefault(require("./components/toggle.js"));

var _dialog = require("./components/dialog.js");

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doric = {
  baseComponent: _baseComponent.BaseComponent,
  pureBaseComponent: _baseComponent.PureBaseComponent,
  button: _button.default,
  card: _card.default,
  checkbox: _checkbox.default,
  collapse: _collapse.default,
  divider: _divider.default,
  flex: _flex.default,
  grid: _grid.default,
  image: _image.default,
  input: _input.default,
  label: _label.default,
  radio: _radio.default,
  select: _select.default,
  slider: _slider.default,
  tab: _tabs.Tab,
  tabs: _tabs.Tabs,
  toggle: _toggle.default,
  dialog: _dialog.dialog,
  dialogify: _dialog.dialogify,
  style: _style.default,
  ext: {
    loader: _reactLoaderSpinner.default
  },
  init: function init(main, target) {
    var sheet = _ssjs.default.create();

    sheet.addStyles(_style.default);
    sheet.attach();

    _reactDom.default.render(main, target);
  }
};
var _default = doric;
exports.default = _default;