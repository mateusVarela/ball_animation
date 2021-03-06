const canvas = document.getElementById('canvas')

function gerarCor(opacidade = 1) {
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  
  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

function Ball() {
  this.x = Math.floor(Math.random() * 100)
  this.y = Math.floor(Math.random() * 150)
  this.vx = Math.floor(Math.random() * 10)
  this.vy = Math.floor(Math.random() * 4)
  this.radius = Math.floor(Math.random() * 20)
  this.color = gerarCor()

  const ctx = canvas.getContext('2d')

  this.draw = () => {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
    return this
  }

  this.clear = () => {
    ctx.fillStyle = 'rgba(20, 20, 20, 0.6)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function move(ball) {
  ball.clear()
  ball.draw()
  ball.x += ball.vx
  ball.y += ball.vy
  window.requestAnimationFrame(() => move(ball))

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx
  }
}

canvas.addEventListener('click', function (e) {
  const ball = new Ball()
  move(ball)
})