import ssjs from "ssjs";
import theme from "@theme";
const titleCSS = ssjs({
  "doric-title": {
    display: "block",
    margin: 2,
    padding: "4px 12px",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)",
    border: "1px solid lightgray",
    backgroundColor: theme => theme.title.bg.color,
    "&::after": {
      content: "' '",
      display: "table",
      clear: "both"
    },
    "& > div": {
      fontSize: 20
    },
    "& > span": {
      fontSize: 12,
      color: "gray",
      float: "left"
    },
    "& > doric-image": {
      float: "left",
      marginRight: 8
    }
  }
}, {
  name: "doric-title"
});
titleCSS.generate(theme);

function Title(props) {
  const {
    title,
    subtitle,
    profile,
    image
  } = props;
  return React.createElement("doric-title", null, React.createElement("div", null, title), React.createElement("span", null, subtitle));
}

export default Title;