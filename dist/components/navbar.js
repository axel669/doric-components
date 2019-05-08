import React, { memo } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
const navbarCSS = ssjs({
  "doric-navbar": {
    position: "sticky",
    backgroundColor: theme => theme.navbar.bg.color,
    color: theme => theme.navbar.text.color,
    paddingTop: 8,
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    display: "block",
    zIndex: "+100",
    textAlign: "center",
    fontSize: 20,
    boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.35)"
  }
}, {
  name: "doric-navbar"
});
navbarCSS.generate(theme);

function Navbar(props) {
  const {
    title
  } = props;
  return React.createElement("doric-navbar", null, title);
}

export default memo(Navbar);