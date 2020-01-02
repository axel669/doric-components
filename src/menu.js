import React from "react"
import styled from "styled-components"

import SimpleBar from "simplebar-react"

import {ActionButton} from "./button.js"
import {useToggle} from "./hooks.js"
import {themedComponent} from "./helpers.js"
import renderAs from "./render-as.js"

const itemDisplayToggle = props =>
    props.show
        ? styled.css`
            & > [data-menu-item-area] {
                display: block;
                height: calc(100vh - 35px);
            }
        `
        : styled.css`
            & > [data-menu-item-area] {
                display: none;
            }
        `
const MenuContainer = styled.div`
    left: 0px;
    top: 0px;
    z-index: 5000;
    display: grid;

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.lightText};

    @media (max-width: 640px) {
        position: sticky;
        height: 35px;
        right: 0px;

        grid-template-columns: 35px 1fr 35px;
        grid-template-rows: 35px auto;
        grid-template-areas:
            "toggle title balance"
            "content content content"
        ;

        ${itemDisplayToggle}
    }
    @media (min-width: 640px) {
        position: fixed;
        width: 240px;
        bottom: 0px;
        grid-template-columns: 1fr;
        grid-template-rows: max-content 0px auto;
        grid-template-areas:
            "title"
            "toggle"
            "content"
        ;

        border-right: 1px solid ${props => props.theme.textColor};

        & > menu-toggle {
            display: none;
        }

        & > [data-menu-item-area] {
            height: 100%;
        }
    }
`
const MenuItemArea = styled(SimpleBar)`
    grid-area: content;
    overflow: auto;

    background-color: ${props => props.theme.mainBG};
`
const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`
const MenuToggleArea = styled(renderAs("menu-toggle"))`
    grid-area: toggle;
`
const MenuToggleButton = styled(ActionButton)`
    color: ${props => props.theme.lightText};
`
const MenuTitle = styled.div`
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    height: 35px;

    &:empty {
        display: none;
    }
`
const Menu = themedComponent(
    (props) => {
        const {
            children,
            theme,
            title,
            itemWrapper = MenuItems,
        } = props
        const test = console.log
        const [show, toggleView] = useToggle(false)
        const ItemWrapper = itemWrapper

        const ops = {
            scrollbars: {
                autoHide: "leave"
            }
        }

        return <MenuContainer show={show} theme={theme}>
            <MenuTitle>{title}</MenuTitle>
            <MenuToggleArea>
                <MenuToggleButton onTap={toggleView} icon="menu" size="35px" theme={theme} />
            </MenuToggleArea>
            <MenuItemArea theme={theme} data-menu-item-area>
                <ItemWrapper>
                    {children}
                </ItemWrapper>
            </MenuItemArea>
        </MenuContainer>
    }
)

export default Menu
