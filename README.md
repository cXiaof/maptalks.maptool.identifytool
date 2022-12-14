# maptalks.maptool.identifytool

A IdentifyTool to identify geos within a circular range with variable radius.

## Examples

### [DEMO](https://cxiaof.github.io/maptalks.maptool.identifytool/demo/index.html)

## Install

- Install with npm: `npm install maptalks.maptool.identifytool`.
- Install with yarn: `yarn add maptalks.maptool.identifytool`.
- Download from [dist directory](https://github.com/cXiaof/maptalks.maptool.identifytool/tree/master/dist).
- Use unpkg CDN: `https://cdn.jsdelivr.net/npm/maptalks.maptool.identifytool/dist/maptalks.maptool.identifytool.min.js`

## Usage

As a plugin, `maptalks.maptool.identifytool` must be loaded after `maptalks.js` in browsers. You can also use `'import { Identifytool } from "maptalks.maptool.identifytool"` when developing with webpack.

```html
<!-- ... -->
<script src="https://cdn.jsdelivr.net/npm/maptalks.maptool.identifytool/dist/maptalks.maptool.identifytool.min.js"></script>
<!-- ... -->
```

```javascript
// new IdentifyTool
const identifyTool = new maptalks.IdentifyTool().addTo(map)
```
