import React from 'react';

export default class BaseComponent extends React.Component {
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
};
