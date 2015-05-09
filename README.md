# canvas-fit-loop

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Yet another canvas shell utility, built on [canvas-fit](https://npmjs.org/package/canvas-fit) and [raf-loop](https://npmjs.org/package/raf-loop). Useful for full-screen retina canvas demos.

Example:

```js
var createContext = require('2d-context')
var createLoop = require('canvas-fit-loop')

//get a 2D context
var context = createContext()
var canvas = context.canvas
document.body.appendChild(canvas)

//setup a retina-scaled canvas
var app = createLoop(canvas, {
  scale: window.devicePixelRatio
})

//start rendering
app.start()

//on requestAnimationFrame
app.on('tick', function(dt) {
  // get unscaled size
  var width = app.shape[0]
  var height = app.shape[1]

  // scale for retina displays
  ctx.save()
  ctx.scale(app.scale, app.scale)

  // draw with screen-space coordinates
  ctx.clearRect(0, 0, width, height)
  ctx.fillRect(25, 25, width/2, height/2)

  ctx.restore()
})

//on window resize
app.on('resize', function() {
  console.log('new size', app.shape)
})
```

## Usage

[![NPM](https://nodei.co/npm/canvas-fit-loop.png)](https://www.npmjs.com/package/canvas-fit-loop)

#### `app = createLoop(context[, opt])`

Creates a new loop with the given Canvas `context` (can be [2D](https://www.npmjs.com/package/2d-context) or [WebGL](https://www.npmjs.com/package/webgl-context)). 

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

MIT, see [LICENSE.md](http://github.com/mattdesl/canvas-fit-loop/blob/master/LICENSE.md) for details.
