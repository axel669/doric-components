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

let mainCSS = ssjs(
    {
        "*": {
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            "&:focus": {
                outline: "none"
            }
        },
        ...(query.mobile === false
            ? {
                "*:focus": {
                    outline: theme => theme.focusOutline
                }
            }
            : {}
        ),
        "html body": {
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            fontFamily: "Roboto",
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
mainCSS.generate(theme);

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
    Title
};
