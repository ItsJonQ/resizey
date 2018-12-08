import {noop} from './utils'

function ResizeEvent(props) {
  const {element, ...rest} = props
  return {
    type: 'resize',
    target: element,
    width: element.clientWidth,
    height: element.clientHeight,
    currentTarget: element,
    cancelBubble: noop,
    preventDefault: noop,
    stopPropagation: noop,
    ...rest,
  }
}

export default ResizeEvent
