// import tea from "@axel669/teascript/rollup";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "./src/doric.js",
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
        resolve(),
        commonjs()
    ],
    external: [
        'react',
        'react-dom'
    ]
}
