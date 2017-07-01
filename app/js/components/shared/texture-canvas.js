const THREE = require('three')

export default class TextureCanvas {
  constructor (text, fontSize = 64, width = 1024, height = 512) {
    this.text = text
    this.fontSize = fontSize
    this.width = width
    this.height = height

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.drawText()
  }
  drawText () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.textAlign = 'center'
    this.ctx.fillStyle = '#fff'
    this.ctx.font = `${this.fontSize}px Arial`
    this.ctx.fillText(this.text, this.width / 2, this.height / 2 + 20)
  }
  getTexture () {
    return new THREE.Texture(this.canvas)
  }
}
