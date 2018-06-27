import React from 'react';

import style from '../style';
import theme from '../theme';

style.add({
    "doric-divide": {
        display: 'block',
        height: 0,
        borderBottom: `2px solid ${theme.divider.border.normal}`,
        margin: '12px 0px'
    }
});
const DoricDivider = props => <doric-divide {...props} />;

export default DoricDivider;
