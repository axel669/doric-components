import React from 'react';

export class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    linkState = (name, prop = 'target.value') => {
        const getValue = new Function('evt', `return evt.${prop}`);
        return evt => {
            const value = getValue(evt);
            this.setState(() =>
                ({[name]: value})
            );
        };
    }

    setStatef = value =>
        this.setState(() => value)
};
export class PureBaseComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    linkState = (name, prop = 'target.value') => {
        const getValue = new Function('evt', `return evt.${prop}`);
        return evt => {
            const value = getValue(evt);
            this.setState(() =>
                ({[name]: value})
            );
        };
    }

    setStatef = value =>
        this.setState(() => value)
};
