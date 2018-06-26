import React from 'react';

import theme from '../theme';
import style from '../style';

const inputTypes = [
    'text',
    'number',
    'password',
    'tel',
    'email'
];
const inputSelectors = inputTypes.map(type => `doric-input[type='${type}'] > input`).join(', ');
style.add({
    "doric-input": {
        margin: 2,
        display: 'block'
    },
    "doric-input > input, doric-input > textarea": {
        width: '100%',
        fontFamily: "Roboto, Arial"
    },
    "doric-input > textarea": {
        height: 75
    },
    [`${inputSelectors}, doric-input > textarea`]: {
        border: '2px solid transparent',
        borderBottom: `2px solid ${theme.input.border.normal}`,
        backgroundColor: 'transparent',
        padding: '5px 7px',
        fontSize: 13,
        color: theme.input.text.normal
    },
    "doric-input > input:focus, doric-input > textarea:focus": {
        borderBottomColor: theme.input.border.focus
    },
    "doric-input-label": {
        display: 'block',
        padding: 2,
        color: theme.input.label.text.normal,
        fontSize: 12
    },
    "doric-input-label[required='true']": {
        color: theme.input.label.text.required
    },
    "doric-input-label[optional='true']": {
        color: theme.input.label.text.optional
    },
    "doric-input > input[disabled]": {
        backgroundColor: theme.input.bg.disabled,
        borderColor: theme.input.bg.disabled
    }
});
const TextInput = (props, type, Element) => {
    const {
        wrapperStyle,
        wrapperClassName,
        value,
        label = null,
        required,
        optional,
        onChange = (() => {}),
        ...passThrough
    } = props;
    let labelElem = (label === null)
        ? null
        : <doric-input-label {...{required, optional}}>{label}</doric-input-label>;

    return (
        <doric-input type={type} class={wrapperClassName} style={wrapperStyle}>
            {labelElem}
            <Element {...passThrough} type={type} value={value} onChange={onChange} />
        </doric-input>
    );
};

const inputs = {
    textarea: props => TextInput(props, 'textarea', 'textarea')
};
for (const type of inputTypes) {
    inputs[type] = props => TextInput(props, type, 'input');
}

export default inputs;
