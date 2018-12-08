// Super secret namespace for our custom event loop.
export const EVENT_LOOP_KEY = '__SECRET_EVENT_LOOP__'

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
