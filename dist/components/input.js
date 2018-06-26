'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style$add;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLoaderSpinner = require('react-loader-spinner');

var _reactLoaderSpinner2 = _interopRequireDefault(_reactLoaderSpinner);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputTypes = ['text', 'number', 'password', 'tel', 'email'];
var inputSelectors = inputTypes.map(function (type) {
    return 'doric-input[type=\'' + type + '\'] > input';
}).join(', ');
_style2.default.add((_style$add = {
    "doric-input": {
        margin: 2,
        display: 'block',
        position: 'relative'
    },
    "doric-input > input, doric-input > textarea": {
        width: '100%',
        fontFamily: "Roboto, Arial"
    },
    "doric-input > textarea": {
        height: 75
    }
}, _defineProperty(_style$add, inputSelectors + ', doric-input > textarea', {
    border: '2px solid transparent',
    borderBottom: '2px solid ' + _theme2.default.input.border.normal,
    backgroundColor: 'transparent',
    padding: '5px 7px',
    fontSize: 13,
    color: _theme2.default.input.text.normal
}), _defineProperty(_style$add, "doric-input > input:focus, doric-input > textarea:focus", {
    borderBottomColor: _theme2.default.input.border.focus
}), _defineProperty(_style$add, "doric-input-label", {
    display: 'block',
    padding: 2,
    color: _theme2.default.input.label.text.normal,
    fontSize: 12
}), _defineProperty(_style$add, "doric-input-label[required='true']", {
    color: _theme2.default.input.label.text.required
}), _defineProperty(_style$add, "doric-input-label[optional='true']", {
    color: _theme2.default.input.label.text.optional
}), _defineProperty(_style$add, "doric-input > input[disabled]", {
    backgroundColor: _theme2.default.input.bg.disabled,
    borderColor: _theme2.default.input.bg.disabled
}), _style$add));

var DoricInput = function (_React$PureComponent) {
    _inherits(DoricInput, _React$PureComponent);

    function DoricInput(props) {
        _classCallCheck(this, DoricInput);

        var _this = _possibleConstructorReturn(this, (DoricInput.__proto__ || Object.getPrototypeOf(DoricInput)).call(this, props));

        _this.componentWillUpdate = function (nextProps) {
            if (_this.props.loaderType !== nextProps.loaderType) {
                _this.refreshLoader(nextProps.loaderType);
            }
        };

        _this.refreshLoader = function (type) {
            _this.loader = _react2.default.createElement(
                'div',
                { style: { position: 'absolute', left: 'auto', right: 4, bottom: 0 } },
                _react2.default.createElement(_reactLoaderSpinner2.default, { type: type, width: 20, height: 20 })
            );
        };

        _this.render = function () {
            var _this$props = _this.props,
                wrapperStyle = _this$props.wrapperStyle,
                wrapperClassName = _this$props.wrapperClassName,
                value = _this$props.value,
                _this$props$label = _this$props.label,
                label = _this$props$label === undefined ? null : _this$props$label,
                required = _this$props.required,
                optional = _this$props.optional,
                _this$props$loader = _this$props.loader,
                loader = _this$props$loader === undefined ? false : _this$props$loader,
                _this$props$loaderTyp = _this$props.loaderType,
                loaderType = _this$props$loaderTyp === undefined ? 'Oval' : _this$props$loaderTyp,
                _this$props$onChange = _this$props.onChange,
                onChange = _this$props$onChange === undefined ? function () {} : _this$props$onChange,
                type = _this$props.type,
                Element = _this$props.Element,
                passThrough = _objectWithoutProperties(_this$props, ['wrapperStyle', 'wrapperClassName', 'value', 'label', 'required', 'optional', 'loader', 'loaderType', 'onChange', 'type', 'Element']);

            var labelElem = label === null ? null : _react2.default.createElement(
                'doric-input-label',
                { required: required, optional: optional },
                label
            );
            var loaderElem = loader !== true ? null : _this.loader;

            return _react2.default.createElement(
                'doric-input',
                { type: type, 'class': wrapperClassName, style: wrapperStyle },
                labelElem,
                _react2.default.createElement(Element, _extends({}, passThrough, { type: type, value: value, onChange: onChange })),
                loaderElem
            );
        };

        _this.refreshLoader(props.loaderType || "Oval");
        return _this;
    }

    return DoricInput;
}(_react2.default.PureComponent);

var inputs = {
    textarea: function DoricTextarea(props) {
        return _react2.default.createElement(DoricInput, _extends({}, props, { type: 'textarea', Element: 'textarea' }));
    }
};

var _loop = function _loop(type) {
    inputs[type] = function (props) {
        return _react2.default.createElement(DoricInput, _extends({}, props, { type: type, Element: 'input' }));
    };
    (0, _util.setFunctionName)(inputs[type], 'Doric' + type.slice(0, 1).toUpperCase() + type.slice(1) + 'Input');
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = inputTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var type = _step.value;

        _loop(type);
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

exports.default = inputs;