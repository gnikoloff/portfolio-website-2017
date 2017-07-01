import Style from '../scss/imports.scss'
import MiniBus from 'minibus'
import AppScene from './scene'

export const eventBus = MiniBus.create()

init()
function init () {
  window.addEventListener('resize', onresize)
  document.addEventListener('mousemove', onmousemove)
  document.addEventListener('mousedown', onmousedown)
  document.addEventListener('mouseup', onmouseup)

  renderFrame()

  new AppScene()
}

function renderFrame (now) {
  window.requestAnimationFrame(renderFrame)
  eventBus.emit('renderframe', now)
}

function onresize (e) {
  eventBus.emit('onresize', e)
}

function onmousemove (e) {
  eventBus.emit('onmousemove', e)
}

function onmousedown (e) {
  eventBus.emit('onmousedown', e)
}

function onmouseup (e) {
  eventBus.emit('onmouseup', e)
}
