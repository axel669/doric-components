const listeners = {}

const send = (type, data) => {
    const handlers = listeners[type] ?? []
    for (const handler of handlers) {
        handler(data, type)
    }
}

const recv = (type, handler) => {
    const handlers = listeners[type] ?? []
    const remove = () => {
        listeners[type] = listeners[type].filter(h => h !== handler)
    }
    handlers.push(handler)
    listeners[type] = handlers

    return remove
}

export default {
    send,
    recv,
}
