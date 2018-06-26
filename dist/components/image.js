'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_style2.default.add({
    "doric-image": {
        display: 'block',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    }
});

var DoricImage = function (_React$PureComponent) {
    _inherits(DoricImage, _React$PureComponent);

    function DoricImage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DoricImage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DoricImage.__proto__ || Object.getPrototypeOf(DoricImage)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
            var _this$props = _this.props,
                source = _this$props.source,
                height = _this$props.height,
                _this$props$imageSize = _this$props.imageSize,
                imageSize = _this$props$imageSize === undefined ? 'contain' : _this$props$imageSize;

            var style = {
                backgroundImage: 'url("' + source + '")',
                height: height,
                backgroundSize: imageSize
            };
            return _react2.default.createElement('doric-image', { style: style });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return DoricImage;
}(_react2.default.PureComponent);
// export default ({source, height, imageSize = 'contain'}) => {
//     const style = {
//         backgroundImage: `url("${source}")`,
//         height,
//         backgroundSize: imageSize
//     };
//     return <doric-image style={style} />;
// };


exports.default = DoricImage;