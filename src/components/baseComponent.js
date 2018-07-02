import React from 'react';

const DoricMixin = parent => class extends parent {
    linkState = (name, prop = 'target.value') => {
        const getValue = new Function('evt', `return evt.${prop}`);
        return evt => {
            const value = getValue(evt);
            this.setState(() =>
                ({[name]: value})
            );
        };
    }

    createLinks = (...linkInfo) => {
        const links = {};
        for (const info of linkInfo) {
            const args = Array.isArray(info) === true ? info : [info];
            links[args[0]] = this.linkState(...args);
        }

        return links;
    }

    setStatef = value =>
        this.setState(() => value)
};

export class BaseComponent extends DoricMixin(React.Component){}
export class PureBaseComponent extends DoricMixin(React.PureComponent){}
