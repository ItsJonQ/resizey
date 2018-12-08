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

  Element.prototype.removeEventListener = function(event, listener, ...args) {
    const removeEvent = removeEventListenerRef.bind(this)
    // Removing the custom resize event
    if (event === 'resize' && this !== window) {
    }
    // Execute the default removeEventHandler function
    return removeEvent(event, listener, ...args)
  }
}

export default createEventListeners
