import {memo} from "react";
import ssjs from "ssjs";

import theme from "@theme";
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
                ...tappable(theme => theme.highlightColor)
            },
            "& doric-list-header": {
                position: "sticky",
                display: "block",
                top: 0,
                zIndex: "+10",
                padding: 4,
                fontSize: 16,
                border: "1px solid lightgray",
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

const DefaultListRenderer = memo(
    function ListItem({item, propName}) {
        return <div>{item[propName]}</div>
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
        itemRenderer: ItemRenderer = DefaultListRenderer,
        itemContainer: ItemContainer = "div",
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
            <ItemContainer>
                {items.map(
                    (item, index) => <ListItem
                        key={index}
                        {...{item, propName, index, ItemRenderer}}
                    />
                )}
            </ItemContainer>
        </doric-list-content>
    </doric-list>
}

export default memo(List);
