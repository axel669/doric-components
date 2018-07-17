"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _style = _interopRequireDefault(require("../style.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var flexCSS = {
  "doric-flex": {
    display: 'flex',
    flexWrap: 'wrap'
  },
  "doric-flex-grid-col": {
    flex: '1'
  }
};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = 1 .to(13)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
    var width = (i / 12 * 100).toPrecision(8);
    flexCSS["doric-flex-grid-col[size='".concat(i, "']")] = {
      minWidth: "".concat(width, "%"),
      maxWidth: "".concat(width, "%")
    };
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

_style.default.add(flexCSS);

var DoricFlex = function DoricFlex(props) {
  return _react.default.createElement("doric-flex", props);
};

var DoricFlexCol = function DoricFlexCol(_ref) {
  var _ref$grow = _ref.grow,
      grow = _ref$grow === void 0 ? 1 : _ref$grow,
      _ref$shrink = _ref.shrink,
      shrink = _ref$shrink === void 0 ? grow : _ref$shrink,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      props = _objectWithoutProperties(_ref, ["grow", "shrink", "style"]);

  return _react.default.createElement("doric-flex-col", _extends({
    style: _objectSpread({}, style, {
      flex: "".concat(grow, " ").concat(shrink)
    })
  }, props));
};

var DoricFlexGridCol = function DoricFlexGridCol(props) {
  return _react.default.createElement("doric-flex-grid-col", props);
};

DoricFlex.col = DoricFlexCol;
DoricFlex.gridCol = DoricFlexGridCol;
var _default = DoricFlex;
exports.default = _default;