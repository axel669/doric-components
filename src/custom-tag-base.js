import React from "react"
import styled from "styled-components"

const customStyled = Tag => {
    const base = source => {
        const {className, theme, ...props} = source
        return <Tag class={className} {...props} />
    }
    return {css: styled(base)}
}

export default customStyled
