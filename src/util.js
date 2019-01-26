import React, {PureComponent} from 'react';

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

const wait = time => new Promise(resolve => setTimeout(resolve, time));
const animFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

const setFunctionName = (func, name) => {
    Object.defineProperty(func, 'name', {value: name, writable: false});
    return func;
};
const createPureClass = (func) => {
    class GenClass extends React.PureComponent {
        render = () => func(this.props)
    }
    setFunctionName(GenClass, `${func.name}Pure`);
    return GenClass;
};
const component = {
    bindProps: (props, Component) =>
        setFunctionName(
            newProps => <Component {...props} {...newProps} />,
            `Bound:${Component.name}`
        )
};
export {
    setFunctionName,
    createPureClass,
    component,
    wait,
    animFrame
};

export const pureOption = Component => {
    Component.pure = class extends PureComponent {
        static displayName = `Pure:${Component.displayName ?? Component.name}`;

        render() {
            return <Component {...this.props} />;
        }
    };
    return Component;
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
