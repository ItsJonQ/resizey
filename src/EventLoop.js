import createEventLoop from './createEventLoop'
import {EVENT_LOOP_KEY} from './utils'

// Creates a singleton instance of our custom Event loop
let eventLoop = global[EVENT_LOOP_KEY]
if (!global[EVENT_LOOP_KEY]) {
  eventLoop = global[EVENT_LOOP_KEY] = createEventLoop()
}

export default eventLoop
