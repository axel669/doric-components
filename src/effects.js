import {useState} from "react"

const useInput = value => {
    const [current, update] = useState(value)
    return [
        current,
        evt => update(evt.target.value)
    ]
}

const useToggle = value => {
    const [current, set] = useState(value)
    return [
        current,
        evt => set(evt.target.checked)
    ]
}

export {
    useInput,
    useToggle,
}
