import React from 'react';

import Button from './button';
import Icon from './icon';
import {Grid, Col} from './grid';

import style from '../style';
import {keySplit} from '../util';

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

const defaultContainer = props => <React.Fragment>{props.children}</React.Fragment>;
defaultContainer.RadioItem = props => <React.Fragment>{props.children}</React.Fragment>;
const Radio = props => {
    const {
        selectedIndex,
        value,
        children,
        onChange = (() => {}),
        layout = {container: defaultContainer, itemProps: props => props},
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
    // const Container = layout.container || (props => <React.Fragment>{props.children}</React.Fragment>);
    const Container = layout.container;
    const Item = Container.RadioItem;
    const itemPropsFunc = layout.itemProps;
    let selected = false;
    const options = React.Children.toArray(children)
        .map((child, index) => {
            let icon = "ion-android-radio-button-off";

            const valueMatch = (value !== undefined && value === child.props.value);
            const isSelected = selected === false && (index === selectedIndex || valueMatch === true);
            if (isSelected === true) {
                icon = "ion-android-radio-button-on";
                selected = true;
            }
            const itemProps = itemPropsFunc(
                {index, key: index, selected: isSelected},
                rest
            );
            // console.log(Item, itemProps);

            return (
                <Item {...itemProps}>
                    <Button className="doric-radio-item" block onTap={changeHandler(index, child.props.value)}>
                        <Icon icon={icon} />
                        {child.props.label || child.props.children}
                    </Button>
                </Item>
            );
        });

    return (
        <doric-radio-group {...rest}>
            <Container>
                {options}
            </Container>
        </doric-radio-group>
    );
};

Grid.RadioItem = props => <Col {...props}>{props.children}</Col>;

export default Radio;
