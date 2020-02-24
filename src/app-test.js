import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from "react"
import ReactDOM from "react-dom"

import styled from "styled-components"

import doric from "./main.js"
import {darkTheme, lightTheme} from "./themes.js"
import {themedComponent, propToggle, propVariant, HiddenControl} from "./helpers.js"
import renderAs from "./render-as.js"

const AppWrapper = styled.div`
    width: 100%;
    margin: auto;
    max-width: 640px;
`

const CornerDiv = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000000;
`
const useCycle = array => {
    const [index, setIndex] = useState(0)
    return [
        array[index],
        () => {
            const newIndex = (index + 1) % array.length
            setIndex(newIndex)
        }
    ]
}

const bunny = {
    // bulma: "https://thedaoofdragonball.com/wp-content/uploads/2019/09/bunny-girl-bulma-pyon-pyon.jpg",
    // senpai: "https://cdn.takanodan.net/wp-content/uploads/2019/03/cover.jpg",
    bulma: "/images/cthulhu icon.jpg",
    senpai: "/images/laughing man.gif",
}

function Buttons() {
    const buttonTypes = [
        "Normal",
        "Primary",
        "Danger",
        "Secondary",
    ]
    const buttonSizes = [
        "small",
        "medium",
        "large",
    ]
    return <div>
        <doric.Text type="header">
            Button Styles
        </doric.Text>
        {buttonSizes.map(size => <>
            <div>
                {buttonTypes.map(
                    type => <doric.Button size={size} color={type.toLowerCase()}>{type}</doric.Button>
                )}
            </div>
            <div>
                {buttonTypes.map(
                    type => <doric.FlatButton size={size} color={type.toLowerCase()}>{type}</doric.FlatButton>
                )}
            </div>
            <div>
                {buttonTypes.map(
                    type => <doric.FlatButton size={size} color={type.toLowerCase()} bordered>{type}</doric.FlatButton>
                )}
            </div>
            <div>
                {buttonTypes.map(
                    type => <doric.Button disabled size={size} color={type.toLowerCase()}>{type}</doric.Button>
                )}
            </div>
            <div>
                {buttonTypes.map(
                    type => <doric.FlatButton disabled size={size} color={type.toLowerCase()}>{type}</doric.FlatButton>
                )}
            </div>
            <div>
                {buttonTypes.map(
                    type => <doric.FlatButton disabled size={size} color={type.toLowerCase()} bordered>{type}</doric.FlatButton>
                )}
            </div>
        </>)}
    </div>
}

const CardGrid = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
`
function Cards() {
    return <CardGrid>
        <doric.Card sideMedia>
            <doric.CardMedia image={bunny.senpai} />
            <doric.CardContent>
                <doric.Text type="title">
                    This is a title
                </doric.Text>
                <doric.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem
                    quibusdam.
                </doric.Text>
                <doric.Text>Content!</doric.Text>
                <doric.Text block>Content!</doric.Text>
                <doric.Text block>Content!</doric.Text>
                <doric.Text>Content!</doric.Text>
            </doric.CardContent>
            <doric.CardActions>
                <doric.Button size="small">Bunnify!</doric.Button>
            </doric.CardActions>
        </doric.Card>
        <doric.Card>
            <doric.CardContent>
                <div>Content!</div>
                <div>Content!</div>
                <div>Content!</div>
                <div>Content!</div>
                <div>Content!</div>
            </doric.CardContent>
            <doric.CardActions>
                <doric.Button size="small">Bunnify!</doric.Button>
            </doric.CardActions>
        </doric.Card>
        <doric.Card sideMedia>
            <doric.CardMedia image={bunny.bulma} />
            <doric.CardContent>
                <doric.Text type="title" slim>
                    Dragon, Dragon
                </doric.Text>
                <doric.Text type="subtitle">
                    Rock the dragon
                </doric.Text>

                <doric.Text>
                    Dragon Ball Z
                </doric.Text>
            </doric.CardContent>
            <doric.CardActions>
                <doric.Button size="small">Find Dragon Balls</doric.Button>
            </doric.CardActions>
        </doric.Card>

        <doric.Card>
            <doric.CardActionArea>
                <doric.CardMedia image={bunny.senpai} height={150} />
                <doric.CardContent>
                    Content!
                </doric.CardContent>
            </doric.CardActionArea>
            <doric.CardActions>
                <doric.Button size="small">Bunnify!</doric.Button>
                <doric.FlatButton size="small" color="danger">Debunnify!</doric.FlatButton>
            </doric.CardActions>
        </doric.Card>
        <doric.Card>
            <doric.CardMedia image={bunny.bulma} height={150} />
            <doric.CardContent>
                Content!
            </doric.CardContent>
        </doric.Card>
    </CardGrid>
}

