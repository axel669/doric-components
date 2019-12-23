import React, {useRef} from "react"
import styled from "styled-components"

import CustomListeners from "./custom-listeners.js"
import {ActionButton} from "./button.js"
import Text from "./text.js"

import renderAs from "./render-as.js"
import {propToggle, HiddenControl, themedComponent} from "./helpers.js"

const SwitchContainer = styled(renderAs("doric-switch"))`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-right: 4px;
    user-select: none;
    position: relative;

    opacity: ${props => props.disabled ? 0.7 : 1};

    & > doric-button {
        position: absolute;
        top: 0px;
        transition: left linear 100ms;

        left: ${props => props.checked ? 14 : 0}px;
    }
`
const ClickableArea = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    cursor: pointer;

    width: ${props => props.noClickLabel ? "50px" : "100%"};
`
const trackColorVariant = propToggle(
    "checked",
    styled.css`
        background-color: ${props => props.theme[`${props.color}Light`]};
    `,
    styled.css`
        background-color: gray;
    `,
)
const SwitchArea = styled.div`
    display: inline-block;
    width: 50px;
    height: 36px;
    position: relative;
    margin-right: 4px;

    &::before {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        width: 34px;
        height: 12px;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        background-color: cyan;
        transition: background-color linear 100ms;

        ${trackColorVariant}
    }
`
const colorVariant = propToggle(
    "checked",
    styled.css`
        background-color: ${props => props.theme[props.color]};
    `,
    styled.css`
        background-color: lightgray;
    `,
)
const SwitchIcon = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    transition: background-color linear 100ms;

    ${colorVariant}
`
const Switch = themedComponent(
    source => {
        const {
            onChange,
            label,
            checked,
            theme,
            color,
            noClickLabel,
            disabled,
        } = source
        const controlledProps = {
            checked,
            color,
            theme,
            disabled,
        }
        const controlRef = useRef()
        const change = () => {
            if (disabled === true) {
                return
            }
            controlRef.current.click()
        }

        const icon = <SwitchIcon {...controlledProps} />
        return <SwitchContainer checked={checked}>
            <HiddenControl
                as="input"
                type="checkbox"
                checked={checked}
                onChange={onChange}
                ref={controlRef}
            />
            <SwitchArea {...controlledProps} />
            <ClickableArea noClickLabel={noClickLabel}>
                <CustomListeners onTap={change} />
            </ClickableArea>
            <ActionButton
                icon={icon}
                size="36px"
                onTap={change}
                disabled={disabled}
            />
            <Text>{label}</Text>
        </SwitchContainer>
    }
)

export default Switch
