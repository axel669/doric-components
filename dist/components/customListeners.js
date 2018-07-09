"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _style = _interopRequireDefault(require("../style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var CustomListeners =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CustomListeners, _React$Component);

  function CustomListeners(props) {
    var _this;

    _classCallCheck(this, CustomListeners);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomListeners).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      var _this$props$listeners = _this.props.listeners,
          listeners = _this$props$listeners === void 0 ? {} : _this$props$listeners;
      _this.elem = _reactDom.default.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this))).parentNode;
      _this.types = [];

      var _arr = Object.keys(listeners);

      var _loop = function _loop() {
        var type = _arr[_i];
        var evtType = type.slice(2).toLowerCase();
        registerGlobalListener(evtType, _this.elem, function (evt) {
          return _this.props.listeners[type](evt);
        });

        _this.types.push(evtType);
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }

      if (_this.types.length === 0) {
        console.warn("0 custom listeners added. check the spelling of the 'listeners' property");
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var type = _step.value;
          removeGlobalListener(type, _this.elem);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      return _react.default.createElement("custom-listener", {
        style: {
          display: 'none'
        }
      });
    });

    return _this;
  }

  return CustomListeners;
}(_react.default.Component);

var _default = CustomListeners;
exports.default = _default;