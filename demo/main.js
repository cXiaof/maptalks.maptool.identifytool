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

// new IdentifyTool
const identifyTool = new maptalks.IdentifyTool().addTo(map)
console.log(identifyTool)
