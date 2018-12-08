import handlers from './handlers'
import listeners from './listeners'
import ResizeListener from './ResizeListener'
import {SUPPORTED_EVENTS} from './utils'

/**
 * Enhances the default addEventListener/removeEventListener
 * Element prototype to listen for our custom "resize" event.
 */
function createEventListeners() {
  const addEventListenerRef = Element.prototype.addEventListener
  const removeEventListenerRef = Element.prototype.removeEventListener

  Element.prototype.addEventListener = function(event, handler, ...args) {
    const addEvent = addEventListenerRef.bind(this)
    // Adding the custom resize event
    if (SUPPORTED_EVENTS.includes(event) && this !== window) {
      let listener = listeners.find(this)
      if (!listener) {
        listener = new ResizeListener(this, handler)
        listeners.add(listener)
      }

      handlers.add(listener.id, event, handler)
    }
    // Execute the default addEventHandler function
    return addEvent(event, handler, ...args)
  }

  Element.prototype.removeEventListener = function(event, handler, ...args) {
    const removeEvent = removeEventListenerRef.bind(this)
    // Removing the custom resize event
    if (SUPPORTED_EVENTS.includes(event) && this !== window) {
      let listener = listeners.find(this)
      handlers.removeHandler(listener.id, event, handler)
      // Remove reference to DOM node, if it no longer exists
      if (!document.contains(listener.element)) {
        listeners.remove(listener)
      }
    }
    // Execute the default removeEventHandler function
    return removeEvent(event, handler, ...args)
  }
}

export default createEventListeners
