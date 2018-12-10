# 🐡 Resizey

[![Build Status](https://travis-ci.org/ItsJonQ/resizey.svg?branch=master)](https://travis-ci.org/ItsJonQ/resizey)
[![npm version](https://badge.fury.io/js/resizey.svg)](https://badge.fury.io/js/resizey)
[![Coverage Status](https://coveralls.io/repos/github/ItsJonQ/resizey/badge.svg?branch=master)](https://coveralls.io/github/ItsJonQ/resizey?branch=master)

> Resize event listeners on DOM Elements!

## Features

- **Zero dependencies!**
- Super tiny, at ~900B gzipped
- Ultra fast performance

At the moment, the only Element that supports the `resize` event is `window`. It's a super handy event to have!
**Resizey** adds that same functionality (and a bit more) to regular [Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element).

If you want a more native approach, I recommend checking out [ResizeObserver](https://developers.google.com/web/updates/2016/10/resizeobserver).
Unfortunately, it's currently not very well support yet.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Events](#events)
  - [Resize Event](#resize-event)
- [Examples](#examples)
- [Strategy](#strategy)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

To start using resizey, add it to your project using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/) by running:

```
// npm
npm install --save resizey

// yarn
yarn add resizey
```

## Setup

To start listening to [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) resize events, simply import **Resizey** somewhere in your project, like so:

```js
import 'resizey'
```

And that's it! 🙌

## Usage

**Resizey**'s events can be added/removed on a DOM element, just like any other native event, like `click`, `mouseenter`, or `mousemove`.

```js
...
// Get your Element
const element = document.querySelector('.el')
// Define a callback when the element resizes
const resizeEventCallback = event => console.log(event)

// Subscribe
element.addEventListener('resize', resizeEventCallback)

// Unsubscribe
element.removeEventListener('resize', resizeEventCallback)
```

In addition to `resize`, this library also supports `resizeStart` and `resizeEnd`

```js
...
// Subscribe to events
element.addEventListener('resizeStart', callback)
element.addEventListener('resize', callback)
element.addEventListener('resizeEnd', callback)

// Unsubscribe events
element.removeEventListener('resizeStart', callback)
element.removeEventListener('resize', callback)
element.removeEventListener('resizeEnd', callback)
```

## Events

Below are the events that this module provides:

| Event name    | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `resizeStart` | Fires immediately (once) after the `Element`'s size changes.        |
| `resize`      | Fires anytime the `Element`'s size changes.                         |
| `resizeEnd`   | Fires immediately (once) after the `Element`'s size stops changing. |

### Resize Event

For any of the events (above), this library provides a (custom) [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) with the following data:

| Property    | Type     | Description                                                               |
| ----------- | -------- | ------------------------------------------------------------------------- |
| height      | `number` | The current height of the Element.                                        |
| width       | `number` | The current width of the Element.                                         |
| deltaHeight | `number` | The change from the previous height to the current height of the Element. |
| deltaWidth  | `number` | The change from the previous width to the current width of the Element.   |

```js
function onResize(event) {
  console.log(event.type) // => resize
  console.log(event.width) // => 400
  console.log(event.height) // => 200
  console.log(event.deltaWidth) // => 2
  console.log(event.deltaHeight) // => 1
}

const element = document.querySelector('.el')
element.addEventListener('resize', onResize)
```

## Examples

Check out this simply [Storybook demo](https://resizey.netlify.com/). It was built with React. However, **Resizey** is plain ol' vanilla JavaScript. It can work with anything JavaScript supported app, plugin, library, or framework.

## Strategy

**Resizey** uses a polling strategy via [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to observe Elements and dispatch changes in size. The alternative strategy is to create and inject an iFrame clone (example: `[element-resize-event](https://github.com/KyleAMathews/element-resize-event)`), allowing you to tap into the native `resize` event available to `Window` objects.

For this library, I've opted to go with polling as it does not modify the DOM. This avoids the chances of style side-effects that may occur for Element(s), especially for children-based style rules like `:only-child`.

## License

MIT © [Q](https://jonquach.com)
