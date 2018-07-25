import React from 'react';

import Button from './button.js';
import Icon from './icon.js';
import Grid from './grid.js';
import Flex from './flex.js';

import style from '../style.js';
import theme from '../theme.js';
import {keySplit} from '../util.js';

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
        transform: 'translateY(-50%)',
        color: theme.radio.circleColor
    },
    "doric-button.doric-radio-item": {
        color: theme.radio.text.normal
    }
});

const defaultContainer = props => <React.Fragment>{props.children}</React.Fragment>;
defaultContainer.RadioItem = props => <React.Fragment>{props.children}</React.Fragment>;
class DoricRadio extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate = (nextProps) => {
        for (const key of Object.keys(nextProps)) {
            if (this.props[key] !== nextProps[key] && key !== 'children') {
                return true;
            }
        }
        const current = React.Children.toArray(this.props.children);
        const next = React.Children.toArray(nextProps.children);
        if (current.length !== next.length) {
            return true;
        }
        for (const i of (0).to(current.length)) {
            if (current[i] !== next[i]) {
                return true;
            }
        }

        return false;
    }

    render = () => {
        const props = this.props;
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

                return (
                    <Item {...itemProps}>
                        <Button className="doric-radio-item" selected={isSelected} block onTap={changeHandler(index, child.props.value)}>
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
    }
}

Grid.RadioItem = props => <Grid.col {...props} />;
Flex.RadioItem = props => <Flex.col {...props} />;

export default DoricRadio;
