import React from 'react';

import theme from '../theme';
import style from '../style';

import Icon from './icon';
import CustomListeners from './customListeners';

import {default as util, createPureClass} from '../util';

style.add({
    "doric-checkbox": {
        position: 'relative',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 3,
        paddingLeft: 25,
        userSelect: 'none',
        cursor: 'pointer'
    },
    "doric-checkbox::after": {
        ...util.background.after.base
    },
    "doric-checkbox:focus::after": {
        backgroundColor: theme.checkbox.hl.focus
    },
    "doric-checkbox[disabled='true']": {
        opacity: 0.7
    },
    "doric-checkbox[data-tap-active]:not([disabled='true'])::after": {
        ...util.background.after.colorize(theme.checkbox.hl.normal)
    },
    "doric-checkbox::before": {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        fontSize: 22,
        paddingLeft: 3,
        paddingRight: 3,
        fontFamily: "Ionic",
        display: 'flex',
        alignItems: 'center',
        content: `"${Icon.icons["ion-android-checkbox-outline-blank"]}"`,
        color: theme.checkbox.checkColor
    },
    "doric-checkbox[checked='true']::before": {
        content: `"${Icon.icons["ion-android-checkbox"]}"`
    },
    "doric-checkbox-content": {
        flexGrow: 1
    },
    "doric-checkbox[checkRight]": {
        paddingLeft: 3,
        paddingRight: 25
    },
    "doric-checkbox[checkRight]::before": {
        left: 'auto',
        right: 0
    },
    "doric-checkbox[alignRight]": {
        textAlign: 'right'
    }
});

const DoricCheckbox = (props) => {
    const {
        checked,
        label,
        children,
        onChange = (() => {}),
        onKeyDown: passedOKD = (() => {}),
        tabIndex = 0,
        fowardRef,
        ...passThrough
    } = props;
    const {disabled} = props;
    const onTap = evt => {
        if (disabled !== true) {
            const e = {
                ...evt,
                type: 'change',
                checked: checked === false
            };
            e.target = evt.target;
            e.target.value = e.checked;
            onChange(e);
        }
    };
    const onKeyDown = evt => {
        passedOKD(evt);
        if (evt.key === ' ' || evt.key === 'Enter') {
            onTap(evt);
        }
    };

    return (
        <doric-checkbox tabIndex={disabled === true ? null : tabIndex} {...passThrough} checked={checked} onKeyDown={onKeyDown} ref={forwardRef}>
            <CustomListeners listeners={{onTap}} />
            <doric-checkbox-content>
                {label || children}
            </doric-checkbox-content>
        </doric-checkbox>
    );
};
DoricCheckbox.pure = createPureClass(DoricCheckbox);

export default DoricCheckbox;
