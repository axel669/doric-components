import React from 'react';

import style from '../style.js';

const gridStyle = {
    "doric-grid": {
        display: 'block'
    },
    "doric-grid::before": {
        content: `" "`,
        display: 'table'
    },
    "doric-grid::after": {
        content: `" "`,
        display: 'table',
        clear: 'both'
    },
    "doric-col": {
        float: 'left'
    }
};

for (const i of (1).to(13)) {
    const width = ((i / 12) * 100).toPrecision(8);
    gridStyle[`doric-col.w${i}`] = {
        width: `${width}%`
    };
    gridStyle[`doric-col.offset${i}`] = {
        marginLeft: `${width}%`
    };
}

style.add(gridStyle);

const DoricGrid = ({children}) => {
    return (
        <doric-grid>
            {children}
        </doric-grid>
    );
};
const DoricCol = ({size = 1, offset = null, ...props}) => {
    let className = `w${size}`;
    if (offset !== null) {
        className = `${className} offset${offset}`;
    }
    return <doric-col class={className} {...props} />;
};
const DoricGridBreak = () => <doric-col class="w12" />;

DoricGrid.col = DoricCol;
DoricGrid.break = DoricGridBreak;

export default DoricGrid;

// export {
//     DoricGrid as Grid,
//     DoricCol as Col,
//     DoricGridBreak as GridBreak
// };
