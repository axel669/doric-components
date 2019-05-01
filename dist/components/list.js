function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { memo } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { tappable, classes } from "../helpers/css.js";
import CustomListeners from "./customListeners.js";
const listCSS = ssjs({
  "doric-list": {
    display: "block",
    margin: 4,
    "& doric-list-item": {
      display: "block",
      padding: 8,
      flexGrow: 1,
      ...tappable(theme => theme.highlightColor)
    },
    "& doric-list-header": {
      position: "sticky",
      display: "block",
      top: 0,
      zIndex: "+10",
      padding: 4,
      fontSize: 16,
      border: "1px solid lightgray",
      backgroundColor: "white",
      "&:empty": {
        display: "none"
      }
    }
  }
}, {
  name: "doric-list"
});
listCSS.generate(theme);
const DefaultListRenderer = memo(function ListItem({
  item,
  propName
}) {
  return React.createElement("div", null, item[propName]);
});
const ListItem = memo(function ListItem(props) {
  const {
    index,
    item,
    propName,
    ItemRenderer
  } = props;
  return React.createElement("doric-list-item", {
    "data-index": index
  }, React.createElement(ItemRenderer, {
    item: item,
    propName: propName
  }));
});

function List(props) {
  const {
    items,
    title,
    propName = "label",
    onItemTap,
    onItemHold,
    itemRenderer: ItemRenderer = DefaultListRenderer,
    itemContainer: ItemContainer = "div",
    ...passThrough
  } = props;

  const onTap = evt => {
    let index = parseInt(evt.target.dataset.index);
    evt.item = items[index];
    onItemTap === null || onItemTap === void 0 ? void 0 : onItemTap(evt);
  };

  const onHold = evt => {
    let index = parseInt(evt.target.dataset.index);
    evt.item = items[index];
    onItemHold === null || onItemHold === void 0 ? void 0 : onItemHold(evt);
  };

  return React.createElement("doric-list", passThrough, React.createElement("doric-list-header", null, title), React.createElement("doric-list-content", null, React.createElement(CustomListeners, {
    onTap: onTap,
    onHold: onHold
  }), React.createElement(ItemContainer, null, items.map((item, index) => React.createElement(ListItem, _extends({
    key: index
  }, {
    item,
    propName,
    index,
    ItemRenderer
  }))))));
}

export default memo(List);