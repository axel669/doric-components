function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import ssjs from "ssjs";
import theme from "@theme";
let imageCSS = ssjs({
  "doric-image": {
    display: "inline-block",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "contain",
    position: "relative",
    "& > img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0
    }
  }
}, {
  name: "doric-image"
});
imageCSS.generate(theme);

function Image(props) {
  const {
    source,
    width,
    height,
    size,
    round,
    ...passThrough
  } = props;
  const border = round == true ? {
    borderRadius: Math.max(width, height)
  } : {};
  const style = { ...passThrough.style,
    backgroundImage: `url('${source}')`,
    backgroundSize: size,
    width,
    height,
    ...border
  };
  return React.createElement("doric-image", _extends({}, passThrough, {
    style: style
  }), React.createElement("img", {
    src: source
  }));
}

export default Image;