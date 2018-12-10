import {uuid} from './utils'
import ResizeEvent from './ResizeEvent'

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
    // height
    h: 0,
    // width
    w: 0,
    // transitionState
    t: 0,
  }

  function updateSize() {
    if (!element) return
    state.h = element.clientHeight
    state.w = element.clientWidth
  }

  function dispatch() {
    const deltaHeight = element.clientHeight - state.h
    const deltaWidth = element.clientWidth - state.w

    if (deltaHeight + deltaWidth === 0) {
      if (state.t === 1) {
        element.dispatchEvent(
          new ResizeEvent({
            element,
            type: 'resizeEnd',
            deltaHeight,
            deltaWidth,
          }),
        )
        state.t = 0
      }
      state.t = 0
    } else {
      updateSize()
      /* istanbul ignore else */
      if (state.t === 0) {
        element.dispatchEvent(
          new ResizeEvent({
            element,
            type: 'resizeStart',
            deltaHeight,
            deltaWidth,
          }),
        )
      }
      element.dispatchEvent(
        new ResizeEvent({
          element,
          type: 'resize',
          deltaHeight,
          deltaWidth,
        }),
      )
      state.t = 1
    }
  }

  function getState() {
    return state
  }

  // Initialize
  updateSize()

  return this
}

export default ResizeListener
