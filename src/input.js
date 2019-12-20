import React, {useEffect, useCallback, useRef} from "react"
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
        const {action, forwardRef, className, ...props} = source
        const inputProps = {
            type,
            className,
            ref: forwardRef,
            ...props,
        }
        return <ControlBorder {...props}>
            <ActionArea disabled={props.disabled}>
                {action}
            </ActionArea>
            <InputElement {...inputProps} />
        </ControlBorder>
    }

const DateInput = themedComponent(
    inputOfType("text"),
    "Themed(DateInput)"
)
const defaultDateParser = dateString => new Date(dateString)
const defaultDateFormat = date => date.toLocaleDateString()

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
            dateParser = defaultDateParser,
            dateFormat = defaultDateFormat,
            ...props
        } = source
        const inputRef = useRef()
        const [editValue, updateEditValue] = useInput("")
        const original = dateFormat(value)

        useEffect(
            () => {
                updateEditValue({
                    target: {
                        value: dateFormat(value),
                    }
                })
            },
            [value]
        )
        const change = (source, internal = false) => {
            if (original !== editValue || internal === true) {
                const [dateString, eventSource] = internal
                    ? [source, "calendar"]
                    : [editValue, "input"]
                onChange(
                    dateParser(dateString),
                    eventSource
                )
            }
        }
        const openCalendar = async () => {
            change("1/1/70", true)
        }
        const actions = [
            action,
            <ActionButton icon="calendar" onTap={openCalendar} />
        ]
        const wrap = func =>
            evt => {
                console.log(evt.nativeEvent)
                func(evt)
            }

        return <DateInput {...props}
            forwardRef={inputRef}
            value={editValue}
            onChange={updateEditValue}
            onBlur={change}
            action={actions}
        />
    }
}

export default Input
