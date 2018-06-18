import Button from './button';
import Icon from './icon';

import style from '../style';

style.add({
    "doric-radio-group": {
        display: 'block',
        padding: 2
    },
    ".doric-radio-item": {
        margin: 0,
        textAlign: 'left',
        paddingLeft: 20
    },
    ".doric-radio-item doric-icon": {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    }
});
const Radio = props => {
    const {
        selectedIndex,
        value,
        children,
        onChange = (() => {}),
        ...rest
    } = props;
    const changeHandler = (index, value) =>
        evt => {
            if (index !== selectedIndex) {
                onChange({
                    target: {
                        selectedIndex: index,
                        value
                    },
                    type: 'change'
                });
            }
        };
    let selected = false;
    const options = React.Children.toArray(children)
        .map((child, index) => {
            let icon = "ion-android-radio-button-off";

            const valueMatch = (value !== undefined && value === child.props.value);
            if (selected === false && (index === selectedIndex || valueMatch === true)) {
                icon = "ion-android-radio-button-on";
                selected = true;
            }
            // const icon = ((index === selectedIndex || child.props.value === value) && selected)
            //     ? "ion-android-radio-button-on"
            //     : "ion-android-radio-button-off";

            return (
                <Button key={index} className="doric-radio-item" block onTap={changeHandler(index, child.props.value)}>
                    <Icon icon={icon} />
                    {child.props.label || child.props.children}
                </Button>
            );
        });

    return (
        <doric-radio-group {...rest}>
            {options}
        </doric-radio-group>
    );
};

export default Radio;
