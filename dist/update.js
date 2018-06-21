"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var verbs = {
    $set: function $set(prev, value) {
        return value;
    },
    $push: function $push(prev, value) {
        return [].concat(_toConsumableArray(prev), _toConsumableArray(value));
    },
    $apply: function $apply(prev, value) {
        return value(prev);
    }
};
var checks = {
    $set: function $set(prev, value) {},
    $push: function $push(prev, value) {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only push to arrays");
        }
        if (Array.isArray(value) === false) {
            throw new Error("Push value must be an array");
        }
    },
    $apply: function $apply(prev, value) {
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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            source = internal_setValues(source, key.split('.'), 0, obj[key], create);
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

    return source;
};
update.addVerb = function (verb, method, check) {
    verbs[verb] = method;
    checks[verb] = check;
};

exports.default = update;