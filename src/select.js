import React from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"
import ControlBorder from "./control-border.js"

const SelectElement = styled.select`
    padding: 24px 8px 8px 8px;
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

const Select = themedComponent(
    props => <ControlBorder {...props}>
        <SelectElement {...props} />
    </ControlBorder>,
    "Themed(Select)"
)

export default Select
