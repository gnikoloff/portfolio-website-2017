const THREE = require('three')

import TextureCanvas from '../shared/texture-canvas'

export default class HeroUnit {
  constructor () {
    let tex = new TextureCanvas('Lorem Ipsum')
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
