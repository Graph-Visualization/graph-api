'use strict';

/**
 * Create a SizeLimitedStack.
 * @constructor
 * @param {int} maxSize The maximum size of the stack.
 */
function SizeLimitedStack(maxSize) {
  this.stack = [];
  this.setMaxSize(maxSize);
}

/**
 * Push a new value, if the size threshold is hit, a value is evicted from the
 * <i>bottom</i> of the stack.
 * @param {object} value The value to add.
 */
SizeLimitedStack.prototype.push = function (value) {
  this.stack.push(value);
  this.length = this.stack.length;
  this.evictIfNecessary();
};

/**
 * Remove and return the value on the top of the stack.
 * @return {object} The value from the top of the stack.
 */
SizeLimitedStack.prototype.pop = function () {
  var value = this.stack.pop();
  this.length = this.stack.length;
  return value;
};

/**
 * Sets the maximum size of the stack, evicting any elements exceeding the limit
 * if necessary.
 * @param {int} maxSize The new maximum size of the stack.
 */
SizeLimitedStack.prototype.setMaxSize = function (maxSize) {
  if (typeof maxSize !== 'number') {
    throw new Error('Max size must be a number');
  }
  if (maxSize < 1) {
    throw new Error('Max size must be at least 1');
  }
  this.maxSize = maxSize;
  this.evictIfNecessary();
};

/**
 * Evict elements from the <i>bottom</i> of the stack that exceed the limit.
 * @private
 */
SizeLimitedStack.prototype.evictIfNecessary = function () {
  while (this.stack.length > this.maxSize) {
    this.stack.shift();
  }
  this.length = this.stack.length;
};

module.exports = SizeLimitedStack;
