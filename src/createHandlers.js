import {createHandlersCollection} from './utils'
/**
 * Stores the collection of handlers for the resize events.
 * @returns { Object } Methods for Handlers
 */
function Handlers() {
  let state = {}

  function add(id, event, handler) {
    if (!state[id]) {
      state[id] = createHandlersCollection()
    }
    if (state[id][event]) {
      state[id][event].push(handler)
    }
  }

  function get(id) {
    return state[id]
  }

  function dispatch(id, eventProps) {
    const handler = get(id)
    if (!handler) return
    const event = eventProps.type
    const events = handler[event]
    if (!events) return
    // Find the associated handlers and execute them
    for (let i = 0, len = events.length; i < len; i++) {
      events[i](eventProps)
    }
  }

  function removeHandler(id, event, handler) {
    const listener = get(id)
    if (!listener) return
    if (listener[event].indexOf(handler) !== -1) {
      listener[event].splice(handler, 1)
    }
  }

  function remove(id, handler) {
    if (!state[id]) return
    delete state[id]
  }

  function getState() {
    return state
  }

  function clear() {
    state = {}
  }

  return {
    add,
    get,
    remove,
    removeHandler,
    getState,
    clear,
    dispatch,
  }
}

const createHandlers = () => new Handlers()

export default createHandlers
