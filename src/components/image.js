import theme from '../theme';
import style from '../style';

style.add({
    "doric-image": {
        display: 'block',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    }
});

export default ({source, height, imageSize = 'contain'}) => {
    const style = {
        backgroundImage: `url("${source}")`,
        height,
        backgroundSize: imageSize
    };
    return <doric-image style={style} />;
};
