import theme from '../theme';
import style from '../style';

style.add({
    "doric-image": {
        display: 'block',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
    }
});

export default ({source, height}) => {
    const style = {
        backgroundImage: `url("${source}")`,
        height
    };
    return <doric-image style={style} />;
};
