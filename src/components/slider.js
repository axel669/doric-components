import React from 'react';

import theme from '../theme';
import style from '../style';

style.add({
    "doric-slider": {
        margin: '4px 12px',
        display: 'block',
        height: 20
    },
    "doric-slider > input[type='range']": {
        WebkitAppearance: 'none',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '+1',
        opacity: 0
    },
    'doric-slider > doric-slider-track-bg': {
        position: 'absolute',
        top: 9,
        left: 10,
        bottom: 9,
        right: 10,
        backgroundColor: theme.slider.track.bg.normal
    },
    'doric-slider doric-slider-track': {
        backgroundColor: theme.slider.track.bg.value,
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%'
    },
    'doric-slider doric-slider-track::after': {
        content: `""`,
        position: 'absolute',
        left: '100%',
        top: '50%',
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: theme.slider.thumb.normal,
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
    }
});
class DoricSlider extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render = () => {
        const {
            min = 0,
            max = 10,
            value = 0,
            onChange = (() => {})
        } = this.props;

        const range = max - min;
        const dist = value - min;
        const pos = (dist / range) * 100;

        return (
            <doric-slider style={{position: 'relative'}}>
                <input type="range" {...{min, max}} value={value} onChange={onChange} />
                <doric-slider-track-bg>
                    <doric-slider-track style={{width: `${pos}%`}} />
                </doric-slider-track-bg>
            </doric-slider>
        );
    }
}

export default DoricSlider;
