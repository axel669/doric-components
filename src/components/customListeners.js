import {useEffect, useRef} from "react";

// let climbDOM = (start, func) => {
//     let mut current = start
//     while current != null && current != document.documentElement {
//         func(current)
//         current = current.parentNode
//     }
// }

// let globalListeners = {};
// let registerGlobalListener = (type, elem, handler) => {
//     if globalListeners[type] == undefined {
//         globalListeners[type] = Map*()
//
//         window.addEventListener(
//             type
//             (evt) => {
//                 let handlers = globalListeners[type]
//                 climbDOM(
//                     evt.target
//                     (node) => handlers.get(node)?(evt)
//                 )
//             }
//         )
//     }
//
//     globalListeners[type].set(elem, handler)
// }
// let removeGlobalListener = (type, elem) =>
//     globalListeners[type].delete(elem)

class CustomListeners extends Component {
    componentDidMount() => {
        @types = []

        for name of @props {
            let type = name[2...].toLowerCase()
            registerGlobalListener(
                type
                @elem
                (evt) => @props[name]?(evt)
            )
            @types.push(type)
        }
    }

    componentWillUnmount() => {
        for type in @types {
            removeGlobalListener(type, @elem)
        }
    }

    render() => <doric-custom-listeners
        ref=(elem) => {@elem = elem?.parentNode}
        style={display: "none"} />
}

export default CustomListeners

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
                    (node) => handlers.get(node)?(evt)
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
    useMounts(() => {
        for (const name of Object.keys(props)) {
        }
    });

    return <doric-custom-listeners ref={element} />;
}
