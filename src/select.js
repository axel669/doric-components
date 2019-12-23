import React from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"
import ControlBorder from "./control-border.js"
import Icon from "./icon.js"

const SelectElement = styled.select`
    padding: 8px 8px 8px 8px;
    margin: 0px;
    border-width: 0px;
    z-index: +1;
    width: 100%;
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: default;
    }
`
const IconArea = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    padding-right: 8px;
`

const Select = themedComponent(
    props => <ControlBorder {...props}>
        <IconArea>
            <Icon name="arrow-dropdown" />
        </IconArea>
        <SelectElement {...props} />
    </ControlBorder>,
    "Themed(Select)"
)

export default Select
