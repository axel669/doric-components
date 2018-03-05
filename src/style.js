import theme from './theme';

const style = {
    "html, body": {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.body.bg
    },
    "*": {
        boxSizing: 'border-box'
    }
};

Object.defineProperty(
    style,
    'add',
    {
        enumerable: false,
        value(styles) {
            Object.keys(styles)
                .forEach(selector => {
                    style[selector] = styles[selector];
                });
        }
    }
);

export default style;
