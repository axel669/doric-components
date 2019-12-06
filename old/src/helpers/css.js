const query = {
    mobile: screen.availWidth <= 640
};

const tapActive = ".gjs-tap-active:not(.disabled):not(.flat)::after";
const bcolorVariant = (colorName) => ({
    [`&.${colorName}`]: {
        backgroundColor: theme => theme.color[colorName],
        color: "white",
        [`&.flat`]: {
            backgroundColor: "transparent",
            color: theme => theme.color[colorName]
        },
        [`&${tapActive}`]: {
            backgroundColor: (theme) => theme.secondaryHighlightColor
        }
    }
});

const tappable = (color) => {
    const style = {
        position: "relative",
        "&::after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "background-color 250ms linear"
        },
        "&.gjs-tap-active:not(.disabled)::after": {
            transition: "none",
            backgroundColor: color
        }
    };

    return style;
}

const classes = (obj) => {
    let list = [];
    for (const [key, value] of Object.entries(obj)) {
        if (key === "className" && value !== undefined) {
            list.push(value);
        }
        if (value === true) {
            list.push(key);
        }
    }
    return list.join(" ");
};

export {
    bcolorVariant,
    tappable,
    classes,
    query
};
