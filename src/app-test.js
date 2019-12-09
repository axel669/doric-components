import React, {useState} from "react"
import ReactDOM from "react-dom"

import styled from "styled-components"

import doric from "./main.js"
import {darkTheme, lightTheme} from "./themes.js"
import {themedComponent, propToggle} from "./helpers.js"

const themes = [
    lightTheme,
    darkTheme,
]

const AppWrapper = styled.div`
    width: 100%;
    margin: auto;
    max-width: 640px;
`

const CornerDiv = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
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
    return buttonSizes.map(size => <>
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
                type => <doric.FlatButton size={size} color={type.toLowerCase()} outline>{type}</doric.FlatButton>
            )}
        </div>
    </>)
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

const InputBase = styled.input`
    position: relative;
    border-width: 0px;
    padding: 8px 4px;
    margin-bottom: 2px;
    background-color: transparent;
    width: 100%;

    &:focus {
        outline: none;
    }
`
const InputLabel = styled.label`
    input:focus + & {
        color: ${props => props.theme.primary};
    }
`
const BottomBorder = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 2px;
    background-color: lightgray;

    &::after {
        position: absolute;
        content: "";
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: ${props => props.theme.primary};
        transform: scaleX(0);
        transition: transform 100ms linear;
    }
    input:focus ~ &::after {
        transform: scaleX(1);
    }
`
const InputContiner = styled.div`
    display: flex;
    flex-direction: column-reverse;
    position: relative;
`

const Input = {
    Text: themedComponent(
        source => {
            const {theme, label, ...props} = source
            const id = Math.random().toString().slice(2).toString(16)

            return <InputContiner theme={theme}>
                <InputBase theme={theme} type="text" id={id} {...props} />
                <InputLabel theme={theme} htmlFor={id}>
                    {label}
                </InputLabel>
                <BottomBorder theme={theme} />
            </InputContiner>
        },
        "Themed(TextInput)"
    )
}

const Fieldset = styled.fieldset`
    border-radius: 4px;
    padding: 2px;
    border: 1px solid ${props => props.theme.softText};

    &:focus-within {
        border-color: ${props => props.theme.primary};
    }
`
const Legend = styled.legend`
    font-size: 14px;
    margin-left: 4px;
    color: ${props => props.normal};

    input:focus + & {
        color: ${props => props.focus ?? props.theme.primary};
    }
`

const I2B = styled.div`
    position: relative;
    display: flex;
    padding: 0px;
    margin: 2px;
`
const I2I = styled.input`
    padding: 24px 8px 8px 8px;
    margin: 0px;
    border-width: 0px;
    z-index: +1;
    background-color: transparent;
    width: 100%;

    &:focus {
        outline: none;
    }
`
const typeVariant = propToggle("bordered","16px","4px")
const I2L = styled.label`
    position: absolute;
    top: 0px;
    left: 0px;
    padding-top: 2px;

    padding-left: ${typeVariant};

    input:focus + & {
        color: ${props => props.theme.primary};
    }
`
const I2Bo = styled.div`
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 2px;

    background-color: ${props => props.theme.softText};

    &::after {
        position: absolute;
        content: "";
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: ${props => props.theme.primary};
        transform: scaleX(0);
        transition: transform 200ms linear;
    }

    input:focus ~ &::after {
        transform: scaleX(1);
    }
`
const I2F = styled.fieldset`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 0px;
    padding: 0px;
    padding-left: 13px;
    border: 1px solid ${props => props.theme.softText};
    border-radius: 4px;

    input:focus ~ & {
        border-color: ${props => props.theme.primary};
    }
`
const I2FL = styled.legend`
    padding: 2px;
    color: transparent;
`

function App() {
    const tapped = () => console.log("tapped")
    const [theme, cycleTheme] = useCycle(themes)
    const [currentTab, changeTab] = useState(0)
    const tabs = range(
        10,
        i => <doric.Tab label={`Tab #${i}`}>
            <doric.Text type="title">{i}</doric.Text>
        </doric.Tab>
    )
    const onTabChange = evt => changeTab(evt.newTab)

    return <AppWrapper>
        <doric.ThemeProvider value={theme}>
            <doric.GlobalStyle />
            <CornerDiv>
                <doric.Button color="primary" onTap={cycleTheme}>Cycle Theme</doric.Button>
            </CornerDiv>
            {/* <doric.Text type="header">
                Button Styles
            </doric.Text>
            <Buttons /> */}

            {/* <doric.Text type="header">
                Card Styles
            </doric.Text>
            <Cards /> */}

            {/* <doric.Tabs style={{height: 320}} selectedTab={currentTab} onChange={onTabChange}>
                {tabs}
            </doric.Tabs> */}
            <Input.Text label="Test" />
            <Fieldset theme={theme}>
                <InputBase type="text" theme={theme} />
                <Legend theme={theme} focus="red">Testing</Legend>
            </Fieldset>
            <I2B theme={theme}>
                <I2I theme={theme} type="text" />
                <I2L theme={theme} bordered={false}>Label</I2L>
                <I2Bo theme={theme} />
            </I2B>
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                <I2B theme={theme} style={{height: 100}}>
                    <I2I theme={theme} type="text" />
                    <I2L theme={theme} bordered={true}>Label</I2L>
                    <I2F theme={theme}>
                        <I2FL theme={theme}>Label</I2FL>
                    </I2F>
                </I2B>
                <I2B theme={theme}>
                    <I2I theme={theme} type="text" />
                    <I2L theme={theme} bordered={false}>Label</I2L>
                    <I2Bo theme={theme} />
                </I2B>

                <I2B theme={theme}>
                    <I2I theme={theme} type="text" />
                    <I2L theme={theme} bordered={true}>Label</I2L>
                    <I2F theme={theme}>
                        <I2FL theme={theme}>Label</I2FL>
                    </I2F>
                </I2B>
                <I2B theme={theme}>
                    <I2I theme={theme} type="text" />
                    <I2L theme={theme} bordered={false}>Label</I2L>
                    <I2Bo theme={theme} />
                </I2B>
            </div>
        </doric.ThemeProvider>
    </AppWrapper>
}

ReactDOM.render(
    <App />,
    document.querySelector("app-root")
)
