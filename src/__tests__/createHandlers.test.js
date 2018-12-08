import createHandlers from '../createHandlers'

test('Can add a handler', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', 'resize', spy)

  expect(handlers.getState().a.resize).toEqual([spy])
})

test('Does not add a duplicate handlers', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', 'resize', () => {})
  handlers.add('a', 'resize', spy)

  expect(Object.keys(handlers.getState()).length).toBe(1)
})

test('Can add multiple handlers', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', 'resizeStart', spy)
  handlers.add('b', 'resizeStart', spy)
  handlers.add('c', 'resizeStart', spy)

  const state = handlers.getState()

  expect(Object.keys(state).length).toBe(3)
  expect(state.a.resizeStart).toEqual([spy])
  expect(state.b.resizeStart).toEqual([spy])
  expect(state.c.resizeStart).toEqual([spy])
})

test('Can get a handler', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', 'resizeEnd', spy)
  handlers.add('b', 'resizeEnd', () => {})

  expect(handlers.get('a').resizeEnd).toEqual([spy])
  expect(handlers.get('b').resizeEnd[0]).toBeTruthy()
})

test('Can remove a handler', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', spy)
  handlers.remove('a')

  expect(handlers.getState().a).toBeFalsy()
})

test('Does not remove handler, if id does not match', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', spy)
  handlers.remove('b')

  expect(handlers.getState().a).toBeTruthy()
})
