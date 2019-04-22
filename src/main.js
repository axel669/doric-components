import "gesturesjs";
import ssjs from "ssjs";

import theme from "@theme";

import button from "@components/button.js";
import customListeners from "@components/customListeners.js";

let mainCSS = ssjs(
    {
        "*": {
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            "&:focus": {
                outline: "none"
            }
        },
        "@media screen and (min-width: 640px)": {
            "*:focus": {
                outline: (theme) => theme.focusOutline
            }
        },
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
    customListeners
};
