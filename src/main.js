import 'gesturesjs/es6';
import ssjs from 'ssjs';
import button from './components/button';
import image from './components/image';
import style from './style';

// import loaderGIF from './images/double-ring.gif';

const doric = {
    button,
    image
};

window.cblog = console::console.log;
window.cberr = console::console.error;

const sheet = ssjs.create();
sheet.addStyles(style);

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{overflow: 'hidden'}}>
                <doric.button block onTap={() => console.log("BOXXY")}>
                    <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
                </doric.button>
                <doric.button block style={{height: 70}} content="Text" />
                <doric.image source="http://axel669.net/images/boxxy.png" height={150} />
            </div>
        );
    }
}

sheet.attach();
ReactDOM.render(
    <Main />,
    document.querySelector("div")
);