const debounce = (func, time) => {
    let timeout = null
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(
            () => func(...args),
            time
        )
    }
}

const TestModal = (props) => {
    const {close, num, inc} = props
    const closeAlert = () => close(null)

    return <doric.Modal>
        <doric.Card>
            <doric.CardContent>
                <doric.Text type="title">
                    Alert
                </doric.Text>
                Number: {num}
            </doric.CardContent>
            <doric.CardActions style={{textAlign: "right"}}>
                <doric.FlatButton onTap={inc} text="Increment" color="secondary" />
                <doric.Button onTap={closeAlert} text="Close" />
            </doric.CardActions>
        </doric.Card>
    </doric.Modal>
}

const Checkboxes = () => {
    const [checked, toggleChecked] = doric.useInputToggle(false)
    return <div>
        <doric.Text type="header">Checkboxes</doric.Text>
        <div>
            <doric.Checkbox checked={checked} onChange={toggleChecked} label="test" />
            <doric.Checkbox checked={checked} onChange={toggleChecked} label="test" noClickLabel />
            <doric.Checkbox checked={checked} onChange={toggleChecked} color="primary" label="test" />
            <doric.Checkbox checked={checked} onChange={toggleChecked} color="secondary" label="test" noClickLabel />
            <doric.Checkbox checked={checked} onChange={toggleChecked} color="danger" icon="heart-empty" checkedIcon="heart" label="test" />
        </div>
        <div>
            <doric.Checkbox disabled checked={checked} onChange={toggleChecked} label="test" />
            <doric.Checkbox disabled checked={checked} onChange={toggleChecked} label="test" noClickLabel />
            <doric.Checkbox disabled checked={checked} onChange={toggleChecked} color="primary" label="test" />
            <doric.Checkbox disabled checked={checked} onChange={toggleChecked} color="secondary" label="test" noClickLabel />
            <doric.Checkbox disabled checked={checked} onChange={toggleChecked} color="danger" icon="heart-empty" checkedIcon="heart" label="test" />
        </div>
    </div>
}

const Switches = () => {
    const [on, toggle] = doric.useInputToggle(false)

    return <div>
        <doric.Text type="header">Switches</doric.Text>
        <div>
            <doric.Switch checked={on} onChange={toggle} label="primary" color="primary" disabled />
            <doric.Switch checked={on} onChange={toggle} label="secondary" color="secondary" />
            <doric.Switch checked={on} onChange={toggle} label="danger" color="danger" />
            <doric.Switch checked={on} onChange={toggle} label="not clikcable" color="secondary" noClickLabel />
        </div>
        <div>
            <doric.Switch checked={on} onChange={toggle} label="primary" color="primary" />
            <doric.Switch disabled checked={on} onChange={toggle} label="secondary" color="secondary" />
            <doric.Switch disabled checked={on} onChange={toggle} label="danger" color="danger" />
            <doric.Switch disabled checked={on} onChange={toggle} label="not clikcable" color="secondary" noClickLabel />
        </div>
    </div>
}

const OtherInput = styled(doric.Input.Text)`
    border-left: 5px solid green;
`

const ColorTester = doric.themedComponent(
    styled.div`
        height: 30px;
        background-color: ${props => props.theme[props.color]};
    `
)

const DebounceInput = props => {
}

const useThing = thing => {
    const [show, update] = useState(false)

    const element = show ? thing : null
    return [element, update]
}
const useCounter = start => {
    const [current, update] = useState(start)

    return [
        current,
        () => update(current + 1)
    ]
}

