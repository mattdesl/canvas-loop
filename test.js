var view = require('./')
var test = require('tape')

test('yet another canvas context shell utility', function(t) {
  var el = document.createElement('canvas')
  var ctx = el.getContext('2d')

  t.plan(1)
  var app = view(ctx)

  t.equal(typeof app.size, 'number', 'has width')
  t.equal(typeof app.height, 'number', 'has height')

  app.start()
  app.on('tick', function(dt) {
    t.equal(typeof dt, 'number', 'provides tick with dt')
    app.stop()
  })
  app.once('resize', function(size) {
    t.equal(typeof size.width, 'number', 'got width')
    t.equal(typeof size.height, 'number', 'got height')
  })
})