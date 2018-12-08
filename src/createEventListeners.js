import handlers from './handlers'
import listeners from './listeners'
import ResizeListener from './ResizeListener'

function createEventListeners() {
  const addEventListenerRef = Element.prototype.addEventListener
  const removeEventListenerRef = Element.prototype.removeEventListener

  Element.prototype.addEventListener = function(event, handler, ...args) {
    const addEvent = addEventListenerRef.bind(this)
    // Adding the custom resize event
    if (event === 'resize' && this !== window) {
      let listener = listeners.find(this)
      if (!listener) {
        listener = new ResizeListener(this, handler)
        listeners.add(listener)
      }

      handlers.add(listener.id, handler)
    }
    // Execute the default addEventHandler function
    return addEvent(event, handler, ...args)
  }

  Element.prototype.removeEventListener = function(event, handler, ...args) {
    const removeEvent = removeEventListenerRef.bind(this)
    // Removing the custom resize event
    if (event === 'resize' && this !== window) {
      let listener = listeners.find(this)
      handlers.removeHandler(listener.id, handler)
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
