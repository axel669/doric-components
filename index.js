'use strict';

var react = require('react');

const isMobile =
    typeof orientation !== "undefined" ||
    navigator.userAgent.indexOf("Mobile") !== -1;
const handlers = new Map();
const touchVars = {};
const addHandler = (name, handler) => {
    if (typeof handler === "function") {
        handler = handler();
    }
    handlers.set(name, handler);
    touchVars[name] = {};
};
const createEvent = (type, source) => {
    var ref0;

    const newEvt = new CustomEvent(type, {
        bubbles: true,
        cancelable: true
    });
    for (const prop of Object.keys((ref0 = source))) {
        const value = ref0[prop];
        newEvt[prop] = value;
    }
    return newEvt;
};
const copyTouchEvent = (touch) => ({
    clientX: touch.clientX,
    clientY: touch.clientY,
    pageX: touch.pageX,
    pageY: touch.pageY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    identifier: touch.identifier,
    target: touch.target,
    sourceElement: touch.sourceElement,
    id: touch.identifier
});
const copyForSynth = (touch) => ({
    clientX: touch.clientX,
    clientY: touch.clientY,
    pageX: touch.pageX,
    pageY: touch.pageY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    identifier: touch.identifier,
    id: touch.identifier
});
const delay = (func) => setTimeout(func, 0);
const polarVector = (a, b) => {
    const dx = b.clientX - a.clientX;
    const dy = b.clientY - a.clientY;
    const angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 450) % 360;
    const magnitude = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return {
        angle: angle,
        magnitude: magnitude
    };
};
const sharedVars = {};
const touchMapper = (name, reset = false) => (touch) => {
    if (reset === true) {
        touchVars[name][touch.identifier] = {};
    }
    touchVars[name][touch.identifier] = {
        ...touchVars[name][touch.identifier],
        ...sharedVars[touch.identifier]
    };
    return {
        ...copyTouchEvent(touch),
        vars: touchVars[name][touch.identifier]
    };
};
const handleTouchList = (list, individual, touches, evt) => {
    if (list !== undefined) {
        list(touches, evt);
    }
    if (individual === undefined) {
        return;
    }
    for (const touch of touches) {
        individual(touch, evt);
    }
};
window.addEventListener(
    "touchstart",
    (evt) => {
        const touches = [...evt.changedTouches];
        for (const touch of touches) {
            touch.timestamp = Date.now();
            sharedVars[touch.identifier] = {
                start: touch
            };
        }
        for (const [name, handler] of handlers) {
            handleTouchList(
                handler.start,
                handler.startItem,
                touches.map(touchMapper(name, true)),
                evt
            );
        }
    },
    false
);
window.addEventListener("touchmove", (evt) => {
    const touches = [...evt.changedTouches];
    for (const touch of touches) {
        const shared = sharedVars[touch.identifier];
        touch.timestamp = Date.now();
        shared.vector = polarVector(shared.start, touch);
    }
    for (const [name, handler] of handlers) {
        handleTouchList(
            handler.move,
            handler.moveItem,
            touches.map(touchMapper(name)),
            evt
        );
    }
});
window.addEventListener("touchend", (evt) => {
    const touches = [...evt.changedTouches];
    for (const touch of touches) {
        const shared = sharedVars[touch.identifier];
        touch.timestamp = Date.now();
        shared.vector = polarVector(shared.start, touch);
    }
    for (const [name, handler] of handlers) {
        handleTouchList(
            handler.end,
            handler.endItem,
            touches.map(touchMapper(name)),
            evt
        );
    }
});
if (isMobile === false) {
    console.log("GesturesJS will attach non-mobile listeners");
    const createSynthTouch = (mouseEvt) => ({
        ...copyTouchEvent(mouseEvt),
        identifier: -10,
        id: 10,
        target: currentMouseTarget,
        suorceElement: currentMouseTarget
    });
    let currentMouseTarget = null;
    let mouseIsDown = false;
    const dispatchSyntheticEvent = (evt, type) => {
        const changedTouches = [createSynthTouch(evt)];
        currentMouseTarget.dispatchEvent(
            createEvent(type, {
                changedTouches: changedTouches,
                touches: changedTouches,
                syntheticEvent: true
            })
        );
    };
    window.addEventListener(
        "mousedown",
        (evt) => {
            if (evt.button === 0) {
                mouseIsDown = true;
                currentMouseTarget = evt.target;
                dispatchSyntheticEvent(evt, "touchstart");
            }
        },
        true
    );
    window.addEventListener(
        "mousemove",
        (evt) => {
            if (mouseIsDown === true) {
                dispatchSyntheticEvent(evt, "touchmove");
            }
        },
        true
    );
    window.addEventListener(
        "mouseup",
        (evt) => {
            if (evt.button === 0 && mouseIsDown === true) {
                mouseIsDown = false;
                dispatchSyntheticEvent(evt, "touchend");
                currentMouseTarget = null;
            }
        },
        true
    );
}
const climbDOM = (start, func) => {
    let current = start;
    while (current !== null && current !== document.documentElement) {
        func(current);
        current = current.parentNode;
    }
};
addHandler("active-touch", () => {
    const className = "gjs-touch-active";
    const activeTouches = new WeakMap();
    const inc = (elem) => {
        var nullref0;

        const count =
            (nullref0 = activeTouches.get(elem)) != null ? nullref0 : 0;
        activeTouches.set(elem, count + 1);
    };
    const dec = (elem) => {
        const newCount = activeTouches.get(elem) - 1;
        activeTouches.set(elem, newCount);
        return newCount;
    };
    return {
        startItem: (touch) =>
            climbDOM(touch.target, (node) => {
                node.classList.add(className);
                inc(node);
            }),
        endItem: (touch) =>
            climbDOM(touch.target, (node) => {
                if (dec(node) === 0) {
                    node.classList.remove(className);
                }
            })
    };
});
addHandler("tap", () => {
    const className = "gjs-tap-active";
    const addClass = (node) => {
        node.classList.add(className);
    };
    const removeClass = (node) => {
        node.classList.remove(className);
    };
    return {
        startItem: (touch) => {
            if (touch.target.classList.contains(className) === false) {
                touch.vars.valid = true;
                touch.vars.active = true;
                climbDOM(touch.target, addClass);
            }
        },
        moveItem: (touch) => {
            if (
                touch.vars.active === true &&
                touch.vars.vector.magnitude > 20
            ) {
                touch.vars.valid = false;
                climbDOM(touch.target, removeClass);
            }
        },
        endItem: (touch) => {
            if (touch.vars.active === true) {
                climbDOM(touch.target, removeClass);
            }
            const duration = touch.timestamp - touch.vars.start.timestamp;
            if (touch.vars.vector.magnitude > 20 || duration > 600) {
                return;
            }
            const synthEvent = createEvent("tap", copyForSynth(touch));
            delay(() => {
                if (touch.target.dispatchEvent(synthEvent) === true) {
                    touch.target.focus();
                }
            });
        }
    };
});
addHandler("hold", () => {
    const timers = {};
    const schedule = (touch) => {
        timers[touch.id] = setTimeout(() => {
            timers[touch.id] = null;
            touch.target.dispatchEvent(
                createEvent("hold", copyForSynth(touch))
            );
        }, 1500);
    };
    const clear = (touch) => {
        clearTimeout(timers[touch.id]);
        timers[touch.id] = null;
    };
    return {
        startItem: (touch) => schedule(touch),
        moveItem: (touch) => {
            if (touch.vars.vector.magnitude > 20) {
                clear(touch);
            }
        },
        endItem: (touch) => clear(touch)
    };
});

