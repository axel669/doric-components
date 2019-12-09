import React from "react"
import styled from "styled-components"
import SimpleBar from "simplebar-react"

import {FlatButton} from "./button.js"
import {propToggle, themedComponent} from "./helpers.js"

const TabContainer = styled.div`
    display: grid;
    grid-template-columns: 150px auto;
    grid-auto-rows: 100%;
    grid-template-areas:
        "tabs panel"
    ;
`

const TabList = styled(SimpleBar)`
    grid-area: tabs;
    border-right: 1px solid gray;
`
const buttonSelectedVariant = propToggle(
    "selected",
    styled.css`
        position: sticky;
        top: 0px;
        bottom: 0px;
        z-index: +1;
        &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            width: 5px;
            background-color: ${props => props.theme.primary};
        }
    `,
    ""
)
const TabButton = themedComponent(
    styled(FlatButton)`
        margin: 0px;
        border-radius: 0px;
        height: 40px;
        display: flex;
        ${buttonSelectedVariant}
    `,
    "Themed(TabButton)"
)
const panelDisplayVariant = propToggle("selected", "block", "none")
const TabPanel = styled.div`
    grid-area: panel;
    overflow: auto;
    display: ${panelDisplayVariant}
`
const Tabs = source => {
    const {
        children,
        direction,
        selectedTab = 0,
        onChange,
        ...props
    } = source
    const tabSource = React.Children.toArray(children)

    const tabChange = evt => {
        const index = parseInt(evt.target.dataset.index, 10)
        if (index === selectedTab) {
            return
        }

        evt.selectedTab = selectedTab
        evt.newTab = index
        onChange?.(evt)
    }

    const tabs = tabSource.map(
        (tabSource, index) => {
            const {children, label, ...props} = tabSource.props
            const buttonProps = {
                ...props,
                selected: selectedTab === index,
                "data-index": index,
                onTap: tabChange,
            }
            return <TabButton {...buttonProps}>
                {label}
            </TabButton>
        }
    )
    const tabPanels = tabSource.map(
        (tabSource, index) => <TabPanel selected={selectedTab === index}>
            {tabSource.props.children}
        </TabPanel>
    )

    return <TabContainer {...props}>
        <TabList>
            {tabs}
        </TabList>
        {tabPanels}
    </TabContainer>
}
const Tab = props => {
    console.warn("The Tab component is not meant to be rendered directly")
    return null
}

export {
    Tabs,
    Tab,
}
