module.exports = {
    plugins: [
        "@babel/plugin-transform-react-jsx",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        ["babel-plugin-search-and-replace", {
            rules: [
                {search: "@css", replace: "../helpers/css.js"},
                {search: "@theme", replace("../helpers/theme.js"}
            ]
        }]
    ]
};
