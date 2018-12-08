import createEventListeners from './createEventListeners'
import {EVENT_LOOP_KEY} from './utils'
import './eventLoop'

if (!global[EVENT_LOOP_KEY]) {
  createEventListeners()
}
