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
