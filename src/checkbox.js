import React from "react"

import {ActionButton} from "./button.js"
import CustomListeners from "./custom-listeners.js"
import Icon from "./icon.js"

import renderAs from "./render-as.js"
import {propToggle} from "./helpers.js"

const labelClickVariant = propToggle(
    "noClickLabel",
    "",
    styled.css`
        cursor: pointer;
    `
)
const CheckboxContainer = styled(renderAs("doric-checkbox"))`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    user-select: none;

    ${labelClickVariant}
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
        ...props
    } = source

    const iconElement = cond(checked)(
        checkedIcon,
        icon,
    )
    const wrappedOnTap = evt => {
        if (props.disabled === true) {
            return
        }
        const tag = evt.target.tagName.toLowerCase()
        if (tag === "doric-checkbox" && noClickLabel === true) {
            return
        }
        onChange?.(evt)
    }

    return <CheckboxContainer noClickLabel={noClickLabel}>
        <CustomListeners onTap={wrappedOnTap} />
        <ActionButton color={color} icon={iconElement} size="36px" />
        {label}
    </CheckboxContainer>
}

export default Checkbox
