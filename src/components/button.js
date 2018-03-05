import theme from '../theme';
import style from '../style';

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
        backgroundColor: theme.button.bg
    },
    "doric-button[raised]": {
        boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)'
    },
    "doric-button[snug]": {
        padding: 0
    },
    "doric-button[disabled]": {
        color: theme.button.text.disabled,
    },
    "doric-button::after": {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        content: `""`,
        transition: 'background-color 250ms linear'
    },
    "doric-button[data-touch-active]:not([disabled])::after": {
        backgroundColor: theme.button.hl,
        transition: 'none'
    }
});

export default (props) => {
    const realProps = {};
    for (const prop of Object.keys(props)) {
        if (prop !== 'content') {
            realProps[prop] = props[prop];
        }
    }
    return <doric-button {...realProps}>{props.content}</doric-button>;
};
