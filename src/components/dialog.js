import {useState, useEffect, useImperativeHandle} from "react";
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "10000"
        },
        "dialog-window": {
            display: "block",
            position: "absolute",
            "&.center": {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            },
            "&.top": {
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)"
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

const dialog = (() => {
    let handle = null;
    const dialogs = new Map();

    const current = () => [...dialogs.values()];

    return {
        current,
        subscribe(handler) {
            handle = handler;
        },
        show(component, dialogInfo) {
            const dialog = {...dialogInfo, id: Date.now()};
            dialogs.set(dialog.id, [dialog, component]);
            handle(current());
        },
        close(id) {
            if (id === undefined) {
                return;
            }
            dialogs.delete(id);
            handle(current());
        }
    };
})();

function DialogList() {
    const [dialogs, updateDialogs] = useState(dialog.current());
    useEffect(
        () => {
            dialog.subscribe(updateDialogs);
        },
        []
    );

    return dialogs.map(
        info => {
            const [{window, ...props}, Component] = info;

            return <dialog-container key={props.id}>
                <dialog-window {...window}>
                    <Component {...props} />
                </dialog-window>
            </dialog-container>
        }
    );
}
ReactDOM.render(
    <DialogList />,
    rootElem
);

const publicAPI = {
    show(component, options) {
        dialog.show(component, options);
    },
    register(name, component) {
        if (name === "show" || name === "register") {
            return;
        }
        publicAPI[name] = options => dialog.show(component, options);
    }
};

export default publicAPI;
