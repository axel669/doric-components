import React, {useRef} from "react"

import {ActionButton} from "./button.js"
import CustomListeners from "./custom-listeners.js"
import Icon from "./icon.js"
import Text from "./text.js"

import renderAs from "./render-as.js"
import {propToggle, HiddenControl} from "./helpers.js"

const CheckboxContainer = styled(renderAs("doric-checkbox"))`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    user-select: none;
    position: relative;
`
const ClickableArea = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    cursor: pointer;

    width: ${props => props.noClickLabel ? "36px" : "100%"};
`
const Label = styled(Text)`
    opacity: ${props => props.disabled ? 0.65 : 1};
`
const defaultIcon = "square-outline"
const defaultCheckedIcon = "checkbox"

const Checkbox = source => {
    const {
        icon = defaultIcon,
        checkedIcon = defaultCheckedIcon,
        label,
        checked,
        color,
        onChange,
        noClickLabel,
        disabled,
        ...props
    } = source

    const controlRef = useRef()
    const iconElement = cond(checked)(
        checkedIcon,
        icon,
    )
    const change = () => {
        if (disabled === true) {
            return
        }
        controlRef.current.click()
    }

    return <CheckboxContainer noClickLabel={noClickLabel}>
        <ClickableArea noClickLabel={noClickLabel}>
            <CustomListeners onTap={change} />
        </ClickableArea>
        <HiddenControl
            as="input"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            ref={controlRef}
        />
        <ActionButton
            color={color}
            icon={iconElement}
            size="36px"
            onTap={change}
            disabled={disabled}
        />
        <Label disabled={disabled}>{label}</Label>
    </CheckboxContainer>
}

export default Checkbox
