"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureBaseComponent = exports.BaseComponent = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DoricMixin = function DoricMixin(parent) {
  return (
    /*#__PURE__*/
    function (_parent) {
      _inherits(_class2, _parent);

      function _class2() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, _class2);

        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class2)).call.apply(_getPrototypeOf2, [this].concat(_args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "linkState", function (name) {
          var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'target.value';
          var getValue = new Function('evt', "return evt.".concat(prop));
          return function (evt) {
            var value = getValue(evt);

            _this.setState(function () {
              return _defineProperty({}, name, value);
            });
          };
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createLinks", function () {
          var links = {};

          for (var _len2 = arguments.length, linkInfo = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            linkInfo[_key2] = arguments[_key2];
          }

          for (var _i = 0; _i < linkInfo.length; _i++) {
            var _this2;

            var info = linkInfo[_i];
            var args = Array.isArray(info) === true ? info : [info];
            links[args[0]] = (_this2 = _this).linkState.apply(_this2, _toConsumableArray(args));
          }

          return links;
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setStatef", function (value) {
          return _this.setState(function () {
            return value;
          });
        });

        return _this;
      }

      return _class2;
    }(parent)
  );
};

var BaseComponent =
/*#__PURE__*/
function (_DoricMixin) {
  _inherits(BaseComponent, _DoricMixin);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseComponent).apply(this, arguments));
  }

  return BaseComponent;
}(DoricMixin(_react.default.Component));

exports.BaseComponent = BaseComponent;

var PureBaseComponent =
/*#__PURE__*/
function (_DoricMixin2) {
  _inherits(PureBaseComponent, _DoricMixin2);

  function PureBaseComponent() {
    _classCallCheck(this, PureBaseComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PureBaseComponent).apply(this, arguments));
  }

  return PureBaseComponent;
}(DoricMixin(_react.default.PureComponent));

exports.PureBaseComponent = PureBaseComponent;