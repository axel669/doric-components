import React from 'react';

import theme from './theme';

Number.prototype.to = function (end) {
    const array = [];
    let current = this + 0;

    while (current < end) {
        array.push(current);
        current += 1;
    }

    return array;
};

const setFunctionName = (func, name) => {
    Object.defineProperty(func, 'name', {value: name, writable: false});
};
const createPureClass = (func) => {
    class GenClass extends React.PureComponent {
        render = () => func(this.props)
    }
    setFunctionName(GenClass, `${func.name}Pure`);
    return GenClass;
};
export {
    setFunctionName,
    createPureClass
};

export default {
    background: {
        after: {
            base: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                content: `""`,
                transition: 'background-color 250ms linear'
            },
            colorize(color) {
                return {
                    backgroundColor: color,
                    transition: 'none'
                }
            }
        }
    },
    color: {
        primaryBlue: "#2196F3"
    }
};
