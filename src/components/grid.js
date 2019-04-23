// import {Component} from "react"
import ssjs from "ssjs";

import theme from "@theme";
import {tappable, Color, classes} from "@css";

const range = (start, end = null, step = 1, map = i => i) => {
  	if (typeof end === "function") {
      	map = end;
      	end = null;
    }
    if (typeof step === "function") {
        map = step;
        step = 1;
    }
  	if (end === null) {
      	[start, end] = [0, start];
    }
    const factor = (end < start) ? -step : step;
    return Array.from(
        {length: Math.floor(Math.abs(end - start) / step)},
        (_, i) => map(start + i * factor)
    );
};
const gridSpans = range(12).reduce(
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
gridCSS.generate(theme);

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

// class Grid extends Component {
//     render() => {
//         let {
//             cols = 12, vAlign = "start", colGap = 0
//             children, className
//             ...passThrough
//         } = @props
//
//         let style = {
//             ...passThrough.style
//             gridTemplateColumns: [0...cols: () => "1fr"].join(" ")
//             alignItems: vAlign
//             columnGap: colGap
//         }
//
//         let props = {
//             ...passThrough
//             class: className
//             style
//         }
//
//         return <doric-grid {...props}>
//             {children}
//         </doric-grid>
//     }
// }
//
// export default Grid
