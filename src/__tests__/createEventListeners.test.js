import createEventListeners from '../createEventListeners'
import handlers from '../handlers'
import listeners from '../listeners'

const addEventListenerRef = Element.prototype.addEventListener
const removeEventListenerRef = Element.prototype.removeEventListener

beforeEach(() => {
  createEventListeners()
})

afterEach(() => {
  Element.prototype.addEventListener = addEventListenerRef
  Element.prototype.removeEventListener = removeEventListenerRef
  handlers.clear()
  listeners.clear()
})

test('Modifies the default add/remove event listeners', () => {
  expect(Element.prototype.addEventListener).not.toEqual(addEventListenerRef)
  expect(Element.prototype.removeEventListener).not.toEqual(
    removeEventListenerRef,
  )
})

test('Can add/remove event listeners', () => {
  const spy = jest.fn()
  const el = document.createElement('div')
  el.addEventListener('click', spy)

  const mockEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  el.dispatchEvent(mockEvent)
  expect(spy).toHaveBeenCalledTimes(1)

  el.dispatchEvent(mockEvent)
  expect(spy).toHaveBeenCalledTimes(2)

  el.removeEventListener('click', spy)
  el.dispatchEvent(mockEvent)
  expect(spy).toHaveBeenCalledTimes(2)
})

test('Can add/remove event custom listeners', () => {
  const spy = jest.fn()
  const el = document.createElement('div')

  const event = document.createEvent('Event')
  event.initEvent('build', true, true)

  el.addEventListener('build', spy)

  el.dispatchEvent(event)
  expect(spy).toHaveBeenCalledTimes(1)

  el.dispatchEvent(event)
  expect(spy).toHaveBeenCalledTimes(2)

  el.removeEventListener('build', spy)
  el.dispatchEvent(event)
  expect(spy).toHaveBeenCalledTimes(2)
})

test('Adds resize events to handlers/listeners on elements', () => {
  const spy = jest.fn()
  const el = document.createElement('div')

  expect(Object.keys(handlers.getState()).length).toBe(0)
  expect(listeners.getState().length).toBe(0)

  el.addEventListener('resize', spy)

  expect(Object.keys(handlers.getState()).length).toBe(1)
  expect(listeners.getState().length).toBe(1)

  const listener = listeners.getState()[0]
  const handler = handlers.get(listener.id)

  expect(handler[0]).toBe(spy)
})

test('Does not add resize events to handlers/listeners on window', () => {
  const spy = jest.fn()

  expect(Object.keys(handlers.getState()).length).toBe(0)
  expect(listeners.getState().length).toBe(0)

  window.addEventListener('resize', spy)

  expect(Object.keys(handlers.getState()).length).toBe(0)
  expect(listeners.getState().length).toBe(0)
})
