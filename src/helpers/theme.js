import {Color} from "@css";

const blue = Color("#1d62d5");
const lightblue = Color("#2196F3");
const theme = {
    highlightColor: Color(0, 0, 0, 0.4),
    outline: blue,
    focusOutline: `2px solid ${blue.opacity(0.5)}`,
    color: {
        primary: blue,
        secondary: Color("#128f12"),
        danger: Color("#F44336"),
        accent: Color("#FF4081")
    },
    bg: {
        color: Color("#F0F0F0")
    },
    label: {
        text: {
            normal: Color(0, 0, 0),
            required: Color(255, 0, 0),
            optional: Color(0, 128, 255)
        }
    },
    collapse: {
        border: {
            color: Color(0, 0, 0)
        }
    },
    input: {
        border: {
            focus: blue
        },
        label: {
            required: Color(255, 0, 0),
            optional: blue
        }
    },
    tabs: {
        selected: lightblue
    }
};

export default theme;
