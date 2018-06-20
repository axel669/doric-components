import CustomListeners from './customListeners';

import theme from '../theme';
import style from '../style';
import util from '../util';

style.add({
    "doric-tab-bar": {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
    },
    "doric-tab-title": {
        display: 'table-cell',
        borderBottom: `2px solid ${theme.tabs.tab.border.normal}`,
        color: theme.tabs.tab.text.normal,
        backgroundColor: theme.tabs.tab.bg.normal,
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 7,
        cursor: 'pointer',
        position: 'relative'
    },
    "doric-tab-content": {
        display: 'block'
    },
    "doric-tab-content[active='false']": {
        display: 'none'
    },
    "doric-tab-title[active='true']": {
        borderBottomColor: theme.tabs.tab.border.active,
        color: theme.tabs.tab.text.active,
        backgroundColor: theme.tabs.tab.bg.active
    },
    "doric-tab-title::after": {
        ...util.background.after.base
    },
    "doric-tab-title[data-tap-active]::after": {
        ...util.background.after.colorize(theme.tabs.tab.hl)
    }
});
class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            const child = this.children[this.props.selectedIndex];
            const onActive = child.props.onActive || (() => {});
            onActive(child);
        }
    }

    changeTab = (index) => {
        const {onChange = (() => {})} = this.props;

        onChange({
            target: {
                selectedIndex: index
            },
            tab: this.children[index],
            type: 'change'
        });
    }

    render = () => {
        const {selectedIndex} = this.props;
        const children = React.Children.toArray(this.props.children);
        this.children = children;

        const tabs = children.map(
            ({props}, index) => (
                <doric-tab-title active={index === selectedIndex} key={index}>
                    <CustomListeners listeners={{onTap: () => this.changeTab(index)}} />
                    {props.label}
                </doric-tab-title>
            )
        );

        const content = children.map(
            (child, index) => (
                <doric-tab-content active={index === selectedIndex} key={index}>
                    {child.props.children}
                </doric-tab-content>
            )
        );

        return (
            <doric-tabs>
                <doric-tab-bar>{tabs}</doric-tab-bar>
                {content}
            </doric-tabs>
        );
    }
}
const Tab = () => null;

export {
    Tabs,
    Tab
};
