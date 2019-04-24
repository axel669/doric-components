import ssjs from "ssjs";

import theme from "@theme";

let imageCSS = ssjs(
    {
        "doric-image": {
            display: "inline-block",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            "& > img": {
                width: "100%",
                height: "100%",
                opacity: 0
            }
        }
    },
    {name: "doric-image"}
)
imageCSS.generate(theme);

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
