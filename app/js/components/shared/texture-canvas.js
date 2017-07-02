const THREE = require('three')

export default class TextureCanvas {
  constructor (text, fontSize = 42, width = 1024, height = 512) {
    this.text = text
    this.fontSize = fontSize
    this.width = width
    this.height = height
    this.lineStep = this.fontSize * 1.5

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.drawText()
  }
  drawText () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    //this.ctx.textAlign = 'center'
    this.ctx.fillStyle = '#fff'
    this.ctx.font = `${this.fontSize}px Droid Sans Mono`
    this.text.forEach((line, i) => {
      this.ctx.fillText(line, 20, this.lineStep + i * this.lineStep)
    })
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 2
    this.ctx.strokeRect(0, 0, this.width, this.height)
  }
  getTexture () {
    return new THREE.Texture(this.canvas)
  }
}
