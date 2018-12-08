function ResizeEvent(props) {
  const {element, type, ...rest} = props
  const event = new Event(type)
  const eventKeys = Object.keys(rest)

  for (let i = 0, len = eventKeys.length; i < len; i++) {
    event[eventKeys[i]] = rest[eventKeys[i]]
  }

  event.width = element.clientWidth
  event.height = element.clientHeight

  return event
}

export default ResizeEvent
