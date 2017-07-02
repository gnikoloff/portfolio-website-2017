const THREE = require('three')

const vertexShader = require('./particle-system-vertex.glsl')
const fragmentShader = require('./particle-system-fragment.glsl')

export default class ParticleSystem {
  constructor (count = 10) {
    this.meshes = []
    this.uniforms = {
      time: { value: 0 }
    }

    this.makeParticles(count)
  }
  makeParticles (count) {
    let radius = 50
    let offset = 1 + Math.random()
    let vertices = new Float32Array( [
      -offset, -offset, offset,
       offset, -offset, offset,
       offset,  offset, offset
    ])
    for (let i = 0; i < count; i += 1) {
      let geometry = new THREE.BufferGeometry()
      let posOffsetX = (Math.random() * 2 - 1) * radius
      let posOffsetY = (Math.random() * 2 - 1) * radius
      let posOffsetZ = (Math.random() * 2 - 1) * radius

      geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

      let material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader,
        fragmentShader
      })
      let mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(posOffsetX, posOffsetY, posOffsetZ)
      this.meshes.push(mesh)
    }
  }
  addTo (parent) {
    this.meshes.forEach(mesh => parent.add(mesh))
    return this
  }
  updateFrame (now) {
    this.uniforms.time.value = now
  }
}
