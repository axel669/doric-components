'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('gesturesjs');

var _ssjs = require('ssjs');

var _ssjs2 = _interopRequireDefault(_ssjs);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _baseComponent = require('./components/baseComponent');

var _baseComponent2 = _interopRequireDefault(_baseComponent);

var _button = require('./components/button');

var _button2 = _interopRequireDefault(_button);

var _card = require('./components/card');

var _card2 = _interopRequireDefault(_card);

var _checkbox = require('./components/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _collapse = require('./components/collapse');

var _collapse2 = _interopRequireDefault(_collapse);

var _divider = require('./components/divider');

var _divider2 = _interopRequireDefault(_divider);

var _grid = require('./components/grid');

var _icon = require('./components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _image = require('./components/image');

var _image2 = _interopRequireDefault(_image);

var _input = require('./components/input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('./components/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('./components/select');

var _select2 = _interopRequireDefault(_select);

var _slider = require('./components/slider');

var _slider2 = _interopRequireDefault(_slider);

var _tabs = require('./components/tabs');

var _toggle = require('./components/toggle');

var _toggle2 = _interopRequireDefault(_toggle);

var _reactLoaderSpinner = require('react-loader-spinner');

var _reactLoaderSpinner2 = _interopRequireDefault(_reactLoaderSpinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doric = {
    baseComponent: _baseComponent2.default,
    button: _button2.default,
    card: _card2.default,
    checkbox: _checkbox2.default,
    collapse: _collapse2.default,
    divider: _divider2.default,
    grid: _grid.Grid,
    col: _grid.Col,
    gridBreak: _grid.GridBreak,
    icon: _icon2.default,
    image: _image2.default,
    input: _input2.default,
    radio: _radio2.default,
    select: _select2.default,
    slider: _slider2.default,
    tab: _tabs.Tab,
    tabs: _tabs.Tabs,
    toggle: _toggle2.default,

    style: _style2.default,

    ext: {
        loader: _reactLoaderSpinner2.default
    },

    init: function init(main, target) {
        var sheet = _ssjs2.default.create();
        sheet.addStyles(_style2.default);
        sheet.attach();

        _reactDom2.default.render(main, target);
    }
};

exports.default = doric;