import {memo} from "react";
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, classes} from "@css";

import CustomListeners from "@components/customListeners.js";

const radioCSS = ssjs(
    {
        "doric-radio": {
            display: "block",
            margin: 4,
            "& doric-radio-item": {
                display: "block",
                flexGrow: 1,
                borderRadius: 4,
                overflow: "hidden",
                ...tappable(theme => theme.highlightColor)
            }
        }
    },
    {name: "doric-radio"}
);
radioCSS.generate(theme);

const DefaultRadioRenderer = memo(
    function RadioItem({item, propName, selected}) {
        const icon = <ion-icon
            class={`ion-md-radio-button-${selected === true ? "on" : "off"}`}
        />;

        return <div style={{padding: 8}}>
            {icon}
            &nbsp;
            {item[propName]}
        </div>
    }
);

const RadioItem = memo(
    function RadioItem(props) {
        const {index, item, propName, ItemRenderer, selected} = props;

        return <doric-radio-item data-index={index}>
            <ItemRenderer item={item} propName={propName} selected={selected} />
        </doric-radio-item>
    }
);
function Radio(props) {
    const {
        options, value, propName = "label",
        onChange,
        itemRender: ItemRenderer = DefaultRadioRenderer,
        layout: Layout = "div",
        ...passThrough
    } = props;
    const onTap = (evt) => {
        let index = parseInt(evt.target.dataset.index);

        if (isNaN(index) === true) {
            return;
        }

        evt.option = options[index];
        evt.value = evt.option.value;
        onChange?.(evt);
    };

    const selectedIndex = options.findIndex(item => item.value === value);

    return <doric-radio {...passThrough}>
        <CustomListeners onTap={onTap} />
        <Layout>
            {options.map(
                (item, index) => <RadioItem
                    key={index}
                    {...{item, propName, index, ItemRenderer}}
                    selected={selectedIndex === index}
                />
            )}
        </Layout>
    </doric-radio>
}

export default memo(Radio);
