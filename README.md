# canvas-loop

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![demo](http://i.imgur.com/o4DFpz0.png)](http://mattdesl.github.io/canvas-loop/)

[demo](http://mattdesl.github.io/canvas-loop/) - [source](demo.es6)

Yet another canvas shell utility, built on [canvas-fit](https://npmjs.org/package/canvas-fit) and [raf-loop](https://npmjs.org/package/raf-loop). Useful for full-screen retina canvas demos.

Example:

```js
var createGL = require('webgl-context')
var createLoop = require('canvas-loop')

// get a WebGL context
var gl = createGL()
var canvas = gl.canvas
document.body.appendChild(canvas)

// setup a retina-scaled canvas
var app = createLoop(canvas, {
  scale: window.devicePixelRatio
})

// start rendering
app.start()

// on requestAnimationFrame
app.on('tick', function(dt) {
  // do some rendering
  gl.clear(gl.COLOR_BUFFER_BIT)
})

// handle window resize
app.on('resize', function() {
  // the unscaled size
  var width = app.shape[0]
  var height = app.shape[1]

  console.log('new canvas size', width, height)
})
```

See [demo.es6](demo.es6) for a full demo.

## Usage

[![NPM](https://nodei.co/npm/canvas-loop.png)](https://www.npmjs.com/package/canvas-loop)

#### `app = createLoop(canvas[, opt])`

Creates a new loop with the given `canvas` (can be [2D](https://www.npmjs.com/package/2d-context) or [WebGL](https://www.npmjs.com/package/webgl-context)). 

The options:

- `parent` element to fit to, or a scaling function (default `window`)
- `scale` scaling ratio for canvas (default 1)

These options are passed to [canvas-fit](https://github.com/hughsk/canvas-fit/).

#### `app.start()`
#### `app.stop()`

Start and stop the render loop. Returns the `app` for chaining.

#### `app.on('tick', fn)`

Listen to `tick` events, `fn` is called with `dt` parameter which is the delta time since last frame. Uses [raf-loop](https://www.npmjs.com/package/raf-loop).

#### `app.on('resize', fn)`

Called when the `window` has resized, after the canvas has been re-scaled according to its `parent`.

#### `app.shape`

A getter for the `[ width, height ]` of the canvas *without* device scaling. This is the same as:

```
[ canvas.width / app.scale, canvas.height / app.scale ]
```

#### `app.parent`
#### `app.scale`

Getters/setters to change `parent` or `scale` at runtime. See [canvas-fit](https://www.npmjs.com/package/canvas-fit) for details.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/canvas-loop/blob/master/LICENSE.md) for details.
