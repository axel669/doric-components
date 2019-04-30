function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import ssjs from "ssjs";
import theme from "@theme";
import { classes } from "@css";
let labelCSS = ssjs({
  "doric-label": {
    display: "block",
    padding: 2,
    color: theme => theme.label.text.normal,
    fontSize: 12,
    "&.required": {
      color: theme => theme.label.text.required
    },
    "&.optional": {
      color: theme => theme.label.text.optional
    },
    "&:empty": {
      display: "none"
    }
  }
}, {
  name: "doric-label"
});
labelCSS.generate(theme);

function Label(props) {
  const {
    required,
    optional,
    className,
    text = "Label",
    ...passThrough
  } = props;

  const _class = classes({
    className,
    required,
    optional
  });

  return React.createElement("doric-label", _extends({}, passThrough, {
    class: _class
  }), text);
}

export default Label;