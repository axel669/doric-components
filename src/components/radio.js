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
    const options = React.Children.toArray(children)
        .map((child, index) => {
            const icon = (index === selectedIndex)
                ? "ion-android-radio-button-on"
                : "ion-android-radio-button-off";
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
