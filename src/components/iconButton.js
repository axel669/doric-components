import React from 'react';

import Button from './button.js';
import Icon from './icon.js';

import {createPureClass} from '../util.js';

const DoricIconButton = ({text, icon, ...props}) => {
    const space = (text === undefined || text === null) ? "" : "\u00A0";
    const newText = (
        <React.Fragment>
            <Icon icon={icon} />
            {space}{text}
        </React.Fragment>
    );
    return <Button text={newText} {...props} />;
};
DoricIconButton.pure = createPureClass(DoricIconButton);

export default DoricIconButton;
