'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PureBaseComponent = exports.BaseComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoricMixin = function DoricMixin(parent) {
    var _class, _temp2, _initialiseProps;

    return _temp2 = _class = function (_parent) {
        _inherits(_class, _parent);

        function _class() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
        }

        return _class;
    }(parent), _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.linkState = function (name) {
            var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'target.value';

            var getValue = new Function('evt', 'return evt.' + prop);
            return function (evt) {
                var value = getValue(evt);
                _this2.setState(function () {
                    return _defineProperty({}, name, value);
                });
            };
        };

        this.createLinks = function () {
            for (var _len2 = arguments.length, linkInfo = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                linkInfo[_key2] = arguments[_key2];
            }

            var links = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = linkInfo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var info = _step.value;

                    var args = Array.isArray(info) === true ? info : [info];
                    links[args[0]] = _this2.linkState.apply(_this2, _toConsumableArray(args));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return links;
        };

        this.setStatef = function (value) {
            return _this2.setState(function () {
                return value;
            });
        };
    }, _temp2;
};

var BaseComponent = exports.BaseComponent = function (_DoricMixin) {
    _inherits(BaseComponent, _DoricMixin);

    function BaseComponent() {
        _classCallCheck(this, BaseComponent);

        return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
    }

    return BaseComponent;
}(DoricMixin(_react2.default.Component));

var PureBaseComponent = exports.PureBaseComponent = function (_DoricMixin2) {
    _inherits(PureBaseComponent, _DoricMixin2);

    function PureBaseComponent() {
        _classCallCheck(this, PureBaseComponent);

        return _possibleConstructorReturn(this, (PureBaseComponent.__proto__ || Object.getPrototypeOf(PureBaseComponent)).apply(this, arguments));
    }

    return PureBaseComponent;
}(DoricMixin(_react2.default.PureComponent));
// export class BaseComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     linkState = (name, prop = 'target.value') => {
//         const getValue = new Function('evt', `return evt.${prop}`);
//         return evt => {
//             const value = getValue(evt);
//             this.setState(() =>
//                 ({[name]: value})
//             );
//         };
//     }
//
//     setStatef = value =>
//         this.setState(() => value)
// };
// export class PureBaseComponent extends React.PureComponent {
//     constructor(props) {
//         super(props);
//     }
//
//     linkState = (name, prop = 'target.value') => {
//         const getValue = new Function('evt', `return evt.${prop}`);
//         return evt => {
//             const value = getValue(evt);
//             this.setState(() =>
//                 ({[name]: value})
//             );
//         };
//     }
//
//     setStatef = value =>
//         this.setState(() => value)
// };