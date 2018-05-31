import theme from '../theme';
import style from '../style';

import Icon from './icon';
import CustomListeners from './customListeners';

import util from '../util';

const size = 30;
style.add({
    "doric-toggle": {
        display: 'flex',
        position: 'relative',
        top: 0,
        left: 0,
        paddingLeft: size * 2 + 10,
        alignItems: 'center'
    },
    "doric-toggle[disabled='true']": {
        opacity: 0.7
    },
    "doric-toggle::after": {
        ...util.background.after.base
    },
    "doric-toggle[data-tap-active]:not([disabled='true'])::after": {
        ...util.background.after.colorize(theme.toggle.hl)
    },
    "doric-toggle > doric-toggle-content": {
        flexGrow: 1,
        padding: 5
    },
    "doric-toggle > doric-toggle-thumb": {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: size * 2 + 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    "doric-toggle-thumb > div": {
        position: 'relative',
        top: 0,
        left: 0,
        width: size * 2,
        height: 20,
        backgroundColor: theme.toggle.track.offColor,
        transition: 'background-color 100ms linear',
        borderRadius: 5
    },
    "doric-toggle-thumb > div::after": {
        content: `""`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: 20,
        backgroundColor: theme.toggle.thumb.offColor,
        transition: 'transform 100ms linear',
        borderRadius: 5
    },
    "doric-toggle-thumb[on='true'] > div": {
        backgroundColor: theme.toggle.track.onColor
    },
    "doric-toggle-thumb[on='true'] > div::after": {
        backgroundColor: theme.toggle.thumb.onColor,
        transform: `translateX(${size}px)`
    },
    "doric-toggle[toggleRight='true']": {
        paddingLeft: 0,
        paddingRight: size * 2 + 10
    },
    "doric-toggle[toggleRight='true'] > doric-toggle-thumb": {
        left: 'auto',
        right: 0
    },
    "doric-toggle[alignRight]": {
        textAlign: 'right'
    }
});

export default props => {
    const {
        label,
        children,
        on,
        onChange = (() => {}),
        onKeyDown: passedOKD = (() => {}),
        tabIndex = 0,
        ...passThrough
    } = props;
    const {disabled} = props;
    const onTap = evt => {
        if (disabled !== true) {
            onChange({...evt, type: 'change', value: on === false});
        }
    };
    const onKeyDown = evt => {
        passedOKD(evt);
        if (evt.key === ' ' || evt.key === 'Enter') {
            onTap(evt);
        }
    };

    return (
        <doric-toggle tabIndex={disabled === true ? null : tabIndex} {...passThrough} onKeyDown={onKeyDown}>
            <CustomListeners listeners={{onTap}} />
            <doric-toggle-content>
                {label || children}
            </doric-toggle-content>
            <doric-toggle-thumb on={on}>
                <div />
            </doric-toggle-thumb>
        </doric-toggle>
    );
};
