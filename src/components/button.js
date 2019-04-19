import React from "react";

function Button(props) {
    const {
        text,
        ...rest
    } = props;
    return <div>
        {text}
    </div>
};

export default React.memo(Button);
