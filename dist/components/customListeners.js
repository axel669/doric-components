'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalListeners = {};
var registerGlobalListener = function registerGlobalListener(type, elem, handler) {
    if (globalListeners.hasOwnProperty(type) === false) {
        globalListeners[type] = new Map();
        window.addEventListener(type, function (evt) {
            var handlers = globalListeners[type];
            var current = evt.target;
            while (current !== null) {
                if (handlers.has(current) === true) {
                    handlers.get(current)(evt);
                }
                current = current.parentNode;
            }
        });
    }

    globalListeners[type].set(elem, handler);
};
var removeGlobalListener = function removeGlobalListener(type, elem) {
    globalListeners[type].delete(elem);
};

var CustomListeners = function (_React$Component) {
    _inherits(CustomListeners, _React$Component);

    function CustomListeners(props) {
        _classCallCheck(this, CustomListeners);

        var _this = _possibleConstructorReturn(this, (CustomListeners.__proto__ || Object.getPrototypeOf(CustomListeners)).call(this, props));

        _this.componentDidMount = function () {
            var _this$props$listeners = _this.props.listeners,
                listeners = _this$props$listeners === undefined ? {} : _this$props$listeners;

            _this.elem = _reactDom2.default.findDOMNode(_this).parentNode;
            _this.types = [];

            var _loop = function _loop(type) {
                var evtType = type.slice(2).toLowerCase();
                registerGlobalListener(evtType, _this.elem, function (evt) {
                    return _this.props.listeners[type](evt);
                });
                _this.types.push(evtType);
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(listeners)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

            if (_this.types.length === 0) {
                console.warn("0 custom listeners added. check the spelling of the 'listeners' property");
            }
        };

        _this.componentWillUnmount = function () {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this.types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var type = _step2.value;

                    removeGlobalListener(type, _this.elem);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        };

        _this.render = function () {
            return _react2.default.createElement('custom-listener', { style: { display: 'none' } });
        };

        return _this;
    }

    return CustomListeners;
}(_react2.default.Component);

exports.default = CustomListeners;