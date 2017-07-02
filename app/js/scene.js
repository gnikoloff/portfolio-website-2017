const THREE = require('three')

import { eventBus } from './app'

import Camera from './components/camera/camera'
import HeroUnit from './components/hero-unit/hero-unit'
import ParticleSystem from './components/particle-system/particle-system'
import Projects from './components/projects/projects'

export default class AppScene {
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.scene = new THREE.Scene()
    this.camera = new Camera(45, this.width / this.height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.clock = new THREE.Clock()
    this.then = 0

    this.camera.setPosition(0, 0, 100)

    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x111111)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    document.querySelector('#app-container').appendChild(this.renderer.domElement)

    eventBus.on('renderframe', this.updateFrame.bind(this))
    eventBus.on('onresize', this.onresize.bind(this))

    this.children = [
      { name: 'hero-unit', component: new HeroUnit() },
      { name: 'particle-system', component: new ParticleSystem() },
      { name: 'projects', component: new Projects() }
    ]
    this.children.forEach(child => child.component.addTo(this.scene))

    let geo = new THREE.SphereGeometry(20)
    let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    let offset = 100
    for (let i = 0; i < 10; i += 1) {
      let mesh = new THREE.Mesh(geo, mat)
      let randX = (Math.random() * 2 - 1) * offset
      let randY = (Math.random() * 2 - 1) * offset
      let randZ = (Math.random() * 2 - 1) * offset
      mesh.position.set(randX, randY, randZ)
    }

  }
  updateFrame (now) {
    this.renderer.render(this.scene, this.camera.camera)
    this.then += this.clock.getDelta()

    this.camera.update()

    this.children.forEach(child => child.component.updateFrame(this.then))
  }
  onresize (e) {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( this.width, this.height )
  }
}
