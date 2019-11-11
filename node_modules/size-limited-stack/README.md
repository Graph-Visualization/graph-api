# size-limited-stack [![NPM version](http://img.shields.io/npm/v/size-limited-stack.svg?style=flat)](https://www.npmjs.org/package/size-limited-stack)

[![Build Status](http://img.shields.io/travis/Tyriar/size-limited-stack.svg?style=flat)](https://travis-ci.org/Tyriar/size-limited-stack)

A stack with a maximum size that evicts elements from the bottom when reached. It features familiar interfaces but does not directly extend `Array.prototype` to prevent possible misuse.

## Install

```bash
npm install --save size-limited-stack
```

## Usage

```js
var SizeLimitedStack = require('size-limited-stack');
var stack = new SizeLimitedStack(2);
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop()); // 3
console.log(stack.pop()); // 2
console.log(stack.pop()); // undefined
```

## API

### SizeLimitedStack

Create a SizeLimitedStack.

**Parameters**

-   `maxSize` **int** The maximum size of the stack.

#### pop

Remove and return the value on the top of the stack.

Returns **object** The value from the top of the stack.

#### push

Push a new value, if the size threshold is hit, a value is evicted from the
<i>bottom</i> of the stack.

**Parameters**

-   `value` **object** The value to add.

#### setMaxSize

Sets the maximum size of the stack, evicting any elements exceeding the limit
if necessary.

**Parameters**

-   `maxSize` **int** The new maximum size of the stack.
