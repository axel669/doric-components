import theme from '../theme';
import style from '../style';

import CustomListeners from './customListeners';

import util from '../util';

/*
    custom
        text
            normal
            disabled
        bg
        highlight
*/
style.add({
    "doric-button": {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        padding: '4px 8px',
        margin: '3px 4px',
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'hidden',
        minWidth: 69,
        minHeight: 30,
        color: theme.button.text.normal,
        backgroundColor: theme.button.bg,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none'
    },
    "doric-button[block='true']": {
        display: 'flex'
    },
    "doric-button[raised='true']": {
        boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)'
    },
    "doric-button[snug='true']": {
        padding: 0
    },
    "doric-button[flush='true']": {
        margin: 0
    },
    "doric-button[disabled='true']": {
        opacity: 0.7
    },
    "doric-button::after": {
        ...util.background.after.base
    },
    "doric-button:focus::after": {
        backgroundColor: theme.button.focusHL
    },
    "doric-button[data-tap-active]:not([disabled='true'])::after": {
        ...util.background.after.colorize(theme.toggle.hl)
    },
    "doric-button-content": {
        flexGrow: 1
    },
    "doric-button[primary='true']": {
        backgroundColor: "#2196F3"
    },
    "doric-button[danger='true']": {
        backgroundColor: "#F44336"
    },
    "doric-button[accent='true']": {
        backgroundColor: "#FF4081"
    },
    "doric-button[flat='true'][primary='true']": {
        backgroundColor: 'transparent',
        color: "#2196F3"
    },
    "doric-button[flat='true'][danger='true']": {
        backgroundColor: 'transparent',
        color: "#F44336"
    },
    "doric-button[flat='true'][accent='true']": {
        backgroundColor: 'transparent',
        color: "#FF4081"
    }
});

export default (props) => {
    const {
        onTap: tapHandler = (() => {}),
        onKeyDown: passedOKD = (() => {}),
        text,
        children,
        className,
        tabIndex = 0,
        ...passThrough
    } = props;
    const {disabled} = props;
    const onTap =  evt => {
        if (disabled !== true) {
            tapHandler({...evt, type: 'tap'});
        }
    };
    const onKeyDown = evt => {
        passedOKD(evt);
        if (evt.key === ' ' || evt.key === 'Enter') {
            onTap(evt);
        }
    };

    return (
        <doric-button tabIndex={disabled === true ? null : tabIndex} {...passThrough} class={className} onKeyDown={onKeyDown}>
            <CustomListeners target={this} listeners={{onTap}} />
            <doric-button-content>
                {text || children}
            </doric-button-content>
        </doric-button>
    );
};
