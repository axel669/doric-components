import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"

import {Button} from "./button.js"
import {Card, CardContent, CardActions} from "./card.js"
import {Modal} from "./modal.js"
import Text from "./text.js"

import bridge from "./bridge.js"

const dialogRoot = document.createElement("dialog-root")
document.body.appendChild(dialogRoot)

const Dialogs = () => {
    const [dialogs, updateDialogs] = useState([])
    useEffect(
        () => {
            bridge.recv(
                "dialog.open",
                (info) => updateDialogs([
                    ...dialogs,
                    info,
                ])
            )
            bridge.recv(
                "dialog.close",
                id => updateDialogs(
                    dialogs.filter(dialog => dialog.id !== id)
                )
            )
        },
        []
    )

    return <>
        {dialogs.map(
            info => info.component
        )}
    </>
}

const openDialog = (Component, props) => new Promise(
    resolve => {
        const id = `${Date.now()}:${Math.random.toString(16)}`
        const close = value => {
            bridge.send("dialog.close", id)
            resolve(value)
        }
        bridge.send(
            "dialog.open",
            {
                id,
                component: <Component {...props} close={close} />
            }
        )
    }
)
const Alert = props => {
    const {
        message,
        close,
        title = "Alert",
    } = props
    const closeAlert = () => close(null)

    return <Modal>
        <Card>
            <CardContent>
                <Text type="title">{title}</Text>
                <div>{message}</div>
            </CardContent>
            <CardActions>
                <Button block text="Ok" onTap={closeAlert} color="primary" />
            </CardActions>
        </Card>
    </Modal>
}
const alert = async (props) => {
    const alertProps = cond(
        typeof props === "string",
        {message: props},
        props
    )

    return await openDialog(Alert, alertProps)
}

ReactDOM.render(
    <Dialogs />,
    dialogRoot
)

export default {
    alert,
}
