const query = {
  mobile: screen.availWidth <= 640
}; // const parseColor = (args) => {
//     if (typeof args[0] === "string") {
//         const color = args[0].startsWith("#")
//             ? args[0].slice(1)
//             : args[0];
//         const alpha = color.length > 6
//             ? color.slice(6, 8)
//             : "FF";
//
//         return [
//             parseInt(color.slice(0, 2), 16),
//             parseInt(color.slice(2, 4), 16),
//             parseInt(color.slice(4, 6), 16),
//             parseInt(alpha, 16) / 255
//         ];
//     }
//     return args;
// };
// const Color = (...args) => {
//     const [r, g, b, a] = parseColor(args);
//     if (a === 1) {
//         `rgb(${r}, ${g}, ${b})`;
//     }
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
// };
// Color.inverse = (color) => {
//     const [r, g, b, a] = parseColor(color);
//     return Color(255 - r, 255 - g, 255 - b, a);
// };
// const Color = (...args) => {
//     const [r, g, b, a = 1] = (() => {
//         if (typeof args[0] === "string") {
//             const color = args[0].startsWith("#")
//                 ? args[0].slice(1)
//                 : args[0];
//             const alpha = color.length > 6
//                 ? color.slice(6, 8)
//                 : "FF";
//
//             return [
//                 parseInt(color.slice(0, 2), 16),
//                 parseInt(color.slice(2, 4), 16),
//                 parseInt(color.slice(4, 6), 16),
//                 parseInt(alpha, 16) / 255
//             ];
//         }
//         return args;
//     })();
//
//     const color = () => {
//         if (a === 1) {
//             `rgb(${r}, ${g}, ${b})`;
//         }
//         return `rgba(${r}, ${g}, ${b}, ${a})`;
//     };
//     color.inverse = () => Color(255 - r, 255 - g, 255 - b, a);
//     color.opacity = alpha => Color(r, g, b, alpha);
//     color.toString = color;
//
//     return color;
// };

const tapActive = ".gjs-tap-active:not(.disabled):not(.flat)::after";

const bcolorVariant = colorName => ({
  [`&.${colorName}`]: {
    backgroundColor: theme => theme.color[colorName],
    color: "white",
    [`&.flat`]: {
      backgroundColor: "transparent",
      color: theme => theme.color[colorName]
    },
    [`&${tapActive}`]: {
      backgroundColor: theme => theme.highlightColor.invert()
    }
  }
});

const tappable = color => {
  const style = {
    position: "relative",
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition: "background-color 250ms linear"
    },
    "&.gjs-tap-active:not(.disabled)::after": {
      transition: "none",
      backgroundColor: color
    }
  }; // if (query.mobile === false) {
  //     style["&:hover"] = {
  //         boxShadow: "0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
  //     };
  // }

  return style;
};

const classes = obj => {
  let list = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key === "className" && value !== undefined) {
      list.push(value);
    }

    if (value === true) {
      list.push(key);
    }
  }

  return list.join(" ");
};

export { // Color,
bcolorVariant, tappable, classes, query };