const OverlayContainer = styled.div`
    position: relative;
    display: ${props => props.block ? "grid" : "inline-grid"};
`
const overlayFontSize = props => {
    if (props.fontSize === "small") {
        return props.theme.smallFontSize
    }
    if (props.fontSize !== undefined) {
        return props.fontSize
    }
    return ""
}
const OverlayDisplay = doric.themedComponent(
    styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        z-index: +${props => props.modal ? 10001 : 10};
        top: ${props => props.y};
        left: ${props => props.x};
        transform: translate(
            ${props => props.tx},
            ${props => props.ty}
        );

        color: ${props => props.theme.lightText};
        font-size: ${overlayFontSize};
        background-color: ${props => props.theme[props.color]};
    `
)

const BadgeDisplay = styled(OverlayDisplay)`
    border-radius: 20px;
    width: 20px;
    height: 20px;
`
const Badge = props => {
    const {
        value,
        color,
        x = "100%",
        y = "0%",
        tx = "-50%",
        ty = "-50%",
    } = props

    const badgeDisplayProps = {
        color,
        x, y, tx, ty
    }

    return <BadgeDisplay {...badgeDisplayProps} fontSize="small">
        {value}
    </BadgeDisplay>
}

const Popover = props => {
    const {
        content,
        color,
        modal,
        x = "50%",
        y = "50%",
        tx = "-50%",
        ty = "-50%",
        children,
    } = props
    const [visible, setVisible] = React.useState(false)
    const displayRef = React.useRef()
    const showPopover = () => {
        const ref = displayRef.current
        if (ref !== null && ref !== undefined) {
            return
        }
        setVisible(true)
    }
    const close = () => setVisible(false)
    const popoverDisplayProps = {
        color,
        x, y, tx, ty
    }

    const popover = content(close)
    const element = modal
        ? (
            <React.Fragment>
                <doric.Modal />
                <OverlayDisplay {...popoverDisplayProps} modal forwardRef={displayRef}>
                    {popover}
                </OverlayDisplay>
            </React.Fragment>
        )
        : (
            <OverlayDisplay {...popoverDisplayProps} forwardRef={displayRef}>
                {popover}
            </OverlayDisplay>
        )

    return <React.Fragment>
        <doric.CustomListeners onTap={showPopover} />
        {visible && element}
    </React.Fragment>
}

const Griddy = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const themes = [
    darkTheme,
    lightTheme,
]
function App() {
    const tapped = () => console.log("tapped")
    const [theme, cycleTheme] = useCycle(themes)
    // const [currentTab, changeTab] = useState(0)
    // const tabs = range(
    //     10,
    //     i => <doric.Tab label={`Tab #${i}`}>
    //         <doric.Text type="title">{i}</doric.Text>
    //     </doric.Tab>
    // )
    // const onTabChange = evt => changeTab(evt.newTab)
    // const [text, updateText] = doric.useInput("")
    // const [select, updateSelect] = doric.useInput("")
    // const [date, setDate] = useState(new Date())
    // const [modal, openModal] = doric.useModal(TestModal)
    // const testModal = async () => console.log(
    //     await openModal()
    // )
    // const watDate = (newDate, eventSource) => {
    //     console.log(newDate, eventSource)
    //     setDate(newDate)
    // }
    //
    // const selectProps = {
    //     value: select,
    //     onChange: updateSelect,
    // }
    //
    // const wat = <doric.ActionButton icon="calendar" />
    const [num, inc] = useCounter(0)
    const [alert, showAlert] = doric.useModal(
        close => <TestModal close={close} {...{num, inc}} />
    )
    const [thing, showThing] = useThing(<div>Thing count: {num}</div>)
    const toggleThing = () => showThing(thing === null)

    const showModal = async () => {
        // const result = await showAlert()
        const result = await doric.dialog.alert()
        console.log(result)
    }
    const popoverConfirm = React.useCallback(
        close => <doric.Card sideMedia>
            <doric.CardMedia image={bunny.bulma} />
            <doric.CardContent>
                Confirm?
            </doric.CardContent>
            <doric.CardActions>
                <doric.Button text="Cancel" color="danger" onTap={close} />
                <doric.Button text="Confirm" color="secondary" onTap={close} />
            </doric.CardActions>
        </doric.Card>,
        []
    )

    const arrowMove = evt => {
        if (evt.key === "ArrowRight") {
            return "next"
        }
    }
    const refs = doric.useArrayRef(4)

    return <AppWrapper>
        <doric.ThemeProvider value={theme}>
            <doric.GlobalStyle />
            <CornerDiv>
                <doric.Button color="primary" onTap={cycleTheme}>Cycle Theme</doric.Button>
            </CornerDiv>

            <doric.Menu title="App Title">
                <doric.Button color="secondary" text="Logout?" />
                <doric.Button color="danger" text="Boom!" />
            </doric.Menu>

            <doric.Button onTap={toggleThing} text="Toggle" />
            <doric.Button onTap={inc} text="Increment" />
            {thing}

            <doric.Button color="primary">
                Alert
                <doric.Popover content={popoverConfirm} ty="-25%" />
                {/* <Badge value={100} color="secondary" /> */}
            </doric.Button>
            {alert}

            <doric.Card>
                <doric.CardActionArea>
                    <doric.CardMedia height={150} image={bunny.bulma} />
                    <doric.CardContent>
                        <doric.Text>
                            This is some text
                        </doric.Text>
                    </doric.CardContent>
                    <Popover content={popoverConfirm} modal />
                </doric.CardActionArea>
            </doric.Card>

            <Griddy>
                <doric.Button color="primary">
                    Alert
                    <Badge value={100} color="secondary" />
                    {/* <doric.Popover content={popoverConfirm} ty="-25%" /> */}
                </doric.Button>
                <doric.Button color="primary">
                    Alert
                    <Badge value={100} color="danger" />
                    <Popover content={popoverConfirm} ty="-25%" />
                </doric.Button>
            </Griddy>
            {/* <Popover display={popoverConfirm}>
                <doric.Button color="primary" text="Alert?">
                    <div style={{position: "absolute", top: -10, left: -10, width: 20, height: 20, backgroundColor: "cyan"}} />
                </doric.Button>
            </Popover> */}

            {Array.from(
                {length: 100},
                (_, i) => <div>{i}</div>
            )}

            {/* <doric.Input.Text forwardRef={refs[0]} nextTabRef={refs[2]} prevTabRef={refs[-1]} />
            <doric.Input.Text forwardRef={refs[1]} nextTabRef={refs[0]} tabDirection={arrowMove} />
            <doric.Input.Text forwardRef={refs[2]} nextTabRef={refs[0]} prevTabRef={refs[3]} />
            <doric.Input.Text forwardRef={refs[3]} /> */}
            {/* {modal} */}

            {/* <Checkboxes />

            <Switches />

            <Buttons /> */}

            {/* <ColorTester color="primary" />
            <ColorTester color="primaryLight" />
            <ColorTester color="secondary" />
            <ColorTester color="secondaryLight" />
            <ColorTester color="danger" />
            <ColorTester color="dangerLight" /> */}
            {/* <doric.Button onTap={testModal} startIcon={<doric.Icon name="calendar" />}>Testing</doric.Button>

            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                <doric.Input.Text label="test" _={{gridColumn: "span 2"}} action={wat} />
                <doric.Input.Text disabled label="Error?" error="Testing?" action={wat} style={{height: 100}} />
                <doric.Input.Text label="Error?" error="" />
                <doric.Input.Text bordered label="test" />
                <doric.Input.Text disabled bordered label="Error?" error="Testing?" />
                <doric.Input.Text bordered label="Error?" error="" />
                <doric.Select label="SELECT POGGERS" {...selectProps}>
                    <option value="1">Test 1</option>
                    <option value="2">Test 2</option>
                    <option value="3">Test 3</option>
                    <option value="4">Test 4</option>
                </doric.Select>
                <doric.Select disabled label="SELECT POGGERS" bordered style={{height: 100}} {...selectProps}>
                    <option value="1">Test 1</option>
                    <option value="2">Test 2</option>
                    <option value="3">Test 3</option>
                    <option value="4">Test 4</option>
                </doric.Select>
                <doric.Select error="Wat" label="SELECT POGGERS" {...selectProps}>
                    <option value="1">Test 1</option>
                    <option value="2">Test 2</option>
                    <option value="3">Test 3</option>
                    <option value="4">Test 4</option>
                </doric.Select>
                <doric.Select error="Wat Moar" label="SELECT POGGERS" bordered {...selectProps}>
                    <option value="1">Test 1</option>
                    <option value="2">Test 2</option>
                    <option value="3">Test 3</option>
                    <option value="4">Test 4</option>
                </doric.Select>
                <doric.Input.Date value={date} onChange={watDate} label="Start Date" />
                <doric.Input.Date value={date} onChange={watDate} bordered label="Start Date" />
                <OtherInput value={date} onChange={watDate} bordered label="Start Date" dateFormat={date => date.toLocaleDateString("en", {year: "numeric", month: "long", day: "2-digit"})} />
            </div> */}

            {/* <Cards /> */}

            {/* <doric.Tabs style={{height: 320}} selectedTab={currentTab} onChange={onTabChange}>
                {tabs}
            </doric.Tabs> */}
            {/* <doric.Input.Text label="Wat?" value={text} onChange={updateText} />
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                <doric.Input.Text style={{height: 100}} label="Label" value={text} onChange={updateText} />
                <doric.Input.Text bordered label="Label" value={text} onChange={updateText} />

                <doric.Input.Text label="Label"value={text} onChange={updateText}  />
                <doric.Input.Text bordered label="Label" value={text} onChange={updateText} />
            </div> */}
        </doric.ThemeProvider>
    </AppWrapper>
}

ReactDOM.render(
    <App />,
    document.querySelector("app-root")
)

console.log(new Date())
