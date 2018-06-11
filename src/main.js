import 'gesturesjs';
import ssjs from 'ssjs';
import style from './style';

import button from './components/button';
import card from './components/card';
import checkbox from './components/checkbox';
import icon from './components/icon';
import image from './components/image';
import select from './components/select';
import slider from './components/slider';
import toggle from './components/toggle';

window.images = {
    boxxy: "http://axel669.net/images/boxxy.png"
};

// import loaderGIF from './images/double-ring.gif';

const doric = {
    button,
    card,
    checkbox,
    icon,
    image,
    select,
    slider,
    toggle
};

window.cblog = console::console.log;
window.cberr = console::console.error;

const sheet = ssjs.create();
sheet.addStyles(style);

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            c1: true,
            c2: false,
            t1: false,
            t2: true,
            v: 0
        };
    }

    updateState = (name) =>
        evt => this.setState({[name]: evt.value})

    render() {
        const {c1, c2, v, t1, t2} = this.state;
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
            <div style={{overflow: 'hidden'}}>
                <doric.card>
                    Testing
                </doric.card>
                <doric.card sideImage={images.boxxy}>
                    Testing
                </doric.card>
                <doric.select>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </doric.select>
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
