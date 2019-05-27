import ssjs from "ssjs/esm";
import update from "@axel669/immutable-update";

const blue = ssjs.color.fromHex("#1d62d5");
const lightblue = ssjs.color.fromHex("#2196F3");

const baseTheme = {
    "fontFamily": "Roboto, Arial",
    "highlightColor": ssjs.color(0, 0, 0, 0.4),
    "secondaryHighlightColor": ssjs.color(255, 255, 255, 0.4),
    "outline": blue,
    "focusOutline": "2px solid rgba(29, 98, 213, 0.5)",
    "color.primary": blue,
    "color.secondary": ssjs.color.fromHex("#128f12"),
    "color.danger": ssjs.color.fromHex("#F44336"),
    "color.accent": ssjs.color.fromHex("#FF4081"),
    "body.bg.color": ssjs.color.fromHex("#F0F0F0"),
    "body.text.color": "black",
    "dialog.cover": ssjs.color(0, 0, 0, 0.5),
    "divider.size": 2,
    "divider.style": "solid",
    "divider.color": "black",
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
    "input.text.color": "black",
    "list.bg.color": "transparent",
    "list.header.border.color": "lightgray",
    "list.header.bg.color": "white",
    "navbar.bg.color": blue,
    "navbar.border.width": 0,
    "navbar.border.style": "",
    "navbar.border.color": "",
    "navbar.text.color": "white",
    "panel.bg.color": "white",
    "panel.border.width": 0,
    "panel.border.style": "",
    "panel.border.color": "",
    "select.bg.color": "white",
    "select.border.color": "black",
    "select.disabled": ssjs.color(87, 87, 87),
    "select.text.color": "black",
    "tabs.selected.text": lightblue,
    "tabs.selected.border": lightblue,
    "title.bg.color": "white",
    "title.border.normal": "lightgray"
};

const merge = (base, updates) => update(
    base,
    Object.entries(updates).reduce(
        (all, [key, value]) => ({
            ...all,
            [`${key}.$set`]: value
        }),
        {}
    ),
    true
);

const theme = merge({}, baseTheme);

export {merge, baseTheme};
export default theme;
