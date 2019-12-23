import "simplebar/dist/simplebar.min.css"

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
import GlobalStyle from "./global.js"
import Icon from "./icon.js"
import Input from "./input.js"
import {
    Modal,
    useModal,
} from "./modal.js"
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

import * as effects from "./effects.js"

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
    FlatButton,
    GlobalStyle,
    Icon,
    Input,
    Modal,
    Select,
    Switch,
    Tab,
    Tabs,
    ThemeProvider,
    Text,

    SimpleBar,

    lightTheme,
    darkTheme,

    themedComponent,

    ...effects,
    useModal,
}
