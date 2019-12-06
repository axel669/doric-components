import React from "react"
import styled from "styled-components"

const CustomBase = (sourceProps) => {
    const {className, tag, ...props} = sourceProps
    if (tag === undefined) {
        console.warn("No tag provided")
    }
    const Tag = tag || "custom-tag"
    return <Tag {...props} class={className} />
}
const customStyled = styled(CustomBase)

export default customStyled
