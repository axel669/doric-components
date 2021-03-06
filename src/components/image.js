import React from "react";
import ssjs from "ssjs";

import api from "@api";

let imageCSS = ssjs(
    {
        "doric-image": {
            display: "inline-block",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            position: "relative",
            "& > img": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0
            }
        }
    },
    {name: "doric-image"}
)
api.addCSS(imageCSS);

function Image(props) {
    const {
        source, width, height,
        size, round,
        ...passThrough
    } = props;
    const border = round == true
        ? {borderRadius: Math.max(width, height)}
        : {};
    const style = {
        ...passThrough.style,
        backgroundImage: `url('${source}')`,
        backgroundSize: size,
        width,
        height,
        ...border
    };

    return <doric-image {...passThrough} style={style}>
        <img src={source} />
    </doric-image>
}

export default Image;
