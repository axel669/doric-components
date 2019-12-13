import {useState} from "react"

const useInput = value => {
    const [current, update] = useState(value)
    return [
        current,
        evt => update(evt.target.value)
    ]
}

export {
    useInput,
}
