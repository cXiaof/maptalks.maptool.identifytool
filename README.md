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

## API Reference

```javascript
new maptalks.Autoadsorb(options)
```

- options **Object** options
  - autoSubmit **Boolean** auto submit after dragend/setCenter/setRadius, ture by default.
  - layers **Array** the layers to perform identify on.
  - filter **Function** filter function of the result geometries, return false to exclude.
  - count **Number** limit of the result count.
  - includeInternals **Boolean** whether to identify internal layers.
  - includeInvisible **Boolean** whether to identify invisible layers.

`setCenter(coordinate)` set center, map center by default.

`setRadius(radius)` set radius of range, options.radiusDefault by default.

## Contributing

We welcome any kind of contributions including issue reportings, pull requests, documentation corrections, feature requests and any other helps.

## Develop

The only source file is `index.js`.

It is written in ES6, transpiled by [babel](https://babeljs.io/) and tested with [mocha](https://mochajs.org) and [expect.js](https://github.com/Automattic/expect.js).

### Scripts

- Install dependencies

```shell
$ npm install
```

- Watch source changes and generate runnable bundle repeatedly

```shell
$ gulp watch
```

- Package and generate minified bundles to dist directory

```shell
$ gulp minify
```

- Lint

```shell
$ npm run lint
```

## More Things

- [maptalks.maptool.identifytool](https://github.com/cXiaof/maptalks.maptool.identifytool/issues)
- [maptalks.autoadsorb](https://github.com/cXiaof/maptalks.autoadsorb/issues)
- [maptalks.multisuite](https://github.com/cXiaof/maptalks.multisuite/issues)
- [maptalks.geosplit](https://github.com/cXiaof/maptalks.geosplit/issues)
- [maptalks.polygonbool](https://github.com/cXiaof/maptalks.polygonbool/issues)
- [maptalks.geo2img](https://github.com/cXiaof/maptalks.geo2img/issues)
- [maptalks.control.compass](https://github.com/cXiaof/maptalks.control.compass/issues)
- [maptalks.autogradual](https://github.com/cXiaof/maptalks.autogradual/issues)
