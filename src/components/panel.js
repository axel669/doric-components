import ssjs from "ssjs";

import theme from "@theme";
import Image from "@components/image.js";

const panelCSS = ssjs(
    {
        "doric-panel": {
            display: "block",
            margin: 4,
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
            borderTop: "1px solid lightgray",
            backgroundColor: theme.bg.color,
            overflow: "hidden",
            padding: 12,
            position: "relative",
            top: 0,
            left: 0,
            borderRadius: 4,
            "& > doric-title": {
                margin: -12,
                marginBottom: 4,
                borderWidth: 0
            }
        },
        "doric-panel-top": {
            position: "relative",
            display: "block",
            margin: -12,
            marginBottom: 0,
            padding: 4
        },
        "doric-panel-bottom": {
            position: "relative",
            display: "block",
            margin: -12,
            marginTop: 0,
            padding: 4
        }
    },
    {name: "doric-panel"}
)
panelCSS.generate(theme);

function Panel({children}) {
    return <doric-panel>
        {children}
    </doric-panel>
}

Panel.top = function PanelTop(props) {
    return <doric-panel-top {...props} />
};
Panel.bottom = function PanelBottom(props) {
    return <doric-panel-bottom {...props} />
};

export default Panel;
