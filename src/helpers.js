import React, {useContext} from "react"

import {lightTheme} from "./themes.js"

const propVariant = ({name, defaultValue = "default"}, options) =>
    props => options[props[name] || defaultValue]
const propToggle = (name, tru, fals) =>
    props => props[name] ? tru : fals

const Theme = React.createContext(lightTheme)
const ThemeProvider = Theme.Provider
const themedComponent = (Component, displayName) => {
    const f = props => {
        const theme = useContext(Theme) || lightTheme
        return <Component {...props} theme={theme} />
    }
    f.displayName = displayName
    return f
}

export {
    propVariant,
    propToggle,
    themedComponent,
    ThemeProvider,
}
