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
