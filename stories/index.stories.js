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
    }

    componentWillUnmount() {
      this.node.removeEventListener('resize', this.onResize)
    }

    onResize = eventData => {
      console.log(eventData)
      this.setState({
        eventData: eventData,
      })
      this.subjectNode.style.width = `${eventData.width / 2}px`
      this.subjectNode.style.height = `${eventData.height / 2}px`
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
            width: {data.width}
            <br />
            height: {data.height}
            <br />
            deltaWidth: {data.deltaWidth}
            <br />
            deltaHeight: {data.deltaHeight}
            <br />
          </div>
          <textarea ref={this.setNodeRef} placeholder="Resize me" />
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
