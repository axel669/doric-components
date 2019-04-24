import ssjs from "ssjs";

import theme from "@theme";

const titleCSS = ssjs(
    {
        "doric-title": {
            display: "block",
            margin: 2,
            padding: 4,
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)",
            border: "1px solid lightgray",
            backgroundColor: "white",
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
                marginRight: 8,
            }
        }
    },
    {name: "doric-title"}
);
titleCSS.generate(theme);

function Title(props) {
    const {title, subtitle, profile, image} = props;

    return <doric-title>
        <div>{title}</div>
        <span>{subtitle}</span>
    </doric-title>
}

export default Title;
