import {memo, useRef, useImperativeHandle} from "react";
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
                height: 80
            },
            "& fieldset.boring textarea": {
                border: "1px solid lightgray",
                borderRadius: 4
            }
        }
    },
    {name: "doric-tetarea"}
);
textareaCSS.generate(theme);

function Textarea(props) {
    let {
        label, value, onChange,
        disabled, optional, required, className, boring,
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
            boring
        })
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
            />
        </fieldset>
    </doric-input>
}

export default memo(Textarea);
