var view = require('./')
var test = require('tape')

test('yet another canvas context shell utility', function(t) {
  var canvas = document.createElement('canvas')

  var desired = [ 50, 50 ]
  
  t.plan(3)
  var app = view(canvas, {
    parent: function() {
      return desired
    }
  })

  t.deepEqual(app.shape, desired, 'has width/height')

  app.start()
  app.on('tick', function(dt) {
    t.equal(typeof dt, 'number', 'provides tick with dt')
    app.stop()
  })

  app.once('resize', function() {
    t.deepEqual(app.shape, desired, 'shape has changed')
  })

  setTimeout(function() {
    desired = [10, 10]
    window.dispatchEvent(new Event('resize'))
  }, 100)

})