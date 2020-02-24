import styled from "styled-components"

import renderAs from "./render-as.js"

const Clickable = tag => styled(renderAs(tag))`
    position: relative;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    border-radius: ${props => props.borderRadius};

    &::after {
        content: "";
        position: absolute;
        ${'' /* top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px; */}
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        transition: background-color 250ms linear;

        border-radius: ${props => props.borderRadius};
    }
    &.gjs-tap-active:not([disabled="true"])::after {
        transition: none;
        background-color: ${props => props.theme.hlColor};
    }
`

export default Clickable
