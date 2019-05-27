import React, { useRef, useEffect, memo, useState, forwardRef, useImperativeHandle, Children } from 'react';
import ReactDOM from 'react-dom';

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
    id: touch.identifier,
    timestamp: touch.timestamp
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

const cssNoMeasurement = new Set([
    "animation-iteration-count",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-positive",
    "flex-shrink",
    "flex-negative",
    "flex-order",
    "font-weight",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "stop-opacity",
    "stroke-dashoffset",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "widows",
    "z-index",
    "zoom"
]);
const cssPrefixes = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
const prefixMap = ["user-select"].reduce(
    (prefixes, name) => ({
        ...prefixes,
        [name]: cssPrefixes
    }),
    {}
);

const renderCSS = ([selector, valueBase], tab, depth, theme) => {
    const tabString = tab.repeat(depth);

    const parts = [];

    if (Array.isArray(valueBase) === true) {
        parts.push(`${tabString}${selector} {`);
        parts.push(...valueBase.map(
            value => renderCSS(value, tab, depth + 1, theme)
        ));
        parts.push(`${tabString}}`);
    }
    else {
        const name = getCSSName(selector);
        const value = getCSSValue(valueBase, name, theme);
        if (value !== null) {
            const selectors = getPrefixedSelector(name);
            for (const _name of selectors) {
                for (const _value of value) {
                    parts.push(`${tabString}${_name}: ${_value};`);
                }
            }
        }
    }

    return parts.join("\n");
};
const getPrefixedSelector = selector => (prefixMap[selector] || [""])
    .map(prefix => `${prefix}${selector}`);
const getCSSName = name => name.replace(
    /[A-Z]/g,
    (s) => `-${s.toLowerCase()}`
);
const getCSSValue = (value, name, theme) => {
    if (value === null || value === undefined) {
        return null;
    }

    if (typeof value === "function") {
        return getCSSValue(value(theme), name, theme);
    }

    if (Array.isArray(value) === true) {
        return value.map(
            val => getCSSValue(val, name, theme)
        );
    }

    if (value.toCSS !== undefined) {
        return [value.toCSS()];
    }

    if (typeof value === "number" && cssNoMeasurement.has(name) === false) {
        return [`${value}px`];
    }

    return [value];
};

const prepObj = (obj, parent = "", current = [], top = []) => {
    for (const [selectorBase, value] of Object.entries(obj)) {
        const selector = selectorBase.replace(/&/g, parent);

        if (parent === "" || selectorBase.indexOf("&") !== -1) {
            const items = [];
            top.push([selector, items]);
            prepObj(value, selector, items, top);
        }
        else {
            if (typeof value === "object" && value.toCSS === undefined) {
                const items = [];
                current.push([selector, items]);
                prepObj(value, selector, items, top);
            }
            else {
                current.push([selector, value]);
            }
        }
    }

    return top;
};
const lerp = (from, to, by) => from + ((to - from) * by);
const sumsq = values => values.reduce((total, n) => total + (n ** 2), 0);
const blendValues = values => Math.sqrt(sumsq(values) / values.length);
const color = (r, g, b, a = 1) => ({
    get r() {return r},
    get g() {return g},
    get b() {return b},
    get a() {return a},
    opacity: alpha => color(r, g, b, alpha),
    invert: () => color(255 - r, 255 - g, 255 - b, a),
    darken: factor => color(
        lerp(r, 0, factor)|0,
        lerp(g, 0, factor)|0,
        lerp(b, 0, factor)|0,
        a
    ),
    lighten: factor => color(
        lerp(r, 255, factor)|0,
        lerp(g, 255, factor)|0,
        lerp(b, 255, factor)|0,
        a
    ),
    toCSS: () => `rgba(${r}, ${g}, ${b}, ${a})`
});
color.fromHex = hex => {
    if (hex.startsWith("#") === true) {
        hex = hex.slice(1);
    }
    const [r, g, b, a] = (hex.length <= 4)
        ? [
            parseInt(hex.slice(0, 1).repeat(2), 16),
            parseInt(hex.slice(1, 2).repeat(2), 16),
            parseInt(hex.slice(2, 3).repeat(2), 16),
            parseInt(hex.slice(3, 4).repeat(2) || "FF", 16) / 255,
        ]
        : [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
            parseInt(hex.slice(6, 8) || "FF", 16) / 255,
        ];

    return color(r, g, b, a);
};
color.blend = (...colors) => color(
    blendValues(colors.map(c => c.r))|0,
    blendValues(colors.map(c => c.g))|0,
    blendValues(colors.map(c => c.b))|0,
    blendValues(colors.map(c => c.a))
);

const initUpdate = (attrs) => {
    if (typeof window !== "undefined") {
        const element = document.createElement("style");

        for (const [attr, value] of Object.entries(attrs)) {
            element.setAttribute(attr, value);
        }

        document.querySelector("head").appendChild(element);

        return css => {
            element.innerHTML = css;
            return css;
        };
    }

    return css => css;
};
const sheet = (styles, attrs = {}) => {
    const cssSource = prepObj(styles);

    const update = initUpdate(attrs);

    return {
        generate: (theme, tab = "    ") => update(
            cssSource
                .map(decl => renderCSS(decl, tab, 0, theme))
                .join("\n")
        )
    };
};

sheet.color = color;

var ssjs = sheet;

const cssNoMeasurement$1 = new Set([
    "animation-iteration-count",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-positive",
    "flex-shrink",
    "flex-negative",
    "flex-order",
    "font-weight",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "stop-opacity",
    "stroke-dashoffset",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "widows",
    "z-index",
    "zoom"
]);
const cssPrefixes$1 = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
const prefixMap$1 = ["user-select"].reduce(
    (prefixes, name) => ({
        ...prefixes,
        [name]: cssPrefixes$1
    }),
    {}
);

const renderCSS$1 = ([selector, valueBase], tab, depth, theme) => {
    const tabString = tab.repeat(depth);

    const parts = [];

    if (Array.isArray(valueBase) === true) {
        parts.push(`${tabString}${selector} {`);
        parts.push(...valueBase.map(
            value => renderCSS$1(value, tab, depth + 1, theme)
        ));
        parts.push(`${tabString}}`);
    }
    else {
        const name = getCSSName$1(selector);
        const value = getCSSValue$1(valueBase, name, theme);
        if (value !== null) {
            const selectors = getPrefixedSelector$1(name);
            for (const _name of selectors) {
                for (const _value of value) {
                    parts.push(`${tabString}${_name}: ${_value};`);
                }
            }
        }
    }

    return parts.join("\n");
};
const getPrefixedSelector$1 = selector => (prefixMap$1[selector] || [""])
    .map(prefix => `${prefix}${selector}`);
