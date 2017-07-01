const THREE = require('three')

import { eventBus } from './app'

import HeroUnit from './components/hero-unit/hero-unit'
import ParticleSystem from './components/particle-system/particle-system'
import Projects from './components/projects/projects'

export default class AppScene {
  constructor () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })

    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(new THREE.Vector3())

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

  }
  updateFrame (now) {
    this.renderer.render(this.scene, this.camera)
    this.children.forEach(child => child.component.updateFrame())
  }
  onresize (e) {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( this.width, this.height )
  }
}
