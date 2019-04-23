'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);

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

const query = {
  mobile: screen.availWidth <= 640
};

const Color = (...args) => {
  const [r, g, b, a = 1] = (() => {
    if (typeof args[0] === "string") {
      const color = args[0].startsWith("#") ? args[0].slice(1) : args[0];
      const alpha = color.length > 6 ? color.slice(6, 8) : "FF";
      return [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16), parseInt(alpha, 16) / 255];
    }

    return args;
  })();

  const color = () => {

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  color.inverse = () => Color(255 - r, 255 - g, 255 - b, a);

  color.opacity = alpha => Color(r, g, b, alpha);

  color.toString = color;
  return color;
};

const tapActive = ".gjs-tap-active:not(.disabled):not(.flat)::after";

const bcolorVariant = color => ({
  [`&.${color}`]: {
    backgroundColor: theme => theme.color[color],
    color: "white",
    [`&.flat`]: {
      backgroundColor: "transparent",
      color: theme => theme.color[color]
    },
    [`&${tapActive}`]: {
      backgroundColor: theme => theme.highlightColor.inverse()
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

  if (query.mobile === false) {
    style["&:hover"] = {
      boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
    };
  }

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

const blue = Color("#1d62d5");
const lightblue = Color("#2196F3");
const theme = {
  highlightColor: Color(0, 0, 0, 0.4),
  outline: blue,
  focusOutline: `2px solid ${blue.opacity(0.5)}`,
  color: {
    primary: blue,
    secondary: Color("#128f12"),
    danger: Color("#F44336"),
    accent: Color("#FF4081")
  },
  bg: {
    color: Color("#F0F0F0")
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
  },
  input: {
    border: {
      focus: blue
    },
    label: {
      required: Color(255, 0, 0),
      optional: blue
    }
  },
  tabs: {
    selected: lightblue
  }
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

const removeGlobalListener = (type, elem) => globalListeners[type].delete(elem);

const useMounts = effect => React$1.useEffect(effect, []);

function CustomListeners(props) {
  const element = React$1.useRef(null);
  const pRef = React$1.useRef(props);
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

const buttonSheet = ss({
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
    "&:hover": {
      cursor: "pointer"
    },
    ...tappable(theme.highlightColor),
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
buttonSheet.generate(theme);

function Button(props) {
  const {
    text,
    onTap,
    children,
    tabIndex = 1,
    style = {},
    icon = null,
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
    class: icon
  });
  const wrapProps = { ..._,
    tabIndex,
    style,
    class: classes(rest)
  };
  return React.createElement("doric-button", wrapProps, React.createElement(CustomListeners, {
    onTap: onTap
  }), iconElem, text, children);
}
var button = React$1.memo(Button);

const checkboxCSS = ss({
  "doric-checkbox": {
    display: "block",
    margin: 2,
    padding: 8,
    borderRadius: 4,
    overflow: "hidden",
    userSelect: "none",
    cursor: "pointer",
    margin: 2,
    ...tappable(Color(0, 0, 0, 0.4)),
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
checkboxCSS.generate(theme);

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

  return React$1__default.createElement("doric-checkbox", wrapProps, React$1__default.createElement("doric-checkbox-icon", {
    class: iconClass
  }), text, children, React$1__default.createElement(CustomListeners, {
    onTap: toggle
  }));
}

var checkbox = React$1__default.memo(Checkbox);

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

let collapseCSS = ss({
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
      ...tappable(Color(0, 0, 0, 0.4))
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
collapseCSS.generate(theme);

function Collapse(props) {
  const [hide, toggleVis] = React$1.useState(true);
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

var collapse = React$1.memo(Collapse); // class Collapse extends React.Component {
//     constructor(props) => {
//         super(props)
//
//         @state = {
//             hide: true
//         }
//         @toggle = () => {
//             let hide = !@state.hide
//             @setState({hide})
//         }
//     }
//
//     render() => {
//         let {
//             className, label = "Collapse", tabIndex = 1
//             children
//             ...passThrough
//         } = @props
//         let {hide} = @state
//         let _classes = classes({className, hide})
//
//         let direction = (hide == true) ? "right" : "down"
//         let icon = <doric-collapse-icon class=`ion-md-arrow-drop${direction}` />
//
//         let props = {
//             tabIndex
//             ...passThrough
//         }
//
//         return <doric-collapse {...props} class=_classes>
//             <doric-collapse-label>
//                 {icon} {label}
//                 <CustomListeners onTap=@toggle />
//             </doric-collapse-label>
//             <div>{children}</div>
//         </doric-collapse>
//     }
// }
//
// export default Collapse

// import {Component} from "react"

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

  const factor = end < start ? -step : step;
  return Array.from({
    length: Math.floor(Math.abs(end - start) / step)
  }, (_, i) => map(start + i * factor));
};

const gridSpans = range(12).reduce((spans, i) => ({ ...spans,
  [`& [gcolspan="${i}"]`]: {
    gridColumn: `span ${i}`
  }
}), {});
const gridCSS = ss({
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
gridCSS.generate(theme);

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
    // gridTemplateColumns: [0...cols: () => "1fr"].join(" "),
    gridTemplateColumns: range(cols, () => "1fr").join(" "),
    alignItems: vAlign,
    columnGap: colGap
  };
  const _ = { ...passThrough,
    class: className,
    style
  };
  return React.createElement("doric-grid", _, children);
}
//     render() => {
//         let {
//             cols = 12, vAlign = "start", colGap = 0
//             children, className
//             ...passThrough
//         } = @props
//
//         let style = {
//             ...passThrough.style
//             gridTemplateColumns: [0...cols: () => "1fr"].join(" ")
//             alignItems: vAlign
//             columnGap: colGap
//         }
//
//         let props = {
//             ...passThrough
//             class: className
//             style
//         }
//
//         return <doric-grid {...props}>
//             {children}
//         </doric-grid>
//     }
// }
//
// export default Grid

let mainCSS = ss({
  "*": {
    boxSizing: "border-box",
    WebkitTapHighlightColor: "transparent",
    "&:focus": {
      outline: "none"
    }
  },
  ...(query.mobile === false ? {
    "*:focus": {
      outline: theme.focusOutline
    }
  } : {
    "*:focus": {
      boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
    }
  }),
  "html body": {
    padding: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    backgroundColor: theme.bg
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
mainCSS.generate(theme);
var main = {
  button,
  checkbox,
  collapse,
  customListeners: CustomListeners,
  grid: Grid
};

module.exports = main;
