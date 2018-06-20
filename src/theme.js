import update from './update';

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
const normalHL = 'rgba(0, 0, 0, 0.4)';
const focusHL = 'rgba(0, 0, 0, 0.125)';
const baseTheme = {
    '__global.hl': normalHL,
    '__global.border.color': 'lightgray',
    '__global.border.focusColor': niceBlue,

    'body.bg': '#f0f0f0',

    'button.hl.normal': normalHL,
    'button.hl.focus': focusHL,
    'button.bg.normal': 'transparent',
    'button.text.normal': 'black',
    'button.bg.primary': niceBlue,
    'button.text.primary': 'white',
    'button.bg.danger': '#F44336',
    'button.text.danger': 'white',
    'button.bg.accent': '#FF4081',
    'button.text.accent': 'white',

    'card.bg': 'white',

    'checkbox.checkColor': niceBlue,
    'checkbox.hl.normal': normalHL,
    'checkbox.hl.focus': focusHL,

    'collapse.title.bg': niceBlue,
    'collapse.title.text': 'white',

    'divider.color': 'lightgray',

    'input.border.normal': 'lightgray',
    'input.border.focus': niceBlue,

    'tabs.title.hl': normalHL,

    'toggle.hl': normalHL,
    'toggle.thumb.on': niceBlue,
    'toggle.thumb.off': '#666768',
    'toggle.track.on': '#79aafb',
    'toggle.track.off': 'lightgray'
};
const defaultTheme = update(
    {},
    Object.keys(baseTheme).reduce(
        (theme, key) => {
            theme[`${key}.$set`] = baseTheme[key];
            return theme;
        },
        {}
    ),
    true
);
// console.log(defaultTheme);
// const wat = {
//     __global: {
//         hl: false,
//         border: {
//             color: 'lightgray',
//             focusColor: niceBlue
//         }
//     },
//     body: {
//         bg: '#f0f0f0'
//     },
//     button: {
//         bg: 'transparent',
//         hl: 'rgba(0, 0, 0, 0.4)',
//         focusHL: 'rgba(10, 10, 10, 0.15)',
//         text: {
//             normal: 'black',
//             disabled: '#acacac'
//         }
//     },
//     card: {
//         title: {
//             bg: niceBlue,
//             color: 'white'
//         }
//     },
//     checkbox: {
//         checkColor: niceBlue,
//         hl: 'rgba(0, 0, 0, 0.4)',
//         focusHL: 'rgba(10, 10, 10, 0.15)'
//     },
//     input: {
//         normal: {
//             borderColor: 'lightgray'
//         },
//         focus: {
//             borderColor: niceBlue
//         }
//     },
//     tabs: {
//         title: {
//             hl: 'rgba(0, 0, 0, 0.4)',
//         }
//     },
//     toggle: {
//         hl: 'rgba(0, 0, 0, 0.4)',
//         thumb: {
//             onColor: niceBlue,
//             offColor: '#666768'
//         },
//         track: {
//             onColor: '#79aafb',
//             offColor: 'lightgray'
//         }
//     }
// // };
// const wat2 = Object.keys(baseTheme).reduce(
//     (theme, key) => {
//         theme[`${key}.$set`] = baseTheme[key];
//         return theme;
//     },
//     {}
// );
const theme = defaultTheme;
// const theme = update({}, wat2, true);
// const theme = deepMerge(
//     update(wat, wat2, true),
//     window.DoricTheme
// );

export default theme;
