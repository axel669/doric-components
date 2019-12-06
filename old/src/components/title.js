import React from "react";
import ssjs from "ssjs";

import api from "@api";
import Image from "@components/image.js";
import Divider from "@components/divider.js";

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
            },
            "& doric-divider": {
                borderTopColor: theme => theme.divider.color,
                borderTopStyle: "solid",
                borderTopWidth: 1,
                marginRight: -12,
                marginLeft: -12
            }
        }
    },
    {name: "doric-title"}
);
api.addCSS(titleCSS);

function Title(props) {
    const {title, subtitle, divider, image} = props;

    const imageElem = (image !== undefined)
        ? <Image width={45} height={45} round source={image} />
        : null;

    return <doric-title divider={divider}>
        {imageElem}
        <div>{title}</div>
        <span>{subtitle}</span>
        {divider && <Divider />}
    </doric-title>
}

export default Title;
