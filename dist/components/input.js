function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useRef, useImperativeHandle } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { classes } from "../helpers/css.js";
const inputCSS = ssjs({
  "doric-input": {
    margin: 2,
    display: "block",
    "& fieldset": {
      borderRadius: 4,
      overflow: "hidden",
      padding: 0,
      paddingRight: 1,
      backgroundColor: "white",
      border: "1px solid lightgray",
      margin: 0,
      "&.disabled": {
        backgroundColor: "lightgray",
        "& input": {
          backgroundColor: "transparent"
        }
      },
      "&.boring, &.minimal": {
        borderWidth: 0,
        backgroundColor: "transparent"
      },
      "& legend": {
        marginLeft: 16,
        fontSize: 12,
        "&:empty": {
          display: "none"
        },
        "&:not(:empty) + input": {
          paddingTop: 6
        }
      },
      "&.required legend": {
        color: theme => theme.input.label.required
      },
      "&.optional legend": {
        color: theme => theme.input.label.optional
      },
      "&:focus-within": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& input": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: 12,
      borderWidth: 0,
      backgroundColor: "transparent",
      height: 40
    },
    "& fieldset:not(.boring):not(.minimal) input": {
      outline: "none"
    },
    "& fieldset.boring input": {
      border: "1px solid lightgray",
      padding: "6px 12px",
      borderRadius: 4,
      backgroundColor: "white",
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      },
      "&[disabled]": {
        backgroundColor: "lightgray"
      }
    },
    "& fieldset.minimal input": {
      borderWidth: 0,
      borderBottom: "1px solid lightgray",
      padding: "6px 12px",
      borderRadius: 0,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      },
      "&[disabled]": {
        backgroundColor: "lightgray"
      }
    }
  }
}, {
  name: "doric-input"
});
inputCSS.generate(theme);

function Input(props) {
  const {
    label,
    value,
    onChange,
    disabled,
    optional,
    required,
    className,
    boring,
    minimal,
    type = "text",
    wrapProps,
    ...rest
  } = props;
  const fieldProps = { ...rest,
    className: classes({
      className,
      disabled,
      optional,
      required,
      boring,
      minimal
    })
  };
  const inputProps = {};
  const inputRef = useRef();
  useImperativeHandle(inputRef, () => ({
    focus() {
      inputRef.current.focus();
    },

    get handle() {
      return inputRef.current;
    }

  }));
  return React.createElement("doric-input", wrapProps, React.createElement("fieldset", fieldProps, React.createElement("legend", null, label), React.createElement("input", _extends({
    ref: inputRef,
    type: type,
    disabled: disabled,
    value: value,
    onChange: onChange
  }, inputProps))));
}

export default memo(Input);