import React from 'react';
import ReactDOM from 'react-dom';

import update from 'immutable-update-values';
import autobind from 'autobind-decorator';

import doric from '../../index.js';

window.images = {
    boxxy: "http://axel669.net/images/boxxy.png",
    bayoBG: "http://backgroundcheckall.com/wp-content/uploads/2017/12/bayonetta-background-5.jpg",
    laughingMan: "https://pbs.twimg.com/profile_images/796545578507403265/VQMsYXot_400x400.jpg"
};
window.cblog = console::console.log;

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const loaders = [
    'Audio',
    'Ball-Triangle',
    'Bars',
    'Circles',
    'Grid',
    'Hearts',
    'Oval',
    'Puff',
    'Rings',
    'TailSpin',
    'ThreeDots'
];
const buttons = (() => {
    const names = [
        'disabled',
        'flat',
        'raised',
        [
            'normal',
            'primary',
            'danger',
            'accent'
        ]
    ];

    const make = (base, name, values) =>
        values.reduce(
            (list, value) => [
                ...list,
                <doric.button
                    {...{...base, [name]: value}}
                    text="demo"
                    onTap={() => cblog(base, name, value)}
                />
            ],
            []
        );

    const makeAll = (array, base = {}) => {
        const opt = array[0];
        let arr = [];

        if (Array.isArray(opt) === true) {
            for (const op of opt) {
                // console.log(base, op);
                arr = [...arr, ...make(base, op, [true])];
            }
        }
        else {
            arr = [
                ...arr,
                ...makeAll(array.slice(1), {...base, [opt]: true}),
                ...makeAll(array.slice(1), {...base, [opt]: false})
            ];
        }

        return arr;
    };
    return makeAll(names);
})();

class Functional extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        console.log('functional');
        return <div>Functional!</div>;
    }
}

class NeatDialog extends doric.pureBaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.initialValue || ""
        };
    }

    render = () => {
        const {close} = this.props;
        return (
            <div style={{height: 400}}>
                <doric.input.text value={this.state.input} onChange={this.linkState('input')} />
                <doric.button block text="Normal Close" onTap={close} />
                <doric.button block text="Text Close" onTap={() => close(this.state.input)} />
            </div>
        );
    }
}

const A = (props) => <div style={{backgroundColor: 'cyan', height: 70}} {...props} />;
const B = (props) => <div style={{backgroundColor: 'teal', height: '100%'}} {...props} />;

