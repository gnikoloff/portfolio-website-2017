const THREE = require('three')

import SingleProject from './single-project'

export default class Projects {
  constructor () {
    this.projects = []
    this.verticalSpacing = 30
    this.textureLoader = new THREE.TextureLoader()
    window.worksData.forEach((work, i) => {
      this.projects.push(new SingleProject(work, this.verticalSpacing * -i, this.textureLoader))
    })
  }
  addTo (parent) {
    this.projects.forEach(project => project.addTo(parent))
    return this
  }
  updateFrame () {
    this.projects.forEach(project => project.updateFrame())
  }
}
