import EventLoop from '../EventLoop'

test('Creates an instance with start/stop methods', () => {
  const loop = new EventLoop()

  expect(loop.start).toBeTruthy()
  expect(loop.stop).toBeTruthy()
})

test('Automatically starts loop on instantiation', () => {
  const spy = jest.spyOn(global, 'requestAnimationFrame')
  const loop = new EventLoop()

  expect(spy).toHaveBeenCalled()

  spy.mockRestore()
})

test('Stops the loop, when .stop() method is called', () => {
  const spy = jest.spyOn(global, 'cancelAnimationFrame')
  const loop = new EventLoop()

  loop.stop()
  // Fake the next run cycle
  loop.run()

  expect(spy).toHaveBeenCalled()

  spy.mockRestore()
})

test('Tries to broadcast listener on run', () => {
  const spy = jest.fn()
  const listener = {
    broadcast: spy,
  }

  new EventLoop({listeners: [listener]})

  expect(spy).toHaveBeenCalled()
})
