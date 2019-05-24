import React, {Children} from "react"
import ssjs from "ssjs";

import api from "@api";
import {tappable, classes} from "@css";

import CustomListeners from "@components/CustomListeners.js";
import Grid from "@components/grid.js";

const tabCSS = ssjs(
    {
        "doric-tabs": {
            display: "flex",
            flexDirection: "column",
            "&.horizontal": {
                flexDirection: "row",
                "& doric-tab-bar": {
                    flexDirection: "column",
                    "& doric-tab-label": {
                        flexGrow: "unset"
                    }
                }
            },
            "& doric-tab-bar": {
                display: "flex",
                userSelect: "none",
                "& doric-tab-label": {
                    flexGrow: 1,
                    minWidth: "20%",
                    display: "inline-block",
                    padding: "8px 0px",
                    textAlign: "center",
                    borderBottom: "2px solid transparent",
                    fontSize: 14,
                    ...tappable((theme) => theme.highlightColor),
                    "&[active='true']": {
                        color: (theme) => theme.tabs.selected.text,
                        borderBottomColor: (theme) => theme.tabs.selected.border
                    }
                }
            },
            "& doric-tab": {
                display: "block",
                flexGrow: 1
            }
        },
        "doric-tab[selected='false']": {
            display: "none"
        }
    },
    {name: "doric-tabs"}
);
api.addCSS(tabCSS);

function Tabs(props) {
    const {
        selectedTab = 0, cols = 4, onTabChange,
        liveHidden = false, className = null,
        horizontal = false, tabBarWidth = null,
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
    const classNames = classes({
        className,
        horizontal
    })

    return <doric-tabs {...passThrough} class={classNames}>
        <doric-tab-bar style={{width: tabBarWidth}}>
            <CustomListeners onTap={tabChange} />
            {tabLabels}
        </doric-tab-bar>
        {displayed}
    </doric-tabs>
}
function Tab(props) {
    return props;
}

export {Tabs, Tab};
