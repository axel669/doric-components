import React, { Children } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { tappable, classes } from "../helpers/css.js";
import CustomListeners from "./CustomListeners.js";
import Grid from "./grid.js";
const tabCSS = ssjs({
  "doric-tabs": {
    display: "block",
    "& doric-tab-bar": {
      display: "block",
      backgroundColor: ssjs.color(0, 0, 0, 0.05),
      "& doric-tab-label": {
        display: "inline-block",
        padding: "8px 0px",
        textAlign: "center",
        borderBottom: "2px solid transparent",
        fontSize: 14,
        ...tappable(theme => theme.highlightColor),
        "&[active='true']": {
          color: theme => theme.tabs.selected,
          borderBottomColor: theme => theme.tabs.selected
        }
      }
    },
    "& doric-tab": {
      display: "block"
    }
  },
  "doric-tab[selected='false']": {
    display: "none"
  }
}, {
  name: "doric-tabs"
});
tabCSS.generate(theme);

function Tabs(props) {
  const {
    selectedTab = 0,
    cols = 4,
    onTabChange,
    liveHidden = false,
    children: _children,
    ...passThrough
  } = props;
  const children = Children.toArray(_children);
  const tabLabelList = children.map(child => child.props.label);
  const tabs = children.map((child, index) => React.createElement("doric-tab", {
    selected: index === selectedTab,
    key: index
  }, child.props.children));
  const displayed = liveHidden == true ? tabs : tabs[selectedTab];

  const tabChange = evt => {
    let newTab = parseInt(evt.target.dataset.index);
    evt.selectedTab = newTab;
    onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(evt);
  };

  const tabLabels = tabLabelList.map((label, index) => React.createElement("doric-tab-label", {
    key: index,
    "data-index": index,
    active: index == selectedTab
  }, label));
  return React.createElement("doric-tabs", passThrough, React.createElement("doric-tab-bar", null, React.createElement(CustomListeners, {
    onTap: tabChange
  }), React.createElement(Grid, {
    cols: cols
  }, tabLabels)), displayed);
}

function Tab(props) {
  return props;
}

export { Tabs, Tab };