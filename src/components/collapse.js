import CustomListeners from './customListeners';
import Icon from './icon';
import Button from './button';

import util from '../util';
import style from '../style';

style.add({
    "doric-collapse": {
        display: 'block',
        border: '1px solid black',
        borderRadius: 3,
        margin: 3,
        overflow: 'hidden'
    },
    "doric-collapse-title": {
        display: 'block',
        cursor: 'pointer',
        backgroundColor: util.color.primaryBlue,
        // padding: '3px 5px',
        position: 'relative',
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
    },
    "doric-collapse-title::after": {
        content: `"${Icon.icons["ion-plus"]}"`,
        position: 'absolute',
        top: '50%',
        left: 'auto',
        right: 5,
        transform: 'translateY(-50%)',
        fontFamily: "Ionic",
        fontSize: 16
    },
    "doric-collapse[open='true'] doric-collapse-title::after": {
        content: `"${Icon.icons["ion-minus"]}"`
    },
    "doric-collapse-content": {
        display: 'block',
        marginTop: 2
    },
    "doric-collapse[open='false'] > doric-collapse-content": {
        display: 'none'
    }
});
class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    toggle = () => {
        const open = this.state.open === false;
        this.setState(() => ({open}));
    }

    render = () => {
        const {
            title,
            children,
            ...props
        } = this.props;
        const {open} = this.state;

        return (
            <doric-collapse {...props} open={open}>
                <doric-collapse-title>
                    {/* <CustomListeners listeners={{onTap: this.toggle}} />
                    {title} */}
                    <Button text={title} style={{textAlign: 'left'}} onTap={this.toggle} block flush />
                </doric-collapse-title>
                <doric-collapse-content>
                    {children}
                </doric-collapse-content>
            </doric-collapse>
        );
    }
}

export default Collapse;
