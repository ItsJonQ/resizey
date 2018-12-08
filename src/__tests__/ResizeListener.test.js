import ResizeListener from '../ResizeListener'
import handlers from '../handlers'
import listeners from '../listeners'

afterEach(() => {
  handlers.clear()
  listeners.clear()
})

test('Creates an instance with a uuid', () => {
  const a = new ResizeListener()
  const b = new ResizeListener()

  expect(a.id).not.toEqual(b.id)
})

test('Attempts to set dimensions from an element on instantiation', () => {
  const mockElement = {clientHeight: 200, clientWidth: 250}
  const listener = new ResizeListener(mockElement)

  const state = listener.getState()

  expect(state.height).toBe(200)
  expect(state.width).toBe(250)
})

test('Does not have dimension values if no element is provided', () => {
  const listener = new ResizeListener()

  const state = listener.getState()

  expect(state.height).toBe(0)
  expect(state.width).toBe(0)
})

// test("Automatically adds listeners on creation", () => {
//   const mockElement = { clientHeight: 200, clientWidth: 250 };
//   const listener = new ResizeListener(mockElement);

//   expect(listeners.find(mockElement)).toBe(listener);
// });

// test('Dispatches associated handlers on resize', () => {
//   const mockElement = {clientHeight: 200, clientWidth: 250}
//   const listener = new ResizeListener(mockElement)

// })
