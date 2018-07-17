import React from 'react';

import style from '../style.js';

const flexCSS = {
    "doric-flex": {
        display: 'flex',
        flexWrap: 'wrap'
    },
    "doric-flex-grid-col": {
        flex: '1'
    }
};
for (const i of (1).to(13)) {
    const width = ((i / 12) * 100).toPrecision(8);
    flexCSS[`doric-flex-grid-col[size='${i}']`] = {
        minWidth: `${width}%`,
        maxWidth: `${width}%`
    };
}
style.add(flexCSS);

const DoricFlex = (props) => <doric-flex {...props} />;
const DoricFlexCol = ({grow = 1, shrink = grow, style = {}, ...props}) => <doric-flex-col style={{...style, flex: `${grow} ${shrink}`}} {...props} />;
const DoricFlexGridCol = (props) => <doric-flex-grid-col {...props} />;

DoricFlex.col = DoricFlexCol;
DoricFlex.gridCol = DoricFlexGridCol;

export default DoricFlex;