const getCSSName$1 = name => name.replace(
    /[A-Z]/g,
    (s) => `-${s.toLowerCase()}`
);
const getCSSValue$1 = (value, name, theme) => {
    if (value === null || value === undefined) {
        return null;
    }

    if (typeof value === "function") {
        return getCSSValue$1(value(theme), name, theme);
    }

    if (Array.isArray(value) === true) {
        return value.map(
            val => getCSSValue$1(val, name, theme)
        );
    }

    if (value.toCSS !== undefined) {
        return [value.toCSS()];
    }

    if (typeof value === "number" && cssNoMeasurement$1.has(name) === false) {
        return [`${value}px`];
    }

    return [value];
};

const prepObj$1 = (obj, parent = "", current = [], top = []) => {
    for (const [selectorBase, value] of Object.entries(obj)) {
        const selector = selectorBase.replace(/&/g, parent);

        if (parent === "" || selectorBase.indexOf("&") !== -1) {
            const items = [];
            top.push([selector, items]);
            prepObj$1(value, selector, items, top);
        }
        else {
            if (typeof value === "object" && value.toCSS === undefined) {
                const items = [];
                current.push([selector, items]);
                prepObj$1(value, selector, items, top);
            }
            else {
                current.push([selector, value]);
            }
        }
    }

    return top;
};
const lerp$1 = (from, to, by) => from + ((to - from) * by);
const sumsq$1 = values => values.reduce((total, n) => total + (n ** 2), 0);
const blendValues$1 = values => Math.sqrt(sumsq$1(values) / values.length);
const color$1 = (r, g, b, a = 1) => ({
    get r() {return r},
    get g() {return g},
    get b() {return b},
    get a() {return a},
    opacity: alpha => color$1(r, g, b, alpha),
    invert: () => color$1(255 - r, 255 - g, 255 - b, a),
    darken: factor => color$1(
        lerp$1(r, 0, factor)|0,
        lerp$1(g, 0, factor)|0,
        lerp$1(b, 0, factor)|0,
        a
    ),
    lighten: factor => color$1(
        lerp$1(r, 255, factor)|0,
        lerp$1(g, 255, factor)|0,
        lerp$1(b, 255, factor)|0,
        a
    ),
    toCSS: () => `rgba(${r}, ${g}, ${b}, ${a})`
});
color$1.fromHex = hex => {
    if (hex.startsWith("#") === true) {
        hex = hex.slice(1);
    }
    const [r, g, b, a] = (hex.length <= 4)
        ? [
            parseInt(hex.slice(0, 1).repeat(2), 16),
            parseInt(hex.slice(1, 2).repeat(2), 16),
            parseInt(hex.slice(2, 3).repeat(2), 16),
            parseInt(hex.slice(3, 4).repeat(2) || "FF", 16) / 255,
        ]
        : [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
            parseInt(hex.slice(6, 8) || "FF", 16) / 255,
        ];

    return color$1(r, g, b, a);
};
color$1.blend = (...colors) => color$1(
    blendValues$1(colors.map(c => c.r))|0,
    blendValues$1(colors.map(c => c.g))|0,
    blendValues$1(colors.map(c => c.b))|0,
    blendValues$1(colors.map(c => c.a))
);

const initUpdate$1 = (attrs) => {
    if (typeof window !== "undefined") {
        const element = document.createElement("style");

        for (const [attr, value] of Object.entries(attrs)) {
            element.setAttribute(attr, value);
        }

        document.querySelector("head").appendChild(element);

        return css => {
            element.innerHTML = css;
            return css;
        };
    }

    return css => css;
};
const sheet$1 = (styles, attrs = {}) => {
    const cssSource = prepObj$1(styles);

    const update = initUpdate$1(attrs);

    return {
        generate: (theme, tab = "    ") => update(
            cssSource
                .map(decl => renderCSS$1(decl, tab, 0, theme))
                .join("\n")
        )
    };
};

sheet$1.color = color$1;

const actions = {
    $set: (source, value) => value,
    $unset: (source, names) => {
        const copy = {
            ...source
        };
        for (const name of names) {
            delete copy[name];
        }
        return copy;
    },
    $push: (source, value) => [...source, value],
    $append: (source, value) => [...source, ...value],
    $apply: (source, func) => func(source),
    $filter: (source, condition) => source.filter(condition),
    $merge: (source, addition) => ({
        ...source,
        ...addition
    })
};
const internal_copyObject = (obj, createIfVoid = false) => {
    if (Array.isArray(obj) === true) {
        return [...obj];
    }
    if (obj === undefined && createIfVoid === true) {
        return {};
    }
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    if (obj instanceof Map) {
        return new Map(obj);
    }
    if (obj instanceof Set) {
        return new Set(obj);
    }
    if (obj.constructor !== Object) {
        return obj;
    }
    return {
        ...obj
    };
};
const internal_setValues = (dest, key, n, value, create) => {
    const name = key[n];
    if (n === key.length - 1) {
        return actions[name](dest, value);
    } else {
        dest = internal_copyObject(dest, create);
        dest[name] = internal_setValues(dest[name], key, n + 1, value, create);
    }
    return dest;
};
const update = (source, obj, createIfUndefined = false) =>
    Object.keys(obj).reduce(
        (source, key) =>
            internal_setValues(
                source,
                key.split("."),
                0,
                obj[key],
                createIfUndefined
            ),
        source
    );
update.actions = actions;

var immutableUpdate = update;

