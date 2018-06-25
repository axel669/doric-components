import React from 'react';

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
        backgroundColor: theme.card.bg.normal,
        overflow: 'hidden',
        border: `1px solid ${theme.card.border.normal}`,
        borderRadius: 2,
        padding: 12,
        position: 'relative',
        top: 0,
        left: 0
    },
    "doric-card > :first-child": {
        marginTop: -12
    },
    "doric-card > :last-child": {
        marginBottom: -12
    },
    "doric-card > [data-card-flush], doric-card-media": {
        marginLeft: -12,
        marginRight: -12
    },
    "doric-card-title, doric-card-actions": {
        display: 'block',
        margin: '12px 0px',
        padding: 12
    },
    "doric-card-media + doric-card-title": {
        marginTop: 0
    },
    "doric-card-title + doric-card-media": {
        marginTop: -12
    },
    "doric-card-media": {
        height: 180,
        display: 'block',
        marginBottom: 12
    },
    "doric-card-title::before": {
        content: `" "`,
        display: 'table'
    },
    "doric-card-title::after": {
        content: `" "`,
        display: 'table',
        clear: 'both'
    },
    "doric-card > doric-card-actions[data-divider]": {
        borderTop: `2px solid ${theme.divider.color}`
    },
    "doric-card-actions :first-child": {
        marginLeft: 0
    },
    ".doric-title-main": {
        fontSize: 22,
        marginBottom: 8
    },
    ".doric-title-subtitle": {
        float: 'left',
        color: '#666'
    },
    ".doric-title-icon": {
        width: 48,
        height: 48,
        float: 'left',
        borderRadius: 24,
        marginRight: 8,
        overflow: 'hidden'
    }
});
const Card = props => {
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
Card.actions = props => {
    const divider = props.divider;

    return (
        <doric-card-actions data-card-flush data-divider={divider}>
            {props.children}
        </doric-card-actions>
    );
};
Card.media = props => <doric-card-media {...props} />;
Card.title = props => {
    const {main, subtitle, icon = null} = props;
    const iconElement = (icon === null)
        ? null
        : <div className="doric-title-icon"><Image source={icon} width="100%" height="100%" imageSize="cover" /></div>;

    return (
        <doric-card-title data-card-flush>
            {iconElement}
            <div className="doric-title-main">{main}</div>
            <div className="doric-title-subtitle">{subtitle}</div>
        </doric-card-title>
    );
};

export default Card;
