import theme, {merge} from "@theme";

const cssSheets = new Set();

export default {
    generateCSS(newTheme) {
        const _theme = merge(theme, newTheme);
        for (const css of cssSheets) {
            css.generate(_theme);
        }
    },
    addCSS(css) {
        cssSheets.add(css);
    }
};
