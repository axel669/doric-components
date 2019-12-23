import React from "react"
import styled, {css} from "styled-components"

import Clickable from "./clickable.js"
import CustomListeners from "./custom-listeners.js"
import Icon from "./icon.js"
import {themedComponent, propToggle, propVariant} from "./helpers.js"

const displayVariant = propToggle("block", "flex", "inline-flex")
const raisedVariant = propToggle(
    "raised",
    css`boxShadow: 2px 2px 3px rgba(0, 0, 0, 0.4);`,
    ""
)
const disabledVariant = propToggle(
    "disabled",
    css`
        opacity: 0.7;
        font-weight: 300;
    `,
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
const padPosition = {
    start: "right",
    end: "left",
}
const IconWrapper = styled.span`
    padding-${props => padPosition[props.position]}: 4px;
`
const ButtonBaseComponent = styled(Clickable("doric-button"))`
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-weight: 500;
    text-transform: uppercase;
    background-color: transparent;

    color: ${props => props.theme.textColor};
    flex-direction: ${props => props.layout || "row"};

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
            startIcon = null,
            endIcon = null,
            text = null,
            ...props
        } = source
        const wrappedOnTap = evt => {
            if (props.disabled === true) {
                return
            }
            onTap(evt)
        }
        const start = (startIcon !== null)
            ? <IconWrapper position="start">{startIcon}</IconWrapper>
            : null
        const end = (endIcon !== null)
            ? <IconWrapper position="end">{endIcon}</IconWrapper>
            : null
        return <ButtonBaseComponent {...props}>
            <CustomListeners onTap={wrappedOnTap} />
            {start}
            {text}
            {children}
            {end}
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
    "bordered",
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

const ActionButtonElement = themedComponent(
    styled(ButtonBase)`
        border-radius: 50%;

        ${flatColorVariant}
        width: ${props => props.size || "30px"};
        height: ${props => props.size || "30px"};
    `
)
const ActionButton = source => {
    const {icon, children, ...props} = source
    const iconElement = cond(typeof icon === "string")(
        <Icon name={icon} />,
        icon
    )

    return <ActionButtonElement {...props} text={iconElement} />
}

export {
    ActionButton,
    Button,
    FlatButton,
}