const blue = sheet$1.color.fromHex("#1d62d5");
const lightblue = sheet$1.color.fromHex("#2196F3");
const baseTheme = {
  "fontFamily": "Roboto, Arial",
  "highlightColor": sheet$1.color(0, 0, 0, 0.4),
  "secondaryHighlightColor": sheet$1.color(255, 255, 255, 0.4),
  "outline": blue,
  "focusOutline": "2px solid rgba(29, 98, 213, 0.5)",
  "color.primary": blue,
  "color.secondary": sheet$1.color.fromHex("#128f12"),
  "color.danger": sheet$1.color.fromHex("#F44336"),
  "color.accent": sheet$1.color.fromHex("#FF4081"),
  "body.bg.color": sheet$1.color.fromHex("#F0F0F0"),
  "body.text.color": "black",
  "dialog.cover": sheet$1.color(0, 0, 0, 0.5),
  "divider.size": 2,
  "divider.style": "solid",
  "divider.color": "black",
  "label.text.normal": sheet$1.color(0, 0, 0),
  "label.text.required": sheet$1.color(255, 0, 0),
  "label.text.optional": blue,
  "collapse.border.color": sheet$1.color(0, 0, 0),
  "input.bg.color": "white",
  "input.border.normal": "lightgray",
  "input.border.focus": blue,
  "input.disabled": sheet$1.color.fromHex("#DDD"),
  "input.label.required": sheet$1.color(255, 0, 0),
  "input.label.optional": blue,
  "input.text.color": "black",
  "list.bg.color": "transparent",
  "list.header.border.color": "lightgray",
  "list.header.bg.color": "white",
  "navbar.bg.color": blue,
  "navbar.border.width": 0,
  "navbar.border.style": "",
  "navbar.border.color": "",
  "navbar.text.color": "white",
  "panel.bg.color": "white",
  "panel.border.width": 0,
  "panel.border.style": "",
  "panel.border.color": "",
  "select.bg.color": "white",
  "select.border.color": "black",
  "select.disabled": sheet$1.color(87, 87, 87),
  "select.text.color": "black",
  "tabs.selected.text": lightblue,
  "tabs.selected.border": lightblue,
  "title.bg.color": "white",
  "title.border.normal": "lightgray"
};

const merge = (base, updates) => immutableUpdate(base, Object.entries(updates).reduce((all, [key, value]) => ({ ...all,
  [`${key}.$set`]: value
}), {}), true);

const theme = merge({}, baseTheme);

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
    window.addEventListener(type, evt => {
      const handlers = globalListeners[type];
      climbDOM$1(evt.target, node => {
        var _handlers$get;

        return (_handlers$get = handlers.get(node)) === null || _handlers$get === void 0 ? void 0 : _handlers$get(evt);
      });
    });
  }

  globalListeners[type].set(elem, handler);
};

const removeGlobalListener = (name, elem) => {
  const type = name.slice(2).toLowerCase();
  globalListeners[type].delete(elem);
};

const useMounts = effect => useEffect(effect, []);

function CustomListeners(props) {
  const element = useRef(null);
  const pRef = useRef(props);
  pRef.current = props;
  useMounts(() => {
    const types = Object.keys(props);

    for (const name of types) {
      const type = name.slice(2).toLowerCase();
      registerGlobalListener(type, element.current.parentNode, evt => {
        var _pRef$current$name, _pRef$current;

        return (_pRef$current$name = (_pRef$current = pRef.current)[name]) === null || _pRef$current$name === void 0 ? void 0 : _pRef$current$name.call(_pRef$current, evt);
      });
    }

    return () => {
      for (const name of types) {
        removeGlobalListener(name, element.current.parentNode);
      }
    };
  });
  return React.createElement("doric-custom-listeners", {
    ref: element
  });
}

const query = {
  mobile: screen.availWidth <= 640
};
const tapActive = ".gjs-tap-active:not(.disabled):not(.flat)::after";

const bcolorVariant = colorName => ({
  [`&.${colorName}`]: {
    backgroundColor: theme => theme.color[colorName],
    color: "white",
    [`&.flat`]: {
      backgroundColor: "transparent",
      color: theme => theme.color[colorName]
    },
    [`&${tapActive}`]: {
      backgroundColor: theme => theme.secondaryHighlightColor
    }
  }
});

const tappable = color => {
  const style = {
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
  };
  return style;
};

const classes = obj => {
  let list = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key === "className" && value !== undefined) {
      list.push(value);
    }

    if (value === true) {
      list.push(key);
    }
  }

  return list.join(" ");
};

const cssSheets = new Set();
var api = {
  generateCSS(newTheme) {
    const _theme = merge(theme, newTheme);

    for (const css of cssSheets) {
      css.generate(_theme);
    }
  },

  addCSS(css) {
    cssSheets.add(css);
  }

};

