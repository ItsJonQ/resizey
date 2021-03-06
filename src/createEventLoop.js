import listeners from './listeners'
/**
 * The dedicated event loop, powered by requestAnimationFrame, for our
 * resize listener events.
 * @returns { Object } Methods for the EventLoop
 */
function EventLoop() {
  const state = {
    debug: undefined,
    keep: true,
    loop: undefined,
  }

  function run(args) {
    if (!state.keep) {
      cancelAnimationFrame(state.loop)
      state.loop = undefined
    } else {
      listeners.dispatch()
      runDebugger(args)
      requestAnimationFrame(run)
    }
  }

  function runDebugger(args) {
    if (typeof state.debug === 'function') {
      state.debug(args)
    }
  }

  function start() {
    state.keep = true
    state.loop = requestAnimationFrame(run)
  }

  function stop() {
    state.keep = false
  }

  function debug(fn) {
    state.debug = fn
  }

  start()

  return {
    start,
    run,
    stop,
    debug,
  }
}

const createEventLoop = () => new EventLoop()

export default createEventLoop
