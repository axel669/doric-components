import React from 'react';

import icon from '../components/icon';
import style from '../style';
import theme from '../theme';
import util from '../util';

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
        height: 30,
        borderRadius: 0
    },
    "doric-select::after": {
        content: `"${icon.icons["ion-arrow-down-b"]}"`,
        fontFamily: "Ionic",
        fontSize: 16,
        position: 'absolute',
        left: 'auto',
        top: '50%',
        right: 5,
        color: '#000',
        transform: 'translateY(-50%)'
    },
    "doric-select > select:focus": {
        borderBottomColor: theme.select.border.focus
    }
});
const Select = props => {
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

export default Select;