const buttonSheet = ssjs({
  "doric-button": {
    display: "inline-flex",
    padding: "8px 16px",
    borderRadius: 4,
    userSelect: "none",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    userSelect: "none",
    margin: 2,
    transition: "background-color 150ms linear",
    cursor: "pointer",
    "& ion-icon:not(:last-child)::before": {
      marginRight: 4
    },
    "&:hover": {
      cursor: "pointer"
    },
    ...tappable(theme => theme.highlightColor),
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
}, {
  name: "doric-button"
});
api.addCSS(buttonSheet);

function Button(props) {
  const {
    text,
    onTap,
    children,
    tabIndex = 1,
    style = {},
    icon = null,
    iconSize = null,
    circle,
    _,
    ...rest
  } = props;

  if (circle !== undefined) {
    style.width = circle;
    style.height = circle;
    style.padding = 0;
    style.borderRadius = "50%";
  }

  const iconElem = icon === null ? null : React.createElement("ion-icon", {
    class: icon,
    style: {
      fontSize: iconSize
    }
  });
  const wrapProps = { ..._,
    tabIndex,
    style,
    class: classes(rest)
  };
  return React.createElement("doric-button", wrapProps, React.createElement(CustomListeners, {
    onTap: onTap
  }), iconElem, text ? React.createElement("span", null, text) : null, children);
}
var Button$1 = memo(Button);

const checkboxCSS = ssjs({
  "doric-checkbox": {
    display: "block",
    margin: 2,
    padding: 8,
    borderRadius: 4,
    overflow: "hidden",
    userSelect: "none",
    cursor: "pointer",
    margin: 2,
    ...tappable(theme => theme.highlightColor),
    "&.left": {
      paddingLeft: 24
    },
    "&.right": {
      paddingRight: 24
    },
    "&-icon": {
      position: "absolute",
      display: "flex",
      top: 0,
      bottom: 0,
      width: 24,
      fontSize: 20,
      alignItems: "center",
      justifyContent: "center",
      "&.left": {
        left: 0
      },
      "&.right": {
        left: "auto",
        right: 0
      }
    }
  }
}, {
  name: "doric-checkbox"
});
api.addCSS(checkboxCSS);

function Checkbox(props) {
  const {
    checked,
    checkSide = "left",
    tabIndex = 1,
    onChange,
    text,
    children,
    className,
    ...rest
  } = props;
  const iconName = checked == true ? "checkbox" : "square-outline";
  const wrapProps = {
    tabIndex,
    class: classes({
      className,
      [checkSide]: true
    }),
    ...rest
  };
  const iconClass = classes({
    [`ion-md-${iconName}`]: true,
    [checkSide]: true
  });

  const toggle = evt => {
    evt.checked = checked === false;
    onChange === null || onChange === void 0 ? void 0 : onChange(evt);
  };

  return React.createElement("doric-checkbox", wrapProps, React.createElement("doric-checkbox-icon", {
    class: iconClass
  }), text, children, React.createElement(CustomListeners, {
    onTap: toggle
  }));
}

var Checkbox$1 = memo(Checkbox);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

let collapseCSS = ssjs({
  "doric-collapse": {
    display: "block",
    borderRadius: 2,
    overflow: "hidden",
    margin: 4,
    padding: 0,
    border: theme => {
      let {
        width = 1,
        type = "solid",
        color
      } = theme.collapse.border;
      return `${width}px ${type} ${color}`;
    },
    "&.hide > div": {
      display: "none"
    },
    "&-label": {
      display: "block",
      padding: 4,
      fontSize: 16,
      userSelect: "none",
      ...tappable(theme => theme.highlightColor)
    },
    "&-icon": {
      display: "inline-block",
      width: 16,
      textAlign: "center"
    }
  }
}, {
  name: "doric-collapse"
});
api.addCSS(collapseCSS);

function Collapse(props) {
  const [hide, toggleVis] = useState(true);
  const {
    className,
    text = "Collapse",
    tabIndex = 1,
    children,
    ...passThrough
  } = props;

  const _classes = classes({
    className,
    hide
  });

  const direction = hide == true ? "right" : "down";
  const icon = React.createElement("doric-collapse-icon", {
    class: `ion-md-arrow-drop${direction}`
  });
  const pass = {
    tabIndex,
    ...passThrough
  };

  const toggle = () => toggleVis(hide === false);

  return React.createElement("doric-collapse", _extends({}, pass, {
    class: _classes
  }), React.createElement("doric-collapse-label", null, icon, " ", text, React.createElement(CustomListeners, {
    onTap: toggle
  })), React.createElement("div", null, children));
}

var Collapse$1 = memo(Collapse);

const range = (start, end = null, step = 1, map = i => i) => {
  	if (typeof end === "function") {
      	map = end;
      	end = null;
    }
    if (typeof step === "function") {
        map = step;
        step = 1;
    }
  	if (end === null) {
      	[start, end] = [0, start];
    }
    const factor = (end < start) ? -step : step;
    return Array.from(
        {length: Math.floor(Math.abs(end - start) / step)},
        (_, i) => map(start + i * factor)
    );
};

var range_1 = range;

const gridSpans = range_1(2, 13).reduce((spans, i) => ({ ...spans,
  [`& [gcolspan="${i}"]`]: {
    gridColumn: `span ${i}`
  }
}), {});
const gridCSS = ssjs({
  "doric-grid": {
    display: "grid",
    gridGap: 2,
    ...gridSpans,
    "&[clearmargin='true'] > *": {
      margin: 0
    }
  }
}, {
  name: "doric-grid"
});
api.addCSS(gridCSS);

function Grid(props) {
  const {
    cols = 12,
    vAlign = "start",
    colGap = 0,
    children,
    className,
    ...passThrough
  } = props;
  const style = { ...passThrough.style,
    gridTemplateColumns: range_1(cols, () => "1fr").join(" "),
    alignItems: vAlign,
    columnGap: colGap
  };
  const _ = { ...passThrough,
    class: className,
    style
  };
  return React.createElement("doric-grid", _, children);
}

const inputCSS = ssjs({
  "doric-input": {
    margin: 2,
    display: "block",
    "& fieldset": {
      borderRadius: 4,
      overflow: "hidden",
      padding: 0,
      paddingRight: 1,
      backgroundColor: theme => theme.input.bg.color,
      border: theme => `1px solid ${theme.input.border.normal}`,
      margin: 0,
      "&.disabled": {
        backgroundColor: theme => theme.input.disabled,
        "& input": {
          backgroundColor: "transparent"
        }
      },
      "&.boring, &.minimal": {
        borderWidth: 0,
        backgroundColor: "transparent"
      },
      "& legend": {
        marginLeft: 16,
        fontSize: 12,
        "&:empty": {
          display: "none"
        },
        "&:not(:empty) + input": {
          paddingTop: 6
        }
      },
      "&.required legend": {
        color: theme => theme.label.text.required
      },
      "&.optional legend": {
        color: theme => theme.label.text.optional
      },
      "&:focus-within": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& input": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: 12,
      borderWidth: 0,
      backgroundColor: "transparent",
      height: 40,
      color: theme => theme.input.text.color
    },
    "& fieldset:not(.boring):not(.minimal) input": {
      outline: "none"
    },
    "& fieldset.boring input": {
      border: theme => `1px solid ${theme.input.border.normal}`,
      padding: "6px 12px",
      borderRadius: 4,
      backgroundColor: theme => theme.input.bg.color,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      },
      "&[disabled]": {
        backgroundColor: theme => theme.input.disabled
      }
    },
    "& fieldset.minimal input": {
      borderWidth: 0,
      borderBottom: theme => `1px solid ${theme.input.border.normal}`,
      padding: "6px 12px",
      borderRadius: 0,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      },
      "&[disabled]": {
        backgroundColor: theme => theme.input.disabled
      }
    }
  }
}, {
  name: "doric-input"
});
api.addCSS(inputCSS);

function Input(props) {
  const {
    label,
    value,
    onChange,
    disabled,
    optional,
    required,
    className,
    boring,
    minimal,
    type = "text",
    forwardedRef,
    wrapProps,
    _,
    ...rest
  } = props;
  const fieldProps = { ...rest,
    className: classes({
      className,
      disabled,
      optional,
      required,
      boring,
      minimal
    })
  };
  const inputRef = useRef();

  if (forwardedRef !== undefined) {
    useImperativeHandle(forwardedRef, () => ({
      focus() {
        inputRef.current.focus();
      },

      get handle() {
        return inputRef.current;
      }

    }));
  }

  return React.createElement("doric-input", wrapProps, React.createElement("fieldset", fieldProps, React.createElement("legend", null, label), React.createElement("input", _extends({
    ref: inputRef,
    type: type,
    disabled: disabled,
    value: value,
    onChange: onChange
  }, _))));
}

const forward = forwardRef((props, ref) => React.createElement(Input, _extends({}, props, {
  forwardedRef: ref
})));
forward.displayName = "Input";
var Input$1 = memo(forward);

