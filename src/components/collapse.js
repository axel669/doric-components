import React from 'react';

import CustomListeners from './customListeners';
import Icon from './icon';
import Button from './button';

import util from '../util';
import style from '../style';
import theme from '../theme';

style.add({
    "doric-collapse": {
        display: 'block',
        border: `1px solid ${theme.collapse.border.normal}`,
        borderRadius: 2,
        margin: 4,
        overflow: 'hidden'
    },
    "doric-collapse-title": {
        display: 'block',
        cursor: 'pointer',
        backgroundColor: theme.collapse.title.bg.normal,
        position: 'relative',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
    },
    "doric-collapse-title::after": {
        content: `"${Icon.icons["ion-chevron-left"]}"`,
        position: 'absolute',
        top: '50%',
        left: 'auto',
        right: 12,
        transform: 'translateY(-50%)',
        fontFamily: "Ionic",
        fontSize: 16,
        color: theme.collapse.title.text.normal,
        transition: 'transform 100ms linear'
    },
    "doric-collapse[open='true'] doric-collapse-title::after": {
        transform: 'translateY(-50%) rotate(-90deg)'
    },
    "doric-collapse-content": {
        display: 'block',
        marginTop: 4
    },
    "doric-collapse[open='false'] > doric-collapse-content": {
        display: 'none'
    },
    "doric-collapse-title > doric-button": {
        borderRadius: 0,
        textAlign: 'left',
        color: theme.collapse.title.text.normal
    }
});
class DoricCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    toggle = () => {
        const open = this.state.open === false;
        this.setState(() => ({open}));
    }

    render = () => {
        const {
            title,
            children,
            ...props
        } = this.props;
        const {open} = this.state;

        return (
            <doric-collapse {...props} open={open}>
                <doric-collapse-title>
                    <Button text={title} onTap={this.toggle} block flush />
                </doric-collapse-title>
                <doric-collapse-content>
                    {children}
                </doric-collapse-content>
            </doric-collapse>
        );
    }
}

export default DoricCollapse;
