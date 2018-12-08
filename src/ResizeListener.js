import handlers from './handlers'
import {uuid, noop} from './utils'

/**
 * Checks for and dispatches a custom "resize" event when an Element's
 * dimension changes.
 *
 * @param {HTMLElement} element The DOM node to watch for resize events.
 * @param {Function} handler The callback function on resize event.
 * @returns {Object} Methods for the listener.
 */
function ResizeListener(element, handler) {
  this.id = uuid()
  this.element = element
  this.getState = getState
  this.dispatch = dispatch

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

  function dispatch() {
    const deltaHeight = element.clientHeight - state.height
    const deltaWidth = element.clientWidth - state.width

    if (deltaHeight + deltaWidth === 0) return

    updateSize()

    handlers.dispatch(this.id, {
      target: element,
      type: 'resize',
      width: element.clientWidth,
      height: element.clientHeight,
      deltaHeight,
      deltaWidth,
      currentTarget: element,
      cancelBubble: noop,
      preventDefault: noop,
      stopPropagation: noop,
    })
  }

  function getState() {
    return state
  }

  // Initialize
  updateSize()

  return this
}

export default ResizeListener