let imageCSS = ssjs({
  "doric-image": {
    display: "inline-block",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain",
    position: "relative",
    "& > img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0
    }
  }
}, {
  name: "doric-image"
});
api.addCSS(imageCSS);

function Image(props) {
  const {
    source,
    width,
    height,
    size,
    round,
    ...passThrough
  } = props;
  const border = round == true ? {
    borderRadius: Math.max(width, height)
  } : {};
  const style = { ...passThrough.style,
    backgroundImage: `url('${source}')`,
    backgroundSize: size,
    width,
    height,
    ...border
  };
  return React.createElement("doric-image", _extends({}, passThrough, {
    style: style
  }), React.createElement("img", {
    src: source
  }));
}

const panelCSS = ssjs({
  "doric-panel": {
    display: "flex",
    margin: 4,
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.4)",
    backgroundColor: theme => theme.panel.bg.color,
    overflow: "hidden",
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 4,
    borderWidth: theme => theme.panel.border.width,
    borderStyle: theme => theme.panel.border.style,
    borderColor: theme => theme.panel.border.color,
    "& doric-title": {
      padding: 0,
      margin: 0,
      marginBottom: 4,
      borderWidth: 0,
      boxShadow: "none"
    }
  },
  "doric-panel-actions": {
    position: "relative",
    display: "flex",
    margin: -8,
    marginTop: 0,
    "& > doric-button": {
      padding: 8
    },
    "& > *": {
      flex: "1 1 33.333333%"
    }
  },
  "doric-panel-content": {
    flexGrow: 1,
    padding: 12
  },
  "doric-panel-media": {
    display: "block",
    width: 120
  }
}, {
  name: "doric-panel"
});
api.addCSS(panelCSS);

function Panel({
  children,
  ...passThrough
}) {
  const list = Children.toArray(children);
  const normal = list.filter(child => child.type !== Panel.media);
  const media = list.find(child => child.type === Panel.media);
  return React.createElement("doric-panel", passThrough, React.createElement("doric-panel-content", null, normal), media);
}

Panel.top = function PanelTop(props) {
  return React.createElement("doric-panel-top", props);
};

Panel.actions = function PanelBottom(props) {
  return React.createElement("doric-panel-actions", props);
};

Panel.media = function PanelMedia(props) {
  return React.createElement("doric-panel-media", props);
};

const dividerCSS = ssjs({
  "doric-divider": {
    display: "block",
    margin: "2px 0px",
    borderTopWidth: theme => theme.divider.size,
    borderTopStyle: theme => theme.divider.style,
    borderTopColor: theme => theme.divider.color
  }
}, {
  name: "doric-divider"
});
api.addCSS(dividerCSS);

function Divider({
  children,
  ...props
}) {
  return React.createElement("doric-divider", props);
}

const titleCSS = ssjs({
  "doric-title": {
    display: "block",
    margin: 2,
    padding: "4px 12px",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)",
    border: theme => `1px solid ${theme.title.border.normal}`,
    backgroundColor: theme => theme.title.bg.color,
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
    },
    "& doric-divider": {
      borderTopColor: theme => theme.divider.color,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      marginRight: -12,
      marginLeft: -12
    }
  }
}, {
  name: "doric-title"
});
api.addCSS(titleCSS);

function Title(props) {
  const {
    title,
    subtitle,
    divider,
    image
  } = props;
  const imageElem = image !== undefined ? React.createElement(Image, {
    width: 45,
    height: 45,
    round: true,
    source: image
  }) : null;
  return React.createElement("doric-title", {
    divider: divider
  }, imageElem, React.createElement("div", null, title), React.createElement("span", null, subtitle), divider && React.createElement(Divider, null));
}

const dialogCSS = ssjs({
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
  },
  "dialog-content": {
    display: "block",
    "&[center='true']": {
      textAlign: "center"
    }
  }
}, {
  name: "doric-dialog"
});
api.addCSS(dialogCSS);
const rootElem = document.createElement("dialog-root");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => document.body.appendChild(rootElem));
} else {
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

  const show = (component, dialogInfo) => new Promise(resolve => {
    const dialog = { ...dialogInfo,
      id: Date.now()
    };
    dialogs.set(dialog.id, [dialog, component, resolve]);
    handle(current());
  });

  return {
    current,

    subscribe(handler) {
      handle = handler;
    },

    show,
    close
  };
})();

function DialogList() {
  const [dialogs, updateDialogs] = useState(dialog.current());
  useEffect(() => {
    dialog.subscribe(updateDialogs);
  }, []);
  return dialogs.map(info => {
    var _ref, _window$class;

    const [{
      window = {},
      ...props
    }, Component] = info;

    const close = value => dialog.close(props.id, value);

    const windowProps = { ...window,
      class: (_ref = (_window$class = window.class) === null || _window$class === void 0 ? void 0 : _window$class.join(" ")) !== null && _ref !== void 0 ? _ref : null
    };

    const tapClose = evt => {
      if (evt.target.tagName.toLowerCase() === "dialog-container") {
        close(null);
      }
    };

    return React.createElement("dialog-container", {
      key: props.id
    }, React.createElement(CustomListeners, {
      onTap: tapClose
    }), React.createElement("dialog-window", windowProps, React.createElement(Component, _extends({}, props, {
      close: close
    }))));
  });
}

ReactDOM.render(React.createElement(DialogList, null), rootElem);

const deepMerge = (first, second) => {
  if (Array.isArray(first) === true) {
    if (Array.isArray(second) === true) {
      return [...first, ...second];
    }

    return [...first, second];
  }

  if (typeof first === "object" && typeof second === "object") {
    const merged = {};
    const keys = new Set([...Object.keys(first), ...Object.keys(second)]);

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

    publicAPI[name] = options => dialog.show(component, deepMerge(baseOptions, options));
  }

};

function AlertDialog(props) {
  const {
    message,
    title,
    button,
    close,
    ...rest
  } = props;

  const _close = () => close();

  return React.createElement(Panel, null, React.createElement(Title, {
    title: title
  }), React.createElement("dialog-content", rest, message), React.createElement(Panel.actions, null, React.createElement(Button$1, {
    text: button,
    block: true,
    primary: true,
    flat: true,
    onTap: _close
  })));
}

function ConfirmDialog(props) {
  const {
    okButton,
    cancelButton,
    close,
    title,
    message,
    ...rest
  } = props;

  const confirm = () => close(true);

  const cancel = () => close(false);

  return React.createElement(Panel, null, React.createElement(Title, {
    title: title
  }), React.createElement("dialog-content", rest, message), React.createElement(Panel.actions, null, React.createElement(Button$1, {
    text: cancelButton,
    block: true,
    danger: true,
    flat: true,
    onTap: cancel
  }), React.createElement(Button$1, {
    text: okButton,
    block: true,
    primary: true,
    flat: true,
    onTap: confirm
  })));
}

