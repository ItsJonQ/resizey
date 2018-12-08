import listeners from './listeners'
/**
 * The dedicated event loop, powered by requestAnimationFrame, for our
 * resize listener events.
 * @returns { Object } Methods for the EventLoop
 */
function EventLoop() {
  const state = {
    debug: undefined,
    keepEventLoopOpen: true,
  }

  function run(args) {
    if (!state.keepEventLoopOpen) {
      cancelAnimationFrame(start)
    }
    listeners.dispatch()
    runDebugger(args)
    requestAnimationFrame(start)
  }

  function runDebugger(args) {
    if (typeof state.debug === 'function') {
      state.debug(args)
    }
  }

  function start(args) {
    state.keepEventLoopOpen = true
    run(args)
  }

  function stop() {
    state.keepEventLoopOpen = false
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
