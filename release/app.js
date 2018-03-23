/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _theme = __webpack_require__(1);

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    "html, body": {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        backgroundColor: _theme2.default.body.bg,
        fontFamily: "Roboto"
    },
    "*": {
        boxSizing: 'border-box'
    }
};

Object.defineProperty(style, 'add', {
    enumerable: false,
    value: function value(styles) {
        Object.keys(styles).forEach(function (selector) {
            style[selector] = styles[selector];
        });
    }
});

exports.default = style;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _typeof = new Function('obj', 'return typeof obj');
var deepMerge = function deepMerge(a, b) {
    var t1 = _typeof(a);
    var t2 = _typeof(b);
    var a1 = Array.isArray(a);
    var a2 = Array.isArray(b);

    if (t1 === 'boolean' || t1 === 'function' || t1 === 'number' || t1 === 'string') {
        if (t2 === 'object') {
            if (a2 === true) {
                return [].concat(b);
            }
            return deepMerge({}, b);
        }
        if (b === undefined) {
            return a;
        }
        return b;
    }

    if (a1 === true) {
        if (a2 === true) {
            return a.concat(b);
        }
        return a.concat([b]);
    }

    if (b === undefined) {
        b = {};
    }
    var obj = {};
    var keys = new Set(Object.keys(a).concat(Object.keys(b)));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            switch (true) {
                case a[key] === undefined && b[key] !== undefined:
                    obj[key] = deepMerge(b[key]);
                    break;
                case a[key] !== undefined && b[key] === undefined:
                    obj[key] = deepMerge(a[key]);
                    break;

                default:
                    obj[key] = deepMerge(a[key], b[key]);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return obj;
};

var theme = deepMerge({
    body: {
        bg: '#f0f0f0'
    },
    button: {
        bg: 'transparent',
        hl: 'rgba(0, 0, 0, 0.4)',
        text: {
            normal: 'black',
            disabled: '#acacac'
        }
    }
}, window.DoricTheme);

exports.default = theme;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _context;

__webpack_require__(3);

var _ssjs = __webpack_require__(4);

var _ssjs2 = _interopRequireDefault(_ssjs);

var _button = __webpack_require__(5);

var _button2 = _interopRequireDefault(_button);

var _image = __webpack_require__(7);

var _image2 = _interopRequireDefault(_image);

var _style = __webpack_require__(0);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import loaderGIF from './images/double-ring.gif';

var doric = {
    button: _button2.default,
    image: _image2.default
};

window.cblog = (_context = console, console.log).bind(_context);
window.cberr = (_context = console, console.error).bind(_context);

var sheet = _ssjs2.default.create();
sheet.addStyles(_style2.default);

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main(props) {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { overflow: 'hidden' } },
                React.createElement(
                    doric.button,
                    { block: true, onTap: function onTap() {
                            return console.log("BOXXY");
                        } },
                    React.createElement(doric.image, { source: 'http://axel669.net/images/boxxy.png', height: 150 })
                ),
                React.createElement(doric.button, { block: true, style: { height: 70 }, content: 'Text' }),
                React.createElement(doric.image, { source: 'http://axel669.net/images/boxxy.png', height: 150 })
            );
        }
    }]);

    return Main;
}(React.Component);

