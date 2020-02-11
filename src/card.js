import React from "react"
import styled from "styled-components"

import Clickable from "./clickable.js"
import renderAs from "./render-as.js"
import {propToggle, themedComponent} from "./helpers.js"

const directionVariant = propToggle(
    "sideMedia",
    styled.css`
        grid-template-columns: auto 150px;
        grid-template-areas:
            "content media"
            "actions media"
        ;
    `,
    styled.css`
        grid-template-areas:
            "media"
            "content"
            "actions"
        ;
    `,
)
const Card = themedComponent(
    styled(renderAs("doric-card"))`
        display: grid;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        margin: 4px;
        border: 1px solid lightgray;
        border-radius: 4px;
        overflow: hidden;

        ${directionVariant}
        background-color: ${props => props.theme.mainBG};
    `,
    "Themed(Card)"
)

const CardContent = styled.div`
    display: block;
    padding: 12px;
    grid-area: content;
`

const CardActions = styled.div`
    display: block;
    padding: 4px;
    grid-area: actions;
`

const CardMedia = styled.div`
    display: block;
    grid-area: media;
    background-image: url("${props => props.image}");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    height: ${props => props.height}px;
`

const CardActionArea = themedComponent(
    styled(Clickable("doric-card-action-area"))`
        grid-area: content;
    `
)

export {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
}
