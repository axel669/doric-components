import "simplebar/dist/simplebar.min.css"

import "gesturesjs"

import {
    ActionButton,
    Button,
    FlatButton
} from "./button.js"
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia
} from "./card.js"
import Checkbox from "./checkbox.js"
import CustomListeners from "./custom-listeners.js"
import GlobalStyle from "./global.js"
import Icon from "./icon.js"
import Input from "./input.js"
import Menu from "./menu.js"
import {
    Modal,
    useModal,
} from "./modal.js"
import Popover from "./popover.js"
import Portal from "./portal.js"
import Select from "./select.js"
import Switch from "./switch.js"
import {
    Tab,
    Tabs
} from "./tabs.js"
import {
    ThemeProvider,
    themedComponent
} from "./helpers.js"
import Text from "./text.js"

import SimpleBar from "simplebar-react"

import * as hooks from "./hooks.js"
import dialog from "./dialog.js"

import {lightTheme, darkTheme} from "./themes.js"

export default {
    ActionButton,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    CustomListeners,
    FlatButton,
    GlobalStyle,
    Icon,
    Input,
    Menu,
    Modal,
    Popover,
    Portal,
    Select,
    Switch,
    Tab,
    Tabs,
    ThemeProvider,
    Text,

    SimpleBar,
    // OverlayScrollbars,
    // OverlayScrollbarsComponent,

    lightTheme,
    darkTheme,

    themedComponent,

    ...hooks,
    dialog,
    useModal,
}