const useMounts$1 = effect => useEffect(effect, []);

function PromptDialog(props) {
  const {
    okButton,
    cancelButton,
    close,
    ...rest
  } = props;
  const inputRef = useRef();
  const [value, updateValue] = useState(props.value);

  const submit = evt => {
    evt.preventDefault();
    close(value);
  };

  const cancel = () => close(false);

  const update = evt => updateValue(evt.target.value);

  useMounts$1(() => inputRef.current.focus());
  return React.createElement(Panel, null, React.createElement(Title, {
    title: props.title
  }), React.createElement("form", {
    onSubmit: submit
  }, React.createElement(Input$1, {
    type: props.type,
    label: props.label,
    value: value,
    onChange: update,
    ref: inputRef
  })), React.createElement(Panel.actions, null, React.createElement(Button$1, {
    text: props.cancelButton,
    block: true,
    danger: true,
    flat: true,
    onTap: cancel
  }), React.createElement(Button$1, {
    text: props.okButton,
    block: true,
    primary: true,
    flat: true,
    onTap: submit
  })));
}

publicAPI.register("alert", AlertDialog, {
  title: "Alert",
  button: "OK",
  window: {
    class: ["top", "small"]
  }
});
publicAPI.register("confirm", ConfirmDialog, {
  title: "Confirm",
  okButton: "OK",
  cancelButton: "Cancel",
  window: {
    class: ["top", "small"]
  }
});
publicAPI.register("prompt", PromptDialog, {
  title: "Prompt",
  type: "text",
  value: "",
  okButton: "OK",
  cancelButton: "Cancel",
  window: {
    class: ["top", "small"]
  }
});

let labelCSS = ssjs({
  "doric-label": {
    display: "block",
    padding: 2,
    color: theme => theme.label.text.normal,
    fontSize: 12,
    "&.required": {
      color: theme => theme.label.text.required
    },
    "&.optional": {
      color: theme => theme.label.text.optional
    },
    "&:empty": {
      display: "none"
    }
  }
}, {
  name: "doric-label"
});
api.addCSS(labelCSS);

function Label(props) {
  const {
    required,
    optional,
    className,
    text = "Label",
    ...passThrough
  } = props;

  const _class = classes({
    className,
    required,
    optional
  });

  return React.createElement("doric-label", _extends({}, passThrough, {
    class: _class
  }), text);
}

const listCSS = ssjs({
  "doric-list": {
    display: "block",
    margin: 4,
    "& doric-list-item": {
      display: "block",
      padding: 8,
      flexGrow: 1,
      borderRadius: 4,
      overflow: "hidden",
      backgroundColor: theme => theme.list.bg.color,
      ...tappable(theme => theme.highlightColor)
    },
    "& doric-list-header": {
      position: "sticky",
      display: "block",
      top: 0,
      zIndex: "+10",
      padding: 4,
      fontSize: 16,
      border: theme => `1px solid ${theme.list.header.border.color}`,
      backgroundColor: theme => theme.list.header.bg.color,
      "&:empty": {
        display: "none"
      }
    }
  }
}, {
  name: "doric-list"
});
api.addCSS(listCSS);
const DefaultListRenderer = memo(function ListItem({
  item,
  propName
}) {
  return item[propName];
});
const ListItem = memo(function ListItem(props) {
  const {
    index,
    item,
    propName,
    ItemRenderer
  } = props;
  return React.createElement("doric-list-item", {
    "data-index": index
  }, React.createElement(ItemRenderer, {
    item: item,
    propName: propName
  }));
});

function List(props) {
  const {
    items,
    title,
    propName = "label",
    onItemTap,
    onItemHold,
    itemRender: ItemRenderer = DefaultListRenderer,
    layout: Layout = "div",
    ...passThrough
  } = props;

  const onTap = evt => {
    let index = parseInt(evt.target.dataset.index);
    evt.item = items[index];
    onItemTap === null || onItemTap === void 0 ? void 0 : onItemTap(evt);
  };

  const onHold = evt => {
    let index = parseInt(evt.target.dataset.index);

    if (isNaN(index) === true) {
      return;
    }

    evt.item = items[index];
    onItemHold === null || onItemHold === void 0 ? void 0 : onItemHold(evt);
  };

  return React.createElement("doric-list", passThrough, React.createElement("doric-list-header", null, title), React.createElement("doric-list-content", null, React.createElement(CustomListeners, {
    onTap: onTap,
    onHold: onHold
  }), React.createElement(Layout, null, items.map((item, index) => React.createElement(ListItem, _extends({
    key: index
  }, {
    item,
    propName,
    index,
    ItemRenderer
  }))))));
}

var List$1 = memo(List);

const navbarCSS = ssjs({
  "doric-navbar": {
    position: "sticky",
    backgroundColor: theme => theme.navbar.bg.color,
    color: theme => theme.navbar.text.color,
    paddingTop: 8,
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    display: "block",
    zIndex: "+100",
    textAlign: "center",
    fontSize: 20,
    boxShadow: "0px 2px 3px 1px rgba(0, 0, 0, 0.35)",
    borderWidth: theme => theme.navbar.border.width,
    borderStyle: theme => theme.navbar.border.style,
    borderColor: theme => theme.navbar.border.color
  }
}, {
  name: "doric-navbar"
});
api.addCSS(navbarCSS);

function Navbar(props) {
  const {
    title
  } = props;
  return React.createElement("doric-navbar", null, title);
}

var Navbar$1 = memo(Navbar);

const radioCSS = ssjs({
  "doric-radio": {
    display: "block",
    margin: 4,
    "& doric-radio-item": {
      display: "block",
      flexGrow: 1,
      borderRadius: 4,
      overflow: "hidden",
      ...tappable(theme => theme.highlightColor)
    }
  }
}, {
  name: "doric-radio"
});
api.addCSS(radioCSS);
const DefaultRadioRenderer = memo(function RadioItem({
  item,
  propName,
  selected
}) {
  const icon = React.createElement("ion-icon", {
    class: `ion-md-radio-button-${selected === true ? "on" : "off"}`
  });
  return React.createElement("div", {
    style: {
      padding: 8
    }
  }, icon, "\xA0", item[propName]);
});
const RadioItem = memo(function RadioItem(props) {
  const {
    index,
    item,
    propName,
    ItemRenderer,
    selected
  } = props;
  return React.createElement("doric-radio-item", {
    "data-index": index
  }, React.createElement(ItemRenderer, {
    item: item,
    propName: propName,
    selected: selected
  }));
});

