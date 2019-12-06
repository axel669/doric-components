import React, {memo} from "react";
import ssjs from "ssjs";

import api from "@api";
import {tappable, classes} from "@css";

import CustomListeners from "@components/customListeners.js";

const listCSS = ssjs(
    {
        "doric-list": {
            display: "block",
            margin: 4,
            "& doric-list-item": {
                display: "block",
                padding: 8,
                flexGrow: 1,
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: theme => theme.list.bg.color,
                ...tappable(theme => theme.highlightColor)
            },
            "& doric-list-header": {
                position: "sticky",
                display: "block",
                top: 0,
                zIndex: "+10",
                padding: 4,
                fontSize: 16,
                border: theme => `1px solid ${theme.list.header.border.color}`,
                backgroundColor: theme => theme.list.header.bg.color,
                "&:empty": {
                    display: "none"
                }
            }
        }
    },
    {name: "doric-list"}
);
api.addCSS(listCSS);

const DefaultListRenderer = memo(
    function ListItem({item, propName}) {
        return item[propName]
    }
);

const ListItem = memo(
    function ListItem(props) {
        const {index, item, propName, ItemRenderer} = props;

        return <doric-list-item data-index={index}>
            <ItemRenderer item={item} propName={propName} />
        </doric-list-item>
    }
);
function List(props) {
    const {
        items, title, propName = "label",
        onItemTap, onItemHold,
        itemRender: ItemRenderer = DefaultListRenderer,
        layout: Layout = "div",
        ...passThrough
    } = props;
    const onTap = (evt) => {
        let index = parseInt(evt.target.dataset.index);

        evt.item = items[index];
        onItemTap?.(evt);
    };
    const onHold = (evt) => {
        let index = parseInt(evt.target.dataset.index);

        if (isNaN(index) === true) {
            return;
        }

        evt.item = items[index];
        onItemHold?.(evt);
    };

    return <doric-list {...passThrough}>
        <doric-list-header>
            {title}
        </doric-list-header>
        <doric-list-content>
            <CustomListeners onTap={onTap} onHold={onHold} />
            <Layout>
                {items.map(
                    (item, index) => <ListItem
                        key={index}
                        {...{item, propName, index, ItemRenderer}}
                    />
                )}
            </Layout>
        </doric-list-content>
    </doric-list>
}

export default memo(List);
