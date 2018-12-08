import ResizeListener from '../ResizeListener'
import listeners from '../listeners'

afterEach(() => {
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

  expect(state.h).toBe(200)
  expect(state.w).toBe(250)
})

test('Does not have dimension values if no element is provided', () => {
  const listener = new ResizeListener()

  const state = listener.getState()

  expect(state.h).toBe(0)
  expect(state.w).toBe(0)
})
