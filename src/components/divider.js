import style from '../style';
import theme from '../theme';

style.add({
    "doric-divide": {
        display: 'block',
        height: 0,
        borderBottom: `2px solid ${theme.divider.color}`,
        margin: '12px 0px'
    }
});
const Divider = props => <doric-divide {...props} />;

export default Divider;
