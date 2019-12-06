import React, {memo, useRef, useImperativeHandle, forwardRef} from "react";
import ssjs from "ssjs";

import api from "@api";
import {classes} from "@css";

const inputCSS = ssjs(
    {
        "doric-input": {
            margin: 2,
            display: "block",
            "& fieldset": {
                borderRadius: 4,
                overflow: "hidden",
                padding: 0,
                paddingRight: 1,
                backgroundColor: theme => theme.input.bg.color,
                border: theme => `1px solid ${theme.input.border.normal}`,
                margin: 0,
                "&.disabled": {
                    backgroundColor: theme => theme.input.disabled,
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
                    color: (theme) => theme.label.text.required
                },
                "&.optional legend": {
                    color: (theme) => theme.label.text.optional
                },
                "&:focus-within": {
                    borderColor: (theme) => theme.input.border.focus
                }
            },
            "& input": {
                display: "block",
                width: "100%",
                fontSize: 16,
                padding: 12,
                borderWidth: 0,
                backgroundColor: "transparent",
                height: 40,
                color: theme => theme.input.text.color
            },
            "& fieldset:not(.boring):not(.minimal) input": {
                outline: "none"
            },
            "& fieldset.boring input": {
                border: theme => `1px solid ${theme.input.border.normal}`,
                padding: "6px 12px",
                borderRadius: 4,
                backgroundColor: theme => theme.input.bg.color,
                "&:focus": {
                    borderColor: (theme) => theme.input.border.focus
                },
                "&[disabled]": {
                    backgroundColor: theme => theme.input.disabled
                }
            },
            "& fieldset.minimal input": {
                borderWidth: 0,
                borderBottom: theme => `1px solid ${theme.input.border.normal}`,
                padding: "6px 12px",
                borderRadius: 0,
                "&:focus": {
                    borderColor: (theme) => theme.input.border.focus
                },
                "&[disabled]": {
                    backgroundColor: theme => theme.input.disabled
                }
            }
        }
    },
    {name: "doric-input"}
);
api.addCSS(inputCSS);

function Input(props) {
    const {
        label, value, onChange,
        disabled, optional, required, className, boring, minimal,
        type = "text", forwardedRef,
        wrapProps, _,
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

    const inputRef = useRef();
    if (forwardedRef !== undefined) {
        useImperativeHandle(
            forwardedRef,
            () => ({
                focus() {
                    inputRef.current.focus();
                },
                get handle() {
                    return inputRef.current;
                }
            })
        );
    }

    return <doric-input {...wrapProps}>
        <fieldset {...fieldProps}>
            <legend>{label}</legend>
            <input ref={inputRef}
                type={type}
                disabled={disabled}
                value={value}
                onChange={onChange}
                {..._}
            />
        </fieldset>
    </doric-input>
}
const forward = forwardRef(
    (props, ref) => <Input {...props} forwardedRef={ref} />
);
forward.displayName = "Input";

export default memo(forward);
