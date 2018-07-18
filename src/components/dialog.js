import React from 'react';
import autobind from 'autobind-decorator';
import Loader from 'react-loader-spinner';

import {PureBaseComponent} from './baseComponent.js';
import Button from './button.js';
import Grid from './grid.js';
import Input from './input.js';

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
        width: '60vmin',
        animationName: 'doric-dialog-enter',
        animationDuration: '150ms',
        borderRadius: 5,
        border: `4px double ${theme.dialog.border.normal}`,
        backgroundColor: theme.dialog.bg.normal
    },
    "doric-dialog-container.spinner": {
        width: 'auto'
    },
    "doric-dialog-content": {
        maxHeight: '40vh',
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
    "doric-dialog-actions": {
        display: 'block',
        marginTop: 15
    },
    "doric-dialog-title:empty, doric-dialog-actions:empty": {
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

const DoricDialog = ({content, actions, title = null, className}) => {
    return (
        <doric-dialog-wrapper>
            <doric-dialog-container class={className}>
                <doric-dialog-title>{title}</doric-dialog-title>
                <doric-dialog-content>{content}</doric-dialog-content>
                <doric-dialog-actions>{actions}</doric-dialog-actions>
            </doric-dialog-container>
        </doric-dialog-wrapper>
    );
};

console.log(Button);
const alerts = {
    content: ({msg}) => <div style={{width: '100%'}}>{msg}</div>,
    actions: ({close}) => <Button primary block text="OK" onTap={() => close(null)} />
};
const confirms = {
    content: ({msg}) => <div>{msg}</div>,
    actions: ({close}) => (
        <Grid>
            <Grid.col size={6}><Button block text="Cancel" danger onTap={() => close(false)} /></Grid.col>
            <Grid.col size={6}><Button block text="OK" primary onTap={() => close(true)} /></Grid.col>
        </Grid>
    )
};
class DoricPrompt extends PureBaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    @autobind
    update(evt) {
        const value = evt.target.value;
        this.setStatef({value});
        this.props.setValue(value);
    }

    render() {
        const {msg, placeholder} = this.props;

        return (
            <React.Fragment>
                <div>{msg}</div>
                <Input.text value={this.state.value} onChange={this.update} placeholder={placeholder} />
            </React.Fragment>
        );
    }
}
const prompts = () => {
    let value = "";
    return {
        content: ({msg, placeholder}) => <DoricPrompt msg={msg} placeholder={placeholder} setValue={v => value = v} />,
        actions: ({close}) => (
            <Grid>
                <Grid.col size={6}><Button block danger text="Cancel" onTap={() => close(null)} /></Grid.col>
                <Grid.col size={6}><Button block primary text="OK" onTap={() => close(value)} /></Grid.col>
            </Grid>
        )
    };
};

const dialogPrivate = new WeakMap();
const dialogify = Component => class extends Component {
    static displayName = `DialogWrapped:${Component.name || "NamelessComponent"}`;
    constructor(props) {
        super(props);
        dialogPrivate.set(this, []);
        const scheduleUpdate = () => this.forceUpdate();
        this.dialogs = {
            show: ({content, actions = (() => null)}, dialogProps, props) => {
                let closeMethod = null;
                const value = new Promise(
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
                            content,
                            actions,
                            dialogProps,
                            props
                        });
                        closeMethod = close;
                        scheduleUpdate();
                    }
                );
                value.close = closeMethod;
                return value;
            }
        };
        this.dialogs.alert = (msg, title) => this.dialogs.show(alerts, {title}, {msg});
        this.dialogs.confirm = (msg, title) => this.dialogs.show(confirms, {title}, {msg});
        this.dialogs.prompt = (msg, title, placeholder) => this.dialogs.show(prompts(), {title}, {msg});
        this.dialogs.spinner = (msg, spinnerProps = null) => this.dialogs.show(
            {content: props => (
                <div style={{textAlign: 'center', padding: 5}}>
                    {msg}
                    <Loader {...spinnerProps} />
                </div>
            )},
            {className: 'spinner'}
        );
    }

    render() {
        return (
            <React.Fragment>
                {super.render()}
                {dialogPrivate.get(this).map(
                    dialog => <DoricDialog
                        key={dialog.id} {...dialog.dialogProps}
                        content={<dialog.content {...dialog.props} close={dialog.close} />}
                        actions={<dialog.actions {...dialog.props} close={dialog.close} />}
                        />
                )}
            </React.Fragment>
        );
    }
};

export default dialogify;
