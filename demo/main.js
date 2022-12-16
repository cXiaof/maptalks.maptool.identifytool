const markerSymbol = {
  markerType: 'pin',
  markerFill: '#de3333',
  markerFillOpacity: 1,
  markerLineWidth: 0,
  markerWidth: 42,
  markerHeight: 42,
}

// new Map
const map = new maptalks.Map('map', {
  center: [121.49613, 31.24027],
  zoom: 16,
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution:
      '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
    maxAvailableZoom: 18,
    placeholder: true,
  }),
  layers: [
    new maptalks.VectorLayer('random', { style: { symbol: markerSymbol } }),
    new maptalks.VectorLayer('hit', {
      style: { symbol: { ...markerSymbol, markerFill: '#0e595e' } },
    }),
  ],
  scaleControl: { position: 'bottom-right', metric: true, imperial: true },
  zoomControl: {
    position: { top: 80, right: 20 },
    slider: false,
    zoomLevel: true,
  },
})
new maptalks.CompassControl({
  position: 'top-right',
}).addTo(map)

const layerData = map.getLayer('random')

// new IdentifyTool
const identifyTool = new maptalks.IdentifyTool({ layers: [layerData] })
identifyTool.addTo(map)

identifyTool.on('rangechange', () => {
  identifyTool.submit()
})
identifyTool.on('identify', (e) => {
  renderHitData(e.data)
})

// prepare random data for testing
const extent = map.getExtent()
const min = extent.getMin()
const w = extent.getWidth()
const h = extent.getHeight()
const markers = []
for (var i = 0; i < 100; i++) {
  markers.push(
    new maptalks.Marker([min.x + Math.random() * w, min.y + Math.random() * h]),
  )
}
layerData.addGeometry(markers)

// support func in this demo
const renderHitData = (data) => {
  const layerLight = map.getLayer('hit')
  const copys = data.map((geo) => geo.copy())
  layerLight.clear().addGeometry(copys)
}

window.iT = identifyTool
