import React, {memo} from "react";
import ssjs from "ssjs";

import api from "@api";
import {tappable, classes} from "@css";

let selectCSS = ssjs(
    {
        "doric-select": {
            margin: 2,
            display: "block",
            "& fieldset": {
                borderRadius: 4,
                overflow: "hidden",
                padding: 0,
                paddingRight: 1,
                backgroundColor: theme => theme.select.bg.color,
                color: theme => theme.select.text.color,
                border: theme => `1px solid ${theme.select.border.color}`,
                margin: 0,
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
                    color: (theme) => theme.input.label.required
                },
                "&.optional legend": {
                    color: (theme) => theme.input.label.optional
                },
                "&:focus-within": {
                    borderColor: (theme) => theme.input.border.focus
                }
            },
            "&.disabled select": {
                color: theme => theme.select.disabled
            },
            "& select": {
                display: "block",
                width: "100%",
                fontSize: 16,
                padding: "0px 12px",
                borderWidth: 0,
                margin: 0,
                backgroundColor: theme => theme.select.bg.color,
                color: theme => theme.select.text.color,
                height: 40,
                "&:focus": {
                    outline: "none"
                },
                "&[disabled]": {
                    backgroundColor: "transparent",
                    color: theme => theme.select.disabled
                }
            },
            "& fieldset.boring select": {
                border: theme => `1px solid ${theme.select.border.color}`,
                borderRadius: 4,
                backgroundColor: theme => theme.select.bg.color,
                "&:focus": {
                    borderColor: (theme) => theme.input.border.focus
                }
            }
        }
    },
    {name: "doric-select"}
);
api.addCSS(selectCSS);

function Select(props) {
    const {
        options = [], value,
        placeholder, label,
        className, required, optional, disabled, boring,
        onChange,
        wrapProps,
        ...passThrough
    } = props;

    let realValue = "-1";
    const {lookup, mapped} = options.reduce(
        ({lookup, mapped}, item, index) => {
            const key = index.toString();

            if (Array.isArray(item) === false) {
                lookup[key] = item.value;
                mapped.push(
                    <option key={key} value={key}>{item.label}</option>
                );
                if (item.value === value) {
                    realValue = key;
                }
            }
            else {
                mapped.push(
                    <optgroup label={item[0]} key={index}>
                    {item.slice(1).map(
                        (_item, _index) => {
                            const _key = `${key}:${_index}`;
                            lookup[_key] = _item.value;

                            if (_item.value === value) {
                                realValue = _key;
                            }

                            return <option key={_key} value={_key}>
                                {_item.label}
                            </option>;
                        }
                    )}
                    </optgroup>
                );
            }

            return {lookup, mapped};
        },
        {
            lookup: {},
            mapped: placeholder !== undefined
                ? [<option key="-1" hidden value="-1">{placeholder}</option>]
                : []
        }
    );

    const labelProps = {
        className: classes({
            className,
            required,
            optional,
            disabled,
            boring
        }),
        ...passThrough
    }
    const selectProps = {
        value: realValue,
        onChange: (evt) => {
            evt.value = lookup[evt.target.value];
            onChange?.(evt);
        },
        disabled
    };

    return <doric-select {...wrapProps}>
        <fieldset {...labelProps}>
            <legend>{label}</legend>
            <select {...selectProps}>
                {mapped}
            </select>
        </fieldset>
    </doric-select>
}

export default memo(Select);
