import React, {useContext} from "react"

import {lightTheme} from "./themes.js"

const propVariant = ({name, defaultValue = "default"}, options) =>
    props => options[props[name] || defaultValue]
const propToggle = (name, tru, fals) =>
    props => props[name] ? tru : fals

const Theme = React.createContext(lightTheme)
const ThemeProvider = Theme.Provider
const themedComponent = (Component, displayName) => {
    const f = ({forwardRef, ...props}) => {
        const theme = useContext(Theme) || lightTheme
        return <Component {...props} theme={theme} ref={forwardRef} />
    }
    f.displayName = displayName
    return f
}

const HiddenControl = styled.div`
    display: none;
`

export {
    propVariant,
    propToggle,
    themedComponent,
    ThemeProvider,
    HiddenControl,
}
