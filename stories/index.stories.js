import React from 'react'

import {storiesOf} from '@storybook/react'
import '../src/index'

storiesOf('Resize', module).add('Example', () => {
  class Example extends React.PureComponent {
    state = {
      event: true,
      eventData: {},
    }
    componentDidMount() {
      this.node.addEventListener('resize', this.onResize)
      this.node.addEventListener('resizeStart', this.onResizeStart)
      this.node.addEventListener('resizeEnd', this.onResizeEnd)
    }

    componentWillUnmount() {
      this.node.removeEventListener('resize', this.onResize)
      this.node.removeEventListener('resizeStart', this.onResizeStart)
      this.node.removeEventListener('resizeEnd', this.onResizeEnd)
    }

    onResize = eventData => {
      this.setState({
        eventData,
        state: 'resize',
      })
      this.subjectNode.style.width = `${eventData.width / 2}px`
      this.subjectNode.style.height = `${eventData.height / 2}px`
    }

    onResizeStart = eventData => {
      this.setState({
        eventData,
        state: 'resizeStart',
      })
      requestAnimationFrame(() => {
        this.subjectNode.style.background = 'red'
        setTimeout(() => {
          this.subjectNode.style.background = 'blue'
        }, 500)
      })
    }

    onResizeEnd = eventData => {
      this.setState({
        eventData,
        state: 'resizeEnd',
      })
      requestAnimationFrame(() => {
        this.subjectNode.style.background = 'purple'
        setTimeout(() => {
          this.subjectNode.style.background = 'blue'
        }, 500)
      })
    }

    add = () => {
      if (this.state.event) return
      this.node.addEventListener('resize', this.onResize)
      this.setState({event: true})
    }

    remove = () => {
      if (!this.state.event) return
      this.node.removeEventListener('resize', this.onResize)
      this.setState({event: false})
    }

    setNodeRef = node => (this.node = node)
    setSubjectNodeRef = node => (this.subjectNode = node)

    render() {
      const {event, eventData: data} = this.state
      return (
        <div>
          <button onClick={this.add}>Add resize event</button>
          <button onClick={this.remove}>Remove resize event</button>
          <br />
          <br />
          <div>
            State:
            <br />
            Enabled: {event ? 'on' : 'off'}
            <br />
            Resize: {this.state.state}
            <br />
            {JSON.stringify(this.state.eventData)}
            <br />
          </div>
          <textarea
            ref={this.setNodeRef}
            placeholder="Resize me. Square will change color on resizeEnd"
          />
          <br />
          <div
            ref={this.setSubjectNodeRef}
            style={{
              background: 'blue',
              color: 'white',
              transition: 'all 0.2s ease',
            }}
          >
            I'll be half the size + an animation delay
          </div>
          <br />
        </div>
      )
    }
  }

  return <Example />
})
