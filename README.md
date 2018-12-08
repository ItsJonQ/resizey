# event-listener-resize

> A tiny library to add/remove listeners on Element resize

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- **Zero dependencies!**
- Super tiny, at ~600B gzipped
- Perfect for library use

## Installation

```
npm install --save event-listener-resize
```

## Usage

```
import eventListenerResize from 'event-listener-resize'

...

const element = document.querySelector('.el')
element.addEventListener('resize', resizeEventCallback)

...

element.removeEventListener('resize', resizeEventCallback)
```
