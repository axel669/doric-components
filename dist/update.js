"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var verbs = {
    $set: function $set(prev, value) {
        return value;
    },
    $unset: function $unset(prev, value) {
        var copy = _extends({}, prev);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                delete copy[key];
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

        return copy;
    },
    $push: function $push(prev, value) {
        return [].concat(_toConsumableArray(prev), [value]);
    },
    $append: function $append(prev, value) {
        return [].concat(_toConsumableArray(prev), _toConsumableArray(value));
    },
    $apply: function $apply(prev, value) {
        return value(prev);
    },
    $filter: function $filter(prev, value) {
        return prev.filter(value);
    }
};
var checks = {
    $set: function $set(prev, value) {},
    $unset: function $unset(prev, value) {
        if ((typeof prev === "undefined" ? "undefined" : _typeof(prev)) !== 'object') {
            throw new Error("Can only remove keys from an object");
        }
        if (Array.isArray(value) === false) {
            throw new Error("List of keys must be an array");
        }
    },
    $push: function $push(prev, value) {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only push to arrays");
        }
    },
    $append: function $append(prev, value) {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only append to arrays");
        }
        if (Array.isArray(value) === false) {
            throw new Error("Appended value must be an array");
        }
    },
    $apply: function $apply(prev, value) {
        if (typeof value !== 'function') {
            throw new Error("Value must be a function");
        }
    },
    $filter: function $filter(prev, value) {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only filter arrays");
        }
        if (typeof value !== 'function') {
            throw new Error("Value must be a function");
        }
    }
};
var internal_copyObject = function internal_copyObject(obj) {
    var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (Array.isArray(obj) === true) {
        return [].concat(_toConsumableArray(obj));
    }
    if (obj === undefined && create === true) {
        return {};
    }
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || obj === null) {
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
    return _extends({}, obj);
};
var internal_setValues = function internal_setValues(dest, key, n, value, create) {
    var name = key[n];
    if (n === key.length - 1) {
        checks[name](dest, value);
        return verbs[name](dest, value);
    } else {
        dest = internal_copyObject(dest, create);
        dest[name] = internal_setValues(dest[name], key, n + 1, value, create);
    }
    return dest;
};
var update = function update(source, obj) {
    var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            source = internal_setValues(source, key.split('.'), 0, obj[key], create);
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

    return source;
};
update.addVerb = function (verb, method, check) {
    verbs[verb] = method;
    checks[verb] = check;
};

exports.default = update;