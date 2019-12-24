import React from "react"
import styled from "styled-components"

import {propToggle} from "./helpers.js"

const disabledVariant = propToggle(
    "disabled",
    styled.css`
        opacity: 0.5;
    `,
    ""
)
const Wrapper = styled.div`
    position: relative;
    padding: 0px;
    margin: 4px;

    ${disabledVariant}
`
const VisualArea = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    margin-top: 16px;
`
const errorVariant = props => (props.error || props.error === "")
    ? `color: ${props.theme.danger};`
    : ""
const errorColorVariant = props => (props.error || props.error === "")
    ? props.theme.danger
    : props.theme.focusColor
const typeVariant = propToggle("bordered", "16px", "4px")
const Label = styled.label`
    position: absolute;
    top: -16px;
    left: 0px;
    padding-top: 2px;
    user-select: none;
    font-size: 12px;

    ${errorVariant}
    padding-left: ${typeVariant};

    *:focus ~ & {
        color: ${errorColorVariant};
    }
`
const FlatBorder = styled.div`
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 0px;
    height: 2px;

    background-color: ${props => props.theme.softText};

    &::after {
        position: absolute;
        content: "";
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: ${errorColorVariant};
        transform: scaleX(0);
        transition: transform 200ms linear;
    }

    *:focus ~ &::after {
        transform: scaleX(1);
    }
`
const FullBorder = styled.fieldset`
    position: absolute;
    top: -16px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px;
    padding: 0px;
    padding-left: 13px;
    border: 1px solid ${props => props.theme.softText};
    border-radius: 4px;

    *:focus ~ & {
        border-color: ${errorColorVariant};
    }
`
const FullBorderLabel = styled.legend`
    padding: 2px;
    color: transparent;
    font-size: 12px;
`
const ErrorLabel = styled.div`
    padding: 4px 12px;
    font-size: 12px;
    display: none;

    color: ${props => props.theme.danger};
    padding-left: ${typeVariant};

    &:not(:empty) {
        display: block;
    }
`

const ControlBorder = source => {
    const {
        bordered,
        theme,
        label,
        className,
        error,
        _,
        children,
        disabled,
    } = source
    const shared = {theme, error}
    const border = (bordered === true)
        ? <FullBorder {...shared}>
            <FullBorderLabel {...shared}>
                {label}
            </FullBorderLabel>
        </FullBorder>
        : <FlatBorder {...shared} />
    const wrapperProps = {
        theme,
        className,
        disabled,
        style: _,
    }

    return <Wrapper {...wrapperProps}>
        <VisualArea>
            {children}
            <Label bordered={bordered} {...shared}>
                {label}
            </Label>
            {border}
        </VisualArea>
        <ErrorLabel bordered={bordered} theme={theme}>
            {error}
        </ErrorLabel>
    </Wrapper>
}

export default ControlBorder
