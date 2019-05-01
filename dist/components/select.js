import { memo } from "react";
import ssjs from "ssjs";
import theme from "../helpers/theme.js";
import { tappable, classes } from "../helpers/css.js";
let selectCSS = ssjs({
  "doric-select": {
    margin: 2,
    display: "block",
    "& fieldset": {
      borderRadius: 4,
      overflow: "hidden",
      padding: 0,
      paddingRight: 1,
      backgroundColor: "white",
      border: "1px solid black",
      margin: 0,
      "&.disabled": {
        backgroundColor: "lightgray"
      },
      "&.boring": {
        borderWidth: 0,
        backgroundColor: "transparent"
      },
      "& legend": {
        marginLeft: 16,
        fontSize: 12,
        "&:empty": {
          display: "none"
        },
        "&:not(:empty) + input": {
          paddingTop: 6
        }
      },
      "&.required legend": {
        color: theme => theme.input.label.required
      },
      "&.optional legend": {
        color: theme => theme.input.label.optional
      },
      "&:focus-within": {
        borderColor: theme => theme.input.border.focus
      }
    },
    "& select": {
      display: "block",
      width: "100%",
      fontSize: 16,
      padding: "0px 12px",
      borderWidth: 0,
      margin: 0,
      backgroundColor: "transparent",
      height: 40,
      "&:focus": {
        outline: "none"
      },
      "&.disabled": {
        backgroundColor: "transparent"
      }
    },
    "& fieldset.boring select": {
      border: "1px solid black",
      borderRadius: 4,
      backgroundColor: "white",
      "&:focus": {
        borderColor: theme => theme.input.border.focus
      }
    }
  }
}, {
  name: "doric-select"
});
selectCSS.generate(theme);

function Select(props) {
  const {
    options = [],
    value,
    placeholder,
    label,
    className,
    required,
    optional,
    disabled,
    boring,
    onChange,
    wrapProps,
    ...passThrough
  } = props;
  let realValue = "-1";
  const {
    lookup,
    mapped
  } = options.reduce(({
    lookup,
    mapped
  }, item, index) => {
    const key = index.toString();

    if (Array.isArray(item) === false) {
      lookup[key] = item.value;
      mapped.push(React.createElement("option", {
        key: key,
        value: key
      }, item.label));

      if (item.value === value) {
        realValue = key;
      }
    } else {
      mapped.push(React.createElement("optgroup", {
        label: item[0],
        key: index
      }, item.slice(1).map((_item, _index) => {
        const _key = `${key}:${_index}`;
        lookup[_key] = _item.value;

        if (_item.value === value) {
          realValue = _key;
        }

        return React.createElement("option", {
          key: _key,
          value: _key
        }, _item.label);
      })));
    }

    return {
      lookup,
      mapped
    };
  }, {
    lookup: {},
    mapped: placeholder !== undefined ? [React.createElement("option", {
      key: "-1",
      hidden: true,
      value: "-1"
    }, placeholder)] : []
  });
  const labelProps = {
    className: classes({
      className,
      required,
      optional,
      disabled,
      boring
    }),
    ...passThrough
  };
  const selectProps = {
    value: realValue,
    onChange: evt => {
      evt.value = lookup[evt.target.value];
      onChange === null || onChange === void 0 ? void 0 : onChange(evt);
    },
    disabled
  };
  return React.createElement("doric-select", wrapProps, React.createElement("fieldset", labelProps, React.createElement("legend", null, label), React.createElement("select", selectProps, mapped)));
}

export default memo(Select);