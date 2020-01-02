import React, {useState} from "react"
import ReactDOM from "react-dom"

const portalRoot = document.createElement("div")
portalRoot.style.position = "absolute"
portalRoot.style.top = 0
portalRoot.style.left = 0
portalRoot.dataset.portalRoot = ""
document.body.appendChild(portalRoot)

const Portal = props => ReactDOM.createPortal(
    props.children,
    portalRoot
)

export default Portal
