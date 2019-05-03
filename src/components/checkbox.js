import React, {memo} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, classes} from "@css";

import CustomListeners from "@components/customListeners.js"

const checkboxCSS = ssjs(
    {
        "doric-checkbox": {
            display: "block",
            margin: 2,
            padding: 8,
            borderRadius: 4,
            overflow: "hidden",
            userSelect: "none",
            cursor: "pointer",
            margin: 2,
            ...tappable(theme => theme.highlightColor),
            "&.left": {
                paddingLeft: 24
            },
            "&.right": {
                paddingRight: 24
            },
            "&-icon": {
                position: "absolute",
                display: "flex",
                top: 0,
                bottom: 0,
                width: 24,
                fontSize: 20,
                alignItems: "center",
                justifyContent: "center",
                "&.left": {
                    left: 0
                },
                "&.right": {
                    left: "auto",
                    right: 0
                }
            }
        }
    },
    {name: "doric-checkbox"}
);
checkboxCSS.generate(theme);

function Checkbox(props) {
    const {
        checked, checkSide = "left", tabIndex = 1, onChange,
        text, children,
        className,
        ...rest
    } = props;

    const iconName = (checked == true)
        ? "checkbox"
        : "square-outline";

    const wrapProps = {
        tabIndex,
        class: classes({
            className,
            [checkSide]: true
        }),
        ...rest
    };
    const iconClass = classes({
        [`ion-md-${iconName}`]: true,
        [checkSide]: true
    });

    const toggle = evt => {
        evt.checked = checked === false;
        onChange?.(evt);
    };

    return <doric-checkbox {...wrapProps}>
        <doric-checkbox-icon class={iconClass} />
        {text}{children}
        <CustomListeners onTap={toggle} />
    </doric-checkbox>
}

export default memo(Checkbox);
