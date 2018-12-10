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

test('Does not dispatchEvent if no change in size', () => {
  const spy = jest.fn()
  const mockElement = {clientHeight: 200, clientWidth: 250, dispatchEvent: spy}
  const handlerSpy = jest.fn()
  const listener = new ResizeListener(mockElement, handlerSpy)

  listener.dispatch()

  expect(spy).not.toHaveBeenCalled()
})

test('Dispatchs resizeStart event on initial resize', () => {
  const spy = jest.fn()
  const mockElement = {clientHeight: 200, clientWidth: 250, dispatchEvent: spy}
  const handlerSpy = jest.fn()
  const listener = new ResizeListener(mockElement, handlerSpy)

  // Mock resize event
  mockElement.clientHeight = 250
  listener.dispatch()

  expect(spy.mock.calls[0][0].type).toBe('resizeStart')
})

test('Dispatchs resize event after resizeStart', () => {
  const spy = jest.fn()
  const mockElement = {clientHeight: 200, clientWidth: 250, dispatchEvent: spy}
  const handlerSpy = jest.fn()
  const listener = new ResizeListener(mockElement, handlerSpy)

  // Mock resize event
  mockElement.clientHeight = 250
  listener.dispatch()

  expect(spy.mock.calls[0][0].type).toBe('resizeStart')
  expect(spy.mock.calls[1][0].type).toBe('resize')
})

test('Dispatchs resizeEnd event after resize and no size change', () => {
  const spy = jest.fn()
  const mockElement = {clientHeight: 200, clientWidth: 250, dispatchEvent: spy}
  const handlerSpy = jest.fn()
  const listener = new ResizeListener(mockElement, handlerSpy)

  // Mock resize event
  mockElement.clientHeight = 250
  listener.dispatch()

  // Mock resizeEnd event
  listener.dispatch()

  expect(spy.mock.calls[0][0].type).toBe('resizeStart')
  expect(spy.mock.calls[1][0].type).toBe('resize')
  expect(spy.mock.calls[2][0].type).toBe('resizeEnd')
})
