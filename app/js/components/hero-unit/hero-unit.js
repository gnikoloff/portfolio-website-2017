const THREE = require('three')

import TextureCanvas from '../shared/texture-canvas'

let textArr = [
  'Georgi Nikoloff',
  ' ',
  'Hi! dolar sit amet yo yo yo yo',
  'curently working at wonderland industry',
  'doing stuff with js and webgl'
]

export default class HeroUnit {
  constructor () {
    let tex = new TextureCanvas(textArr)
    this.geometry = new THREE.PlaneBufferGeometry(100, 50, 2, 2)
    this.material = new THREE.MeshBasicMaterial({ map: tex.getTexture(), transparent: true })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
  addTo (parent) {
    parent.add(this.mesh)
    return this
  }
  updateFrame () {
    this.mesh.material.map.needsUpdate = true
  }
}
