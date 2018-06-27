import React from 'react';

import theme from '../theme';
import style from '../style';

import CustomListeners from './customListeners';

// import util from '../util';
import {default as util, createPureClass} from '../util';

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
        padding: '8px 16px',
        margin: 4,
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'hidden',
        color: theme.button.text.normal,
        backgroundColor: theme.button.bg.normal,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none'
    },
    "doric-button[block='true']": {
        display: 'flex',
        minWidth: 0
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
        opacity: 0.6
    },
    "doric-button::after": {
        ...util.background.after.base
    },
    "doric-button:focus::after": {
        backgroundColor: theme.button.hl.focus
    },
    "doric-button[data-tap-active]:not([disabled='true'])::after": {
        ...util.background.after.colorize(theme.button.hl.normal)
    },
    "doric-button-content": {
        flexGrow: 1
    },
    "doric-button[primary='true']": {
        backgroundColor: theme.button.bg.primary,
        color: theme.button.text.primary
    },
    "doric-button[danger='true']": {
        backgroundColor: theme.button.bg.danger,
        color: theme.button.text.danger
    },
    "doric-button[accent='true']": {
        backgroundColor: theme.button.bg.accent,
        color: theme.button.text.danger
    },
    "doric-button[flat='true'][primary='true']": {
        backgroundColor: 'transparent',
        color: theme.button.bg.primary
    },
    "doric-button[flat='true'][danger='true']": {
        backgroundColor: 'transparent',
        color: theme.button.bg.danger
    },
    "doric-button[flat='true'][accent='true']": {
        backgroundColor: 'transparent',
        color: theme.button.bg.accent
    },
    "doric-button[action='true']": {
        borderRadius: 500
    }
});

// export default class DoricButton extends React.PureComponent {
//     render = () => {
//         const props = this.props;
//         const {
//             onTap: tapHandler = (() => {}),
//             onKeyDown: passedOKD = (() => {}),
//             text,
//             children,
//             className,
//             tabIndex = 0,
//             ...passThrough
//         } = props;
//         const {disabled} = props;
//         const onTap =  evt => {
//             if (disabled !== true) {
//                 tapHandler({...evt, type: 'tap'});
//             }
//         };
//         const onKeyDown = evt => {
//             passedOKD(evt);
//             if (evt.key === ' ' || evt.key === 'Enter') {
//                 onTap(evt);
//             }
//         };
//
//         return (
//             <doric-button tabIndex={disabled === true ? null : tabIndex} {...passThrough} class={className} onKeyDown={onKeyDown}>
//                 <CustomListeners listeners={{onTap}} />
//                 <doric-button-content>
//                     {text || children}
//                 </doric-button-content>
//             </doric-button>
//         );
//     }
// }

const DoricButton = (props) => {
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
DoricButton.pure = createPureClass(DoricButton);

export default DoricButton;
