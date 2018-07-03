import update from 'immutable-update-values';

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
    'input.label.text.normal': 'black',
    'input.label.text.optional': niceBlue,
    'input.label.text.required': '#F44336',
    'input.bg.disabled': 'lightgray',

    'radio.circleColor': niceBlue,
    'radio.text.normal': 'black',

    'select.border.normal': 'lightgray',
    'select.border.focus': niceBlue,
    'select.text.normal': 'black',

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
