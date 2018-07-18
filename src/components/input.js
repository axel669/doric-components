import React from 'react';

import Loader from 'react-loader-spinner';

import Label from './label.js';
import theme from '../theme.js';
import style from '../style.js';
import {setFunctionName} from '../util.js';

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
        display: 'block',
        position: 'relative'
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
    // "doric-input-label": {
    //     display: 'block',
    //     padding: 2,
    //     color: theme.input.label.text.normal,
    //     fontSize: 12
    // },
    // "doric-input-label[required='true']": {
    //     color: theme.input.label.text.required
    // },
    // "doric-input-label[optional='true']": {
    //     color: theme.input.label.text.optional
    // },
    "doric-input > input[disabled]": {
        backgroundColor: theme.input.bg.disabled,
        borderColor: theme.input.bg.disabled
    }
});
class DoricInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.refreshLoader(props.loaderType || "Oval");
    }

    componentWillUpdate = (nextProps) => {
        if (this.props.loaderType !== nextProps.loaderType) {
            this.refreshLoader(nextProps.loaderType);
        }
    }

    refreshLoader = type => {
        this.loader = (
            <div style={{position: 'absolute', left: 'auto', right: 4, bottom: 0}}>
                <Loader type={type} width={20} height={20} />
            </div>
        );
    }

    render = () => {
        const {
            wrapperStyle,
            wrapperClassName,
            value,
            label = null,
            required,
            optional,
            loader = false,
            loaderType = 'Oval',
            onChange = (() => {}),
            type,
            Element,
            ...passThrough
        } = this.props;
        // const labelElem = (label === null)
        //     ? null
        //     : <doric-input-label {...{required, optional}}>{label}</doric-input-label>;
        const loaderElem = (loader !== true) ? null : this.loader;

        return (
            <doric-input type={type} class={wrapperClassName} style={wrapperStyle}>
                {/* {labelElem} */}
                <Label {...{optional, required}}>{label}</Label>
                <Element {...passThrough} type={type} value={value} onChange={onChange} />
                {loaderElem}
            </doric-input>
        );
    }
}

const inputs = {
    textarea: function DoricTextarea(props) {
        return <DoricInput {...props} type="textarea" Element="textarea" />;
    }
};
for (const type of inputTypes) {
    inputs[type] = props => <DoricInput {...props} type={type} Element="input" />;
    setFunctionName(inputs[type], `Doric${type.slice(0, 1).toUpperCase()}${type.slice(1)}Input`);
}

export default inputs;
