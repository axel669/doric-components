import {useState, memo} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, Color, classes} from "@css";

import CustomListeners from "@components/customListeners.js"

let collapseCSS = ssjs(
    {
        "doric-collapse": {
            display: "block",
            borderRadius: 2,
            overflow: "hidden",
            margin: 4,
            padding: 0,
            border: (theme) => {
                let {
                    width = 1, type = "solid", color
                } = theme.collapse.border
                return `${width}px ${type} ${color}`;
            },
            "&.hide > div": {
                display: "none"
            },
            "&-label": {
                display: "block",
                padding: 4,
                fontSize: 16,
                userSelect: "none",
                ...tappable(Color(0, 0, 0, 0.4))
            },
            "&-icon": {
                display: "inline-block",
                width: 16,
                textAlign: "center"
            }
        }
    },
    {name: "doric-collapse"}
)
collapseCSS.generate(theme);

function Collapse(props) {
    const [hide, toggleVis] = useState(true);

    const {
        className, text = "Collapse", tabIndex = 1,
        children,
        ...passThrough
    } = props;
    const _classes = classes({className, hide});

    const direction = (hide == true) ? "right" : "down";
    const icon = <doric-collapse-icon class={`ion-md-arrow-drop${direction}`} />;

    const pass = {
        tabIndex,
        ...passThrough
    };

    const toggle = () => toggleVis(hide === false);

    return <doric-collapse {...pass} class={_classes}>
        <doric-collapse-label>
            {icon} {text}
            <CustomListeners onTap={toggle} />
        </doric-collapse-label>
        <div>{children}</div>
    </doric-collapse>
}

export default memo(Collapse);

// class Collapse extends React.Component {
//     constructor(props) => {
//         super(props)
//
//         @state = {
//             hide: true
//         }
//         @toggle = () => {
//             let hide = !@state.hide
//             @setState({hide})
//         }
//     }
//
//     render() => {
//         let {
//             className, label = "Collapse", tabIndex = 1
//             children
//             ...passThrough
//         } = @props
//         let {hide} = @state
//         let _classes = classes({className, hide})
//
//         let direction = (hide == true) ? "right" : "down"
//         let icon = <doric-collapse-icon class=`ion-md-arrow-drop${direction}` />
//
//         let props = {
//             tabIndex
//             ...passThrough
//         }
//
//         return <doric-collapse {...props} class=_classes>
//             <doric-collapse-label>
//                 {icon} {label}
//                 <CustomListeners onTap=@toggle />
//             </doric-collapse-label>
//             <div>{children}</div>
//         </doric-collapse>
//     }
// }
//
// export default Collapse
