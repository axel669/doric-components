import path from "path"

import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import alias from "@axel669/rollup-plugin-path-alias"
import postcss from "rollup-plugin-postcss"

export default {
    input: "./src/main.js",
    output: [
        {
            file: "./browser/doric-components.js",
            format: "iife",
            name: "doric",
            globals: {
                "react": "React",
                "react-dom": "ReactDOM",
                "styled-components": "styled",
            }
        },
    ],
    plugins: [
        alias({
            root: path.resolve(__dirname, "..", "src"),
            "@theme": "helpers/theme.js",
            "@components": "components",
        }),
        babel({
            babelrc: false,
            plugins: [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "transform-inline-environment-variables",
            ],
        }),
        postcss(),
        resolve(),
        commonjs(),
    ],
    external: [
        "react",
        "react-dom",
        "styled-components",
    ]
}
