import createEventListeners from './createEventListeners'
import {EVENT_LOOP_KEY} from './utils'
import './eventLoop'

if (!window[EVENT_LOOP_KEY]) {
  createEventListeners()
}
