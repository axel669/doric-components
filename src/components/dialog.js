import React from 'react';
import autobind from 'autobind-decorator';
import Loader from 'react-loader-spinner';

import {PureBaseComponent} from './baseComponent.js';
import Button from './button.js';
import Grid from './grid.js';
import Input from './input.js';

import theme from '../theme.js';
import style from '../style.js';
import {component} from '../util.js';

style.add({
    "doric-dialog-overlay": {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000
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

const DoricDialogOverlay = ({children}) => (
    <doric-dialog-overlay>
        {children}
    </doric-dialog-overlay>
);
const DoricDialogContainer = props => <doric-dialog-container {...props} />;
const DoricDialogTitle = props => <doric-dialog-title {...props} />;
const DoricDialogContent = props => <doric-dialog-content {...props} />;
const DoricDialogActions = props => <doric-dialog-actions {...props} />;

const DoricDialog = ({title, content, actions, ...props}) => (
    <DoricDialogContainer {...props}>
        <DoricDialogTitle>{title}</DoricDialogTitle>
        <DoricDialogContent>{content}</DoricDialogContent>
        <DoricDialogActions>{actions}</DoricDialogActions>
    </DoricDialogContainer>
);

const DoricAlert = ({msg, title = "Alert", close}) => <DoricDialog title={title} content={msg} actions={<Button block text="Ok" onTap={() => close()} />} />;
const DoricConfirm = ({msg, title = "Confirm", close}) => {
    const actions = (
        <Grid>
            <Grid.col size={6}><Button block text="Cancel" flat danger onTap={() => close(false)} /></Grid.col>
            <Grid.col size={6}><Button block text="OK" flat primary onTap={() => close(true)} /></Grid.col>
        </Grid>
    );
    return <DoricDialog title={title} content={msg} actions={actions} />;
};
const DoricSpinner = ({msg, width = 60, height = 60, type = "Circles"}) => {
    const content = (
        <div style={{textAlign: 'center'}}>
            <div>{msg}</div>
            <Loader {...{width, height, type}} />
        </div>
    );
    return <DoricDialog style={{width: 'auto'}} title={null} content={content} actions={null} />;
};
class DoricPrompt extends PureBaseComponent {
    constructor(props) {
        super(props);
        this.state = {value: this.props.initialValue || ""};
        this.link = this.createLinks('value');
    }

    @autobind
    close() {
        this.props.close(null);
    }
    @autobind
    submit() {
        this.props.close(this.state.value);
    }

    render() {
        const {msg, placeholder, title, close} = this.props;

        const content = <Input.text label={msg} value={this.state.value} onChange={this.link.value} placeholder={placeholder} />;
        const actions = (
            <Grid>
                <Grid.col size={6}><Button block danger text="Cancel" onTap={this.close} /></Grid.col>
                <Grid.col size={6}><Button block primary text="Ok" onTap={this.submit} /></Grid.col>
            </Grid>
        );

        return <DoricDialog title={title} content={content} actions={actions} />;
    }
}

const dialogPrivate = new WeakMap();
const dialogify = Component => class extends Component {
    static displayName = `DialogWrapped:${Component.name || "NamelessComponent"}`;
    constructor(props) {
        super(props);
        dialogPrivate.set(this, []);
        this.dialog = {
            show: (element) => {
                let close = null;
                const res = new Promise(
                    resolve => {
                        const id = `${Date.now()}_${Math.random()}`;
                        close = (value = null) => {
                            const dialogs = dialogPrivate.get(this);
                            dialogPrivate.set(
                                this,
                                dialogs.filter(d => d.id !== id)
                            );
                            this.forceUpdate();
                            resolve(value);
                        };
                        dialogPrivate.get(this).push({
                            id, close, element
                        });
                        this.forceUpdate();
                    }
                );
                res.close = close;
                return res;
            },
            alert: (msg, title) => this.dialog.show(component.bindProps({msg, title}, DoricAlert)),
            confirm: (msg, title) => this.dialog.show(component.bindProps({msg, title}, DoricConfirm)),
            prompt: (msg, title, initialValue, placeholder) => this.dialog.show(component.bindProps({msg, title, placeholder, initialValue}, DoricPrompt)),
            spinner: (msg, spinnerProps) => this.dialog.show(component.bindProps({msg, ...spinnerProps}, DoricSpinner))
        };
    }

    render() {
        return (
            <React.Fragment>
                {super.render()}
                {dialogPrivate.get(this).map(
                    dialog => (
                        <DoricDialogOverlay key={dialog.id}>
                            <dialog.element close={dialog.close} />
                        </DoricDialogOverlay>
                    )
                )}
            </React.Fragment>
        );
    }
};

const dialog = DoricDialog;
dialog.title = DoricDialogTitle;
dialog.content = DoricDialogContent;
dialog.actions = DoricDialogActions;
export {dialog, dialogify};
