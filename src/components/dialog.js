import React, {useState, useEffect, useImperativeHandle, useRef} from "react";
import ReactDOM from "react-dom";
import ssjs from "ssjs";

import Button from "@components/button.js";
import CustomListeners from "@components/customListeners.js";
import Grid from "@components/grid.js";
import Input from "@components/input.js";
import Panel from "@components/panel.js";
import Title from "@components/title.js";

import api from "@api";

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
            backgroundColor: theme => theme.dialog.cover,
            zIndex: "10000"
        },
        "dialog-window": {
            display: "block",
            position: "absolute",
            maxWidth: "80%",
            "&.center": {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            },
            "&.top": {
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)"
            },
            "&.small": {
                width: 320
            },
            "&.large": {
                width: 720
            }
        }
    },
    {name: "doric-dialog"}
);
api.addCSS(dialogCSS);

const rootElem = document.createElement("dialog-root");

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
    const close = (id, value) => {
        if (id === undefined) {
            return;
        }
        const resolve = dialogs.get(id)[2];
        dialogs.delete(id);
        handle(current());
        resolve(value);
    };
    const show = (component, dialogInfo) => new Promise(
        (resolve) => {
            const dialog = {...dialogInfo, id: Date.now()};
            dialogs.set(dialog.id, [dialog, component, resolve]);
            handle(current());
        }
    );

    return {
        current,
        subscribe(handler) {
            handle = handler;
        },
        show, close
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
            const close = value => dialog.close(props.id, value);
            const windowProps = {
                ...window,
                class: window.class?.join(" ") ?? null
            };
            const tapClose = evt => {
                if (evt.target.tagName.toLowerCase() === "dialog-container") {
                    close(null);
                }
            };

            return <dialog-container key={props.id}>
                <CustomListeners onTap={tapClose} />
                <dialog-window {...windowProps}>
                    <Component {...props} close={close} />
                </dialog-window>
            </dialog-container>
        }
    );
}
ReactDOM.render(
    <DialogList />,
    rootElem
);

const deepMerge = (first, second) => {
    if (Array.isArray(first) === true) {
        if (Array.isArray(second) === true) {
            return [...first, ...second];
        }
        return [...first, second];
    }
    if (typeof first === "object" && typeof second === "object") {
        const merged = {};
        const keys = new Set([
            ...Object.keys(first),
            ...Object.keys(second)
        ]);
        for (const key of keys) {
            merged[key] = deepMerge(first[key], second[key]);
        }
        return merged;
    }
    if (second === undefined) {
        return first;
    }
    return second;
};
const publicAPI = {
    show(component, options) {
        return dialog.show(component, options);
    },
    register(name, component, baseOptions) {
        if (name === "show" || name === "register") {
            return;
        }
        publicAPI[name] = options => dialog.show(
            component,
            deepMerge(
                baseOptions,
                options
            )
        );
    }
};

function AlertDialog(props) {
    const close = () => props.close();

    return <Panel>
        <Title title={props.title} />
        <div>{props.message}</div>
        <Panel.actions>
            <Button text="OK" block primary flat onTap={close} />
        </Panel.actions>
    </Panel>
}
function ConfirmDialog(props) {
    const confirm = () => props.close(true);
    const cancel = () => props.close(false);

    return <Panel>
        <Title title={props.title} />
        <div>{props.message}</div>
        <Panel.actions>
            <Button text="Cancel" block danger flat onTap={cancel} />
            <Button text="OK" block primary flat onTap={confirm} />
        </Panel.actions>
    </Panel>
}
const useMounts = effect => useEffect(effect, []);
function PromptDialog(props) {
    const inputRef = useRef();
    const [value, updateValue] = useState(props.value);
    const submit = evt => {
        evt.preventDefault();
        props.close(value);
    }
    const cancel = () => props.close(false);
    const update = evt => updateValue(evt.target.value);

    useMounts(
        () => inputRef.current.focus()
    );

    return <Panel>
        <Title title={props.title} />
        <form onSubmit={submit}>
            <Input type={props.type} label={props.label} value={value} onChange={update} ref={inputRef} />
        </form>
        <Panel.actions>
            <Button text="Cancel" block danger flat onTap={cancel} />
            <Button text="OK" block primary flat onTap={submit} />
        </Panel.actions>
    </Panel>
}

publicAPI.register(
    "alert",
    AlertDialog,
    {
        title: "Alert",
        window: {
            class: ["top", "small"]
        }
    }
);
publicAPI.register(
    "confirm",
    ConfirmDialog,
    {
        title: "Confirm",
        window: {
            class: ["top", "small"]
        }
    }
);
publicAPI.register(
    "prompt",
    PromptDialog,
    {
        title: "Prompt",
        type: "text",
        value: "",
        window: {
            class: ["top", "small"]
        }
    }
);

export default publicAPI;
