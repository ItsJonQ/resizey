import createEventLoop from './createEventLoop'
import {EVENT_LOOP_KEY} from './utils'

let eventLoop = global[EVENT_LOOP_KEY]
if (!global[EVENT_LOOP_KEY]) {
  eventLoop = global[EVENT_LOOP_KEY] = createEventLoop()
}

export default eventLoop
