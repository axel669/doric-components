import React from "react"

const renderAs = Tag =>
    ({className, theme, ...props}) => <Tag {...props} class={className} />

export default renderAs
