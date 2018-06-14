import theme from './theme';

const style = {
    "html, body": {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.body.bg,
        fontFamily: "Roboto"
    },
    "*": {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'transparent'
    },
    ":focus": {
        outline: theme.__global.outline
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
