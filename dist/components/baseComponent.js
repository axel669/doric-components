'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PureBaseComponent = exports.BaseComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseComponent = exports.BaseComponent = function (_React$Component) {
    _inherits(BaseComponent, _React$Component);

    function BaseComponent(props) {
        _classCallCheck(this, BaseComponent);

        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

        _this.linkState = function (name) {
            var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'target.value';

            var getValue = new Function('evt', 'return evt.' + prop);
            return function (evt) {
                var value = getValue(evt);
                _this.setState(function () {
                    return _defineProperty({}, name, value);
                });
            };
        };

        return _this;
    }

    return BaseComponent;
}(_react2.default.Component);

;

var PureBaseComponent = exports.PureBaseComponent = function (_React$PureComponent) {
    _inherits(PureBaseComponent, _React$PureComponent);

    function PureBaseComponent(props) {
        _classCallCheck(this, PureBaseComponent);

        var _this2 = _possibleConstructorReturn(this, (PureBaseComponent.__proto__ || Object.getPrototypeOf(PureBaseComponent)).call(this, props));

        _this2.linkState = function (name) {
            var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'target.value';

            var getValue = new Function('evt', 'return evt.' + prop);
            return function (evt) {
                var value = getValue(evt);
                _this2.setState(function () {
                    return _defineProperty({}, name, value);
                });
            };
        };

        return _this2;
    }

    return PureBaseComponent;
}(_react2.default.PureComponent);

;