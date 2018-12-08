function Listeners() {
  let state = []

  function add(listener) {
    state.push(listener)
  }

  function find(element) {
    if (!element) return
    return state.find(i => i.element === element)
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
    getState,
    clear,
  }
}

const createListeners = () => new Listeners()

export default createListeners
