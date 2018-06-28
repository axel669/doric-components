import React from 'react';
import ReactDOM from 'react-dom';

import doric from '../../index.js';

window.images = {
    boxxy: "http://axel669.net/images/boxxy.png",
    bayoBG: "http://backgroundcheckall.com/wp-content/uploads/2017/12/bayonetta-background-5.jpg",
    laughingMan: "https://pbs.twimg.com/profile_images/796545578507403265/VQMsYXot_400x400.jpg"
};
window.cblog = console::console.log;

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
        values.reduce((list, value) => [...list, <doric.button {...{...base, [name]: value}} text="demo" onTap={() => cblog(base, name, value)} />], []);

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

doric.style.add({
    "doric-dialog-base": {
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'visible',
        width: 0,
        height: 0
    },
    "doric-dialog-wrapper": {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        animationName: 'doric-dialog-fade-in'
    },
    "doric-dialog-container": {
        position: 'absolute',
        top: '10vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70vmin',
        height: '60vmin'
    }
});

class DialogManager extends doric.baseComponent {
    constructor(props) {
        super(props);

        this.state = {
            dialogs: []
        };
    }

    addDialog = Component => {
        const id = Date.now();
        const close = () => {
            this.setStatef({
                dialogs: doric.util.update(
                    this.state.dialogs,
                    {$filter: dialog => dialog.id !== id}
                )
            });
        };
        const dialog = {
            id,
            element: (
                <doric-dialog-wrapper key={id}>
                    <doric-dialog-container>
                        <Component close={close} />
                    </doric-dialog-container>
                </doric-dialog-wrapper>
            )
        };
        const dialogs = doric.util.update(
            this.state.dialogs,
            {"$push": dialog}
        );
        this.setStatef({dialogs});
    }

    componentWillUpdate = (nprops, nstate) => {
        if (nstate.dialogs.length > 0) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
    }

    render = () => {
        return (
            <React.Fragment>
                {this.state.dialogs.map(d => d.element)}
            </React.Fragment>
        );
    }
}
const dialog = (() => {
    const container = document.createElement("doric-dialog-base");

    document.body.appendChild(container);

    const manager = ReactDOM.render(
        <DialogManager />,
        container
    );
    const show = Container => manager.addDialog(Container);

    return {
        show,
        alert(msg) {
            show(({close}) => (
                <doric.card>
                    <doric.card.title main="Alert" />
                    {msg}
                    <doric.card.actions>
                        <doric.button text="Ok" block primary onTap={close} />
                    </doric.card.actions>
                </doric.card>
            ));
        }
    };
})();

const Dialog = ({children, open}) => {
    if (open === false) {
        return null;
    }

    return (
        <doric-dialog-wrapper>
            <doric-dialog-container>
                {children}
            </doric-dialog-container>
        </doric-dialog-wrapper>
    );
};


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
            dialog: false
        };
        this.linked = this.createLinks('t', 'rv', 'c', 'n', 'o');
    }

    add = () => {
        let {i} = this.state;
        i += 1;
        this.setState((...args) => {
            console.log(args);
            return {i};
        });
    }

    dialogTest = () => {
        dialog.show(({close}) => (
            <doric.card>
                <doric.card.title main="Alert?" />
                Some message
                <doric.card.actions>
                    <doric.button block text="OK" onTap={close} />
                </doric.card.actions>
            </doric.card>
        ));
    }

    toggleDialog = () => {
        const dialog = this.state.dialog === false;
        this.setStatef({dialog});
    }
    alertTest = () => {
        dialog.alert("Test");
    }

    render = () => {
        return (
            <div style={{overflow: 'hidden'}}>
                <doric.button text="Dialog" onTap={this.toggleDialog} />
                <doric.button primary text="Alert" onTap={this.alertTest} />

                <Dialog open={this.state.dialog}>
                    <doric.card>
                        <doric.card.title main="Alert?" />
                        Some message
                        <doric.card.actions>
                            <doric.button block text="OK" onTap={this.toggleDialog} />
                        </doric.card.actions>
                    </doric.card>
                </Dialog>
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

doric.init(
    <Test />,
    document.querySelector("div")
);
