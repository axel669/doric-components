import React, { memo, useRef, useImperativeHandle } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { classes } from "../helpers/css.js";
const textareaCSS = ssjs({
  "doric-input": {
    "& textarea": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: 6,
      borderWidth: 0,
      backgroundColor: "transparent",
      height: 80
    },
    "& fieldset.boring textarea": {
      border: "1px solid lightgray",
      borderRadius: 4,
      backgroundColor: "white",
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& fieldset.minimal textarea": {
      borderWidth: 0,
      borderRadius: 0,
      borderBottom: "1px solid lightgray",
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& fieldset.disabled:not(.boring):not(.minimal)": {
      backgroundColor: "lightgray"
    },
    "& fieldset.disabled textarea": {
      backgroundColor: "lightgray"
    }
  }
}, {
  name: "doric-tetarea"
});
textareaCSS.generate(theme);

function Textarea(props) {
  let {
    label,
    value,
    onChange,
    disabled,
    optional,
    required,
    className,
    boring,
    minimal,
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
  const taRef = useRef();
  useImperativeHandle(taRef, () => ({
    focus() {
      inputRef.current.focus();
    },

    get handle() {
      return inputRef.current;
    }

  }));
  return React.createElement("doric-input", wrapProps, React.createElement("fieldset", fieldProps, React.createElement("legend", null, label), React.createElement("textarea", {
    ref: taRef,
    disabled: disabled,
    value: value,
    onChange: onChange
  })));
}

export default memo(Textarea);