var nullref0, ref0;
const cssNoMeasurement = new Set([
    "animationIterationCount",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "fillOpacity",
    "flex",
    "flexGrow",
    "flexPositive",
    "flexShrink",
    "flexNegative",
    "flexOrder",
    "fontWeight",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "stopOpacity",
    "strokeDashoffset",
    "strokeOpacity",
    "strokeWidth",
    "tabSize",
    "widows",
    "zIndex",
    "zoom"
]);
const cssPrefixed = new Set(["userSelect"]);
const cssPrefixes = ["-webkit-", "-moz-", "-ms-", "-o-", ``];
const processValue = (key, value) => {
    const type = typeof value;
    if (type === "string") {
        return value;
    }
    if (type === "number" && cssNoMeasurement.has(key) === false) {
        return `${value}px`;
    }
    if (Array.isArray(value) === true) {
        return value.map((val) => cssValue(key, val));
    }
    return value;
};
const genParts = (css, theme, parent = ``, depth = -1) => {
    var ref0;

    const parts = [];
    const tabs = "    ".repeat(Math.max(0, depth));
    const innerTabs = "    ".repeat(depth + 1);
    const attachments = [];
    if (parent !== ``) {
        parts.push(`${tabs}${parent} {`);
    }
    for (const key of Object.keys((ref0 = css))) {
        const value = ref0[key];
        switch (true) {
            case key.indexOf("&") !== -1:
                attachments.push(
                    genParts(value, theme, key.replace(/&/g, parent), depth)
                );
                break;
            case typeof value === "object" && Array.isArray(value) === false:
                parts.push(genParts(value, theme, key, depth + 1));
                break;
            default: {
                const keyStr = key.replace(
                    /[A-Z]/g,
                    (letter) => `-${letter.toLowerCase()}`
                );
                const rawValue =
                    typeof value === "function" ? value(theme) : value;
                const cssValue = processValue(key, rawValue);
                switch (true) {
                    case cssPrefixed.has(key) === true:
                        for (const prefix of cssPrefixes) {
                            parts.push(
                                `${innerTabs}${prefix}${keyStr}: ${cssValue};`
                            );
                        }
                        break;
                    case Array.isArray(cssValue) === true:
                        for (const value of cssValue) {
                            parts.push(`${innerTabs}${keyStr}: ${value};`);
                        }
                        break;
                    default:
                        parts.push(`${innerTabs}${keyStr}: ${cssValue};`);
                }
            }
        }
    }
    if (parent !== ``) {
        parts.push(`${tabs}}`);
    }
    parts.push(...attachments);
    return parts.join("\n");
};
const Sheet = (() => {
    const construct = function construct(css, attr) {
        const self = {};
        const publicAPI = {};
        Object.defineProperties(publicAPI, {
            generate: {
                configurable: false,
                get: () => (theme) => {
                    self.elem.innerHTML = genParts(self.css, theme);
                }
            }
        });
        Object.defineProperties(self, {});
        Object.defineProperties(
            self,
            Object.getOwnPropertyDescriptors(publicAPI)
        );
        Object.defineProperties(publicAPI, {});
        self.css = css;
        self.elem = document.createElement("style");
        const attributes = (nullref0 = attr) != null ? nullref0 : {};
        for (const key of Object.keys((ref0 = attributes))) {
            const value = ref0[key];
            self.elem.setAttribute(key, value);
        }
        document.querySelector("head").appendChild(self.elem);
        return publicAPI;
    };
    return (...args) => construct.apply({}, args);
})();

