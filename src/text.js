import React from "react"
import styled from "styled-components"

import {propVariant, propToggle, themedComponent} from "./helpers.js"

const styleVariant = propVariant(
    {name: "type", defaultValue: "body"},
    {
        body: styled.css`
            line-height: 1.4;
        `,
        "body-small": styled.css`
            line-height: 1.2;
        `,
        header: styled.css`
            display: block;
            font-size: 26px;
            font-weight: 500;
        `,
        title: styled.css`
            display: block;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 12px;
        `,
        subtitle: styled.css`
            display: block;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 8px;
            color: ${props => props.theme.softText};
        `,
    }
)
const marginVariant = propToggle(
    "slim",
    styled.css`
        margin-bottom: 0px;
    `,
    ""
)
const displayVariant = propToggle(
    "block",
    styled.css`
        display: block;
    `,
    ""
)
const Text = themedComponent(
    styled.span`
        padding: 0px;
        margin: 0px;

        color: ${props => props.theme.textColor};

        ${styleVariant}
        ${displayVariant}
        ${marginVariant}
    `,
    "Themed(Text)"
)

export default Text
