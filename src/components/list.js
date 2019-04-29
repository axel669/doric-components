import {memo} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, classes} from "@css";

import CustomListeners from "@components/customListeners.js";

const listCSS = ssjs(
    {
        "doric-list": {
            display: "block",
            "& doric-item": {
                display: "block",
                padding: 8,
                borderBottom: "1px solid black",
                ...tappable(theme => theme.highlightColor)
            },
            "& doric-list-header": {
                position: "sticky",
                display: "block",
                top: 0,
                zIndex: "+10",
                padding: 4,
                fontSize: 16,
                textTransform: "uppercase",
                borderBottom: "1px solid lightgray",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
                backgroundColor: "white",
                "&:empty": {
                    display: "none"
                }
            }
        }
    },
    {name: "doric-list"}
);
listCSS.generate(theme);

const ListItem = memo(
    function ListItem({item, propName}) {
        return <div>{item[propName]}</div>
    }
);

function List(props) {
    const {
        items, title, propName = "label",
        onItemTap, onItemHold,
        itemRenderer: ItemRenderer = ListItem,
        ...passThrough
    } = props;
    const onTap = (evt) => {
        let index = parseInt(evt.target.dataset.index);

        evt.item = items[index];
        onItemTap?.(evt);
    };
    const onHold = (evt) => {
        let index = parseInt(evt.target.dataset.index);

        evt.item = items[index];
        onItemHold?.(evt);
    };

    return <doric-list {...passThrough}>
        <doric-list-header>
            {title}
        </doric-list-header>
        <doric-list-content>
            <CustomListeners onTap={onTap} onHold={onHold} />
            {items.map(
                (item, index) => <doric-item key={index} data-index={index}>
                    <ItemRenderer item={item} propName={propName} />
                </doric-item>
            )}
        </doric-list-content>
    </doric-list>
}

export default memo(List);
