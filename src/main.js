import "gesturesjs";
import ssjs from "ssjs";

import theme from "@theme";

import button from "@components/button.js";
import checkbox from "@components/checkbox.js";
import collapse from "@components/collapse.js";
import customListeners from "@components/customListeners.js";
import grid from "@components/grid.js";
import image from "@components/image.js";
import label from "@components/label.js";
import panel from "@components/panel.js";
import title from "@components/title.js";

import {query} from "@css";

let mainCSS = ssjs(
    {
        "*": {
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            "&:focus": {
                outline: "none"
            }
        },
        ...(query.mobile === false
            ? {
                "*:focus": {
                    outline: theme.focusOutline
                }
            }
            : {
                "*:focus": {
                    boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
                }
            }
        ),
        "html body": {
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            fontFamily: "Roboto",
            backgroundColor: theme.bg
        },
        "div.center": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        "div.fill": {
            width: "100%",
            height: "100%"
        }
    },
    {name: "main-style"}
);
mainCSS.generate(theme);

export default {
    button,
    checkbox,
    collapse,
    customListeners,
    grid,
    image,
    label,
    panel,
    title
};
