import {useState} from "react"

const useInput = value => {
    const [current, update] = useState(value)
    return [
        current,
        evt => update(evt.target.value)
    ]
}

const useInputToggle = value => {
    const [current, set] = useState(value)
    return [
        current,
        evt => set(evt.target.checked)
    ]
}

const useToggle = value => {
    const [current, set] = useState(value)
    return [
        current,
        () => set(current === false)
    ]
}

const genRefs = length => Array.from(
    {length},
    () => ({current: null})
)
const adjustRefs = (current, target) => {
    if (current.length === target) {
        return current
    }
    if (current.length > target) {
        return current.slice(0, target)
    }
    return [
        ...current,
        ...genRefs(target - current.length),
    ]
}
const useArrayRef = size => {
    const ref = React.useRef(null)

    ref.current = (ref.current === null)
        ? genRefs(size)
        : adjustRefs(ref.current, size)

    return ref.current
}

export {
    useArrayRef,
    useInput,
    useInputToggle,
    useToggle,
}
