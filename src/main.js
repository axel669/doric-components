import "gesturesjs";
import ssjs from "ssjs";

import theme from "@theme";

import Button from "@components/button.js";
import Checkbox from "@components/checkbox.js";
import Collapse from "@components/collapse.js";
import CustomListeners from "@components/customListeners.js";
import Dialog from "@components/dialog.js";
import Grid from "@components/grid.js";
import Image from "@components/image.js";
import Input from "@components/input.js";
import Label from "@components/label.js";
import List from "@components/list.js";
import Navbar from "@components/navbar.js";
import Panel from "@components/panel.js";
import Radio from "@components/radio.js";
import Select from "@components/select.js";
import {Tabs, Tab} from "@components/tabs.js";
import Textarea from "@components/textarea.js";
import Title from "@components/title.js";

import {query} from "@css";
import api from "@api";

let mainCSS = ssjs(
    {
        "*": {
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            "&:focus": {
                outline: "none"
            }
        },
        "html body": {
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            fontFamily: theme => theme.fontFamily,
            backgroundColor: theme => theme.body.bg.color,
            color: theme => theme.body.text.color
        },
        "div.center": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        "div.fill": {
            width: "100%",
            height: "100%"
        }
    },
    {name: "main-style"}
);
api.addCSS(mainCSS);

api.generateCSS(window.doricTheme ?? {});
const {generateCSS} = api;

const tronBlue = "#6fc0ba";
const tronText = "#00cfda";
const tronTheme = {
    "fontFamily": "Inconsolata, monospace",
    "focusOutline": "2px solid #6fc0ba",
    "highlightColor": ssjs.color(255, 255, 255, 0.4),
    "color.primary": "#00aaad",
    "body.bg.color": "black",
    "body.text.color": "white",
    "divider.color": tronBlue,
    "input.bg.color": "black",
    "input.border.normal": "white",
    "input.border.focus": tronBlue,
    "input.disabled": "#111",
    "input.text.color": "white",
    "navbar.bg.color": "black",
    "navbar.border.width": "0px 0px 1px 0px",
    "navbar.border.style": "solid",
    "navbar.border.color": tronBlue,
    "navbar.text.color": tronText,
    "panel.bg.color": "black",
    "panel.border.width": 2,
    "panel.border.style": "solid",
    "panel.border.color": tronBlue,
    "select.bg.color": "black",
    "select.border.color": "white",
    "select.text.color": "white",
    "tabs.selected.text": tronText,
    "tabs.selected.border": tronBlue,
    "title.bg.color": "black",
};

export {
    Button,
    Checkbox,
    Collapse,
    CustomListeners,
    Dialog,
    Grid,
    Image,
    Input,
    Label,
    List,
    Navbar,
    Panel,
    Radio,
    Select,
    Tab,
    Tabs,
    Textarea,
    Title,
    generateCSS,
    tronTheme
};
