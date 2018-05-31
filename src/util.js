import theme from './theme';

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
                    backgroundColor: theme.__global.hl || color,
                    transition: 'none'
                }
            }
        }
    }
};
