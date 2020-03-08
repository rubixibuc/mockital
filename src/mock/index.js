const STACK = require("../stack");

const handle = (target, frame) => {
  target[STACK].push(frame);
  const stack = [];
  frame.push(stack);
  return mock(stack);
};

const handlers = {
  construct(target, args) {
    return handle(target, ["new", args]);
  },
  get(target, key) {
    if (key === STACK) {
      return target[STACK];
    }
    return handle(target, ["get", key]);
  },
  set(target, key, value) {
    return handle(target, ["set", key, value]);
  },
  apply: function(target, thisArg, argumentList) {
    return handle(target, ["apply", argumentList]);
  }
};

const createTarget = stack => {
  const target = function() {};
  target[STACK] = stack;
  return target;
};

const mock = (stack = []) => new Proxy(createTarget(stack), handlers);

module.exports = mock;
