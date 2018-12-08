/**
 * Stores the collection of handlers for the resize events.
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
    getState,
    clear,
    dispatch,
  }
}

const createHandlers = () => new Handlers()

export default createHandlers
