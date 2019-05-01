import {Children} from "react"
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, classes} from "@css";

import Grid from "@components/grid.js";

const tabCSS = ssjs(
    {
        "doric-tabs": {
            display: "block",
            "& doric-tab-bar": {
                display: "block",
                backgroundColor: ssjs.color(0, 0, 0, 0.05),
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

// class Tabs extends React.PureComponent {
//     render() => {
//         let {
//             selectedTab = 0, cols = 4, onTabChange
//             liveHidden = false
//             children as _children
//             ...passThrough
//         } = @props
//         let children = React.Children.toArray(_children)
//
//         let list = children.map(
//             (child) => child.props.label
//         )
//         let tabs = children.map(
//             (child, index) => <doric-tab selected={index == selectedTab} key=index>
//                 {child.props.children}
//             </doric-tab>
//         )
//         let displayed = (liveHidden == true)
//             ? tabs
//             : tabs[selectedTab]
//         let tabChange = (evt) => {
//             let newTab = parseInt(evt.target.dataset.index)
//
//             evt.selectedTab = newTab
//             onTabChange?(evt)
//         }
//
//         return <doric-tabs {...passThrough}>
//             <doric-tab-bar>
//                 <doric.customListeners onTap=tabChange />
//                 <Grid cols=cols>
//                     {list.map(
//                         (label, index) => <doric-tab
//                             key=index
//                             data-index=index
//                             active={index == selectedTab}
//                         >
//                             {label}
//                         </doric-tab>
//                     )}
//                 </Grid>
//             </doric-tab-bar>
//             {displayed}
//         </doric-tabs>
//     }
// }
// let Tab = (props) => <doric-tab {...props} />
//
// export {Tabs, Tab}

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
            <doric.customListeners onTap={tabChange} />
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
