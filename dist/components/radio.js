function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { tappable, classes } from "../helpers/css.js";
import CustomListeners from "./customListeners.js";
const radioCSS = ssjs({
  "doric-radio": {
    display: "block",
    margin: 4,
    "& doric-radio-item": {
      display: "block",
      flexGrow: 1,
      borderRadius: 4,
      overflow: "hidden",
      ...tappable(theme => theme.highlightColor)
    }
  }
}, {
  name: "doric-radio"
});
radioCSS.generate(theme);
const DefaultRadioRenderer = memo(function RadioItem({
  item,
  propName,
  selected
}) {
  const icon = React.createElement("ion-icon", {
    class: `ion-md-radio-button-${selected === true ? "on" : "off"}`
  });
  return React.createElement("div", {
    style: {
      padding: 8
    }
  }, icon, "\xA0", item[propName]);
});
const RadioItem = memo(function RadioItem(props) {
  const {
    index,
    item,
    propName,
    ItemRenderer,
    selected
  } = props;
  return React.createElement("doric-radio-item", {
    "data-index": index
  }, React.createElement(ItemRenderer, {
    item: item,
    propName: propName,
    selected: selected
  }));
});

function Radio(props) {
  const {
    options,
    value,
    propName = "label",
    onChange,
    itemRender: ItemRenderer = DefaultRadioRenderer,
    layout: Layout = "div",
    ...passThrough
  } = props;

  const onTap = evt => {
    let index = parseInt(evt.target.dataset.index);

    if (isNaN(index) === true) {
      return;
    }

    evt.option = options[index];
    evt.value = evt.option.value;
    onChange === null || onChange === void 0 ? void 0 : onChange(evt);
  };

  const selectedIndex = options.findIndex(item => item.value === value);
  return React.createElement("doric-radio", passThrough, React.createElement(CustomListeners, {
    onTap: onTap
  }), React.createElement(Layout, null, options.map((item, index) => React.createElement(RadioItem, _extends({
    key: index
  }, {
    item,
    propName,
    index,
    ItemRenderer
  }, {
    selected: selectedIndex === index
  })))));
}

export default memo(Radio);