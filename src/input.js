import React from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    padding: 0px;
    margin: 2px;
`
const InputElement = styled.input`
    padding: 24px 8px 8px 8px;
    margin: 0px;
    border-width: 0px;
    z-index: +1;
    background-color: transparent;
    width: 100%;

    &:focus {
        outline: none;
    }
`
const typeVariant = propToggle("bordered","16px","4px")
const InputLabel = styled.label`
    position: absolute;
    top: 0px;
    left: 0px;
    padding-top: 2px;

    padding-left: ${typeVariant};

    input:focus + & {
        color: ${props => props.theme.primary};
    }
`
const InputFlatBorder = styled.div`
    position: absolute;
    left: 0px;
    right: 0px;
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
        background-color: ${props => props.theme.primary};
        transform: scaleX(0);
        transition: transform 200ms linear;
    }

    input:focus ~ &::after {
        transform: scaleX(1);
    }
`
const InputFullBorder = styled.fieldset`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px;
    padding: 0px;
    padding-left: 13px;
    border: 1px solid ${props => props.theme.softText};
    border-radius: 4px;

    input:focus ~ & {
        border-color: ${props => props.theme.primary};
    }
`
const InputFullBorderLabel = styled.legend`
    padding: 2px;
    color: transparent;
`

const inputOfType = type =>
    source => {
        const {
            bordered,
            theme,
            label,
            className,
            ...props
        } = source
        const border = (bordered === true)
            ? <InputFullBorder theme={theme}>
                <InputFullBorderLabel theme={theme}>
                    {label}
                </InputFullBorderLabel>
            </InputFullBorder>
            : <InputFlatBorder theme={theme} />

        return <InputWrapper theme={theme} className={className}>
            <InputElement theme={theme} {...props} type={type} />
            <InputLabel theme={theme} bordered={bordered}>
                {label}
            </InputLabel>
            {border}
        </InputWrapper>
    }
const Input = {
    Text: themedComponent(
        inputOfType("text"),
        "Themed(TextInput)"
    ),
    Password: themedComponent(
        inputOfType("password"),
        "Themed(PasswordInput)"
    ),
}

export default Input
