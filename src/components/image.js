import React from 'react';

import theme from '../theme';
import style from '../style';
import {createPureClass} from '../util';

style.add({
    "doric-image": {
        display: 'block',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    }
});

// export default class DoricImage extends React.PureComponent {
//     render = () => {
//         const {source, height, imageSize = 'contain'} = this.props;
//         const style = {
//             backgroundImage: `url("${source}")`,
//             height,
//             backgroundSize: imageSize
//         };
//         return <doric-image style={style} />;
//     }
// }
const DoricImage = ({source, height, imageSize = 'contain'}) => {
    const style = {
        backgroundImage: `url("${source}")`,
        height,
        backgroundSize: imageSize
    };
    return <doric-image style={style} />;
};
DoricImage.pure = createPureClass(DoricImage);

export default DoricImage;
