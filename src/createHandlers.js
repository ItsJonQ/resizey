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
  }
}

const createHandlers = () => new Handlers()

export default createHandlers
