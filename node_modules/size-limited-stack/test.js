import SizeLimitedStack from './';
import test from 'ava';

test('Initializing with non-integer max size should throw', t => {
  t.throws(wrapConstructor(undefined));
  t.throws(wrapConstructor('test'));
  t.throws(wrapConstructor({}));
  t.throws(wrapConstructor([]));
  t.end();
});

test('Initializing with <= 0 max size should throw', t => {
  t.throws(wrapConstructor(0));
  t.throws(wrapConstructor(-1));
  t.end();
});

test('Initializing with >= 1 max size should not throw', t => {
  t.doesNotThrow(wrapConstructor(1));
  t.doesNotThrow(wrapConstructor(2));
  t.end();
});

test('Pushing and popping within the max size should work as expected', t => {
  var stack = new SizeLimitedStack(5);
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.push(5);
  t.same(5, stack.pop());
  t.same(4, stack.pop());
  t.same(3, stack.pop());
  t.same(2, stack.pop());
  t.same(1, stack.pop());
  t.same(undefined, stack.pop());
  t.end();
});

test('Popping an empty stack should return undefined', t => {
  var stack = new SizeLimitedStack(1);
  t.same(undefined, stack.pop());
  stack.push(1);
  stack.pop();
  t.same(undefined, stack.pop());
  t.end();
});

test('Setting a new max size should evict elements from the bottom', t => {
  var stack = new SizeLimitedStack(3);
  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.setMaxSize(1);
  t.same(3, stack.pop());
  t.same(undefined, stack.pop());
  t.end();
});

function wrapConstructor(arg) {
  return function () {
    return new SizeLimitedStack(arg);
  };
}
