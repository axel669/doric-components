import 'gesturesjs';
import ssjs from 'ssjs';
import style from './style';

import BaseComponent from './components/baseComponent';

import button from './components/button';
import card from './components/card';
import checkbox from './components/checkbox';
import collapse from './components/collapse';
import icon from './components/icon';
import image from './components/image';
import radio from './components/radio';
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
    collapse,
    icon,
    image,
    radio,
    select,
    slider,
    toggle
};

window.cblog = console::console.log;
window.cberr = console::console.error;

// class Radio extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }

import theme from './theme';

style.add({
    "doric-input": {
        margin: 2,
        display: 'block'
    },
    "doric-input > input": {
        width: '100%'
    },
    "doric-input[type='text'] > input": {
        border: '2px solid transparent',
        borderBottom: `2px solid ${theme.input.normal.borderColor}`,
        backgroundColor: 'transparent',
        padding: '3px 5px'
    },
    // "doric-input[type='text'] > input:focus": {
    //     borderBottomColor: theme.input.focus.borderColor
    // }
});
const TextInput = (props, type) => {
    const {
        wrapperStyle,
        wrapperClassName,
        value,
        onChange = (() => {}),
        ...passThrough
    } = props;

    return (
        <doric-input type={type} class={wrapperClassName} style={wrapperStyle}>
            <input {...passThrough} type={type} value={value} onChange={onChange} />
        </doric-input>
    );
};

doric.input = {
    text: props => TextInput(props, 'text'),
    number: props => TextInput(props, 'number'),
    tel: props => TextInput(props, 'tel')
};
// class TextInput extends React.Component {
//     constructor(props) {
//         super(props);
//     }
// }

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
            input: {
                text: '',
                number: ''
            }
        };
    }

    updateState = (name) =>
        evt => this.setState({[name]: evt.value})

    render() {
        const {c1, c2, v, t1, t2, i, text} = this.state;
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
                <doric.input.text value={text} onChange={this.linkState('text')} />
                {/* <doric.collapse title="Test">
                    <doric.image source={images.boxxy} height={150} />
                </doric.collapse> */}
                {/* <doric.radio selectedIndex={i} onChange={this.linkState('i', 'target.selectedIndex')}>
                    <option label="Bayonetta" />
                    <option label="Bayonetta 2" />
                    <option label="Bayonetta: Bloody Fate" />
                    <option>
                        <doric.image source={images.boxxy} height={150} />
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
