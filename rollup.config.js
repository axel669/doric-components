// import tea from "@axel669/teascript/rollup";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

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
        // tea({include: "src/**.tea"}),
        babel({
            exclude: "node_modules/**",
            include: "src/**/*.js",
            babelrc: false,
            plugins: [
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator"
            ]
        }),
        resolve(),
        commonjs()
    ],
    external: [
        'react',
        'react-dom'
    ]
}
