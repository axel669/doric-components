'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPureClass = exports.setFunctionName = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Number.prototype.to = function (end) {
    var array = [];
    var current = this + 0;

    while (current < end) {
        array.push(current);
        current += 1;
    }

    return array;
};

var setFunctionName = function setFunctionName(func, name) {
    Object.defineProperty(func, 'name', { value: name, writable: false });
};
var createPureClass = function createPureClass(func) {
    var GenClass = function (_React$PureComponent) {
        _inherits(GenClass, _React$PureComponent);

        function GenClass() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, GenClass);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GenClass.__proto__ || Object.getPrototypeOf(GenClass)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
                return func(_this.props);
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        return GenClass;
    }(_react2.default.PureComponent);

    setFunctionName(GenClass, func.name + 'Pure');
    return GenClass;
};
exports.setFunctionName = setFunctionName;
exports.createPureClass = createPureClass;
exports.default = {
    background: {
        after: {
            base: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                content: '""',
                transition: 'background-color 250ms linear'
            },
            colorize: function colorize(color) {
                return {
                    backgroundColor: color,
                    transition: 'none'
                };
            }
        }
    },
    color: {
        primaryBlue: "#2196F3"
    }
};