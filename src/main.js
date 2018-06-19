import 'gesturesjs';
import ssjs from 'ssjs';
import style from './style';
import update from './update';

import BaseComponent from './components/baseComponent';

import button from './components/button';
import card from './components/card';
import checkbox from './components/checkbox';
import collapse from './components/collapse';
import {Grid as grid, Col as col, GridBreak as gridBreak} from './components/grid';
import icon from './components/icon';
import image from './components/image';
import input from './components/input';
import radio from './components/radio';
import select from './components/select';
import slider from './components/slider';
import {Tabs as tabs, Tab as tab} from './components/tabs';
import toggle from './components/toggle';

window.images = {
    boxxy: "http://axel669.net/images/boxxy.png"
};

window.update = update;

// import loaderGIF from './images/double-ring.gif';

const doric = {
    button,
    card,
    checkbox,
    collapse,
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
    toggle
};

window.cblog = console::console.log;
window.cberr = console::console.error;

const sheet = ssjs.create();
sheet.addStyles(style);

class Main extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            c1: true,
            c2: false,
            t1: false,
            t2: true,
            v: 0,
            i: 0,
            o: '',
            input: {
                text: '',
                number: '',
                tel: '',
                password: '',
                textarea: ''
            },
            tab: 0
        };
    }

    updateState = (name) =>
        evt => this.setState({[name]: evt.value})
    linkMoar = (name, prop = 'target.value') => {
        const getValue = new Function('evt', `return evt.${prop};`);
        return evt => {
            const state = this.state;
            const value = getValue(evt);
            this.setState(() =>
                update(state, {[`${name}.$set`]: value})
            );
        };
    };

    render() {
        const {c1, c2, v, t1, t2, i, input, o, tab} = this.state;
        // const names = [
        //     'disabled',
        //     'flat',
        //     'raised',
        //     [
        //         'normal',
        //         'primary',
        //         'danger',
        //         'accent'
        //     ]
        // ];

        // const make = (base, name, values) =>
        //     values.reduce((list, value) => [...list, <doric.button {...{...base, [name]: value}} text="demo" onTap={() => cblog(base, name, value)} />], []);
        //
        // const makeAll = (array, base = {}) => {
        //     const opt = array[0];
        //     let arr = [];
        //
        //     if (Array.isArray(opt) === true) {
        //         for (const op of opt) {
        //             // console.log(base, op);
        //             arr = [...arr, ...make(base, op, [true])];
        //         }
        //     }
        //     else {
        //         arr = [
        //             ...arr,
        //             ...makeAll(array.slice(1), {...base, [opt]: true}),
        //             ...makeAll(array.slice(1), {...base, [opt]: false})
        //         ];
        //     }
        //
        //     return arr;
        // };
        // const buttons = makeAll(names);

        return (
            <div style={{paddingTop: 3}}>
                {/* <doric.card>
                    <doric.tabs selectedIndex={tab} onChange={this.linkState('tab', 'target.selectedIndex')}>
                        <doric.tab label="First">
                            <doric.image source={images.boxxy} height={200} />
                        </doric.tab>
                        <doric.tab label="Second">Second</doric.tab>
                        <doric.tab label="Third">Third</doric.tab>
                    </doric.tabs>
                </doric.card> */}
                {/* <doric.button block raised text="Test" />
                <doric.checkbox label="Checkbox Demo" checked={c1} onChange={this.linkState('c1', 'value')} />
                <doric.input.text value={input.text} onChange={this.linkMoar('input.text')} />
                <doric.input.number value={input.number} onChange={this.linkMoar('input.number')} />
                <doric.input.password value={input.password} onChange={this.linkMoar('input.password')} />
                <doric.input.tel value={input.tel} onChange={this.linkMoar('input.tel')} />
                <doric.input.email value={input.email} onChange={this.linkMoar('input.email')} />
                <doric.input.textarea value={input.textarea} onChange={this.linkMoar('input.textarea')} /> */}

                <doric.radio value={o} onChange={this.linkState('o')} layout={{container: doric.grid, itemProps: props => ({key: props.key, size: 2})}}>
                    <option value='A' label='A' />
                    <option value='B' label='B' />
                    <option value='C' label='C' />
                    <option value='D' label='D' />
                    <option value='E' label='E' />
                </doric.radio>
                <doric.radio value={o} onChange={this.linkState('o')}>
                    <option value='A' label='A' />
                    <option value='B' label='B' />
                    <option value='C' label='C' />
                    <option value='D' label='D' />
                    <option value='E' label='E' />
                </doric.radio>
                {/* <doric.select value={o} onChange={this.linkState('o')}>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    <option value='D'>D</option>
                    <option value='E'>E</option>
                </doric.select> */}
                {/* <doric.collapse title="Test">
                    <doric.image source={images.boxxy} height={150} />
                </doric.collapse> */}
                {/* <doric.radio selectedIndex={i} onChange={this.linkState('i', 'target.selectedIndex')}>
                    <option label="Bayonetta" />
                    <option label="Bayonetta 2" />
                    <option label="Bayonetta: Bloody Fate" />
                    <option>
                        <doric.image source={images.boxxy} height={50} />
                    </option>
                </doric.radio> */}
                {/* {Object.keys(doric.icon.icons).map(
                    icon => <doric.icon icon={icon} />
                )} */}
                {/* <doric.card>
                    <doric.select>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </doric.select>
                </doric.card> */}
                {/* <doric.toggle on={t1} onChange={this.updateState('t1')} label="Test" />
                <doric.toggle on={t1} onChange={this.updateState('t1')} label="Test" toggleRight />
                <doric.toggle on={t2} onChange={this.updateState('t2')} label="Test" alignRight/>
                <doric.toggle on={t2} onChange={this.updateState('t2')} label="Test" toggleRight alignRight />
                <doric.toggle on={t2} onChange={this.updateState('t2')} toggleRight alignRight>
                    <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
                </doric.toggle> */}
                {/* {buttons} */}
                {/* <doric.toggle label="Testing" on={c1} onChange={this.updateState('c1')} />
                <doric.toggle label="Testing" on={c1} onChange={this.updateState('c1')} alignRight />
                <doric.toggle label="Testing" on={c1} onChange={this.updateState('c1')} toggleRight />
                <doric.toggle label="Testing" on={c1} onChange={this.updateState('c1')} toggleRight alignRight />
                <doric.toggle on={c2} onChange={this.updateState('c2')}>
                    <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
                </doric.toggle> */}
                {/* <doric.card>
                    <card-content>
                        Content?
                    </card-content>
                    <card-action>
                        <doric.button text="LUL" />
                    </card-action>
                </doric.card> */}
                {/* <input type="checkbox" value={c1} onChange={evt => console.log(evt.nativeEvent)} /> */}
                {/* <doric.checkbox checked={c1} label="Checkbox?" onChange={this.updateState('c1')} style={{height: 70}} />
                <doric.checkbox checked={c1} label="Checkbox?" onChange={this.updateState('c1')} alignRight />
                <doric.checkbox checked={c1} label="Checkbox?" onChange={this.updateState('c1')} checkRight style={{height: 70}} />
                <doric.checkbox checked={c1} label="Checkbox?" onChange={this.updateState('c1')} checkRight alignRight />
                <doric.checkbox checked={c2} onChange={this.updateState('c2')}>
                    <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
                </doric.checkbox> */}
                {/* <doric.button block onTap={() => this.setState({yup: false})}>
                    <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
                </doric.button>
                <doric.button block style={{height: 70}}>
                    <doric.icon icon="ion-social-twitch-outline" />
                    Text
                </doric.button> */}
                {/* <doric.image source="http://axel669.net/images/boxxy.png" height={150} /> */}
                {/* <doric.icon icon="ion-ionic" /> */}
            </div>
        );
    }
}

sheet.attach();
ReactDOM.render(
    <Main />,
    document.querySelector("div")
);
