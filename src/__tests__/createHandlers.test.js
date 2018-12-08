import createHandlers from '../createHandlers'

test('Can add a handler', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', spy)

  expect(handlers.getState().a).toEqual([spy])
})

test('Does not add a duplicate handlers', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', () => {})
  handlers.add('a', spy)

  expect(Object.keys(handlers.getState()).length).toBe(1)
})

test('Can add multiple handlers', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', spy)
  handlers.add('b', spy)
  handlers.add('c', spy)

  const state = handlers.getState()

  expect(Object.keys(state).length).toBe(3)
  expect(state.a).toEqual([spy])
  expect(state.b).toEqual([spy])
  expect(state.c).toEqual([spy])
})

test('Can get a handler', () => {
  const spy = jest.fn()
  const handlers = createHandlers()
  handlers.add('a', spy)
  handlers.add('b', () => {})

  expect(handlers.get('a')).toEqual([spy])
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
