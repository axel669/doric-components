import React, {useState, useEffect, useReducer, useRef} from "react"
import ReactDOM from "react-dom"

import styled from "styled-components"

import doric from "./main.js"
import {darkTheme, lightTheme} from "./themes.js"
import {themedComponent, propToggle, propVariant, HiddenControl} from "./helpers.js"
import renderAs from "./render-as.js"

const AppWrapper = styled.div`
    width: 100%;
    margin: auto;
    max-width: 1280px;
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
    bulma: "https://thedaoofdragonball.com/wp-content/uploads/2019/09/bunny-girl-bulma-pyon-pyon.jpg",
    senpai: "https://cdn.takanodan.net/wp-content/uploads/2019/03/cover.jpg",
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

const TestModal = (props) => <doric.Modal>
    <doric.Card>
        <doric.CardContent>
            <doric.Text type="title">
                Alert
            </doric.Text>
        </doric.CardContent>
        <doric.CardActions style={{textAlign: "right"}}>
            <doric.Button onTap={() => props.close(0)}>Close</doric.Button>
        </doric.CardActions>
    </doric.Card>
</doric.Modal>

const Checkboxes = () => {
    const [checked, toggleChecked] = doric.useToggle(false)
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
    const [on, toggle] = doric.useToggle(false)

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

const AppStyle = styled.createGlobalStyle`
    input, select {
        font-size: 16px;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols || 12}, 1fr);
`
const GridItem = styled.div`
    grid-column: span ${props => props.span};
`
const GridItemContainer = styled(GridItem)`
    display: flex;
    align-items: center;
    justify-content: stretch;

    & > * {
        flex-grow: 1;
    }
`

const DebounceInput = props => {
}

const BannerContainer = styled.div`
    background-color: rgb(31, 63, 127);
    color: white;
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
`
const BannerUserText = styled.div`
    grid-column: span 2;
    font-size: 18px;
`

const testUser = {
    "name": "Axel669",
    "email": "axel@axel669.net",
}

const Banner = props => {
    const {user, date} = props
    const dateString = date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            year: "numeric",
            day: "numeric",
            weekday: "long",
        }
    )

    return <BannerContainer>
        <BannerUserText>
            <div>{dateString}</div>
            <div>Welcome, {user.name}</div>
        </BannerUserText>
    </BannerContainer>
}

const themes = [
    lightTheme,
    darkTheme,
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

    return <AppWrapper>
        <AppStyle />
        <doric.ThemeProvider value={theme}>
            <doric.GlobalStyle />
            <CornerDiv>
                <doric.Button color="primary" onTap={cycleTheme}>Cycle Theme</doric.Button>
            </CornerDiv>
            {/* {modal} */}

            <Banner date={new Date()} user={testUser} />

            <doric.Card>
                <doric.CardContent>
                    <Grid>
                        <GridItem as={doric.Input.Text} span={3} autoComplete="none" bordered label="Customer ID" />
                        <GridItem as={doric.Input.Text} span={3} autoComplete="none" bordered label="Customer Name" />
                        <GridItem as={doric.Select} span={3} bordered label="Shipping Method">
                            <option value="SR">SR - See Routing</option>
                            <option value="00">00 - Other</option>
                        </GridItem>
                        <GridItemContainer span={3}>
                            <doric.Button text="Addresses Selected: 0" color="primary" block size="large" />
                        </GridItemContainer>

                        <GridItem as={doric.Input.Text} span={2} autoComplete="none" bordered label="Rep 1" />
                        <GridItem span={4} />
                        <GridItem as={doric.Input.Text} span={3} autoComplete="none" bordered label="Purchase Order" />
                        <GridItem as={doric.Select} span={3} bordered label="Terms">
                            <option value="02">02 - NET 45</option>
                        </GridItem>

                        <GridItem as={doric.Input.Text} span={2} autoComplete="none" bordered label="Rep 2" />
                        <GridItem span={4} />
                        <GridItem as={doric.Input.Text} span={3} autoComplete="none" bordered label="Discount" />
                        <GridItem as={doric.Input.Text} span={3} autoComplete="none" bordered label="Promotional Code" />

                        <GridItem span={3} />
                        <GridItem as={doric.Button} span={3} size="large" color="secondary" text="Submit" />
                        <GridItem as={doric.Button} span={3} size="large" color="danger" text="Clear Form" />
                        <GridItem span={3} />
                    </Grid>
                </doric.CardContent>
            </doric.Card>

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

            {/* <doric.Text type="header">
                Card Styles
            </doric.Text>
            <Cards /> */}

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
