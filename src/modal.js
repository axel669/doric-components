import React, {useState} from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const modalRoot = document.createElement("div")
modalRoot.style.position = "absolute"
modalRoot.dataset.modalRoot = ""
document.body.appendChild(modalRoot)

const ModalCover = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10000;
`
const ModalPosition = styled.div`
    position: absolute;
    top: ${props => props.y};
    left: ${props => props.x};
    transform: translate(${props => props.tx}, ${props => props.ty});
`
const Modal = props => {
    const {
        position = {},
        children
    } = props
    const {
        x = "50%",
        y = "50%",
        tx = "-50%",
        ty = "-50%",
    } = position
    const positionInfo = {x, y, tx, ty}

    return ReactDOM.createPortal(
        <ModalCover>
            <ModalPosition {...positionInfo}>
                {children}
            </ModalPosition>
        </ModalCover>,
        modalRoot
    )
}

const useModal = (component) => {
    const [callback, setCallback] = useState(null)
    const close = (value) => {
        setCallback(null)
        callback(value)
    }

    if (callback !== null) {
        return [
            component(close),
            () => {},
        ]
    }

    return [
        null,
        () => new Promise(
            resolve => setCallback(() => resolve)
        ),
    ]
}

export {
    useModal,
    Modal,
}
