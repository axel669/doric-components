"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _theme = _interopRequireDefault(require("../theme"));

var _style = _interopRequireDefault(require("../style"));

var _util = require("../util");

var _image = _interopRequireDefault(require("./image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

_style.default.add({
  "doric-card": {
    display: 'block',
    margin: 4,
    boxShadow: ['2px 0px 2px rgba(0, 0, 0, 0.25)', '0px 2px 2px rgba(0, 0, 0, 0.25)', '-2px 0px 2px rgba(0, 0, 0, 0.25)', '0px -2px 2px rgba(0, 0, 0, 0.25)'].join(', '),
    backgroundColor: _theme.default.card.bg.normal,
    overflow: 'hidden',
    border: "1px solid ".concat(_theme.default.card.border.normal),
    borderRadius: 2,
    padding: 12,
    position: 'relative',
    top: 0,
    left: 0
  },
  "doric-card > :first-child": {
    marginTop: -12
  },
  "doric-card > :last-child": {
    marginBottom: -12
  },
  "doric-card > [data-card-flush], doric-card-media": {
    marginLeft: -12,
    marginRight: -12
  },
  "doric-card-title, doric-card-actions": {
    display: 'block',
    margin: '12px 0px',
    padding: 12
  },
  "doric-card-media + doric-card-title": {
    marginTop: 0
  },
  "doric-card-title + doric-card-media": {
    marginTop: -12
  },
  "doric-card-media": {
    height: 180,
    display: 'block',
    marginBottom: 12
  },
  "doric-card-title::before": {
    content: "\" \"",
    display: 'table'
  },
  "doric-card-title::after": {
    content: "\" \"",
    display: 'table',
    clear: 'both'
  },
  "doric-card > doric-card-actions[data-divider]": {
    borderTop: "2px solid ".concat(_theme.default.divider.color)
  },
  "doric-card-actions :first-child": {
    marginLeft: 0
  },
  ".doric-title-main": {
    fontSize: 22,
    marginBottom: 8
  },
  ".doric-title-subtitle": {
    float: 'left',
    color: '#666'
  },
  ".doric-title-icon": {
    width: 48,
    height: 48,
    float: 'left',
    borderRadius: 24,
    marginRight: 8,
    overflow: 'hidden'
  }
});

var DoricCard = function DoricCard(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? null : _props$title,
      _props$sideImage = props.sideImage,
      sideImage = _props$sideImage === void 0 ? null : _props$sideImage,
      passThrough = _objectWithoutProperties(props, ["title", "sideImage"]);

  var titleElem = null;
  var actionElem = null;
  var sideImg = null;

  if (title !== null) {
    titleElem = _react.default.createElement("doric-card-title", null, title);
  }

  if (sideImage !== null) {
    sideImg = _react.default.createElement("doric-card-side-image", null, _react.default.createElement(_image.default, {
      height: "100%",
      source: sideImage,
      imageSize: "cover"
    }));
  }

  return _react.default.createElement("doric-card", _extends({}, passThrough, {
    "side-img": sideImage !== null
  }), props.children, sideImg);
};

var DoricCardTitle = function DoricCardTitle(props) {
  var main = props.main,
      subtitle = props.subtitle,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? null : _props$icon;
  var iconElement = icon === null ? null : _react.default.createElement("div", {
    className: "doric-title-icon"
  }, _react.default.createElement(_image.default, {
    source: icon,
    width: "100%",
    height: "100%",
    imageSize: "cover"
  }));
  return _react.default.createElement("doric-card-title", {
    "data-card-flush": true
  }, iconElement, _react.default.createElement("div", {
    className: "doric-title-main"
  }, main), _react.default.createElement("div", {
    className: "doric-title-subtitle"
  }, subtitle));
};

var DoricCardActions = function DoricCardActions(props) {
  var divider = props.divider;
  return _react.default.createElement("doric-card-actions", {
    "data-card-flush": true,
    "data-divider": divider
  }, props.children);
};

var DoricCardMedia = function DoricCardMedia(props) {
  return _react.default.createElement("doric-card-media", props);
};

DoricCard.title = DoricCardTitle;
DoricCard.actions = DoricCardActions;
DoricCard.media = DoricCardMedia;
DoricCard.pure = (0, _util.createPureClass)(DoricCard);
DoricCard.title.pure = (0, _util.createPureClass)(DoricCardTitle);
DoricCard.actions.pure = (0, _util.createPureClass)(DoricCardActions);
DoricCard.media.pure = (0, _util.createPureClass)(DoricCardMedia);
var _default = DoricCard;
exports.default = _default;