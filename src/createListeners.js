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

  function clear() {
    state = []
  }

  return {
    add,
    find,
    dispatch,
    getState,
    clear,
  }
}

const createListeners = () => new Listeners()

export default createListeners
