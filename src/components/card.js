import theme from '../theme';
import style from '../style';

import Image from './image';

style.add({
    "doric-card": {
        display: 'block',
        margin: 4,
        boxShadow: [
            '2px 0px 2px rgba(0, 0, 0, 0.25)',
            '0px 2px 2px rgba(0, 0, 0, 0.25)',
            '-2px 0px 2px rgba(0, 0, 0, 0.25)',
            '0px -2px 2px rgba(0, 0, 0, 0.25)'
        ].join(', '),
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 5,
        position: 'relative',
        top: 0,
        left: 0
    },
    "doric-card[side-img='true']": {
        paddingRight: 80
    },
    "doric-card > card-content": {
        display: 'block',
        padding: 3
    },
    "doric-card > card-title": {
        display: 'block',
        padding: 5,
        fontSize: 20,
        backgroundColor: theme.card.title.bg,
        color: theme.card.title.color
    },
    "doric-card > card-action": {
        display: 'block',
        padding: 5
    },
    "doric-card > doric-card-side-image": {
        position: 'absolute',
        left: 'auto',
        right: 0,
        top: 0,
        bottom: 0,
        width: 80
    }
});
export default props => {
    const {
        title = null,
        sideImage = null,
        ...passThrough
    } = props;

    let titleElem = null;
    let actionElem = null;
    let sideImg = null;

    if (title !== null) {
        titleElem = <doric-card-title>{title}</doric-card-title>;
    }

    if (sideImage !== null) {
        sideImg = (
            <doric-card-side-image>
                <Image height="100%" source={sideImage} imageSize="cover" />
            </doric-card-side-image>
        );
    }

    return (
        <doric-card {...passThrough} side-img={sideImage !== null}>
            {props.children}
            {sideImg}
        </doric-card>
    );
};
