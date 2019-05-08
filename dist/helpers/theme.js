// import {Color} from "@css";
import ssjs from "ssjs/esm";
const blue = ssjs.color.fromHex("#1d62d5");
const lightblue = ssjs.color.fromHex("#2196F3");
const theme = {
  highlightColor: ssjs.color(0, 0, 0, 0.4),
  outline: blue,
  focusOutline: `2px solid ${blue.opacity(0.5)}`,
  color: {
    primary: blue,
    secondary: ssjs.color.fromHex("#128f12"),
    danger: ssjs.color.fromHex("#F44336"),
    accent: ssjs.color.fromHex("#FF4081")
  },
  bg: {
    color: ssjs.color.fromHex("#F0F0F0")
  },
  label: {
    text: {
      normal: ssjs.color(0, 0, 0),
      required: ssjs.color(255, 0, 0),
      optional: ssjs.color(0, 128, 255)
    }
  },
  collapse: {
    border: {
      color: ssjs.color(0, 0, 0)
    }
  },
  input: {
    border: {
      focus: blue
    },
    label: {
      required: ssjs.color(255, 0, 0),
      optional: blue
    }
  },
  navbar: {
    bg: {
      color: blue
    },
    text: {
      color: "white"
    }
  },
  panel: {
    bg: {
      color: "white"
    }
  },
  tabs: {
    selected: lightblue
  },
  title: {
    bg: {
      color: "white"
    }
  }
};
export default theme;