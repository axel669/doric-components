import ReactDOM from 'react-dom';

import 'gesturesjs';
import ssjs from 'ssjs';
import style from './style';
import update from './update';

import {
    BaseComponent as baseComponent,
    PureBaseComponent as pureBaseComponent
} from './components/baseComponent';

import button from './components/button';
import card from './components/card';
import checkbox from './components/checkbox';
import collapse from './components/collapse';
import divider from './components/divider';
import {Grid as grid, Col as col, GridBreak as gridBreak} from './components/grid';
import icon from './components/icon';
import image from './components/image';
import input from './components/input';
import radio from './components/radio';
import select from './components/select';
import slider from './components/slider';
import {Tabs as tabs, Tab as tab} from './components/tabs';
import toggle from './components/toggle';

import loader from 'react-loader-spinner';

const doric = {
    baseComponent,
    pureBaseComponent,
    button,
    card,
    checkbox,
    collapse,
    divider,
    grid,
    col,
    gridBreak,
    icon,
    image,
    input,
    radio,
    select,
    slider,
    tab,
    tabs,
    toggle,

    style,

    ext: {
        loader
    },
    util: {
        update,
        setState(component, value) {
            component.setState(() => value);
        }
    },

    init(main, target) {
        const sheet = ssjs.create();
        sheet.addStyles(style);
        sheet.attach();

        ReactDOM.render(main, target);
    }
};

export default doric;
