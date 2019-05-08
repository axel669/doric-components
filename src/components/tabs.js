import React, {Children} from "react"
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, classes} from "@css";

import CustomListeners from "@components/CustomListeners.js";
import Grid from "@components/grid.js";

const tabCSS = ssjs(
    {
        "doric-tabs": {
            display: "block",
            "& doric-tab-bar": {
                display: "block",
                "& doric-tab-label": {
                    display: "inline-block",
                    padding: "8px 0px",
                    textAlign: "center",
                    borderBottom: "2px solid transparent",
                    fontSize: 14,
                    ...tappable((theme) => theme.highlightColor),
                    "&[active='true']": {
                        color: (theme) => theme.tabs.selected,
                        borderBottomColor: (theme) => theme.tabs.selected
                    }
                }
            },
            "& doric-tab": {
                display: "block"
            }
        },
        "doric-tab[selected='false']": {
            display: "none"
        }
    },
    {name: "doric-tabs"}
);
tabCSS.generate(theme);

function Tabs(props) {
    const {
        selectedTab = 0, cols = 4, onTabChange,
        liveHidden = false,
        children: _children,
        ...passThrough
    } = props;

    const children = Children.toArray(_children);

    const tabLabelList = children.map(
        (child) => child.props.label
    );
    const tabs = children.map(
        (child, index) => <doric-tab selected={index === selectedTab} key={index}>
            {child.props.children}
        </doric-tab>
    );

    const displayed = (liveHidden == true)
        ? tabs
        : tabs[selectedTab];
    const tabChange = (evt) => {
        let newTab = parseInt(evt.target.dataset.index);

        evt.selectedTab = newTab;
        onTabChange?.(evt);
    };

    const tabLabels = tabLabelList.map(
        (label, index) => <doric-tab-label key={index} data-index={index} active={index == selectedTab}>
            {label}
        </doric-tab-label>
    );

    return <doric-tabs {...passThrough}>
        <doric-tab-bar>
            <CustomListeners onTap={tabChange} />
            <Grid cols={cols}>
                {tabLabels}
            </Grid>
        </doric-tab-bar>
        {displayed}
    </doric-tabs>
}
function Tab(props) {
    return props;
}

export {Tabs, Tab};
