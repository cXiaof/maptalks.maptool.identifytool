import booleanDisjoint from '@turf/boolean-disjoint'
import * as maptalks from 'maptalks'

const options = {
  layers: [],
  filter: null,
  count: null,
  includeInternals: false,
  includeInvisible: false,
}

const layerId = maptalks.INTERNAL_LAYER_PREFIX + '_identify_map_tool'
const theme = '#2b81ff'
const radiusDefault = 1000
const animateDuration = 1000 / 60

const centerPSymbol = {
  markerType: 'pin',
  markerFill: theme,
  markerLineColor: '#fff',
  markerLineWidth: 2,
  markerWidth: 48,
  markerHeight: 40,
}
const rangeSymbol = {
  lineColor: theme,
  lineWidth: 2,
  polygonFill: theme,
  polygonOpacity: 0.15,
}
const distancePSymbol = {
  markerType: 'ellipse',
  markerFill: theme,
  markerLineColor: '#fff',
  markerLineWidth: 2,
  markerLineOpacity: 1,
  markerWidth: 12,
  markerHeight: 12,
}
const distanceSymbol = {
  lineColor: theme,
  lineWidth: 2,
  textPlacement: 'line',
  textName: '{value}',
  textSize: 16,
  textFill: theme,
  textHaloFill: '#fff',
  textHaloRadius: 2,
  textDy: 16,
}

export class IdentifyTool extends maptalks.MapTool {
  constructor(options) {
    super(options)
  }

  onAdd() {
    this._map = this.getMap()
  }

  onEnable() {
    this._initLayer()
    this._initRange()
    this._initDistance()
    this._initCenterPoint()
    this._initDistancePoint()
  }

  getEvents() {
    return {}
  }

  onDisable() {
    if (this._layer) this._layer.remove()
  }

  setCenter(center = this._map.getCenter()) {
    if (!(center instanceof maptalks.Coordinate)) {
      center = new maptalks.Coordinate(center)
    }
    const lastCenter = this._centerP.getCoordinates()
    const offsetX = center.x - lastCenter.x
    const offsetY = center.y - lastCenter.y
    this._layer.forEach((geo) => geo.translate(offsetX, offsetY))
    this._fireRangeChange()
  }

  setRadius(radius = radiusDefault) {
    this._animateRadius(radius, () => {
      const firstShell = this._range.getShell()[0]
      this._handleDistChange(firstShell)
      this._fireRangeChange()
    })
  }

  submit() {
    const details = this._getFireData()
    const distance = this._map.distanceToPixel(details.radius).width
    this._map.identify(
      {
        coordinate: details.center,
        tolerance: ~~distance,
        layers: this.options['layers'],
        filter: this.options['filter'],
        count: this.options['count'],
        includeInternals: this.options['includeInternals'],
        includeInvisible: this.options['includeInvisible'],
      },
      (geos) => {
        details.data = geos.filter(
          (geo) => !booleanDisjoint(this._range.toGeoJSON(), geo.toGeoJSON()),
        )
        this.fire('identify', details)
      },
    )
  }

  _initLayer() {
    this._layer = new maptalks.VectorLayer(layerId).addTo(this._map)
  }

  _initRange() {
    const center = this._map.getCenter()
    this._range = new maptalks.Circle(center, radiusDefault, {
      symbol: rangeSymbol,
      numberOfShellPoints: 720,
    })
    this._range.addTo(this._layer)
  }

  _initDistance() {
    const center = this._map.getCenter()
    const firstShell = this._range.getShell()[0]
    this._distance = new maptalks.LineString([center, firstShell], {
      symbol: distanceSymbol,
      properties: { value: this._calcDistance(radiusDefault) },
    })
    this._distance.on('shapechange', () => {
      const distance = this._distance.getLength()
      this._animateRadius(distance, () => {
        this._distance.setProperties({ value: this._calcDistance(distance) })
        this._distance.setSymbol(distanceSymbol)
      })
    })
    this._distance.addTo(this._layer)
  }

  _calcDistance(length) {
    const isInt = length % 1 === 0
    if (length <= 1000) return `${length.toFixed(isInt ? 0 : 1)}m`
    length /= 1000
    return `${length.toFixed(2)}km`
  }

  _animateRadius(radius, callback) {
    this._range.animate({ radius }, { duration: animateDuration }, (frame) => {
      if (frame.state.playState === 'finished') callback()
    })
  }

  _initCenterPoint() {
    const center = this._map.getCenter()
    this._centerP = new maptalks.Marker(center, { symbol: centerPSymbol })
    this._centerP.addTo(this._layer)
  }

  _initDistancePoint() {
    const firstShell = this._range.getShell()[0]
    this._distP = new maptalks.Marker(firstShell, {
      symbol: distancePSymbol,
      properties: { value: this._distance.getLength() },
      draggable: true,
    })
    this._distP.on('dragging', (e) => {
      this._handleDistChange(e.coordinate)
    })
    this._distP.on('dragend', (e) => {
      this._handleDistChange(e.coordinate)
      this._fireRangeChange()
    })
    this._distP.addTo(this._layer)
  }

  _handleDistChange(lastCoords) {
    this._distance.setCoordinates([this._centerP.getCenter(), lastCoords])
    this._distP.setCoordinates(this._distance.getLastCoordinate())
  }

  _fireRangeChange() {
    const details = this._getFireData()
    this.fire('rangechange', details)
  }

  _getFireData() {
    const center = this._range.getCenter()
    const radius = this._range.getRadius()
    const area = this._range.getArea()
    return { center, radius, area }
  }
}

IdentifyTool.mergeOptions(options)
