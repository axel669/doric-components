import style from '../style';

const globalListeners = {};
const registerGlobalListener = (type, elem, handler) => {
    if (globalListeners.hasOwnProperty(type) === false) {
        globalListeners[type] = new Map();
        window.addEventListener(
            type,
            evt => {
                const handlers = globalListeners[type];
                let current = evt.target;
                while (current !== null) {
                    if (handlers.has(current) === true) {
                        handlers.get(current)(evt);
                    }
                    current = current.parentNode;
                }
            }
        );
    }

    globalListeners[type].set(elem, handler);
};
const removeGlobalListener = (type, elem) => {
    globalListeners[type].delete(elem);
};


class CustomListeners extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const {listeners = {}} = this.props;
        this.elem = ReactDOM.findDOMNode(this).parentNode;
        this.types = [];

        for (const type of Object.keys(listeners)) {
            const evtType = type.slice(2).toLowerCase();
            registerGlobalListener(
                evtType,
                this.elem,
                evt => this.props.listeners[type](evt)
            );
            this.types.push(evtType);
        }
        if (this.types.length === 0) {
            console.warn("0 custom listeners added. check the spelling of the 'listeners' property");
        }
    }

    componentWillUnmount = () => {
        for (const type of this.types) {
            removeGlobalListener(type, this.elem);
        }
    }

    render = () => {
        return <custom-listener style={{display: 'none'}} />;
    }
}

export default CustomListeners;
