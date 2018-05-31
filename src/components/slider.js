import theme from '../theme';
import style from '../style';

const thumbOverride = {
    "WebkitAppearance": 'none',
    width: 20,
    height: 20,
    border: '1px solid black'
};

style.add({
    "doric-slider > input[type='range']::-webkit-slider-thumb": thumbOverride,
    "doric-slider > input[type='range']::-moz-range-thumb": thumbOverride
});

export default props => {
    const {
        min = 0, max = 100,
        value = min,
        onChange = (() => {}),
        ...passThrough
    } = props;
    const changeHandler = evt => onChange(evt.target.value);

    return (
        <doric-slider {...passThrough}>
            <input type="range" {...{min, max, value}} onChange={changeHandler} />
        </doric-slider>
    );
};
