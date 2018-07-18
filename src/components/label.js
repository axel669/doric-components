import React from 'react';

import theme from '../theme';
import style from '../style';

style.add({
    "doric-label": {
        display: 'block',
        padding: 2,
        color: theme.label.text.normal,
        fontSize: 12
    },
    "doric-label[required]": {
        color: theme.label.text.required
    },
    "doric-label[optional]": {
        color: theme.label.text.optional
    },
    "doric-label:empty": {
        display: 'none'
    }
});

export default props => <doric-label {...props} />;
