import React from "react"
import styled, {css} from "styled-components"

import Clickable from "./clickable.js"
import CustomListeners from "./custom-listeners.js"
import {themedComponent, propToggle, propVariant} from "./helpers.js"

const colorationVariant = {
    normal: styled.css`
        background-color: ${props => props.theme.mainBG};
        color: ${props => props.theme.textColor};
    `,
    primary: styled.css`
        background-color: ${props => props.theme.primary};
        color: ${props => props.theme.lightText};
        &.gjs-tap-active:not([disabled="true"])::after {
            background-color: ${props => props.theme.glLight};
        }
    `,
    danger: styled.css`
        background-color: ${props => props.theme.danger};
        color: ${props => props.theme.lightText};
        &.gjs-tap-active:not([disabled="true"])::after {
            background-color: ${props => props.theme.glLight};
        }
    `,
}
const displayVariant = propToggle("block", "flex", "inline-flex")
const raisedVariant = propToggle(
    "raised",
    css`boxShadow: 2px 2px 3px rgba(0, 0, 0, 0.4);`,
    ""
)
const disabledVariant = propToggle(
    "disabled",
    css`opacity: 0.7;`,
    ""
)
const ButtonBase = styled(Clickable)`
    padding: 8px 16px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    margin: 4px;
    overflow: hidden;

    display: ${displayVariant};
    ${raisedVariant}
    ${disabledVariant}
    ${props => colorationVariant[props.type || "normal"]}
`
function Button(source) {
    const {
        onTap = () => {},
        children,
        ...sourceProps
    } = source
    const props = {
        type: "normal",
        ...sourceProps,
    }
    const wrappedOnTap = evt => {
        if (sourceProps.disabled === true) {
            return
        }
        onTap(evt)
    }
    return <ButtonBase {...props} tag="doric-button">
        <CustomListeners onTap={wrappedOnTap} />
        {children}
    </ButtonBase>
}

export default themedComponent(Button)
