import path from "path";

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import alias from "@axel669/rollup-plugin-path-alias";

export default {
    input: "./src/main.js",
    output: [
        {
            file: "./standalone/doric-components.js",
            format: "iife",
            name: "doric",
            globals: {
                "react": "React",
                "react-dom": "ReactDOM"
            }
        },
        {
            file: "./index.js",
            format: "cjs"
        }
    ],
    plugins: [
        alias({
            root: path.resolve(__dirname, "src"),
            "@css": "helpers/css.js",
            "@theme": "helpers/theme.js",
            "@components": "components"
        }),
        babel({
            exclude: "node_modules/**",
            include: "src/**/*.js",
            // babelrc: false,
            // plugins: [
            //     "@babel/plugin-transform-react-jsx",
            //     "@babel/plugin-proposal-optional-chaining",
            //     "@babel/plugin-proposal-nullish-coalescing-operator"
            // ]
        }),
        resolve(),
        commonjs()
    ],
    external: [
        'react',
        'react-dom'
    ]
}
