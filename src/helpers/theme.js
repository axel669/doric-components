import ssjs from "ssjs/esm";
import update from "@axel669/immutable-update";

const blue = ssjs.color.fromHex("#1d62d5");
const lightblue = ssjs.color.fromHex("#2196F3");

const baseTheme = {
    "highlightColor": ssjs.color(0, 0, 0, 0.4),
    "outline": blue,
    "focusOutline": "2px solid rgba(29, 98, 213, 0.5)",
    "color.primary": blue,
    "color.secondary": ssjs.color.fromHex("#128f12"),
    "color.danger": ssjs.color.fromHex("#F44336"),
    "color.accent": ssjs.color.fromHex("#FF4081"),
    "body.bg.color": ssjs.color.fromHex("#F0F0F0"),
    "body.text.color": "black",
    "dialog.cover": ssjs.color(0, 0, 0, 0.5),
    "label.text.normal": ssjs.color(0, 0, 0),
    "label.text.required": ssjs.color(255, 0, 0),
    "label.text.optional": blue,
    "collapse.border.color": ssjs.color(0, 0, 0),
    "input.bg.color": "white",
    "input.border.normal": "lightgray",
    "input.border.focus": blue,
    "input.disabled": ssjs.color.fromHex("#DDD"),
    "input.label.required": ssjs.color(255, 0, 0),
    "input.label.optional": blue,
    "list.bg.color": "transparent",
    "list.header.border.color": "lightgray",
    "list.header.bg.color": "white",
    "navbar.bg.color": blue,
    "navbar.text.color": "white",
    "panel.bg.color": "white",
    "select.bg.color": "white",
    "select.border.color": "black",
    "select.disabled": ssjs.color.fromHex("#DDD"),
    "tabs.selected": lightblue,
    "title.bg.color": "white",
    "title.border.normal": "lightgray",
    ...window.doricTheme
};

const theme = update(
    {},
    Object.entries(baseTheme).reduce(
        (all, [key, value]) => ({
            ...all,
            [`${key}.$set`]: value
        }),
        {}
    ),
    true
);

export default theme;
