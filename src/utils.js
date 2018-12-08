// Super secret namespace for our custom event loop.
export const EVENT_LOOP_KEY = '__SECRET_EVENT_LOOP__'

export const SUPPORTED_EVENTS = ['resize', 'resizeStart', 'resizeEnd']

export function createHandlersCollection() {
  return SUPPORTED_EVENTS.reduce((collection, event) => {
    collection[event] = []
    return collection
  }, {})
}

/**
 * Factory to generate the UUID for the handlers.
 * @returns { Function } The function to generate the UUID.
 */
function getId() {
  let id = 0
  return () => `h-${id++}`
}

/**
 * The UUID function
 * @returns { string }
 */
export const uuid = getId()

export function noop() {
  return undefined
}
