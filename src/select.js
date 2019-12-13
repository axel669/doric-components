import React from "react"
import styled from "styled-components"

import customStyled from "./custom-tag-base.js"
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
    -webkit-appearance: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`
const Icon = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    padding: 20px 8px 8px 8px;
    font-size: 20px;
    display: flex;
    align-items: center;
`

const Select = themedComponent(
    props => <ControlBorder {...props}>
        <Icon className="ion-md-arrow-dropdown" />
        <SelectElement {...props} />
    </ControlBorder>,
    "Themed(Select)"
)

export default Select