var ss = Sheet;

const Color = (() => {
    const construct = function construct(...args) {
        const self = {};
        const publicAPI = {};
        Object.defineProperties(publicAPI, {
            toString: {
                configurable: false,
                get: () => () => {
                    if (self.a === 1) {
                        return `rgb(${self.r}, ${self.g}, ${self.b})`;
                    }
                    return `rgba(${self.r}, ${self.g}, ${self.b}, ${self.a})`;
                }
            }
        });
        Object.defineProperties(self, {});
        Object.defineProperties(
            self,
            Object.getOwnPropertyDescriptors(publicAPI)
        );
        Object.defineProperties(publicAPI, {
            inverse: {
                configurable: false,
                get: () =>
                    Color(255 - self.r, 255 - self.g, 255 - self.b, self.a)
            }
        });
        [self.r, self.g, self.b, self.a = 1] = (() => {
            switch (true) {
                case typeof args[0] === "string": {
                    const color =
                        args[0].startsWith("#") === true
                            ? args[0].slice(1, undefined)
                            : args[0];
                    const alpha =
                        color.length > 6 ? color.slice(6, undefined) : "FF";
                    return [
                        parseInt(color.slice(0, 2), 16),
                        parseInt(color.slice(2, 4), 16),
                        parseInt(color.slice(4, 6), 16),
                        parseInt(alpha, 16) / 255
                    ];
                }
                default:
                    return args;
            }
        })();
        return publicAPI;
    };
    return (...args) => construct.apply({}, args);
})();
const tapActive =
    ".gjs-tap-active:not(.doric-disabled):not(.doric-flat)::after";
const bcolorVariant = (color) => ({
    [`&.${color}`]: {
        backgroundColor: (theme) => theme.color[color],
        color: "white",
        "&.flat": {
            backgroundColor: "transparent",
            color: (theme) => theme.color[color]
        },
        [`&${tapActive}`]: {
            backgroundColor: (theme) => theme.highlightColor.inverse
        }
    }
});
const tappable = (color) => ({
    position: "relative",
    "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transition: "background-color 250ms linear"
    },
    "&.gjs-tap-active:not(.disabled)::after": {
        transition: "none",
        backgroundColor: color
    }
});

