import React, {useEffect, useCallback, useRef, useState} from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"
import {useInput} from "./effects.js"
import {ActionButton, Button, FlatButton} from "./button.js"
import {Card, CardContent} from "./card.js"
import ControlBorder from "./control-border.js"
import Icon from "./icon.js"
import {Modal, useModal} from "./modal.js"
import Text from "./text.js"

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
const CalendarLayout = styled.div`
    display: grid;
    grid-template-areas:
        "prev current next"
        "calendar calendar calendar"
        "cancel cancel cancel"
    ;
    grid-template-columns: 40px auto 40px;
`
const DateDisplay = styled.div`
    display: flex;
    padding: 4px;
    align-items: center;
    justify-content: center;
    grid-area: current;
`
const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-template-rows: repeat(6, 40px);
    grid-area: calendar;

    & > doric-button {
        margin: 0px;
    }
`
const Calendar = props => {
    const {year, month, today, onDateSelected} = props
    const start = new Date(year, month)
    start.setDate(start.getDate() - start.getDay())
    const days = Array.from(
        {length: 42},
        (_, i) => {
            const date = new Date(start)
            date.setDate(date.getDate() + i)

            const select = () => onDateSelected(date)
            const isToday = (
                date.getFullYear() === today.getFullYear()
                && date.getMonth() === today.getMonth()
                && date.getDate() === today.getDate()
            )
            const color = isToday ? "primary" : "normal"

            return <Button
                key={i}
                text={date.getDate()}
                color={color}
                onTap={select}
            />
        }
    )

    return <CalendarGrid>
        {days}
    </CalendarGrid>
}
const CalendarModal = props => {
    const {close, currentDate} = props
    const [date, setDate] = useState(
        new Date(
            currentDate.getFullYear(),
            currentDate.getMonth()
        )
    )
    const cancel = () => close(currentDate)
    const select = date => close(date)
    const next = () => setDate(
        new Date(
            date.getFullYear(),
            date.getMonth() + 1
        )
    )
    const prev = () => setDate(
        new Date(
            date.getFullYear(),
            date.getMonth() - 1
        )
    )
    const monthString = date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
        }
    )

    return <Modal>
        <Card>
            <CardContent>
                <CalendarLayout>
                    <Button
                        style={{gridArea: "prev"}}
                        startIcon={<Icon name="arrow-dropleft" />}
                        onTap={prev}
                    />
                    <DateDisplay>
                        <Text type="title">{monthString}</Text>
                    </DateDisplay>
                    <Button
                        style={{gridArea: "next"}}
                        startIcon={<Icon name="arrow-dropright" />}
                        onTap={next}
                    />

                    <Calendar
                        year={date.getFullYear()}
                        month={date.getMonth()}
                        today={currentDate}
                        onDateSelected={select}
                    />

                    <FlatButton
                        style={{gridArea: "cancel"}}
                        startIcon={<Icon name="close" />}
                        onTap={cancel}
                        text="Cancel"
                    />
                </CalendarLayout>
            </CardContent>
        </Card>
    </Modal>
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
        const [calendar, calendarSelectDate] = useModal(CalendarModal)
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
        const change = (source) => {
            if (original !== editValue) {
                onChange(
                    dateParser(editValue),
                    "input"
                )
            }
        }
        const openCalendar = async () => {
            const currentDate = dateParser(editValue) || value
            const newDate = await calendarSelectDate({currentDate})
            if (newDate !== currentDate) {
                onChange(newDate, "calendar")
            }
        }
        const actions = [
            action,
            calendar,
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
