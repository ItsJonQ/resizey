/**
 * Stores the collection of handlers for the resize events.
 * @returns { Object } Methods for Handlers
 */
function Handlers() {
  let state = {}

  function add(id, handler) {
    if (!state[id]) {
      state[id] = []
    }
    state[id].push(handler)
  }

  function get(id) {
    return state[id]
  }

  function dispatch(id, eventProps) {
    const handler = get(id)
    if (!handler) return
    // Find the associated handlers and execute them
    for (let i = 0, len = handler.length; i < len; i++) {
      handler[i](eventProps)
    }
  }

  function removeHandler(id, handler) {
    const listener = get(id)
    if (!listener) return
    if (listener.indexOf(handler) !== -1) {
      listener.splice(handler, 1)
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
