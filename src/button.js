import React from "react"
import styled, {css} from "styled-components"

import Clickable from "./clickable.js"
import CustomListeners from "./custom-listeners.js"
import {themedComponent, propToggle, propVariant} from "./helpers.js"

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
const sizeVariant = propVariant(
    {name: "size", defaultValue: "medium"},
    {
        small: styled.css`
            padding: 6px;
            margin: 2px;
        `,
        medium: styled.css`
            padding: 8px 12px;
            margin: 4px;
        `,
        large: styled.css`
            padding: 12px 16px;
            margin: 4px;
        `,
    }
)
const ButtonBaseComponent = styled(Clickable("doric-button"))`
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-weight: 500;
    text-transform: uppercase;

    background-color: ${props => props.theme.mainBG};
    color: ${props => props.theme.textColor};

    display: ${displayVariant};
    ${sizeVariant}
    ${raisedVariant}
    ${disabledVariant}
`
const ButtonBase = themedComponent(
    (source) => {
        const {
            onTap = () => {},
            children,
            ...props
        } = source
        const wrappedOnTap = evt => {
            if (props.disabled === true) {
                return
            }
            onTap(evt)
        }
        return <ButtonBaseComponent {...props}>
            <CustomListeners onTap={wrappedOnTap} />
            {children}
        </ButtonBaseComponent>
    },
    "Themed(ButtonBase)"
)

const normalColorVariant = propVariant(
    {name: "color"},
    {
        primary: styled.css`
            background-color: ${props => props.theme.primary};
            color: ${props => props.theme.lightText};
            &.gjs-tap-active:not([disabled="true"])::after {
                background-color: ${props => props.theme.hlLight};
            }
        `,
        danger: styled.css`
            background-color: ${props => props.theme.danger};
            color: ${props => props.theme.lightText};
            &.gjs-tap-active:not([disabled="true"])::after {
                background-color: ${props => props.theme.hlLight};
            }
        `,
        secondary: styled.css`
            background-color: ${props => props.theme.secondary};
            color: ${props => props.theme.lightText};
            &.gjs-tap-active:not([disabled="true"])::after {
                background-color: ${props => props.theme.hlLight};
            }
        `,
    }
)
const Button = themedComponent(
    styled(ButtonBase)`
        ${normalColorVariant}
    `,
    "Themed(Button)"
)

const flatColorVariant = propVariant(
    {name: "color"},
    {
        primary: styled.css`
            color: ${props => props.theme.primary};
        `,
        secondary: styled.css`
            color: ${props => props.theme.secondary};
        `,
        danger: styled.css`
            color: ${props => props.theme.danger};
        `,
    }
)
const outlineVariant = propToggle(
    "outline",
    styled.css`
        border: 1px solid ${props => props.theme[props.color] || props.theme.textColor};
    `,
    ""
)
const FlatButton = themedComponent(
    styled(ButtonBase)`
        ${flatColorVariant}
        ${outlineVariant}
    `,
    "Themed(FlatButton)"
)

export {
    Button,
    FlatButton,
}
