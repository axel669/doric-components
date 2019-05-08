import React, { Children } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { classes } from "../helpers/css.js";
import Image from "./image.js";
const panelCSS = ssjs({
  "doric-panel": {
    display: "flex",
    margin: 4,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
    borderTop: "1px solid lightgray",
    backgroundColor: theme => theme.panel.bg.color,
    overflow: "hidden",
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 4,
    "& doric-title": {
      padding: 0,
      margin: 0,
      marginBottom: 4,
      borderWidth: 0,
      boxShadow: "none"
    }
  },
  "doric-panel-actions": {
    position: "relative",
    display: "flex",
    margin: -8,
    marginTop: 0,
    "& > doric-button": {
      padding: 8
    },
    "& > *": {
      flex: "1 1 33.333333%"
    }
  },
  "doric-panel-content": {
    flexGrow: 1,
    padding: 12
  },
  "doric-panel-media": {
    display: "block"
  }
}, {
  name: "doric-panel"
});
panelCSS.generate(theme);

function Panel({
  children,
  ...passThrough
}) {
  const list = Children.toArray(children);
  const normal = list.filter(child => child.type !== Panel.media);
  const media = list.find(child => child.type === Panel.media);
  return React.createElement("doric-panel", passThrough, React.createElement("doric-panel-content", null, normal), media);
}

Panel.top = function PanelTop(props) {
  return React.createElement("doric-panel-top", props);
};

Panel.actions = function PanelBottom(props) {
  return React.createElement("doric-panel-actions", props);
};

Panel.media = function PanelMedia(props) {
  return React.createElement("doric-panel-media", props);
};

export default Panel;