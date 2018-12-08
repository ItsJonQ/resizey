# 🐡 eventlistener-resize

[![Build Status](https://travis-ci.org/ItsJonQ/eventlistener-resize.svg?branch=master)](https://travis-ci.org/ItsJonQ/eventlistener-resize)
[![npm version](https://badge.fury.io/js/eventlistener-resize.svg)](https://badge.fury.io/js/eventlistener-resize)

> A tiny library to add/remove listeners on Element resize

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- **Zero dependencies!**
- Super tiny, at ~900B gzipped

## Installation

```
npm install --save eventlistener-resize
```

## Usage

```
import 'eventlistener-resize'

...

const element = document.querySelector('.el')
element.addEventListener('resizeStart', resizeStartEventCallback)
element.addEventListener('resize', resizeEventCallback)
element.addEventListener('resizeEnd', resizeEndEventCallback)

...

element.removeEventListener('resizeStart', resizeStartEventCallback)
element.removeEventListener('resize', resizeEventCallback)
element.removeEventListener('resizeEnd', resizeEndEventCallback)
```
