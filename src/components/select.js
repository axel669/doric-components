import icon from '../components/icon';
import style from '../style';

style.add({
    "doric-select": {
        display: 'block',
        margin: 2,
        position: 'relative'
    },
    "doric-select > select": {
        width: '100%',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        padding: '3px 5px',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottom: '1px solid #666',
        height: 30
    },
    "doric-select::after": {
        content: `"${icon.icons["ion-arrow-down-b"]}"`,
        fontFamily: "Ionic",
        fontSize: 16,
        position: 'absolute',
        left: 'auto',
        top: '50%',
        right: 5,
        color: '#666',
        transform: 'translateY(-50%)'
    }
});
const Select = props => {
    return (
        <doric-select>
            <select {...props} />
        </doric-select>
    );
};

export default Select;
