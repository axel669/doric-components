function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, memo } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { tappable, classes } from "../helpers/css.js";
import CustomListeners from "./customListeners.js";
let collapseCSS = ssjs({
  "doric-collapse": {
    display: "block",
    borderRadius: 2,
    overflow: "hidden",
    margin: 4,
    padding: 0,
    border: theme => {
      let {
        width = 1,
        type = "solid",
        color
      } = theme.collapse.border;
      return `${width}px ${type} ${color}`;
    },
    "&.hide > div": {
      display: "none"
    },
    "&-label": {
      display: "block",
      padding: 4,
      fontSize: 16,
      userSelect: "none",
      ...tappable(theme => theme.highlightColor)
    },
    "&-icon": {
      display: "inline-block",
      width: 16,
      textAlign: "center"
    }
  }
}, {
  name: "doric-collapse"
});
collapseCSS.generate(theme);

function Collapse(props) {
  const [hide, toggleVis] = useState(true);
  const {
    className,
    text = "Collapse",
    tabIndex = 1,
    children,
    ...passThrough
  } = props;

  const _classes = classes({
    className,
    hide
  });

  const direction = hide == true ? "right" : "down";
  const icon = React.createElement("doric-collapse-icon", {
    class: `ion-md-arrow-drop${direction}`
  });
  const pass = {
    tabIndex,
    ...passThrough
  };

  const toggle = () => toggleVis(hide === false);

  return React.createElement("doric-collapse", _extends({}, pass, {
    class: _classes
  }), React.createElement("doric-collapse-label", null, icon, " ", text, React.createElement(CustomListeners, {
    onTap: toggle
  })), React.createElement("div", null, children));
}

export default memo(Collapse);