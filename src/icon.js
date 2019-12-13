import styled from "styled-components"

const IconElement = styled.span`
    font-size: 18px;
`
const Icon = source => {
    const {name, className = "", ...props} = source
    const iconClass = `${Icon.prefix}${name}`

    return <IconElement {...props} className={`${className} ${iconClass}`} />
}
Icon.prefix = "ion-md-"

export default Icon
