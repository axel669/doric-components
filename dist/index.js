"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

require("gesturesjs");

var _ssjs = _interopRequireDefault(require("ssjs"));

var _style = _interopRequireDefault(require("./style"));

var _baseComponent = require("./components/baseComponent");

var _button = _interopRequireDefault(require("./components/button"));

var _card = _interopRequireDefault(require("./components/card"));

var _checkbox = _interopRequireDefault(require("./components/checkbox"));

var _collapse = _interopRequireDefault(require("./components/collapse"));

var _divider = _interopRequireDefault(require("./components/divider"));

var _grid = require("./components/grid");

var _icon = _interopRequireDefault(require("./components/icon"));

var _image = _interopRequireDefault(require("./components/image"));

var _input = _interopRequireDefault(require("./components/input"));

var _radio = _interopRequireDefault(require("./components/radio"));

var _select = _interopRequireDefault(require("./components/select"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _tabs = require("./components/tabs");

var _toggle = _interopRequireDefault(require("./components/toggle"));

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
  grid: _grid.Grid,
  col: _grid.Col,
  gridBreak: _grid.GridBreak,
  icon: _icon.default,
  image: _image.default,
  input: _input.default,
  radio: _radio.default,
  select: _select.default,
  slider: _slider.default,
  tab: _tabs.Tab,
  tabs: _tabs.Tabs,
  toggle: _toggle.default,
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