sheet.attach();
ReactDOM.render(React.createElement(Main, null), document.querySelector("div"));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var isMobile = typeof orientation !== 'undefined' || navigator.userAgent.indexOf("Mobile") !== -1;
    var forEach = Array.prototype.forEach;
    var toArray = function toArray(obj) {
        var arr = [];
        var len = obj.length;

        for (var index = 0; index < len; index += 1) {
            arr.push(obj[index]);
        }

        return arr;
    };

    var handlers = {};
    var handlerKeys = [];

    var addHandler = function addHandler(name, handler) {
        if (typeof handler === 'function') {
            handler = handler();
        }
        handlers[name] = handler;
        handlerKeys = Object.keys(handlers);
    };
    var createEvent = function createEvent(type) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var evt = new CustomEvent(type, { bubbles: true, cancelable: true });

        Object.keys(props).forEach(function (key) {
            return evt[key] = props[key];
        });

        return evt;
    };
    var copyTouchEvent = function copyTouchEvent(touch) {
        return {
            pageX: touch.pageX,
            pageY: touch.pageY,
            screenX: touch.screenX,
            screenY: touch.screenY,
            clientX: touch.clientX,
            clientY: touch.clientY
        };
    };
    var delay = function delay(func) {
        return setTimeout(func, 0);
    };

    var polarVector = function polarVector(x1, y1, x2, y2) {
        var x = x2 - x1;
        var y = y2 - y1;
        var angle = void 0;
        var magnitude = void 0;

        angle = Math.atan2(y, x);
        angle *= 180 / Math.PI;
        angle = (angle + 270) % 360;

        magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

        return {
            angle: angle,
            magnitude: magnitude
        };
    };
    var vars = {};
    window.addEventListener('touchstart', function (evt) {
        var touches = toArray(evt.changedTouches);
        touches.forEach(function (touch) {
            touch.timestamp = evt.timeStamp;
            vars[touch.identifier] = {
                start: touch
            };
            touch.vars = vars[touch.identifier];
            touch.path = evt.path;
        });
        handlerKeys.forEach(function (name) {
            return handlers[name].start(touches, evt);
        });
    }, false);
    window.addEventListener('touchmove', function (evt) {
        var touches = toArray(evt.changedTouches);
        touches.forEach(function (touch) {
            touch.timestamp = evt.timeStamp;
            var _vars = vars[touch.identifier];
            _vars.vector = polarVector(touch.clientX, touch.clientY, _vars.start.clientX, _vars.start.clientY);
            touch.vars = _vars;
            touch.path = evt.path;
        });
        handlerKeys.forEach(function (name) {
            return handlers[name].move(touches, evt);
        });
    }, false);
    window.addEventListener('touchend', function (evt) {
        var touches = toArray(evt.changedTouches);
        touches.forEach(function (touch) {
            touch.timestamp = evt.timeStamp;
            var _vars = vars[touch.identifier];
            _vars.vector = polarVector(touch.clientX, touch.clientY, _vars.start.clientX, _vars.start.clientY);
            touch.vars = _vars;
            touch.path = evt.path;
        });
        handlerKeys.forEach(function (name) {
            return handlers[name].end(touches, evt);
        });
    }, false);

    if (isMobile === false) {
        var genSynthTouch = function genSynthTouch(evt) {
            return {
                identifier: -10,
                target: currentTarget,
                sourceElement: currentTarget,
                pageX: evt.pageX,
                pageY: evt.pageY,
                screenX: evt.screenX,
                screenY: evt.screenY,
                clientX: evt.clientX,
                clientY: evt.clientY
            };
        };
        var genTouchList = function genTouchList(evt) {
            return {
                0: genSynthTouch(evt),
                length: 1
            };
        };

        var currentTarget = null;
        var mouseIsDown = false;

        var dispatchSyntheticEvent = function dispatchSyntheticEvent(evt, type) {
            var touchList = genTouchList(evt);
            evt.target.dispatchEvent(createEvent(type, {
                changedTouches: touchList,
                touches: touchList,
                syntheticEvent: true
            }));
        };
        window.addEventListener('mousedown', function (evt) {
            if (evt.button !== 0) {
                return;
            }
            mouseIsDown = true;
            currentTarget = evt.target;
            dispatchSyntheticEvent(evt, 'touchstart');
        }, true);
        window.addEventListener('mousemove', function (evt) {
            if (mouseIsDown === false) {
                return;
            }
            dispatchSyntheticEvent(evt, 'touchmove');
        }, true);
        window.addEventListener('mouseup', function (evt) {
            if (evt.button !== 0 || mouseIsDown === false) {
                return;
            }
            mouseIsDown = false;
            dispatchSyntheticEvent(evt, 'touchend');
            currentTarget = null;
        }, true);
    }

    addHandler('tap', function () {
        var pathAdd = function pathAdd(path) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    if (elem === document.body) {
                        break;
                    }
                    elem.setAttribute("data-touch-active", '');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
        var pathRemove = function pathRemove(path) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = path[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var elem = _step2.value;

                    if (elem === document.body) {
                        break;
                    }
                    elem.removeAttribute("data-touch-active");
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        };
        return {
            start: function start(touches) {
                touches.forEach(function (touch) {
                    touch.vars.tapValid = true;
                    touch.vars.tapManage = touch.target.hasAttribute('data-touch-active') === false;
                    if (touch.vars.tapManage === true) {
                        pathAdd(touch.path);
                    }
                });
            },
            move: function move(touches) {
                touches.forEach(function (touch) {
                    if (touch.vars.vector.magnitude > 20) {
                        touch.vars.tapValid = false;
                        if (touch.vars.tapManage === true) {
                            pathRemove(touch.path);
                            touch.vars.tapManage = false;
                        }
                    }
                });
            },
            end: function end(touches, evt) {
                touches.forEach(function (touch) {
                    if (touch.vars.tapManage === true) {
                        pathRemove(touch.path);
                    }
                    if (touch.vars.vector.magnitude > 20) {
                        return;
                    }
                    if (touch.timestamp - touch.vars.start.timestamp > 600) {
                        return;
                    }
                    var synthEvent = createEvent('tap', copyTouchEvent(touch));
                    evt.preventDefault();
                    delay(function () {
                        if (touch.target.dispatchEvent(synthEvent) === true) {
                            touch.target.focus();
                        }
                    });
                });
            }
        };
    });
    addHandler('hold', function () {
        var timeouts = {};
        var schedule = function schedule(touch) {
            return setTimeout(function () {
                timeouts[touch.identifier] = null;
                touch.target.dispatchEvent(createEvent('hold', copyTouchEvent(touch)));
            }, 1500);
        };
        var clear = function clear(touch) {
            if (timeouts[touch.identifier] !== null) {
                clearTimeout(timeouts[touch.identifier]);
                timeouts[touch.identifier] = null;
            }
        };

        return {
            start: function start(touches) {
                touches.forEach(function (touch) {
                    timeouts[touch.identifier] = schedule(touch);
                });
            },
            move: function move(touches) {
                touches.forEach(function (touch) {
                    if (touch.vars.vector.magnitude > 20) {
                        clear(touch);
                    }
                });
            },
            end: function end(touches) {
                touches.forEach(clear);
            }
        };
    });
    addHandler('swipe', function () {
        var angleDif = function angleDif(firstAngle, secondAngle) {
            var absDif = Math.abs(firstAngle - secondAngle) % 360;
            if (absDif > 180) {
                return 360 - absDif;
            }
            return absDif;
        };
        var clampAngles = function clampAngles(vars) {
            var angle = vars.vector.angle;
            vars.swipeMin = Math.min(angle, vars.swipeMin);
            vars.swipeMax = Math.max(angle, vars.swipeMax);
        };
        return {
            start: function start(touches) {
                touches.forEach(function (touch) {
                    touch.vars.swipeMin = Number.POSITIVE_INFINITY;
                    touch.vars.swipeMax = Number.NEGATIVE_INFINITY;
                });
            },
            move: function move(touches) {
                touches.forEach(function (touch) {
                    clampAngles(touch.vars);
                });
            },
            end: function end(touches) {
                touches.forEach(function (touch) {
                    clampAngles(touch.vars);
                    var range = angleDif(touch.vars.swipeMin, touch.vars.swipeMax);
                    if (range < 26) {
                        delay(function () {
                            var evt = createEvent('swipe', copyTouchEvent(touch));
                            evt.angle = touch.vars.vector.angle;
                            evt.distance = touch.vars.vector.magnitude;
                            evt.speed = evt.distance / ((touch.timestamp - touch.vars.start.timestamp) / 1000);
                            touch.target.dispatchEvent(evt);
                        });
                    }
                });
            }
        };
    });

    var lib = {
        addHandler: addHandler,
        createEvent: createEvent,
        copyTouchEvent: copyTouchEvent
    };

    if (true) {
        module.exports = lib;
    } else {
        window.gesturesJS = lib;
    }
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var cssNoMeasurement = new Set(["animationIterationCount", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "fillOpacity", "flex", "flexGrow", "flexPositive", "flexShrink", "flexNegative", "flexOrder", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "stopOpacity", "strokeDashoffset", "strokeOpacity", "strokeWidth", "tabSize", "widows", "zIndex", "zoom"]);
    var cssPrefixNames = new Set(['userSelect']);
    var cssPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
    var cssValueString = function cssValueString(key, value) {
        if (_typeof(value) === 'function') {
            value = value();
        }
        if (_typeof(value) === 'number' && cssNoMeasurement.has(key) === false) {
            value = value + "px";
        }
        return value;
    };

    var _typeof = new Function('obj', 'return typeof obj');
    var arrayify = function arrayify(obj) {
        return Object.keys(obj).map(function (key) {
            var value = obj[key];

            if (_typeof(value) === 'object' && Array.isArray(value) == false) {
                value = arrayify(value, false);
                return { key: key, value: value };
            }

            return { name: key, value: value };
        });
    };
    var renderTextIndented = function renderTextIndented(item) {
        var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var tabs = '  '.repeat(indent);
        var lines = [];

        var key = item.key;
        var name = item.name;
        var value = item.value;

        if (key !== undefined) {
            lines.push("" + tabs + key + " {");
            value.forEach(function (val) {
                return lines = lines.concat(renderTextIndented(val, indent + 1));
            });
            lines.push(tabs + "}");
        } else {
            var displayName = name.replace(/[A-Z]/g, function (s) {
                return "-" + s.toLowerCase();
            });
            if (Array.isArray(value) === true) {
                value.forEach(function (val) {
                    return lines.push("" + tabs + displayName + ": " + cssValueString(name, val) + ";");
                });
            } else {
                var cssVal = cssValueString(name, value);
                if (cssPrefixNames.has(name) === true) {
                    cssPrefixes.forEach(function (prefix) {
                        return lines.push("" + tabs + prefix + displayName + ": " + cssVal + ";");
                    });
                } else {
                    lines.push("" + tabs + displayName + ": " + cssVal + ";");
                }
            }
        }

        return lines.join('\n');
    };
    var renderText = function renderText(item) {
        var lines = [];

        var key = item.key;
        var name = item.name;
        var value = item.value;

        if (key !== undefined) {
            lines.push(key + "{");
            value.forEach(function (val) {
                return lines = lines.concat(renderText(val));
            });
            lines.push("}");
        } else {
            var displayName = name.replace(/[A-Z]/g, function (s) {
                return "-" + s.toLowerCase();
            });
            if (Array.isArray(value) === true) {
                value.forEach(function (val) {
                    return lines.push(displayName + ":" + cssValueString(name, val) + ";");
                });
            } else {
                var cssVal = cssValueString(name, value);
                if (cssPrefixNames.has(name) === true) {
                    cssPrefixes.forEach(function (prefix) {
                        return lines.push("" + prefix + displayName + ": " + cssVal + ";");
                    });
                } else {
                    lines.push(displayName + ": " + cssVal + ";");
                }
            }
        }

        return lines.join('');
    };

    var Sheet = function Sheet() {
        var stuff = [];
        var elem = null;
        var attr = {};

        var renderTextCall = function renderTextCall() {
            var useIndent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (useIndent === true) {
                return stuff.map(function (thing) {
                    return renderTextIndented(thing);
                }).join('\n');
            }
            return stuff.map(renderText).join('');
        };

        return {
            addStyles: function addStyles(styles) {
                stuff = stuff.concat(arrayify(styles));
            },

            renderText: renderTextCall,
            attach: function attach() {
                var head = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                if (elem !== null) {
                    return;
                }

                if (head === null) {
                    head = document.head;
                }

                elem = document.createElement("style");
                Object.keys(attr).forEach(function (name) {
                    return elem.setAttribute(name, attr[name]);
                });
                elem.innerHTML = renderTextCall(true);
                head.appendChild(elem);
            },
            remove: function remove() {
                if (elem === null) {
                    return;
                }

                elem.parentNode.removeChild(elem);
                elem = null;
            },

            get attrs() {
                return attr;
            }
        };
    };

    if (true) {
        module.exports = {
            create: Sheet
        };
    } else {
        window.ssjs = {
            create: Sheet
        };
    }
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _theme = __webpack_require__(1);

