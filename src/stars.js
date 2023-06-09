const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const fov = 150

class Dot {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
}

let canvas
let context
let tempx, tempy, tempz
let dots = []
let dotsLength = innerWidth + innerHeight

function setSize() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  initDots()
  context.fillStyle = '#ffffff'
  if (innerWidth < 800) {
    context.globalAlpha = 0.3
  } else {
    context.globalAlpha = 0.8
  }
}

function initDots() {
  dots = []
  dotsLength = (innerWidth + innerHeight) / 20
  let x, y, z
  for (let i = 0; i < dotsLength; i++) {
    x = Math.random() * innerWidth - innerWidth / 2
    y = Math.random() * innerHeight - innerHeight / 2
    z = Math.random() * innerWidth - innerWidth / 2
    dots.push(new Dot(x, y, z))
  }
}

function drawDots(dot) {
  let scale, x2d, y2d
  scale = fov / (fov + dot.z)
  x2d = dot.x * scale + innerWidth / 2
  y2d = dot.y * scale + innerHeight / 2
  context.fillRect(x2d, y2d, scale * 4, scale * 3)
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  let dot
  for (let i = 0; i < dots.length; i++) {
    dot = dots[i]
    dot.z -= 1
    if (dot.z < -fov) {
      dot.z += (innerWidth + innerHeight) / 2
    }
    drawDots(dot)
  }
  requestAnimationFrame(render)
}

function init() {
  canvas = document.querySelector('.canvas')
  context = canvas.getContext('2d')
  setSize()
  render()
}

addEventListener('resize', setSize)
init()