class Test extends doric.baseComponent {
    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            t: '',
            o: false,
            rv: null,
            c: false,
            n: 0,
            dialog: false,
            number: 0,
            s: ''
        };
        this.linked = this.createLinks('t', 'rv', 'c', 'n', 'o', 's');
    }

    add = () => {
        let {i} = this.state;
        i += 1;
        this.setState((...args) => {
            console.log(args);
            return {i};
        });
    }

    dialogTest = async () => {
        const value = await this.dialogs.show({
            content: props => {
                const {close} = props;
                return (
                    <doric.card>
                        <doric.card.title main="Alert?" />
                        Some message: {this.state.number}
                        <doric.divider />
                        <doric.button text="nope" onTap={this.modnum} primary />
                        <doric.button danger text="WOAH" block onTap={this.dialogTest} />
                        <doric.card.actions>
                            <doric.button block text="OK" onTap={() => close(Date.now())} />
                        </doric.card.actions>
                    </doric.card>
                )
            }
        });
        console.log(value);
    }
    @autobind
    async tallDialog() {
        // console.log(await this.dialogs.show(
        //     {
        //         content: () => <div style={{height: 400, background: "linear-gradient(to bottom right, black, fuchsia)"}} />,
        //         actions: ({close}) => <doric.button text="OK" block onTap={close} />
        //     },
        //     {title: "Tall Boi"}
        // ));
        console.log(
            await this.dialog.show(
                ({close}) => {
                    const content = (
                        <div>
                            {this.state.number}
                            <div style={{height: 400, background: "linear-gradient(to bottom right, black, fuchsia)"}} />
                        </div>
                    );
                    const actions = <doric.button text="OK" block onTap={close} />;
                    return <doric.dialog title="Tall Boi" content={content} actions={actions} />;
                }
            )
        );
    }
    @autobind
    async alertDialog() {
        console.log(await this.dialog.alert("Just Monika", "Doki Doki"));
    }
    @autobind
    async okDialog() {
        console.log(await this.dialog.confirm("Just Monika?", "Doki Doki"));
    }
    @autobind
    async promptDialog() {
        console.log(await this.dialog.prompt("Just Monika?", "Doki Doki", "Ok"));
    }
    @autobind
    async spinnerDialog() {
        window.spinner = this.dialog.spinner("Testing Spinner");
        // await wait(1000);
        // spinner.close();
    }

    toggleDialog = () => {
        const dialog = this.state.dialog === false;
        this.setStatef({dialog});
    }
    alertTest = () => {
        dialog.alert("Test");
    }
    modnum = () => this.setStatef({number: this.state.number + 1})

    render() {
        return (
            <div style={{overflow: 'hidden'}}>
                {/* <doric.flex>
                    <doric.flex.gridCol size={1}><B>Test</B></doric.flex.gridCol>
                    <doric.flex.gridCol size={1}><B>Test<br />Test</B></doric.flex.gridCol>
                    <doric.flex.gridCol size={2}><B /></doric.flex.gridCol>
                    <doric.flex.gridCol size={3}><B /></doric.flex.gridCol>
                    <doric.flex.gridCol size={4}><B /></doric.flex.gridCol>
                </doric.flex>
                <doric.flex>
                    <doric.flex.col grow={1}><B>Test</B></doric.flex.col>
                    <doric.flex.col grow={1}><B>Test<br />Test</B></doric.flex.col>
                    <doric.flex.col grow={2}><B /></doric.flex.col>
                    <doric.flex.col grow={3}><B /></doric.flex.col>
                    <doric.flex.col grow={4}><B /></doric.flex.col>
                </doric.flex> */}
                <doric.button block text="Dialog" onTap={this.dialogTest} />
                <doric.button block text="tall" onTap={this.tallDialog} />
                <doric.button block text="Neat Dialog" onTap={this.alertDialog} />
                <doric.button block text="OK / Cancel" onTap={this.okDialog} />
                <doric.button block text="Prompt" onTap={this.promptDialog} />
                <doric.button block text="Spinner" onTap={this.spinnerDialog} />

                <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" />
                <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" required />
                <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" optional />

                <doric.select value={this.state.s} onChange={this.linked.s} label="Select">
                    <option value="" hidden>Nope</option>
                    <option value='a'>A</option>
                    <option value='b'>B</option>
                    <option value='c'>C</option>
                </doric.select>
                {/* <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" disabled />
                <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" required loader={true} />
                <doric.input.text value={this.state.t} onChange={this.linked.t} label="Some Label" optional loader={true} loaderType="TailSpin" />
                <doric.card>
                    <doric.card.title.pure main="Main Title" subtitle="subtitle" icon={images.laughingMan} />
                    <doric.card.media>
                        <doric.image height="100%" source={images.bayoBG} />
                    </doric.card.media>
                    Some content
                    <doric.divider />
                    More content!
                    <doric.card.actions>
                        <doric.button text="Normal" onTap={this.dialogTest} />
                        <doric.button.pure text="Primary" primary />
                        <doric.button.pure text="Danger" danger />
                        <doric.button text="Accent" accent />
                    </doric.card.actions>
                </doric.card>
                <doric.checkbox.pure checked={this.state.c} onChange={this.linked.c} label="Checkbox?" />
                <doric.toggle.pure label="Toggle!" on={this.state.o} onChange={this.linked.o} />
                <doric.select value={this.state.s} onChange={this.linkState('s')}>
                    {(0).to(10).map(i => <option value={i}>{i}</option>)}
                </doric.select>
                <doric.collapse title="Collapse">
                    <doric.radio value={this.state.rv} onChange={this.linked.rv} children={(0).to(10).map(i => <option value={i}>{i}</option>)}>
                        {(0).to(10).map(i => <option value={i}>{i}</option>)}
                    </doric.radio>
                </doric.collapse>
                <doric.slider min={-100} max={100} value={this.state.n} onChange={this.linked.n} /> */}
            </div>
        );
    }
}
const Main = doric.dialogify(Test);

// const wait = time => new Promise(resolve => setTimeout(resolve, time));
class DemoMenu extends React.Component {
    @autobind
    transition(url) {
        return () => {
            console.log(url);
            this.props.toggle();
        };
    }

    render() {
        return (
            <React.Fragment>
                <doric.button text="Menu Item" onTap={this.transition("/test")} />
                <doric.button text="Menu Item" />
                <doric.button text="Menu Item" />
                <doric.button text="Menu Item" />
            </React.Fragment>
        );
    }
}
@doric.dialogify
class Test2 extends doric.baseComponent {
    render() {
        return (
            <doric.appContainer title="Testing" back="Test" onBack={::console.log}>
                <doric.iconButton icon="ion-trash-b" text="Text" onTap={() => this.dialog.alert('test')} />
                <doric.iconButton icon="ion-trash-b" text="Text" onTap={() => this.dialog.confirm('test')} />
                <doric.iconButton icon="ion-trash-b" text="Text" onTap={() => this.dialog.prompt('test')} />
                <doric.iconButton icon="ion-trash-b" onTap={() => this.dialog.show(() => <doric.dialog content="hi" />)} />
            </doric.appContainer>
        );
    }
}

window.doric = doric;

doric.init(
    <Test2 />,
    document.querySelector("div")
);
