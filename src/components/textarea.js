import React, {memo, useRef, useImperativeHandle, forwardRef} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {classes} from "@css";

const textareaCSS = ssjs(
    {
        "doric-input": {
            "& textarea": {
                display: "block",
                width: "100%",
                fontSize: 16,
                padding: 6,
                borderWidth: 0,
                backgroundColor: "transparent",
                color: theme => theme.input.text.color
            },
            "& fieldset.boring textarea": {
                border: theme => `1px solid ${theme.input.border.normal}`,
                borderRadius: 4,
                backgroundColor: theme => theme.input.bg.color,
                "&:focus": {
                    borderColor: (theme) => theme.input.border.focus
                }
            },
            "& fieldset.minimal textarea": {
                borderWidth: 0,
                borderRadius: 0,
                borderBottom: theme => `1px solid ${theme.input.border.normal}`,
                "&:focus": {
                    borderColor: (theme) => theme.input.border.focus
                }
            },
            "& fieldset.disabled:not(.boring):not(.minimal)": {
                backgroundColor: "lightgray"
            },
            "& fieldset.disabled textarea": {
                backgroundColor: "lightgray"
            }
        }
    },
    {name: "doric-tetarea"}
);
textareaCSS.generate(theme);

function Textarea(props) {
    let {
        label, value, onChange, height = 80,
        disabled, optional, required, className, boring, minimal,
        wrapProps,
        ...rest
    } = props;

    const fieldProps = {
        ...rest,
        className: classes({
            className,
            disabled,
            optional,
            required,
            boring,
            minimal
        })
    };
    const taStyle = {
        height
    };

    const taRef = useRef();
    useImperativeHandle(
        taRef,
        () => ({
            focus() {
                inputRef.current.focus();
            },
            get handle() {
                return inputRef.current;
            }
        })
    );

    return <doric-input {...wrapProps}>
        <fieldset {...fieldProps}>
            <legend>{label}</legend>
            <textarea ref={taRef}
                disabled={disabled}
                value={value}
                onChange={onChange}
                style={taStyle}
            />
        </fieldset>
    </doric-input>
}
const forward = forwardRef(
    (props, ref) => <Textarea {...props} forwardedRef={ref} />
);
forward.displayName = "Textarea";

export default memo(forward);
