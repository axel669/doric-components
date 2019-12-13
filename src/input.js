import React, {useEffect, useCallback} from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"
import {useInput} from "./effects.js"
import {ActionButton} from "./button.js"
import ControlBorder from "./control-border.js"

const InputElement = styled.input`
    padding: 8px 8px 8px 8px;
    margin: 0px;
    border-width: 0px;
    z-index: +1;
    width: 100%;
    border-radius: 4px;
    background-color: transparent;

    &:focus {
        outline: none;
    }
`
const disabledVariant = propToggle(
    "disabled",
    "",
    styled.css`
        z-index: +2;
    `
)
const ActionArea = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    align-items: center;

    ${disabledVariant}
`

const inputOfType = type =>
    source => {
        const {action, ...props} = source
        return <ControlBorder {...props}>
            <ActionArea disabled={props.disabled}>
                {action}
            </ActionArea>
            <InputElement {...props} type={type} />
        </ControlBorder>
    }

const DateInput = themedComponent(
    inputOfType("text"),
    "Themed(DateInput)"
)

const Input = {
    Text: themedComponent(
        inputOfType("text"),
        "Themed(TextInput)"
    ),
    Password: themedComponent(
        inputOfType("password"),
        "Themed(PasswordInput)"
    ),
    Date: source => {
        const {
            value,
            onChange,
            action,
            ...props
        } = source
        const [editValue, updateEditValue] = useInput("")

        useEffect(
            () => {
                updateEditValue({
                    target: {
                        value,
                    }
                })
            },
            [value]
        )
        const change = evt => {
            if (value !== editValue) {
                onChange(evt)
            }
        }
        const actions = [
            action,
            <ActionButton icon="calendar" />
        ]

        return <DateInput {...props}
            value={editValue}
            onChange={updateEditValue}
            onBlur={change}
            action={actions}
        />
    }
}

export default Input
