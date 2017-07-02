const THREE = require('three')

export default class Camera {
  constructor (fov, aspect, near, far) {
    this.fov = fov
    this.aspect = aspect
    this.near = near
    this.far = far

    this.lookAtVec = new THREE.Vector3()
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.lookAt(this.lookAtVec)
  }
  setPosition (x, y, z) {
    this.camera.position.set(x, y, z)
  }
  update () {

  }
}
