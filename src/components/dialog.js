import React from 'react';

import Button from './button.js';

import theme from '../theme.js';
import style from '../style.js';

style.add({
    "doric-dialog-base": {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'visible',
        width: 0,
        height: 0
    },
    "doric-dialog-wrapper": {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        animationName: 'doric-dialog-fade-in'
    },
    "doric-dialog-container": {
        position: 'absolute',
        top: '10vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70vmin',
        animationName: 'doric-dialog-enter',
        animationDuration: '150ms',
        border: `4px double ${theme.dialog.border.normal}`,
        backgroundColor: theme.dialog.bg.normal
    },
    "doric-dialog-content": {
        maxHeight: '35vh',
        overflow: 'auto',
        display: 'block',
        padding: 5
    },
    "doric-dialog-title": {
        display: 'block',
        padding: 5,
        fontSize: 20,
        paddingBottom: 15
    },
    "doric-dialog-title:empty": {
        display: 'none'
    },
    '@keyframes doric-dialog-enter': {
        from: {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-25%)'
        },
        to: {
            opacity: 1,
            transform: 'translateX(-50%)'
        }
    }
});

const DoricDialog = ({children, title = null}) => {
    return (
        <doric-dialog-wrapper>
            <doric-dialog-container>
                <doric-dialog-title>{title}</doric-dialog-title>
                <doric-dialog-content>
                    {children}
                </doric-dialog-content>
            </doric-dialog-container>
        </doric-dialog-wrapper>
    );
};
const dialogPrivate = new WeakMap();
const dialogify = Component => class extends Component {
    static displayName = `DialogWrapped:${Component.name || "NamelessComponent"}`;
    constructor(props) {
        super(props);
        dialogPrivate.set(this, []);
        const scheduleUpdate = () => this.setState(() => ({}));
        this.dialogs = {
            show: (element, dialogProps, props) => new Promise(
                resolve => {
                    const id = `${Date.now()}_${Math.random()}`;
                    const close = (value) => {
                        const dialogs = dialogPrivate.get(this);
                        dialogPrivate.set(
                            this,
                            dialogs.filter(d => d.id !== id)
                        );
                        scheduleUpdate();
                        resolve(value);
                    };
                    dialogPrivate.get(this).push({
                        id,
                        close,
                        element,
                        dialogProps,
                        props
                    });
                    scheduleUpdate();
                }
            )
        };
        this.dialogs.alert = (msg, title) => this.dialogs.show(
            ({close}) => (
                <React.Fragment>
                    <div>{msg}</div>
                    <Button text="OK" block onTap={() => close(null)} />
                </React.Fragment>
            ),
            {title}
        );
    }

    render() {
        return (
            <React.Fragment>
                {super.render()}
                {JSON.stringify(this.props)}
                {JSON.stringify(this.state)}
                {dialogPrivate.get(this).map(
                    dialog => (
                        <DoricDialog key={dialog.id} {...dialog.dialogProps}>
                            <dialog.element {...dialog.props} close={dialog.close} />
                        </DoricDialog>
                    )
                )}
            </React.Fragment>
        );
    }
};

export default dialogify;
