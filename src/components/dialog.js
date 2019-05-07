// import {Component} from "react";
import ReactDOM from "react-dom";
import ssjs from "ssjs";

import CustomListeners from "@components/customListeners.js";
import Button from "@components/button.js";
import Grid from "@components/grid.js";

import theme from "@theme";

const dialogCSS = ssjs(
    {
        "dialog-root": {
            position: "absolute",
            top: 0,
            left: 0
        },
        "dialog-container": {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            "&:empty": {
                display: "none"
            }
        }
    },
    {name: "doric-dialog"}
);
dialogCSS.generate(theme);

const rootElem = document.createElement("dialog-root");
const stopTap = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
};

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        () => document.body.appendChild(rootElem)
    );
}
else {
    document.body.appendChild(rootElem);
}

export default () => {};
