import customStyled from "./custom-tag-base"

const Clickable = customStyled`
    position: relative;
    user-select: none;
    cursor: pointer;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: background-color 250ms linear;
    }
    &.gjs-tap-active:not([disabled="true"])::after {
        transition: none;
        background-color: ${props => props.theme.hlColor};
    }
`

export default Clickable
