import React from 'react';

import icon from '../components/icon';
import style from '../style';
import theme from '../theme';
import {default as util, createPureClass} from '../util';

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
    }
});
const DoricSelect = props => {
    const {
        wrapperStyle,
        wrapperClassName,
        ...selectProps
    } = props;
    return (
        <doric-select style={wrapperStyle} class={wrapperClassName}>
            <select {...selectProps} />
        </doric-select>
    );
};
DoricSelect.pure = createPureClass(DoricSelect);

export default DoricSelect;
