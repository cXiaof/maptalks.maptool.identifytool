/*!
 * maptalks.maptool.identifytool v0.1.0-alpha.1
 * LICENSE : MIT
 * (c) 2016-2022 maptalks.org
 */
/*!
 * requires maptalks@>=1.0.0-rc.1 
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
	typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
	(factory((global.maptalks = global.maptalks || {}),global.maptalks));
}(this, (function (exports,maptalks) { 'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var options = {
  draggable: false,
  radiusDefault: 1000
};

var layerId = maptalks.INTERNAL_LAYER_PREFIX + '_identify_map_tool';
var theme = '#2b81ff';

var centerPSymbol = {
  markerType: 'pin',
  markerFill: theme,
  markerLineColor: '#fff',
  markerLineWidth: 2,
  markerWidth: 48,
  markerHeight: 40
};
var rangeSymbol = {
  lineColor: theme,
  lineWidth: 2,
  polygonFill: theme,
  polygonOpacity: 0.15
};
var distancePSymbol = {
  markerType: 'ellipse',
  markerFill: theme,
  markerLineColor: '#fff',
  markerLineWidth: 2,
  markerLineOpacity: 1,
  markerWidth: 12,
  markerHeight: 12
};
var distanceSymbol = {
  lineColor: theme,
  lineWidth: 2,
  textPlacement: 'line',
  textName: '{value}',
  textSize: 16,
  textFill: theme,
  textHaloFill: '#fff',
  textHaloRadius: 2,
  textDy: 16
};

var IdentifyTool = function (_maptalks$MapTool) {
  _inherits(IdentifyTool, _maptalks$MapTool);

  function IdentifyTool(options) {
    _classCallCheck(this, IdentifyTool);

    return _possibleConstructorReturn(this, _maptalks$MapTool.call(this, options));
  }

  IdentifyTool.prototype.onAdd = function onAdd() {
    this._map = this.getMap();
  };

  IdentifyTool.prototype.onEnable = function onEnable() {
    this._initLayer();
    this._initRange();
    this._initDistance();
    this._initCenterPoint();
    this._initDistancePoint();
  };

  IdentifyTool.prototype.getEvents = function getEvents() {
    return {};
  };

  IdentifyTool.prototype.onDisable = function onDisable() {
    if (this._layer) this._layer.remove();
  };

  IdentifyTool.prototype._initLayer = function _initLayer() {
    this._layer = new maptalks.VectorLayer(layerId).addTo(this._map);
  };

  IdentifyTool.prototype._initRange = function _initRange() {
    var center = this._map.getCenter();
    this._range = new maptalks.Circle(center, this.options['radiusDefault'], {
      symbol: rangeSymbol,
      numberOfShellPoints: 720
    });
    this._range.addTo(this._layer);
  };

  IdentifyTool.prototype._initDistance = function _initDistance() {
    var _this2 = this;

    var center = this._map.getCenter();
    var firstShell = this._range.getShell()[0];
    this._distance = new maptalks.LineString([center, firstShell], {
      symbol: distanceSymbol,
      properties: { value: this._calcDistance(this.options['radiusDefault']) }
    });
    this._distance.on('shapechange', function () {
      var distance = _this2._distance.getLength();
      _this2._range.setRadius(distance);
      _this2._distance.setProperties({ value: _this2._calcDistance(distance) });
      _this2._distance.setSymbol(distanceSymbol);
    });
    this._distance.addTo(this._layer);
  };

  IdentifyTool.prototype._calcDistance = function _calcDistance(length) {
    var isInt = length % 1 === 0;
    if (length <= 1000) return length.toFixed(isInt ? 0 : 1) + 'm';
    length /= 1000;
    return length.toFixed(2) + 'km';
  };

  IdentifyTool.prototype._initCenterPoint = function _initCenterPoint() {
    var center = this._map.getCenter();
    this._centerP = new maptalks.Marker(center, { symbol: centerPSymbol });
    this._centerP.addTo(this._layer);
  };

  IdentifyTool.prototype._initDistancePoint = function _initDistancePoint() {
    var firstShell = this._range.getShell()[0];
    this._distP = new maptalks.Marker(firstShell, {
      symbol: distancePSymbol,
      properties: { value: this._distance.getLength() },
      draggable: true
    });
    this._distP.on('dragging', this._handleDrag.bind(this));
    this._distP.on('dragend', this._handleDrag.bind(this));
    this._distP.addTo(this._layer);
  };

  IdentifyTool.prototype._handleDrag = function _handleDrag(e) {
    this._distance.setCoordinates([this._centerP.getCenter(), e.coordinate]);
    this._distP.setCoordinates(this._distance.getLastCoordinate());
  };

  return IdentifyTool;
}(maptalks.MapTool);

IdentifyTool.mergeOptions(options);

exports.IdentifyTool = IdentifyTool;

Object.defineProperty(exports, '__esModule', { value: true });

typeof console !== 'undefined' && console.log('maptalks.maptool.identifytool v0.1.0-alpha.1, requires maptalks@>=1.0.0-rc.1.');

})));
