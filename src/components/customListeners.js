import {useEffect, useRef} from "react";

const climbDOM = (start, func) => {
    let current = start;
    while (current !== null && current !== document.documentElement) {
        func(current);
        current = current.parentNode;
    }
};

const globalListeners = {};
const registerGlobalListener = (type, elem, handler) => {
    if (globalListeners[type] === undefined) {
        globalListeners[type] = new Map();

        window.addEventListener(
            type,
            (evt) => {
                const handlers = globalListeners[type];
                climbDOM(
                    evt.target,
                    (node) => handlers.get(node)?.(evt)
                )
            }
        );
    }

    globalListeners[type].set(elem, handler);
}
const removeGlobalListener = (type, elem) =>
    globalListeners[type].delete(elem);

const useMounts = effect => useEffect(effect, []);
function CustomListeners(props) {
    const element = useRef(null);
    const pRef = useRef(props);
    pRef.current = props;
    useMounts(() => {
        const types = Object.keys(props);
        for (const name of types) {
            const type = name.slice(2).toLowerCase();
            registerGlobalListener(
                type,
                element.current.parentNode,
                evt => pRef.current[name]?.(evt)
            );
        }
        return () => {
            for (const name of types) {
                removeGlobalListener(name, element.current.parentNode);
            }
        };
    });

    return <doric-custom-listeners ref={element} />;
}

export default CustomListeners;
