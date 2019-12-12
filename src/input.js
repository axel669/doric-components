import React from "react"
import styled from "styled-components"

import {themedComponent, propToggle} from "./helpers.js"
import ControlBorder from "./control-border.js"

const InputElement = styled.input`
    padding: 24px 8px 8px 8px;
    margin: 0px;
    border-width: 0px;
    z-index: +1;
    width: 100%;
    border-radius: 4px;
    background-color: transparent;

    &:focus {
        outline: none;
    }
`

const inputOfType = type =>
    props => <ControlBorder {...props}>
        <InputElement {...props} type={type} />
    </ControlBorder>
// const inputOfType = type =>
//     source => {
//         const {
//             bordered,
//             theme,
//             label,
//             className,
//             error,
//             _,
//             ...props
//         } = source
//         const shared = {theme, error}
//         const border = (bordered === true)
//             ? <InputFullBorder {...shared}>
//                 <InputFullBorderLabel {...shared}>
//                     {label}
//                 </InputFullBorderLabel>
//             </InputFullBorder>
//             : <InputFlatBorder {...shared} />
//
//         return <InputWrapper theme={theme} className={className} style={_}>
//             <InputVisualArea>
//                 <InputElement {...props} {...shared} type={type} />
//                 <InputLabel bordered={bordered} {...shared}>
//                     {label}
//                 </InputLabel>
//                 {border}
//             </InputVisualArea>
//             <ErrorLabel theme={theme}>{error}</ErrorLabel>
//         </InputWrapper>
//     }
const Input = {
    Text: themedComponent(
        inputOfType("text"),
        "Themed(TextInput)"
    ),
    Password: themedComponent(
        inputOfType("password"),
        "Themed(PasswordInput)"
    ),
}

export default Input
