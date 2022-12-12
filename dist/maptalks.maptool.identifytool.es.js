/*!
 * maptalks.maptool.identifytool v0.1.0-alpha.1
 * LICENSE : MIT
 * (c) 2016-2022 maptalks.org
 */
/*!
 * requires maptalks@>=1.0.0-rc.1 
 */
import { MapTool } from 'maptalks';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var IdentifyTool = function (_maptalks$MapTool) {
  _inherits(IdentifyTool, _maptalks$MapTool);

  function IdentifyTool() {
    _classCallCheck(this, IdentifyTool);

    return _possibleConstructorReturn(this, _maptalks$MapTool.apply(this, arguments));
  }

  return IdentifyTool;
}(MapTool);

export { IdentifyTool };

typeof console !== 'undefined' && console.log('maptalks.maptool.identifytool v0.1.0-alpha.1, requires maptalks@>=1.0.0-rc.1.');
