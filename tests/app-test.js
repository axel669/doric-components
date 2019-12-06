(function (React, ReactDOM, styled) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
  var styled__default = 'default' in styled ? styled['default'] : styled;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  const CustomBase = sourceProps => {
    const {
      className,
      tag,
      ...props
    } = sourceProps;

    if (tag === undefined) {
      console.warn("No tag provided");
    }

    const Tag = tag || "custom-tag";
    return React__default.createElement(Tag, _extends({}, props, {
      class: className
    }));
  };

  const customStyled = styled__default(CustomBase);

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
`;

  const climbDOM = (start, func) => {
    let current = start;

    while (current !== null && current !== document.documentElement) {
      func(current);
      current = current.parentNode;
    }
  };

  const globalListeners = {};

  const registerGlobalListener = (type, elem, handler) => {
    if (globalListeners[type] === undefined) {
      globalListeners[type] = new Map();
      window.addEventListener(type, evt => {
        const handlers = globalListeners[type];
        climbDOM(evt.target, node => {
          var _handlers$get;

          return (_handlers$get = handlers.get(node)) === null || _handlers$get === void 0 ? void 0 : _handlers$get(evt);
        });
      });
    }

    globalListeners[type].set(elem, handler);
  };

  const removeGlobalListener = (name, elem) => {
    const type = name.slice(2).toLowerCase();
    globalListeners[type].delete(elem);
  };

  const useMounts = effect => React.useEffect(effect, []);

  function CustomListeners(props) {
    const element = React.useRef(null);
    const pRef = React.useRef(props);
    pRef.current = props;
    useMounts(() => {
      const types = Object.keys(props);

      for (const name of types) {
        const type = name.slice(2).toLowerCase();
        registerGlobalListener(type, element.current.parentNode, evt => {
          var _pRef$current$name, _pRef$current;

          return (_pRef$current$name = (_pRef$current = pRef.current)[name]) === null || _pRef$current$name === void 0 ? void 0 : _pRef$current$name.call(_pRef$current, evt);
        });
      }

      return () => {
        for (const name of types) {
          removeGlobalListener(name, element.current.parentNode);
        }
      };
    });
    return React__default.createElement("doric-custom-listeners", {
      ref: element
    });
  }

  const darkTheme = {
    font: "Inconsolata",
    hlColor: "rgba(255, 255, 255, 0.25)",
    hlInvert: "rgba(0, 0, 0, 0.25)",
    hlLight: "rgba(255, 255, 255, 0.25)",
    hlDark: "rgba(0, 0, 0, 0.25)",
    mainBG: "#222",
    textColor: "white",
    invertText: "black",
    lightText: "white",
    darkText: "black",
    blue: "#1d62d5",
    lightblue: "#2196F3",
    primary: "#1d62d5",
    danger: "#F44336"
  };
  const lightTheme = {
    font: "Roboto",
    hlColor: "rgba(0, 0, 0, 0.25)",
    hlInvert: "rgba(255, 255, 255, 0.25)",
    hlLight: "rgba(255, 255, 255, 0.25)",
    hlDark: "rgba(0, 0, 0, 0.25)",
    mainBG: "white",
    textColor: "black",
    invertText: "white",
    lightText: "white",
    darkText: "black",
    blue: "#1d62d5",
    lightblue: "#2196F3",
    primary: "#1d62d5"
  };

  const propToggle = (name, tru, fals) => props => props[name] ? tru : fals;

  const Theme = React__default.createContext(lightTheme);
  const ThemeProvider = Theme.Provider;

  const themedComponent = Component => props => {
    const theme = React.useContext(Theme) || lightTheme;
    return React__default.createElement(Component, _extends({}, props, {
      theme: theme
    }));
  };

  const colorationVariant = {
    normal: styled__default.css`
        background-color: ${props => props.theme.mainBG};
        color: ${props => props.theme.textColor};
    `,
    primary: styled__default.css`
        background-color: ${props => props.theme.primary};
        color: ${props => props.theme.lightText};
        &.gjs-tap-active:not([disabled="true"])::after {
            background-color: ${props => props.theme.glLight};
        }
    `,
    danger: styled__default.css`
        background-color: ${props => props.theme.danger};
        color: ${props => props.theme.lightText};
        &.gjs-tap-active:not([disabled="true"])::after {
            background-color: ${props => props.theme.glLight};
        }
    `
  };
  const displayVariant = propToggle("block", "flex", "inline-flex");
  const raisedVariant = propToggle("raised", styled.css`boxShadow: 2px 2px 3px rgba(0, 0, 0, 0.4);`, "");
  const disabledVariant = propToggle("disabled", styled.css`opacity: 0.7;`, "");
  const ButtonBase = styled__default(Clickable)`
    padding: 8px 16px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    margin: 4px;
    overflow: hidden;

    display: ${displayVariant};
    ${raisedVariant}
    ${disabledVariant}
    ${props => colorationVariant[props.type || "normal"]}
`;

  function Button(source) {
    const {
      onTap = () => {},
      children,
      ...sourceProps
    } = source;
    const props = {
      type: "normal",
      ...sourceProps
    };

    const wrappedOnTap = evt => {
      if (sourceProps.disabled === true) {
        return;
      }

      onTap(evt);
    };

    return React__default.createElement(ButtonBase, _extends({}, props, {
      tag: "doric-button"
    }), React__default.createElement(CustomListeners, {
      onTap: wrappedOnTap
    }), children);
  }

  var Button$1 = themedComponent(Button);

  const GlobalStyle = themedComponent(styled__default.createGlobalStyle`
    body, html {
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        font-family: ${props => props.theme.font}, Arial;
        background-color: ${props => props.theme.mainBG};
        color: ${props => props.theme.textColor};
    }
    * {
        box-sizing: border-box;
    }
`);

  var doric = {
    Button: Button$1,
    GlobalStyle,
    ThemeProvider,
    lightTheme,
    darkTheme
  };

  function App() {
    const tapped = () => console.log("tapped");

    return React__default.createElement(doric.ThemeProvider, {
      value: doric.darkTheme
    }, React__default.createElement(doric.GlobalStyle, null), React__default.createElement(doric.Button, {
      onTap: tapped
    }, "Testing"), React__default.createElement(doric.Button, {
      onTap: tapped,
      type: "primary"
    }, "Testing"), React__default.createElement(doric.Button, {
      onTap: tapped,
      type: "primary",
      disabled: true
    }, "Testing"));
  }

  ReactDOM.render(React__default.createElement(App, null), document.querySelector("app-root"));

}(React, ReactDOM, styled));
