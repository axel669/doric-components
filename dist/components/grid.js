"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridBreak = exports.Col = exports.Grid = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _style = _interopRequireDefault(require("../style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var gridStyle = {
  "doric-grid": {
    display: 'block'
  },
  "doric-grid::before": {
    content: "\" \"",
    display: 'table'
  },
  "doric-grid::after": {
    content: "\" \"",
    display: 'table',
    clear: 'both'
  },
  "doric-col": {
    float: 'left'
  }
};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = 1 .to(13)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
    var width = (i / 12 * 100).toPrecision(8);
    gridStyle["doric-col.w".concat(i)] = {
      width: "".concat(width, "%")
    };
    gridStyle["doric-col.offset".concat(i)] = {
      marginLeft: "".concat(width, "%")
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

_style.default.add(gridStyle);

var DoricGrid = function DoricGrid(_ref) {
  var children = _ref.children;
  return _react.default.createElement("doric-grid", null, children);
};

exports.Grid = DoricGrid;

var DoricCol = function DoricCol(_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 1 : _ref2$size,
      _ref2$offset = _ref2.offset,
      offset = _ref2$offset === void 0 ? null : _ref2$offset,
      props = _objectWithoutProperties(_ref2, ["size", "offset"]);

  var className = "w".concat(size);

  if (offset !== null) {
    className = "".concat(className, " offset").concat(offset);
  }

  return _react.default.createElement("doric-col", _extends({
    class: className
  }, props));
};

exports.Col = DoricCol;

var DoricGridBreak = function DoricGridBreak() {
  return _react.default.createElement("doric-col", {
    class: "w12"
  });
};

exports.GridBreak = DoricGridBreak;