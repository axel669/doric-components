var doric = (function (React) {
    'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

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

    function Button(props) {
      const {
        text,
        ...rest
      } = props;
      return React.createElement("div", null, text);
    }
    var button = React.memo(Button);

    let mainCSS = ss({
      "*": {
        boxSizing: "border-box",
        WebkitTapHighlightColor: "transparent",
        "&:focus": {
          outline: "none"
        }
      },
      "@media screen and (min-width: 640px)": {
        "*:focus": {// outline: (theme) => theme.focusOutline
        }
      },
      "html body": {
        padding: 0,
        margin: 0,
        width: "100%",
        height: "100%",
        fontFamily: "Roboto" // backgroundColor: theme.bg

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
    mainCSS.generate();
    var main = {
      button
    };

    return main;

}(React));
