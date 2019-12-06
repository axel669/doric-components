import React from "react";
import ssjs from "ssjs";
import range from "@axel669/range";

import api from "@api";
import {tappable, classes} from "@css";

const gridSpans = range(2, 13).reduce(
    (spans, i) => ({
        ...spans,
        [`& [gcolspan="${i}"]`]: {
            gridColumn: `span ${i}`
        }
    }),
    {}
);
const gridCSS = ssjs(
    {
        "doric-grid": {
            display: "grid",
            gridGap: 2,
            ...gridSpans,
            "&[clearmargin='true'] > *": {
                margin: 0
            }
        }
    },
    {name: "doric-grid"}
);
api.addCSS(gridCSS);

function Grid(props) {
    const {
        cols = 12, vAlign = "start", colGap = 0,
        children, className,
        ...passThrough
    } = props;

    const style = {
        ...passThrough.style,
        gridTemplateColumns: range(cols, () => "1fr").join(" "),
        alignItems: vAlign,
        columnGap: colGap
    }

    const _ = {
        ...passThrough,
        class: className,
        style
    };

    return <doric-grid {..._}>
        {children}
    </doric-grid>
}

export default Grid;
