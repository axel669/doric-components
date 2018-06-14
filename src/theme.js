const _typeof = new Function('obj', 'return typeof obj');
const deepMerge = (a, b) => {
    const t1 = _typeof(a);
    const t2 = _typeof(b);
    const a1 = Array.isArray(a);
    const a2 = Array.isArray(b);

    if (t1 === 'boolean' || t1 === 'function' || t1 === 'number' || t1 === 'string') {
        if (t2 === 'object') {
            if (a2 === true) {
                return [].concat(b);
            }
            return deepMerge({}, b);
        }
        if (b === undefined) {
            return a;
        }
        return b;
    }

    if (a1 === true) {
        if (a2 === true) {
            return a.concat(b);
        }
        return a.concat([b]);
    }

    if (b === undefined) {
        b = {};
    }
    const obj = {};
    const keys = new Set(
        Object.keys(a)
        .concat(Object.keys(b))
    );
    for (const key of keys) {
        switch (true) {
            case (a[key] === undefined && b[key] !== undefined):
                obj[key] = deepMerge(b[key]);
                break;
            case (a[key] !== undefined && b[key] === undefined):
                obj[key] = deepMerge(a[key]);
                break;

            default:
                obj[key] = deepMerge(a[key], b[key]);
        }
    }
    return obj;
};

const niceBlue = '#1d62d5';
const theme = deepMerge(
    {
        __global: {
            hl: false,
            outline: `2px solid ${niceBlue}55`
        },
        body: {
            bg: '#f0f0f0'
        },
        button: {
            bg: 'transparent',
            hl: 'rgba(0, 0, 0, 0.4)',
            text: {
                normal: 'black',
                disabled: '#acacac'
            }
        },
        card: {
            title: {
                bg: niceBlue,
                color: 'white'
            }
        },
        checkbox: {
            checkColor: niceBlue,
            hl: 'rgba(0, 0, 0, 0.4)'
        },
        toggle: {
            hl: 'rgba(0, 0, 0, 0.4)',
            thumb: {
                onColor: niceBlue,
                offColor: '#666768'
            },
            track: {
                onColor: '#79aafb',
                offColor: 'lightgray'
            }
        }
    },
    window.DoricTheme
);

export default theme;
