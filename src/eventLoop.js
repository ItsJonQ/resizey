import createEventLoop from './createEventLoop'
import {EVENT_LOOP_KEY} from './utils'

// Creates a singleton instance of our custom Event loop
let eventLoop = window[EVENT_LOOP_KEY]
if (!window[EVENT_LOOP_KEY]) {
  eventLoop = window[EVENT_LOOP_KEY] = createEventLoop()
}

export default eventLoop
