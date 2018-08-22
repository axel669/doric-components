import React from 'react';

import icon from '../components/icon.js';
import style from '../style.js';
import theme from '../theme.js';
import {default as util, createPureClass} from '../util.js';

import Label from './label.js';

style.add({
    "doric-select": {
        display: 'block',
        margin: 2,
        position: 'relative'
    },
    "doric-select > select": {
        width: '100%',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        padding: '3px 5px',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottom: `2px solid ${theme.select.border.normal}`,
        color: theme.select.text.normal,
        height: 30,
        borderRadius: 0,
        fontSize: 16
    },
    "doric-select::after": {
        content: `"${icon.icons["ion-arrow-down-b"]}"`,
        fontFamily: "Ionic",
        fontSize: 16,
        position: 'absolute',
        left: 'auto',
        top: '50%',
        right: 5,
        color: theme.select.text.normal,
        transform: 'translateY(-50%)'
    },
    "doric-select > select:focus": {
        borderBottomColor: theme.select.border.focus
    },
    "doric-select option": {
        color: 'black'
    }
});
const DoricSelect = props => {
    const {
        wrapperStyle,
        wrapperClassName,
        required,
        optional,
        label,
        forwardRef,
        ...selectProps
    } = props;
    return (
        <doric-select style={wrapperStyle} class={wrapperClassName}>
            <Label {...{required, optional}}>{label}</Label>
            <select {...selectProps} ref={forwardRef} />
        </doric-select>
    );
};
DoricSelect.pure = createPureClass(DoricSelect);

export default DoricSelect;
