import ReactDOM from 'react-dom';

import 'gesturesjs';
import ssjs from 'ssjs';
import style from './style.js';

import {
    BaseComponent as baseComponent,
    PureBaseComponent as pureBaseComponent
} from './components/baseComponent.js';

import button from './components/button.js';
import card from './components/card.js';
import checkbox from './components/checkbox.js';
import collapse from './components/collapse.js';
import divider from './components/divider.js';
import flex from './components/flex.js';
import grid from './components/grid.js';
// import {Grid as grid, Col as col, GridBreak as gridBreak} from './components/grid.js';
import icon from './components/icon.js';
import image from './components/image.js';
import input from './components/input.js';
import radio from './components/radio.js';
import select from './components/select.js';
import slider from './components/slider.js';
import {Tabs as tabs, Tab as tab} from './components/tabs.js';
import toggle from './components/toggle.js';

import dialogify from './components/dialog.js';

import loader from 'react-loader-spinner';

const doric = {
    baseComponent,
    pureBaseComponent,
    button,
    card,
    checkbox,
    collapse,
    divider,
    flex,
    grid,
    // col,
    // gridBreak,
    icon,
    image,
    input,
    radio,
    select,
    slider,
    tab,
    tabs,
    toggle,

    dialogify,

    style,

    ext: {
        loader
    },

    init(main, target) {
        const sheet = ssjs.create();
        sheet.addStyles(style);
        sheet.attach();

        ReactDOM.render(main, target);
    }
};

export default doric;
