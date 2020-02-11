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

    input, select {
        color: ${props => props.theme.textColor};
        font-family: ${props => props.theme.font}, Arial;
    }
    option {
        background-color: ${props => props.theme.mainBG};
        color: ${props => props.theme.textColor};
    }
    * {
        box-sizing: border-box;
        position: relative;
    }

    .simplebar-scrollbar::before {
        background-color: ${props => props.theme.textColor};
    }
    .simplebar-visible.simplebar-scrollbar::before {
        opacity: 0.75;
    }
`)

export default GlobalStyle
