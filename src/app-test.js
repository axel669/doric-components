import React, {useState} from "react"
import ReactDOM from "react-dom"

import styled from "styled-components"

import doric from "./main.js"
import {darkTheme, lightTheme} from "./themes.js"

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

            <doric.Tabs style={{height: 320}} selectedTab={currentTab} onChange={onTabChange}>
                {tabs}
            </doric.Tabs>
        </doric.ThemeProvider>
    </AppWrapper>
}

ReactDOM.render(
    <App />,
    document.querySelector("app-root")
)
