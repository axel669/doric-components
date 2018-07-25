import React from 'react';
import autobind from 'autobind-decorator';

import Button from './button.js';
import Icon from './icon.js';
import style from '../style.js';

import {wait, animFrame} from '../util.js';

const animTime = 200;
style.add({
    "doric-app-menu-overlay": {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1100
    },
    "doric-app-menu-overlay[display='false']": {
        transform: 'translateX(-150%)'
    },
    "doric-app-menu-wrapper": {
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        // bottom: 0,
        paddingBottom: 10,
        width: 320,
        maxWidth: '60vw',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.35)',
        transition: `transform ${animTime}ms linear, opacity ${animTime}ms linear`
    },
    "doric-app-menu-wrapper[open='false']": {
        opacity: 0,
        transform: 'translateX(-100%)'
    },
    "doric-app-menu-wrapper[open='true']": {
        opacity: 1,
        transform: 'translateX(0%)'
    },
    "doric-app-menu doric-button": {
        borderRadius: 0,
        display: 'flex',
        margin: 0,
        textAlign: 'left'
    }
});
class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {show: false};
    }

    async componentWillUpdate(newProps, newState) {
        if (newProps.open !== this.state.show) {
            if (newProps.open === false) {
                await wait(animTime + 10);
            }
            this.setState(() => ({show: newProps.open}));
        }
    }

    render() {
        const {Menu, open, toggle} = this.props;
        const {show} = this.state;

        if (Menu === null) {
            return null;
        }

        return (
            <doric-app-menu-overlay app-menu onClick={toggle} display={open || show}>
                <doric-app-menu-wrapper open={open} onClick={evt => evt.stopPropagation()}>
                    <doric-app-menu>
                        <Menu toggle={toggle} />
                    </doric-app-menu>
                </doric-app-menu-wrapper>
            </doric-app-menu-overlay>
        );
    }
}

style.add({
    "doric-app-titlebar": {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.35)',
        backgroundColor: "#1d62d5",
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        lineHeight: '40px',
        zIndex: 900
    },
    "doric-button[app-titlebar]": {
        width: 40,
        height: 40,
        borderRadius: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 0,
        color: 'white'
    },
    "doric-button[app-titlebar][right]": {
        left: 'auto',
        right: 0
    }
});
const noOP = () => {};
class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {menuOpen: false};
    }

    @autobind
    async toggleMenu() {
        const {menuOpen} = this.state;
        // await wait(1);
        await animFrame();
        this.setState(() => ({menuOpen: menuOpen === false}));
    }

    render() {
        const {
            children,
            title,
            menu = null,
            back = false,
            onBack = noOP,
            options = false,
            onOptions = noOP,
            titleProps,
            contentProps
        } = this.props;
        const {menuOpen} = this.state;

        const leftButton = (() => {
            if (menu !== null) {
                return (
                    <Button app-titlebar onTap={this.toggleMenu}>
                        <Icon icon="ion-navicon-round" />
                    </Button>
                )
            }
            if (back !== false) {
                const style = {
                    width: 'auto',
                    padding: '0px 8px',
                    fontSize: 12
                };
                return (
                    <Button style={style} app-titlebar onTap={onBack}>
                        <Icon icon="ion-chevron-left" style={{fontSize: 12}} />
                        &nbsp;
                        {back}
                    </Button>
                )
            }
            return null;
        })();
        // const optionButton = options && (
        //     <Button app-titlebar right onTap={onOptions}>
        //         <Icon icon="ion-more" />
        //     </Button>
        // );

        return (
            <React.Fragment>
                <doric-app-titlebar>
                    {leftButton}
                    {title}
                    {/* {optionButton} */}
                </doric-app-titlebar>
                <AppMenu Menu={menu} open={menuOpen} toggle={this.toggleMenu} />
                <div style={{paddingTop: 45}}>
                    {children}
                </div>
            </React.Fragment>
        );
    }
}

export default AppContainer;
