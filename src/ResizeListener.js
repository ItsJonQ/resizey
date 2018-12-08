import handlers from './handlers'
import listeners from './listeners'
import {uuid} from './utils'

/**
 * Checks for and broadcasts a custom "resize" event when an Element's
 * dimension changes.
 *
 * @param {HTMLElement} element The DOM node to watch for resize events.
 * @returns {Object} Methods for the listener.
 */
function ResizeListener(element) {
  this.id = uuid()
  this.element = element
  this.getState = getState
  this.broadcast = broadcast

  const state = {
    handlers,
    height: 0,
    width: 0,
  }

  function updateSize() {
    if (!element) return
    state.height = element.clientHeight
    state.width = element.clientWidth
  }

  function broadcast() {
    const deltaHeight = element.clientHeight - state.height
    const deltaWidth = element.clientWidth - state.width

    if (deltaHeight + deltaWidth === 0) return

    updateSize()

    const eventProps = {
      target: element,
      type: 'resize',
      width: element.clientWidth,
      height: element.clientHeight,
      deltaHeight,
      deltaWidth,
    }

    const handler = handlers.get(this.id)

    // Find the associated handlers and execute them
    for (let i = 0, len = handler.length; i < len; i++) {
      handler[i](eventProps)
    }
  }

  function getState() {
    return state
  }

  // Initialize
  updateSize()
  listeners.add(this)

  return this
}

export default ResizeListener
