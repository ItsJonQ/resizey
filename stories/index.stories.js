import React from 'react'

import {storiesOf} from '@storybook/react'
import '../src/index'

const stories = storiesOf('Resize', module)

stories.add('Example', () => {
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
            placeholder="Resize me. Square opacity + size will change."
            style={{width: 400, height: 300}}
          />
          <br />
          <div
            ref={this.setSubjectNodeRef}
            style={{
              background: 'blue',
              color: 'white',
              transition: 'all 0.2s ease',
              width: 200,
              height: 150,
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

stories.add('Chaining: Resize', () => {
  class Example extends React.PureComponent {
    state = {
      event: true,
      eventData: {},
    }
    componentDidMount() {
      this.node.addEventListener('resize', this.onResizeEnd)
      this.nodeOne.addEventListener('resize', this.onResizeEndOne)
      this.nodeTwo.addEventListener('resize', this.onResizeEndTwo)
    }

    componentWillUnmount() {
      this.node.removeEventListener('resize', this.onResizeEnd)
      this.nodeOne.removeEventListener('resize', this.onResizeEndOne)
      this.nodeTwo.removeEventListener('resize', this.onResizeEndTwo)
    }

    onResizeEnd = ({width, height}) => {
      this.nodeOne.style.width = `${width}px`
      this.nodeOne.style.height = `${height}px`
    }

    onResizeEndOne = ({width, height}) => {
      this.nodeTwo.style.width = `${width}px`
      this.nodeTwo.style.height = `${height}px`
    }

    onResizeEndTwo = ({width, height}) => {
      this.nodeThree.style.width = `${width}px`
      this.nodeThree.style.height = `${height}px`
    }

    setNodeRef = node => (this.node = node)
    setNodeOne = node => (this.nodeOne = node)
    setNodeTwo = node => (this.nodeTwo = node)
    setNodeThree = node => (this.nodeThree = node)

    render() {
      return (
        <div>
          <textarea
            ref={this.setNodeRef}
            placeholder="Resize me. Watch what happens when you stop."
            style={{
              position: 'fixed',
              zIndex: 100,
              top: 0,
              left: 0,
              opacity: 0.5,
            }}
          />
          <div
            ref={this.setNodeOne}
            style={{
              background: 'red',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Textarea
          </div>
          <div
            ref={this.setNodeTwo}
            style={{
              background: 'green',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Red
          </div>
          <div
            ref={this.setNodeThree}
            style={{
              background: 'blue',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Green
          </div>
          <br />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Chaining: ResizeEnd', () => {
  class Example extends React.PureComponent {
    state = {
      event: true,
      eventData: {},
    }
    componentDidMount() {
      this.node.addEventListener('resizeEnd', this.onResizeEnd)
      this.nodeOne.addEventListener('resizeEnd', this.onResizeEndOne)
      this.nodeTwo.addEventListener('resizeEnd', this.onResizeEndTwo)
    }

    componentWillUnmount() {
      this.node.removeEventListener('resizeEnd', this.onResizeEnd)
      this.nodeOne.removeEventListener('resizeEnd', this.onResizeEndOne)
      this.nodeTwo.removeEventListener('resizeEnd', this.onResizeEndTwo)
    }

    onResizeEnd = ({width, height}) => {
      this.nodeOne.style.width = `${width}px`
      this.nodeOne.style.height = `${height}px`
    }

    onResizeEndOne = ({width, height}) => {
      this.nodeTwo.style.width = `${width}px`
      this.nodeTwo.style.height = `${height}px`
    }

    onResizeEndTwo = ({width, height}) => {
      this.nodeThree.style.width = `${width}px`
      this.nodeThree.style.height = `${height}px`
    }

    setNodeRef = node => (this.node = node)
    setNodeOne = node => (this.nodeOne = node)
    setNodeTwo = node => (this.nodeTwo = node)
    setNodeThree = node => (this.nodeThree = node)

    render() {
      return (
        <div>
          <textarea
            ref={this.setNodeRef}
            placeholder="Resize me. Watch what happens when you stop."
            style={{
              position: 'fixed',
              zIndex: 100,
              top: 0,
              left: 0,
              opacity: 0.5,
            }}
          />
          <div
            ref={this.setNodeOne}
            style={{
              background: 'red',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Textarea
          </div>
          <div
            ref={this.setNodeTwo}
            style={{
              background: 'green',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Red
          </div>
          <div
            ref={this.setNodeThree}
            style={{
              background: 'blue',
              display: 'block',
              float: 'left',
              margin: 10,
              transition: 'all 0.2s ease',
              width: 100,
              height: 100,
            }}
          >
            I react to Green
          </div>
          <br />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Stress Test', () => {
  class Example extends React.PureComponent {
    state = {
      items: [...Array(200)].map((i, index) => ({id: `item-${index}`})),
      width: 100,
      height: 100,
      resizing: false,
    }

    componentDidMount() {
      this.node.addEventListener('resize', this.onResize)
      this.node.addEventListener('resizeEnd', this.onResizeEnd)
    }
    componentWillUnmount() {
      this.node.removeEventListener('resize', this.onResize)
      this.node.addEventListener('resizeEnd', this.onResizeEnd)
    }

    onResize = event => {
      const {width, height} = event
      this.setState({
        height: height,
        width: width,
        resizing: true,
      })
    }

    onResizeEnd = event => {
      this.setState({
        resizing: false,
      })
    }

    setNodeRef = node => (this.node = node)

    render() {
      const {height, width} = this.state

      return (
        <div>
          <textarea
            style={{
              position: 'fixed',
              zIndex: 100,
              width: 100,
              height: 100,
              top: 0,
              left: 0,
            }}
            ref={this.setNodeRef}
            placeholder="Resize me. Watch the squares move"
          />
          {this.state.items.map((item, index) => (
            <div
              key={item.id}
              style={{
                width: 40,
                height: 40,
                display: 'block',
                float: 'left',
                background: 'blue',
                opacity: this.state.resizing ? 0.3 : 1,
                margin: 5,
                transition: `all ${
                  10 * index > 5000 ? 5000 : 10 * index
                }ms linear`,
                transform: `scaleX(${height / 100}) scaleY(${width / 100})`,
                willChange: 'backgroun transform',
              }}
            />
          ))}
        </div>
      )
    }
  }

  return <Example />
})
