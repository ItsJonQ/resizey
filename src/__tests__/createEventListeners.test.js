import createEventListeners from '../createEventListeners'
import listeners from '../listeners'

const addEventListenerRef = Element.prototype.addEventListener
const removeEventListenerRef = Element.prototype.removeEventListener

beforeEach(() => {
  createEventListeners()
})

afterEach(() => {
  Element.prototype.addEventListener = addEventListenerRef
  Element.prototype.removeEventListener = removeEventListenerRef
  listeners.clear()
  document.body.innerHTML = ''
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

test('Adds resize events to listeners on elements', () => {
  const spy = jest.fn()
  const el = document.createElement('div')

  expect(listeners.getState().length).toBe(0)

  el.addEventListener('resize', spy)

  expect(listeners.getState().length).toBe(1)
})

test('Removes resize events to listeners on elements', () => {
  const spy = jest.fn()
  const el = document.createElement('div')

  expect(listeners.getState().length).toBe(0)

  el.addEventListener('resize', spy)
  expect(listeners.getState().length).toBe(1)

  el.removeEventListener('resize', spy)
  expect(listeners.getState().length).toBe(0)
})

test('Does not add resize events to listeners on window', () => {
  const spy = jest.fn()

  expect(listeners.getState().length).toBe(0)

  window.addEventListener('resizeStart', spy)
  window.addEventListener('resize', spy)
  window.addEventListener('resizeEnd', spy)

  expect(listeners.getState().length).toBe(0)
})

test('Does not remove resize events to listeners on window', () => {
  const spy = jest.fn()

  expect(listeners.getState().length).toBe(0)

  window.removeEventListener('resizeStart', spy)
  window.removeEventListener('resize', spy)
  window.removeEventListener('resizeEnd', spy)

  expect(listeners.getState().length).toBe(0)
})

test('Does not create ResizeListener if element already exists in registry', () => {
  const spy = jest.fn()
  const methodSpy = jest.fn()
  const el = document.createElement('div')

  el.addEventListener('resize', spy)
  expect(listeners.getState().length).toBe(1)

  listeners.add = methodSpy

  el.addEventListener('resize', spy)
  expect(listeners.getState().length).toBe(1)
  expect(methodSpy).not.toHaveBeenCalled()

  methodSpy.mockRestore()
})

test('Removes ResizeListener from registry if the associated element is removed from DOM', () => {
  const spy = jest.fn()
  const el = document.createElement('div')
  // Add to DOM
  document.body.appendChild(el)

  el.addEventListener('resize', spy)
  el.addEventListener('resize', () => {})
  expect(listeners.getState().length).toBe(1)

  // Remove from DOM
  el.parentElement.removeChild(el)

  el.removeEventListener('resize', spy)

  expect(listeners.getState().length).toBe(0)
})

test('Does not remove ResizeListener from registry if the associated element exists in DOM', () => {
  const spy = jest.fn()
  const el = document.createElement('div')
  // Add to DOM
  document.body.appendChild(el)

  el.addEventListener('resize', spy)
  el.addEventListener('resize', () => {})
  expect(listeners.getState().length).toBe(1)

  el.removeEventListener('resize', spy)

  expect(listeners.getState().length).toBe(1)
})