var _theme2 = _interopRequireDefault(_theme);

var _style = __webpack_require__(0);

var _style2 = _interopRequireDefault(_style);

var _customListeners = __webpack_require__(6);

var _customListeners2 = _interopRequireDefault(_customListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    custom
        text
            normal
            disabled
        bg
        highlight
*/
_style2.default.add({
    "doric-button": {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        padding: '4px 8px',
        margin: '3px 4px',
        position: 'relative',
        top: 0,
        left: 0,
        overflow: 'hidden',
        minWidth: 69,
        minHeight: 30,
        color: _theme2.default.button.text.normal,
        backgroundColor: _theme2.default.button.bg
    },
    "doric-button[block]": {
        display: 'flex'
    },
    "doric-button[raised]": {
        boxShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)'
    },
    "doric-button[snug]": {
        padding: 0
    },
    "doric-button[disabled]": {
        color: _theme2.default.button.text.disabled
    },
    "doric-button::after": {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        content: '""',
        transition: 'background-color 250ms linear'
    },
    "doric-button[data-touch-active]:not([disabled])::after": {
        backgroundColor: _theme2.default.button.hl,
        transition: 'none'
    },
    "doric-button-content": {
        flexGrow: 1,
        textAlign: 'center'
    }
});

exports.default = function (props) {
    var onTap = props.onTap || function () {};
    var realProps = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            if (prop !== 'content') {
                realProps[prop] = props[prop];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    delete realProps.onTap;

    return React.createElement(
        'doric-button',
        realProps,
        React.createElement(_customListeners2.default, { target: undefined, listeners: { onTap: onTap } }),
        React.createElement(
            'doric-button-content',
            null,
            props.content || props.children
        )
    );
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _style = __webpack_require__(0);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var globalListeners = {};
var registerGlobalListener = function registerGlobalListener(type, elem, handler) {
    if (globalListeners.hasOwnProperty(type) === false) {
        globalListeners[type] = new Map();
        window.addEventListener(type, function (evt) {
            var handlers = globalListeners[type];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = handlers.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listener = _step.value;

                    if (listener.contains(evt.target) === true) {
                        handlers.get(listener)(evt);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });
    }

    globalListeners[type].set(elem, handler);
};
var removeGlobalListener = function removeGlobalListener(type, elem) {
    globalListeners[type].delete(elem);
};

_style2.default.add({
    "custom-listener": {
        display: 'none'
    }
});

var CustomListeners = function (_React$Component) {
    _inherits(CustomListeners, _React$Component);

    function CustomListeners(props) {
        _classCallCheck(this, CustomListeners);

        var _this = _possibleConstructorReturn(this, (CustomListeners.__proto__ || Object.getPrototypeOf(CustomListeners)).call(this, props));

        _this.componentDidMount = function () {
            var listeners = _this.props.listeners;

            _this.elem = ReactDOM.findDOMNode(_this).parentNode;
            _this.types = [];

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(listeners)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var type = _step2.value;

                    var evtType = type.slice(2).toLowerCase();
                    registerGlobalListener(evtType, _this.elem, listeners[type]);
                    _this.types.push(evtType);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        };

        _this.componentWillUnmount = function () {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _this.types[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var type = _step3.value;

                    removeGlobalListener(type, _this.elem);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        };

        _this.render = function () {
            return React.createElement('custom-listener', null);
        };

        return _this;
    }

    return CustomListeners;
}(React.Component);

exports.default = CustomListeners;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _theme = __webpack_require__(1);

var _theme2 = _interopRequireDefault(_theme);

var _style = __webpack_require__(0);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_style2.default.add({
    "doric-image": {
        display: 'block',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    }
});

exports.default = function (_ref) {
    var source = _ref.source,
        height = _ref.height;

    var style = {
        backgroundImage: 'url("' + source + '")',
        height: height
    };
    return React.createElement('doric-image', { style: style });
};

/***/ })
/******/ ]);