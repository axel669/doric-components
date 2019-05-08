import React, {Children} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {classes} from "@css";
import Image from "@components/image.js";

const panelCSS = ssjs(
    {
        "doric-panel": {
            display: "flex",
            margin: 4,
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
            backgroundColor: theme => theme.panel.bg.color,
            overflow: "hidden",
            position: "relative",
            top: 0,
            left: 0,
            borderRadius: 4,
            "& doric-title": {
                padding: 0,
                margin: 0,
                marginBottom: 4,
                borderWidth: 0,
                boxShadow: "none"
            }
        },
        "doric-panel-actions": {
            position: "relative",
            display: "flex",
            margin: -8,
            marginTop: 0,
            "& > doric-button": {
                padding: 8
            },
            "& > *": {
                flex: "1 1 33.333333%"
            }
        },
        "doric-panel-content": {
            flexGrow: 1,
            padding: 12
        },
        "doric-panel-media": {
            display: "block"
        }
    },
    {name: "doric-panel"}
)
panelCSS.generate(theme);

function Panel({children, ...passThrough}) {
    const list = Children.toArray(children);

    const normal = list.filter(child => child.type !== Panel.media);
    const media = list.find(child => child.type === Panel.media);

    return <doric-panel {...passThrough}>
        <doric-panel-content>
            {normal}
        </doric-panel-content>
        {media}
    </doric-panel>
}

Panel.top = function PanelTop(props) {
    return <doric-panel-top {...props} />
};
Panel.actions = function PanelBottom(props) {
    return <doric-panel-actions {...props} />
};
Panel.media = function PanelMedia(props) {
    return <doric-panel-media {...props} />
};

export default Panel;