function Radio(props) {
  const {
    options,
    value,
    propName = "label",
    onChange,
    itemRender: ItemRenderer = DefaultRadioRenderer,
    layout: Layout = "div",
    ...passThrough
  } = props;

  const onTap = evt => {
    let index = parseInt(evt.target.dataset.index);

    if (isNaN(index) === true) {
      return;
    }

    evt.option = options[index];
    evt.value = evt.option.value;
    onChange === null || onChange === void 0 ? void 0 : onChange(evt);
  };

  const selectedIndex = options.findIndex(item => item.value === value);
  return React.createElement("doric-radio", passThrough, React.createElement(CustomListeners, {
    onTap: onTap
  }), React.createElement(Layout, null, options.map((item, index) => React.createElement(RadioItem, _extends({
    key: index
  }, {
    item,
    propName,
    index,
    ItemRenderer
  }, {
    selected: selectedIndex === index
  })))));
}

var Radio$1 = memo(Radio);

let selectCSS = ssjs({
  "doric-select": {
    margin: 2,
    display: "block",
    "& fieldset": {
      borderRadius: 4,
      overflow: "hidden",
      padding: 0,
      paddingRight: 1,
      backgroundColor: theme => theme.select.bg.color,
      color: theme => theme.select.text.color,
      border: theme => `1px solid ${theme.select.border.color}`,
      margin: 0,
      "&.boring": {
        borderWidth: 0,
        backgroundColor: "transparent"
      },
      "& legend": {
        marginLeft: 16,
        fontSize: 12,
        "&:empty": {
          display: "none"
        },
        "&:not(:empty) + input": {
          paddingTop: 6
        }
      },
      "&.required legend": {
        color: theme => theme.input.label.required
      },
      "&.optional legend": {
        color: theme => theme.input.label.optional
      },
      "&:focus-within": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "&.disabled select": {
      color: theme => theme.select.disabled
    },
    "& select": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: "0px 12px",
      borderWidth: 0,
      margin: 0,
      backgroundColor: theme => theme.select.bg.color,
      color: theme => theme.select.text.color,
      height: 40,
      "&:focus": {
        outline: "none"
      },
      "&[disabled]": {
        backgroundColor: "transparent",
        color: theme => theme.select.disabled
      }
    },
    "& fieldset.boring select": {
      border: theme => `1px solid ${theme.select.border.color}`,
      borderRadius: 4,
      backgroundColor: theme => theme.select.bg.color,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    }
  }
}, {
  name: "doric-select"
});
api.addCSS(selectCSS);

function Select(props) {
  const {
    options = [],
    value,
    placeholder,
    label,
    className,
    required,
    optional,
    disabled,
    boring,
    onChange,
    wrapProps,
    ...passThrough
  } = props;
  let realValue = "-1";
  const {
    lookup,
    mapped
  } = options.reduce(({
    lookup,
    mapped
  }, item, index) => {
    const key = index.toString();

    if (Array.isArray(item) === false) {
      lookup[key] = item.value;
      mapped.push(React.createElement("option", {
        key: key,
        value: key
      }, item.label));

      if (item.value === value) {
        realValue = key;
      }
    } else {
      mapped.push(React.createElement("optgroup", {
        label: item[0],
        key: index
      }, item.slice(1).map((_item, _index) => {
        const _key = `${key}:${_index}`;
        lookup[_key] = _item.value;

        if (_item.value === value) {
          realValue = _key;
        }

        return React.createElement("option", {
          key: _key,
          value: _key
        }, _item.label);
      })));
    }

    return {
      lookup,
      mapped
    };
  }, {
    lookup: {},
    mapped: placeholder !== undefined ? [React.createElement("option", {
      key: "-1",
      hidden: true,
      value: "-1"
    }, placeholder)] : []
  });
  const labelProps = {
    className: classes({
      className,
      required,
      optional,
      disabled,
      boring
    }),
    ...passThrough
  };
  const selectProps = {
    value: realValue,
    onChange: evt => {
      evt.value = lookup[evt.target.value];
      onChange === null || onChange === void 0 ? void 0 : onChange(evt);
    },
    disabled
  };
  return React.createElement("doric-select", wrapProps, React.createElement("fieldset", labelProps, React.createElement("legend", null, label), React.createElement("select", selectProps, mapped)));
}

var Select$1 = memo(Select);

const climbDOM$2 = (start, func) => {
  let current = start;

  while (current !== null && current !== document.documentElement) {
    func(current);
    current = current.parentNode;
  }
};

const globalListeners$1 = {};

const registerGlobalListener$1 = (type, elem, handler) => {
  if (globalListeners$1[type] === undefined) {
    globalListeners$1[type] = new Map();
    window.addEventListener(type, evt => {
      const handlers = globalListeners$1[type];
      climbDOM$2(evt.target, node => {
        var _handlers$get;

        return (_handlers$get = handlers.get(node)) === null || _handlers$get === void 0 ? void 0 : _handlers$get(evt);
      });
    });
  }

  globalListeners$1[type].set(elem, handler);
};

const removeGlobalListener$1 = (name, elem) => {
  const type = name.slice(2).toLowerCase();
  globalListeners$1[type].delete(elem);
};

const useMounts$2 = effect => useEffect(effect, []);

function CustomListeners$1(props) {
  const element = useRef(null);
  const pRef = useRef(props);
  pRef.current = props;
  useMounts$2(() => {
    const types = Object.keys(props);

    for (const name of types) {
      const type = name.slice(2).toLowerCase();
      registerGlobalListener$1(type, element.current.parentNode, evt => {
        var _pRef$current$name, _pRef$current;

        return (_pRef$current$name = (_pRef$current = pRef.current)[name]) === null || _pRef$current$name === void 0 ? void 0 : _pRef$current$name.call(_pRef$current, evt);
      });
    }

    return () => {
      for (const name of types) {
        removeGlobalListener$1(name, element.current.parentNode);
      }
    };
  });
  return React.createElement("doric-custom-listeners", {
    ref: element
  });
}

