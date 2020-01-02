import React, {useState, useRef} from "react"
import styled from "styled-components"

import CustomListeners from "./custom-listeners.js"
import {Modal} from "./modal.js"
import Portal from "./portal.js"

const PopoverContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: +1;
`
const PopoverContent = styled.div`
    position: absolute;
    transform: translate(${props => props.tx}, ${props => props.ty});
    z-index: 10000;

    top: ${props => props.position.y}px;
    left: ${props => props.position.x}px;
`
const Popover = props => {
    const {
        content,
        tx = "-50%",
        ty = "-50%",
    } = props
    const [state, setState] = useState({
        visible: false,
        position: {
            x: 0,
            y: 0,
        }
    })
    const container = useRef()
    const {visible, position} = state
    const show = (evt) => {
        const {
            left, right,
            top, bottom
        } = container.current.getBoundingClientRect()
        setState({
            visible: true,
            position: {
                x: (left + right) / 2,
                y: (top + bottom) / 2,
            },
        })
    }
    const close = () => setState({
        visible: false,
        position,
    })

    return <PopoverContainer ref={container}>
        <CustomListeners onTap={show} />
        {visible
            && <Portal>
                <Modal />
                <PopoverContent position={position} tx={tx} ty={ty}>
                    {content?.(close)}
                </PopoverContent>
            </Portal>
        }
    </PopoverContainer>
}

export default Popover
