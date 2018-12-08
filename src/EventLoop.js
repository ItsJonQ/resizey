/**
 * The dedicated event loop, powered by requestAnimationFrame, for our
 * resize listener events.
 * @param listeners { Array<Listener> } Collection of listners.
 * @returns { Object } Methods for the EventLoop
 */
function EventLoop({listeners} = {listeners: []}) {
  const state = {
    listeners,
    keepEventLoopOpen: true,
  }

  function run() {
    const {listeners} = state
    if (!state.keepEventLoopOpen) {
      cancelAnimationFrame(start)
    }
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i].broadcast()
    }
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