const theme = {
    highlightColor: Color(0, 0, 0, 0.4),
    color: {
        primary: Color("#1d62d5"),
        secondary: Color("#128f12"),
        danger: Color("#F44336"),
        accent: Color("#FF4081")
    },
    bg: {
        color: "white"
    },
    label: {
        text: {
            normal: Color(0, 0, 0),
            required: Color(255, 0, 0),
            optional: Color(0, 128, 255)
        }
    },
    collapse: {
        border: {
            color: Color(0, 0, 0)
        }
    }
};

const classes = (obj) => {
    var ref0;

    const list = [];
    for (const key of Object.keys((ref0 = obj))) {
        const value = ref0[key];
        if (key === "className" && value !== undefined) {
            list.push(value);
        }
        if (value === true) {
            list.push(key);
        }
    }
    return list.join(" ");
};

const climbDOM$1 = (start, func) => {
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
        window.addEventListener(type, (evt) => {
            const handlers = globalListeners[type];
            climbDOM$1(evt.target, (node) => {
                var nullref0;

                return (nullref0 = handlers.get(node)) != null
                    ? nullref0(evt)
                    : undefined;
            });
        });
    }
    globalListeners[type].set(elem, handler);
};
const removeGlobalListener = (type, elem) => globalListeners[type].delete(elem);
class CustomListeners extends react.Component {
    componentDidMount() {
        this.types = [];
        for (const name of Object.keys(this.props)) {
            const type = name.slice(2, undefined).toLowerCase();
            registerGlobalListener(type, this.elem, (evt) => {
                var nullref0;

                return (nullref0 = this.props[name]) != null
                    ? nullref0(evt)
                    : undefined;
            });
            this.types.push(type);
        }
    }
    componentWillUnmount() {
        for (const type of this.types) {
            removeGlobalListener(type, this.elem);
        }
    }
    render() {
        return React.createElement("doric-custom-listeners", {
            ref: (elem) => {
                var nullref0;

                this.elem =
                    (nullref0 = elem) != null ? nullref0.parentNode : undefined;
            },
            style: {
                display: "none"
            }
        });
    }
}

const buttonSheet = ss(
    {
        "doric-button": {
            display: "inline-flex",
            padding: "8px 16px",
            borderRadius: 4,
            userSelect: "none",
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            margin: 2,
            "&:hover": {
                cursor: "pointer"
            },
            ...tappable((theme$$1) => theme$$1.highlightColor),
            ...bcolorVariant("primary"),
            ...bcolorVariant("secondary"),
            ...bcolorVariant("danger"),
            ...bcolorVariant("accent"),
            "&.block": {
                display: "flex"
            },
            "&.disabled": {
                opacity: 0.4
            },
            "&.snug": {
                padding: 0
            },
            "&.flush": {
                margin: 0
            },
            "&.raised": {
                boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.4)"
            }
        }
    },
    {
        name: "doric-button"
    }
);
buttonSheet.generate(theme);
class Button extends react.PureComponent {
    render() {
        const {
            text,
            children,
            style = {},
            tabIndex = 0,
            circle,
            onTap,
            ...rest
        } = this.props;
        if (circle !== undefined) {
            style.width = circle;
            style.height = circle;
            style.padding = 0;
            style.borderRadius = "50%";
        }
        const props = {
            style: style,
            tabIndex: tabIndex,
            class: classes(rest)
        };
        return React.createElement(
            "doric-button",
            {
                ...props
            },
            React.createElement(CustomListeners, {
                onTap: onTap
            }),
            text,
            children
        );
    }
}

const imageCSS = ss(
    {
        "doric-image": {
            display: "inline-block",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "contain",
            "& > img": {
                width: "100%",
                height: "100%",
                opacity: 0
            }
        }
    },
    {
        name: "doric-image"
    }
);
imageCSS.generate(theme);
class Image extends react.PureComponent {
    render() {
        const {
            source,
            width,
            height,
            size,
            round,
            ...passThrough
        } = this.props;
        const border =
            round === true
                ? {
                      borderRadius: Math.max(width, height)
                  }
                : {};
        const style = {
            ...passThrough.style,
            backgroundImage: `url('${source}')`,
            backgroundSize: size,
            width: width,
            height: height,
            ...border
        };
        return React.createElement(
            "doric-image",
            {
                ...passThrough,
                style: style
            },
            React.createElement("img", {
                src: source
            })
        );
    }
}

