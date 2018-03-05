import 'gesturesjs/es6';
import ssjs from 'ssjs';
import button from './components/button';
import style from './style';

import loaderGIF from './images/double-ring.gif';

const doric = {
    button
};

const sheet = ssjs.create();
sheet.addStyles(style);
sheet.addStyles({
    "doric-image": {
        display: 'block',
        width: 250,
        height: 250
    }
});

const Image = ({src}) => {
    const style = {
        backgroundImage: `url("${src}")`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    };
    return <doric-image style={style} />;
};

const Array2d = (w, h, value = null) => {
    if (value === null) {
        value = () => 0;
    }
    if (typeof value !== 'function') {
        const temp = value;
        value = () => temp;
    }

    const values = [];
    for (let i = 0; i < w * h; i += 1) {
        values.push(
            value(
                i % w,
                (i / w) | 0
            )
        );
    }

    return {
        get(x, y) {
            if (x < 0 || x >= w || y < 0 || y >= h) {
                return undefined;
                // throw new Error("Out of bounds");
            }
            return values[x + y * h];
        },
        set(x, y, value) {
            if (x < 0 || x >= w || y < 0 || y >= h) {
                return;
                // throw new Error("Out of bounds");
            }
            values[x + y * w] = value;
        },
        map(func) {
            return values.map(
                (value, i) => {
                    return func(value, i % w, (i / w) | 0);
                }
            );
        },
        print() {
            const lines = [];
            for (let y = 0; y < h; y += 1) {
                const line = [];
                for (let x = 0; x < w; x += 1) {
                    line.push(values[x + y * w]);
                }
                lines.push(line.join(' '));
            }
            console.log(lines.join('\n'));
        }
    };
};

const size = 40;
sheet.addStyles({
    "game-lightboard": {
        display: 'block',
        position: 'relative',
        top: 0,
        left: 0,
        border: '1px solid blue',
        width: size * 5 + 2,
        height: size * 5 + 2
    },
    "game-light": {
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        border: '1px solid green'
    },
    "game-light[on='0']": {
        backgroundColor: 'black'
    },
    "game-light[on='1']": {
        backgroundColor: '#e4b71c'
    }
});
const Light = (value, x, y, toggle) =>
    <game-light key={`${x}-${y}`} style={{transform: `translate(${x * size}px, ${y * size}px)`}} on={value} onTouchStart={() => toggle(x, y)} />;

class LightBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lights: Array2d(5, 5, (x, y) => (x % 2 === 1 && y % 2 === 1) ? 1 : 0)
        };
    }

    toggle = (x, y) => {
        const {lights} = this.state;

        lights.set(x, y, 1 - lights.get(x, y));
        lights.set(x - 1, y, 1 - lights.get(x - 1, y));
        lights.set(x + 1, y, 1 - lights.get(x + 1, y));
        lights.set(x, y - 1, 1 - lights.get(x, y - 1));
        lights.set(x, y + 1, 1 - lights.get(x, y + 1));

        this.setState({lights});
    }

    render = () => {
        const {lights} = this.state;

        return (
            <game-lightboard>
                {lights.map((value, x, y) => Light(value, x, y, this.toggle))}
            </game-lightboard>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LightBoard />
                <doric.button content="Randomize" />
            </div>
        );
    }
}

sheet.attach();
ReactDOM.render(
    <Main />,
    // <div>
    //     {/* <doric.button content={<Image src={loaderGIF} />} /> */}
    //     <doric.button content="Test" />
    //     <doric.button content="Test" raised />
    //     <doric.button content="Test" raised disabled />
    //     <div />
    //     {/* <Image src={loaderGIF} /> */}
    // </div>,
    document.querySelector("div")
);
