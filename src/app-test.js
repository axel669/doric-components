import React from "react"
import ReactDOM from "react-dom"

import styled from "styled-components"

import doric from "./main.js"
import {darkTheme} from "./themes.js"

function App() {
    const tapped = () => console.log("tapped")
    return <doric.ThemeProvider value={doric.darkTheme}>
        <doric.GlobalStyle />
        <doric.Button onTap={tapped}>Testing</doric.Button>
        <doric.Button onTap={tapped} type="primary">Testing</doric.Button>
        <doric.Button onTap={tapped} type="primary" disabled>Testing</doric.Button>
    </doric.ThemeProvider>
}

ReactDOM.render(
    <App />,
    document.querySelector("app-root")
)
