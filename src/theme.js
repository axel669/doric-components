import update from './update';

// const _typeof = new Function('obj', 'return typeof obj');
// const deepMerge = (a, b) => {
//     const t1 = _typeof(a);
//     const t2 = _typeof(b);
//     const a1 = Array.isArray(a);
//     const a2 = Array.isArray(b);
//
//     if (t1 === 'boolean' || t1 === 'function' || t1 === 'number' || t1 === 'string') {
//         if (t2 === 'object') {
//             if (a2 === true) {
//                 return [].concat(b);
//             }
//             return deepMerge({}, b);
//         }
//         if (b === undefined) {
//             return a;
//         }
//         return b;
//     }
//
//     if (a1 === true) {
//         if (a2 === true) {
//             return a.concat(b);
//         }
//         return a.concat([b]);
//     }
//
//     if (b === undefined) {
//         b = {};
//     }
//     const obj = {};
//     const keys = new Set(
//         Object.keys(a)
//         .concat(Object.keys(b))
//     );
//     for (const key of keys) {
//         switch (true) {
//             case (a[key] === undefined && b[key] !== undefined):
//                 obj[key] = deepMerge(b[key]);
//                 break;
//             case (a[key] !== undefined && b[key] === undefined):
//                 obj[key] = deepMerge(a[key]);
//                 break;
//
//             default:
//                 obj[key] = deepMerge(a[key], b[key]);
//         }
//     }
//     return obj;
// };

const niceBlue = '#1d62d5';
const normalHL = 'rgba(0, 0, 0, 0.4)';
const focusHL = 'rgba(0, 0, 0, 0.125)';
const baseTheme = {
    'body.bg.normal': '#f0f0f0',
    'body.text.normal': 'black',

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

    'card.bg.normal': 'white',
    'card.border.normal': 'white',

    'checkbox.checkColor': niceBlue,
    'checkbox.hl.normal': normalHL,
    'checkbox.hl.focus': focusHL,

    'collapse.title.bg.normal': niceBlue,
    'collapse.title.text.normal': 'white',
    'collapse.border.normal': 'lightgray',

    'divider.border.normal': 'lightgray',

    'input.border.normal': 'lightgray',
    'input.border.focus': niceBlue,
    'input.text.normal': 'black',

    'radio.circleColor': niceBlue,
    'radio.text.normal': 'black',

    'select.border.normal': 'lightgray',
    'select.border.focus': niceBlue,

    'slider.track.bg.normal': 'lightgray',
    'slider.track.bg.value': niceBlue,
    'slider.thumb.normal': niceBlue,

    'tabs.tab.hl.normal': normalHL,
    'tabs.tab.bg.normal': 'white',
    'tabs.tab.bg.active': 'white',
    'tabs.tab.border.normal': 'lightgray',
    'tabs.tab.border.active': niceBlue,
    'tabs.tab.text.normal': 'black',
    'tabs.tab.text.active': niceBlue,

    'toggle.hl.normal': normalHL,
    'toggle.hl.focus': focusHL,
    'toggle.thumb.on': niceBlue,
    'toggle.thumb.off': '#666768',
    'toggle.track.on': '#79aafb',
    'toggle.track.off': 'lightgray'
};

const themeValues = (() => {
    if (typeof DoricTheme !== 'undefined') {
        const {__global, ...customTheme} = DoricTheme;
        const endsWithOne = (str, values) => {
            for (const value of values) {
                if (str.endsWith(value) === true) {
                    return value;
                }
            }
            return undefined;
        };

        const values = {};
        const globalNames = Object.keys(__global);
        const keyList = new Set([
            ...Object.keys(baseTheme),
            ...Object.keys(customTheme)
        ]);
        for (const key of keyList) {
            const globalValue = (() => {
                const keyName = endsWithOne(key, globalNames);
                if (keyName !== undefined) {
                    return __global[keyName];
                }
                return undefined;
            })();
            const value = customTheme[key] || globalValue;
            if (value !== undefined) {
                customTheme[key] = value;
            }
        }
        return {...baseTheme, ...customTheme};
    }
    return baseTheme;
})();

const theme = update(
    {},
    Object.keys(themeValues).reduce(
        (theme, key) => {
            theme[`${key}.$set`] = themeValues[key];
            return theme;
        },
        {}
    ),
    true
);

export default theme;