const tabCSS = ssjs({
  "doric-tabs": {
    display: "flex",
    flexDirection: "column",
    "&.horizontal": {
      flexDirection: "row",
      "& doric-tab-bar": {
        flexDirection: "column",
        "& doric-tab-label": {
          flexGrow: "unset"
        }
      }
    },
    "& doric-tab-bar": {
      display: "flex",
      userSelect: "none",
      "& doric-tab-label": {
        flexGrow: 1,
        minWidth: "20%",
        display: "inline-block",
        padding: "8px 0px",
        textAlign: "center",
        borderBottom: "2px solid transparent",
        fontSize: 14,
        ...tappable(theme => theme.highlightColor),
        "&[active='true']": {
          color: theme => theme.tabs.selected.text,
          borderBottomColor: theme => theme.tabs.selected.border
        }
      }
    },
    "& doric-tab": {
      display: "block",
      flexGrow: 1
    }
  },
  "doric-tab[selected='false']": {
    display: "none"
  }
}, {
  name: "doric-tabs"
});
api.addCSS(tabCSS);

function Tabs(props) {
  const {
    selectedTab = 0,
    cols = 4,
    onTabChange,
    liveHidden = false,
    className = null,
    horizontal = false,
    tabBarWidth = null,
    children: _children,
    ...passThrough
  } = props;
  const children = Children.toArray(_children);
  const tabLabelList = children.map(child => child.props.label);
  const tabs = children.map((child, index) => React.createElement("doric-tab", {
    selected: index === selectedTab,
    key: index
  }, child.props.children));
  const displayed = liveHidden == true ? tabs : tabs[selectedTab];

  const tabChange = evt => {
    let newTab = parseInt(evt.target.dataset.index);
    evt.selectedTab = newTab;
    onTabChange === null || onTabChange === void 0 ? void 0 : onTabChange(evt);
  };

  const tabLabels = tabLabelList.map((label, index) => React.createElement("doric-tab-label", {
    key: index,
    "data-index": index,
    active: index == selectedTab
  }, label));
  const classNames = classes({
    className,
    horizontal
  });
  return React.createElement("doric-tabs", _extends({}, passThrough, {
    class: classNames
  }), React.createElement("doric-tab-bar", {
    style: {
      width: tabBarWidth
    }
  }, React.createElement(CustomListeners$1, {
    onTap: tabChange
  }), tabLabels), displayed);
}

function Tab(props) {
  return props;
}

const textareaCSS = ssjs({
  "doric-input": {
    "& textarea": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: 6,
      borderWidth: 0,
      backgroundColor: "transparent",
      color: theme => theme.input.text.color
    },
    "& fieldset.boring textarea": {
      border: theme => `1px solid ${theme.input.border.normal}`,
      borderRadius: 4,
      backgroundColor: theme => theme.input.bg.color,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& fieldset.minimal textarea": {
      borderWidth: 0,
      borderRadius: 0,
      borderBottom: theme => `1px solid ${theme.input.border.normal}`,
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    } // "& fieldset.disabled:not(.boring):not(.minimal)": {
    //     backgroundColor: "lightgray"
    // },
    // "& fieldset.disabled textarea": {
    //     backgroundColor: "lightgray"
    // }

  }
}, {
  name: "doric-textarea"
});
api.addCSS(textareaCSS);

function Textarea(props) {
  let {
    label,
    value,
    onChange,
    height = 80,
    disabled,
    optional,
    required,
    className,
    boring,
    minimal,
    wrapProps,
    ...rest
  } = props;
  const fieldProps = { ...rest,
    className: classes({
      className,
      disabled,
      optional,
      required,
      boring,
      minimal
    })
  };
  const taStyle = {
    height
  };
  const taRef = useRef();
  useImperativeHandle(taRef, () => ({
    focus() {
      inputRef.current.focus();
    },

    get handle() {
      return inputRef.current;
    }

  }));
  return React.createElement("doric-input", wrapProps, React.createElement("fieldset", fieldProps, React.createElement("legend", null, label), React.createElement("textarea", {
    ref: taRef,
    disabled: disabled,
    value: value,
    onChange: onChange,
    style: taStyle
  })));
}

const forward$1 = forwardRef((props, ref) => React.createElement(Textarea, _extends({}, props, {
  forwardedRef: ref
})));
forward$1.displayName = "Textarea";
var Textarea$1 = memo(forward$1);

var _window$doricTheme;
let mainCSS = ssjs({
  "*": {
    boxSizing: "border-box",
    WebkitTapHighlightColor: "transparent",
    "&:focus": {
      outline: "none"
    }
  },
  "html body": {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    fontFamily: theme => theme.fontFamily,
    backgroundColor: theme => theme.body.bg.color,
    color: theme => theme.body.text.color
  },
  "div.center": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  "div.fill": {
    width: "100%",
    height: "100%"
  }
}, {
  name: "main-style"
});
api.addCSS(mainCSS);
api.generateCSS((_window$doricTheme = window.doricTheme) !== null && _window$doricTheme !== void 0 ? _window$doricTheme : {});
const {
  generateCSS
} = api;
const tronBlue = "#6fc0ba";
const tronText = "#00cfda";
const tronTheme = {
  "fontFamily": "Inconsolata, monospace",
  "focusOutline": "2px solid #6fc0ba",
  "highlightColor": ssjs.color(255, 255, 255, 0.4),
  "color.primary": "#00aaad",
  "body.bg.color": "black",
  "body.text.color": "white",
  "divider.color": tronBlue,
  "input.bg.color": "black",
  "input.border.normal": "white",
  "input.border.focus": tronBlue,
  "input.disabled": "#111",
  "input.text.color": "white",
  "navbar.bg.color": "black",
  "navbar.border.width": "0px 0px 1px 0px",
  "navbar.border.style": "solid",
  "navbar.border.color": tronBlue,
  "navbar.text.color": tronText,
  "panel.bg.color": "black",
  "panel.border.width": 2,
  "panel.border.style": "solid",
  "panel.border.color": tronBlue,
  "select.bg.color": "black",
  "select.border.color": "white",
  "select.text.color": "white",
  "tabs.selected.text": tronText,
  "tabs.selected.border": tronBlue,
  "title.bg.color": "black"
};
var main = {
  Button: Button$1,
  Checkbox: Checkbox$1,
  Collapse: Collapse$1,
  CustomListeners,
  Dialog: publicAPI,
  Grid,
  Image,
  Input: Input$1,
  Label,
  List: List$1,
  Navbar: Navbar$1,
  Panel,
  Radio: Radio$1,
  Select: Select$1,
  Tab,
  Tabs,
  Textarea: Textarea$1,
  Title,
  generateCSS,
  tronTheme,

  get theme() {
    return { ...baseTheme
    };
  }

};

export default main;
