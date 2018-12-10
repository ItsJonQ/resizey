import createEventLoop from '../createEventLoop'
import listeners from '../listeners'

afterEach(() => {
  listeners.clear()
})

test('Creates an instance with start/stop methods', () => {
  const loop = createEventLoop()

  expect(loop.start).toBeTruthy()
  expect(loop.stop).toBeTruthy()
})

test('Automatically starts loop on instantiation', () => {
  const spy = jest.spyOn(global, 'requestAnimationFrame')
  createEventLoop()

  expect(spy).toHaveBeenCalled()

  spy.mockRestore()
})

test('Stops the loop, when .stop() method is called', () => {
  const spy = jest.spyOn(global, 'cancelAnimationFrame')
  const loop = createEventLoop()

  loop.stop()
  // Fake the next run cycle
  loop.run()

  expect(spy).toHaveBeenCalled()

  spy.mockRestore()
})

test('Tries to dispatch listener on run', () => {
  const spy = jest.fn()
  const listener = {
    dispatch: spy,
  }
  listeners.add(listener)

  const loop = createEventLoop()

  // Mock a run cycle
  loop.run()

  expect(spy).toHaveBeenCalled()
})

test('Can run debugger in loop', () => {
  const spy = jest.fn()
  const loop = createEventLoop()
  loop.debug(spy)

  // Mock a run cycle
  loop.run()

  expect(spy).toHaveBeenCalled()
})
