import createContext from '2d-context'
import createLoop from './'
import { circInOut } from 'eases'
import lerp from 'lerp'

const ctx = createContext()
const canvas = ctx.canvas

const app = createLoop(canvas, { scale: window.devicePixelRatio })
app.start()

document.body.appendChild(canvas)

let time = 0
app.on('tick', (dt) => {
  time += dt/1000

  const [ width, height ] = app.shape
  ctx.save()
  ctx.scale(app.scale, app.scale)
  
  const padding = 25
  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, '#f39821')
  gradient.addColorStop(1, '#f321b0')

  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = gradient
  ctx.fillRect(padding, padding, width-padding*2, height-padding*2)

  const anim = circInOut(Math.sin(time) * 0.5 + 0.5)

  ctx.strokeStyle = 'white'
  ctx.beginPath()
  ctx.lineJoin = 'round'
  ctx.lineWidth = lerp(25, 2, anim)
  ctx.arc(width/2, height/2, 25, time, time + anim * Math.PI * 2)
  ctx.stroke()

  ctx.restore()
})