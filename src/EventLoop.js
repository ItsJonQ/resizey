import listeners from './listeners'
/**
 * The dedicated event loop, powered by requestAnimationFrame, for our
 * resize listener events.
 * @param listeners { Array<Listener> } Collection of listners.
 * @returns { Object } Methods for the EventLoop
 */
function EventLoop() {
  const state = {
    keepEventLoopOpen: true,
  }

  function run() {
    if (!state.keepEventLoopOpen) {
      cancelAnimationFrame(start)
    }
    listeners.dispatch()
    requestAnimationFrame(start)
  }

  function start() {
    state.keepEventLoopOpen = true
    run()
  }

  function stop() {
    state.keepEventLoopOpen = false
  }

  start()

  return {
    start,
    run,
    stop,
  }
}

export default EventLoop
