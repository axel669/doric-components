const verbs = {
    $set: (prev, value) => value,
    $unset: (prev, value) => {
        const copy = {...prev};
        for (const key of value) {
            delete copy[key];
        }
        return copy;
    },
    $push: (prev, value) => [...prev, value],
    $append: (prev, value) => [...prev, ...value],
    $apply: (prev, value) => value(prev),
    $filter: (prev, value) => prev.filter(value),
    $merge: (prev, value) => ({...prev, ...value})
};
const checks = {
    $set: (prev, value) => {},
    $unset: (prev, value) => {
        if (typeof prev !== 'object') {
            throw new Error("Can only remove keys from an object");
        }
        if (Array.isArray(value) === false) {
            throw new Error("List of keys must be an array");
        }
    },
    $push: (prev, value) => {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only push to arrays");
        }
    },
    $append: (prev, value) => {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only append to arrays");
        }
        if (Array.isArray(value) === false) {
            throw new Error("Appended value must be an array");
        }
    },
    $apply: (prev, value) => {
        if (typeof value !== 'function') {
            throw new Error("Value must be a function");
        }
    },
    $filter: (prev, value) => {
        if (Array.isArray(prev) === false) {
            throw new Error("Can only filter arrays");
        }
        if (typeof value !== 'function') {
            throw new Error("Value must be a function");
        }
    },
    $merge: (prev, value) => {
        if (typeof prev !== 'object') {
            throw new Error("Can't merge non-objects (source is bad)");
        }
        if (typeof value !== 'object') {
            throw new Error("Can't merge non-objects (value is bad)");
        }
    }
};
const internal_copyObject = (obj, create = false) => {
    if (Array.isArray(obj) === true) {
        return [...obj];
    }
    if (obj === undefined && create === true) {
        return {};
    }
    if (typeof obj !== 'object' || obj === null) {
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
    return {...obj};
};
const internal_setValues = (dest, key, n, value, create) => {
    const name = key[n];
    if (n === (key.length - 1)) {
        checks[name](dest, value);
        return verbs[name](dest, value);
    }
    else {
        dest = internal_copyObject(dest, create);
        dest[name] = internal_setValues(dest[name], key, n + 1, value, create);
    }
    return dest;
};
const update = (source, obj, create = false) => {
    for (const key of Object.keys(obj)) {
        source = internal_setValues(source, key.split('.'), 0, obj[key], create);
    }

    return source;
};
update.addVerb = (verb, method, check) => {
    verbs[verb] = method;
    checks[verb] = check;
};

export default update;
