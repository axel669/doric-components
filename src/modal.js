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

const invertMeasurement = measure => {
    if (measure.startsWith("-") === true) {
        return measure.slice(1)
    }
    return `-${measure}`
}
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

const useModal = (Component) => {
    const [displayInfo, updateInfo] = useState(null)

    if (displayInfo === null) {
        return [
            null,
            (props = {}) => new Promise(
                resolve => updateInfo({
                    resolve,
                    props,
                })
            ),
        ]
    }

    const close = value => {
        updateInfo(null)
        displayInfo.resolve(value)
    }
    return [
        <Component {...displayInfo.props} close={close} />,
        () => {},
    ]
}

export {
    useModal,
    Modal,
}
