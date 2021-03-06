import React from "react";
import ssjs from "ssjs";

import api from "@api";
import {classes} from "@css";

let labelCSS = ssjs(
    {
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
    },
    {name: "doric-label"}
);
api.addCSS(labelCSS);

function Label(props) {
    const {
        required, optional,
        className, text = "Label",
        ...passThrough
    } = props;
    const _class = classes({
        className,
        required,
        optional
    });

    return <doric-label {...passThrough} class={_class}>
        {text}
    </doric-label>;
}

export default Label;
