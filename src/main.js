import "gesturesjs";
import ssjs from "ssjs";

import button from "./components/button.js";

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
                // outline: (theme) => theme.focusOutline
            }
        },
        "html body": {
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            fontFamily: "Roboto",
            // backgroundColor: theme.bg
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
mainCSS.generate();

export default {
    button
};
