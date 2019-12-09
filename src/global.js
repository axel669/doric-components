import styled from "styled-components"

import {themedComponent} from "./helpers.js"

const GlobalStyle = themedComponent(styled.createGlobalStyle`
    body, html {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        font-size: 14px;
        font-family: ${props => props.theme.font}, Arial;
        background-color: ${props => props.theme.mainBG};
        color: ${props => props.theme.textColor};
    }
    input {
        color: ${props => props.theme.textColor};
        font-family: ${props => props.theme.font}, Arial;
    }
    * {
        box-sizing: border-box;
    }
`)

export default GlobalStyle
