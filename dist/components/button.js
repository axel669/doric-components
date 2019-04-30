import { memo } from "react";
import ssjs from "ssjs";
import CustomListeners from "@components/customListeners.js";
import * as css from "@css";
import theme from "@theme";
const buttonSheet = ssjs({
  "doric-button": {
    display: "inline-flex",
    padding: "8px 16px",
    borderRadius: 4,
    userSelect: "none",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    userSelect: "none",
    margin: 2,
    transition: "background-color 150ms linear",
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer"
    },
    ...css.tappable(theme => theme.highlightColor),
    ...css.bcolorVariant("primary"),
    ...css.bcolorVariant("secondary"),
    ...css.bcolorVariant("danger"),
    ...css.bcolorVariant("accent"),
    "&.block": {
      display: "flex"
    },
    "&.disabled": {
      opacity: 0.4
    },
    "&.snug": {
      padding: 0
    },
    "&.flush": {
      margin: 0
    },
    "&.raised": {
      boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.4)"
    }
  }
}, {
  name: "doric-button"
});
buttonSheet.generate(theme);

function Button(props) {
  const {
    text,
    onTap,
    children,
    tabIndex = 1,
    style = {},
    icon = null,
    iconSize = null,
    circle,
    _,
    ...rest
  } = props;

  if (circle !== undefined) {
    style.width = circle;
    style.height = circle;
    style.padding = 0;
    style.borderRadius = "50%";
  }

  const iconElem = icon === null ? null : React.createElement("ion-icon", {
    class: icon,
    style: {
      fontSize: iconSize
    }
  });
  const wrapProps = { ..._,
    tabIndex,
    style,
    class: css.classes(rest)
  };
  return React.createElement("doric-button", wrapProps, React.createElement(CustomListeners, {
    onTap: onTap
  }), iconElem, text, children);
}

;
export default memo(Button);