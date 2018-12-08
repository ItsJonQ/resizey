/**
 * Stores the collection of listeners for the resize events.
 * @returns { Object } Methods for Listeners
 */
function Listeners() {
  let state = []

  function add(listener) {
    state.push(listener)
  }

  function find(element) {
    if (!element) return
    return state.find(i => i.element === element)
  }

  function dispatch() {
    for (let i = 0, len = state.length; i < len; i++) {
      state[i].dispatch()
    }
  }

  function getState() {
    return state
  }

  function remove(listener) {
    if (!listener) return
    state.splice(state.indexOf(listener), 1)
  }

  function clear() {
    state = []
  }

  return {
    add,
    remove,
    find,
    dispatch,
    getState,
    clear,
  }
}

const createListeners = () => new Listeners()

export default createListeners
