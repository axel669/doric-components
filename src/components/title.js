import React from "react";
import ssjs from "ssjs";

import theme from "@theme";
import Image from "@components/image.js";

const titleCSS = ssjs(
    {
        "doric-title": {
            display: "block",
            margin: 2,
            padding: "4px 12px",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)",
            border: theme => `1px solid ${theme.title.border.normal}`,
            backgroundColor: theme => theme.title.bg.color,
            "&::after": {
                content: "' '",
                display: "table",
                clear: "both"
            },
            "& > div": {
                fontSize: 20
            },
            "& > span": {
                fontSize: 12,
                color: "gray",
                float: "left"
            },
            "& > doric-image": {
                float: "left",
                marginRight: 8
            }
        }
    },
    {name: "doric-title"}
);
titleCSS.generate(theme);

function Title(props) {
    const {title, subtitle, profile, image} = props;

    const imageElem = (image !== undefined)
        ? <Image width={45} height={45} round source={image} />
        : null;

    return <doric-title>
        {imageElem}
        <div>{title}</div>
        <span>{subtitle}</span>
    </doric-title>
}

export default Title;
