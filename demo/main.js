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

const renderHitData = (data) => {
  const layerLight = map.getLayer('hit')
  const copys = data.map((geo) => geo.copy())
  layerLight.clear().addGeometry(copys)
}

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

// new Toolbar
const center = map.getCenter()
const centers = [center.add(-0.01, 0), center, center.add(0.01, 0)]
const radius = [500, 1000, 2000]
const toolbar = new maptalks.control.Toolbar({
  position: 'top-left',
  items: [
    {
      item: 'setCenter',
      children: centers.map((item, index) => ({
        item: `center ${index + 1}`,
        click: () => identifyTool.setCenter(item),
      })),
    },
    {
      item: 'setRadius',
      children: radius.map((item) => ({
        item: `${item}m`,
        click: () => identifyTool.setRadius(item),
      })),
    },
  ],
}).addTo(map)

// new tip Panel
new maptalks.control.Panel({
  position: 'bottom-left',
  draggable: true,
  custom: false,
  content: `
        Drag the blue dot on the right side of the range circle to see <br />
        drag effect, and the hit geo will be highlighted after dragend.<br />
        Click the options in setCenter and setRadius in toolbar to see <br />
        the effect of trigger manual API setting parameters.<br />
        <br />
        拖动范围圆圈右侧的蓝色小点查看拖拽效果，放开后被命中的图形
        <br />会高亮。<br />
        点击左上角toolbar的setCenter和setRadius中的选项查看手动API<br />
        设置参数的效果。
    `,
  closeButton: true,
}).addTo(map)
