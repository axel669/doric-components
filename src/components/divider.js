import React from "react";
import ssjs from "ssjs";

import api from "@api";

const dividerCSS = ssjs(
    {
        "doric-divider": {
            display: "block",
            margin: "2px 0px",
            borderTopWidth: theme => theme.divider.size,
            borderTopStyle: theme => theme.divider.style,
            borderTopColor: theme => theme.divider.color,
        }
    },
    {name: "doric-divider"}
);
api.addCSS(dividerCSS);

function Divider({children, ...props}) {
    return <doric-divider {...props} />;
}

export default Divider;
