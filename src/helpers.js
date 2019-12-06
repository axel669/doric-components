import React, {useContext} from "react"

import {lightTheme} from "./themes.js"

const propVariant = (name, options) =>
    props => options[props[name] || "default"]
const propToggle = (name, tru, fals) =>
    props => props[name] ? tru : fals

const Theme = React.createContext(lightTheme)
const ThemeProvider = Theme.Provider
const themedComponent = Component =>
    props => {
        const theme = useContext(Theme) || lightTheme
        return <Component {...props} theme={theme} />
    }

export {
    propVariant,
    propToggle,
    themedComponent,
    ThemeProvider,
}