const cardCSS = ss(
    {
        "doric-card": {
            display: "block",
            margin: 4,
            boxShadow: [
                "2px 0px 2px rgba(0, 0, 0, 0.25)",
                "0px 2px 2px rgba(0, 0, 0, 0.25)",
                "-2px 0px 2px rgba(0, 0, 0, 0.25)",
                "0px -2px 2px rgba(0, 0, 0, 0.25)"
            ].join(", "),
            backgroundColor: (theme$$1) => theme$$1.bg.color,
            overflow: "hidden",
            borderRadius: 2,
            padding: 12,
            position: "relative",
            top: 0,
            left: 0
        },
        "doric-card-title": {
            display: "block",
            margin: -12,
            marginBottom: 0,
            padding: 4,
            "&::after": {
                content: "' '",
                display: "table",
                clear: "both"
            },
            "& > div": {
                fontSize: 20
            },
            "& > span": {
                fontSize: 12,
                color: "gray",
                float: "left"
            },
            "& > doric-image": {
                float: "left",
                marginRight: 8
            }
        },
        "doric-card-top": {
            position: "relative",
            display: "block",
            margin: -12,
            marginBottom: 0,
            padding: 4
        },
        "doric-card-bottom": {
            position: "relative",
            display: "block",
            margin: -12,
            marginTop: 0,
            padding: 4
        }
    },
    {
        name: "doric-card"
    }
);
cardCSS.generate(theme);
class Card extends react.Component {
    render() {
        const { children } = this.props;
        return React.createElement("doric-card", {}, children);
    }
}
Card.title = (props) => {
    const { title, subtitle, image } = props;
    const imageElem =
        image === undefined
            ? undefined
            : React.createElement(Image, {
                  width: 45,
                  height: 45,
                  round: true,
                  source: image
              });
    return React.createElement(
        "doric-card-title",
        {},
        imageElem,
        React.createElement("div", {}, title),
        React.createElement("span", {}, subtitle)
    );
};
Card.top = (props) =>
    React.createElement("doric-card-top", {
        ...props
    });
Card.bottom = (props) =>
    React.createElement("doric-card-bottom", {
        ...props
    });

const labelCSS = ss(
    {
        "doric-label": {
            display: "block",
            padding: 2,
            color: ({ label }) => label.text.normal,
            fontSize: 12,
            "&.required": {
                color: ({ label }) => label.text.required
            },
            "&.optional": {
                color: ({ label }) => label.text.optional
            },
            "&:empty": {
                display: "none"
            }
        }
    },
    {
        name: "doric-label"
    }
);
labelCSS.generate(theme);
class Label extends react.PureComponent {
    render() {
        const { required, optional, className, ...props } = this.props;
        const _class = classes({
            className: className,
            required: required,
            optional: optional
        });
        return React.createElement("doric-label", {
            ...props,
            class: _class
        });
    }
}

const collapseCSS = ss(
    {
        "doric-collapse": {
            display: "block",
            borderRadius: 4,
            overflow: "hidden",
            margin: 4,
            padding: 0,
            border: (theme$$1) => {
                const {
                    width = 1,
                    type = "solid",
                    color
                } = theme$$1.collapse.border;
                return `${width}px ${type} ${color}`;
            },
            "&.hide > div": {
                display: "none"
            },
            "&-label": {
                display: "block",
                padding: 4,
                fontSize: 16,
                ...tappable(Color(0, 0, 0, 0.4).toString())
            }
        }
    },
    {
        name: "doric-collapse"
    }
);
collapseCSS.generate(theme);
class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true
        };
        this.toggle = () => {
            const hide = !this.state.hide;
            this.setState({
                hide: hide
            });
        };
    }
    render() {
        const {
            className,
            label = "Collapse",
            children,
            ...passThrough
        } = this.props;
        const { hide } = this.state;
        const _classes = classes({
            className: className,
            hide: hide
        });
        return React.createElement(
            "doric-collapse",
            {
                ...passThrough,
                class: _classes
            },
            React.createElement(
                "doric-collapse-label",
                {},
                label,
                React.createElement(CustomListeners, {
                    onTap: this.toggle
                })
            ),
            React.createElement("div", {}, children)
        );
    }
}

const mainCSS = ss(
    {
        "*": {
            boxSizing: "border-box",
            WebkitTapHighlightColor: "transparent",
            "&:focus": {
                outline: `2px solid ${Color(100, 150, 255, 0.6)}`
            }
        },
        "html body": {
            padding: 0,
            margin: 0,
            width: "100%",
            height: "100%",
            fontFamily: "Roboto",
            backgroundColor: "#F0F0F0"
        }
    },
    {
        name: "main-style"
    }
);
mainCSS.generate(theme);
var doric = {
    button: Button,
    card: Card,
    image: Image,
    label: Label,
    collapse: Collapse
};

module.exports = doric;
