const THREE = require('three')

export default class SingleProject {
  constructor (work, yOffset) {
    this.name = work['Project Name']
    this.role = work['Project Role']
    this.technology = work['Project Technology']
    this.year = work['Project Year']
    this.url = work['Project URL']
    this.imageURL = 'http://lorempixel.com/512/256/city/'

    let geometry = new THREE.PlaneBufferGeometry(50, 25, 2, 2)
    let material = new THREE.MeshBasicMaterial({ map: null })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.set(0, yOffset, 0)
    let loader = new THREE.TextureLoader()
    loader.setCrossOrigin('')
    loader.load(this.imageURL, (tex) => {
      this.mesh.material.map = tex
      this.mesh.material.needsUpdate = true
    })
  }
  addTo(parent) {
    parent.add(this.mesh)
    return this
  }
  updateFrame () {
    //this.mesh.material.map.needsUpdate = true
  }
}
