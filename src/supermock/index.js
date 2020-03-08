const CALLS = Symbol("calls");

const createTarget = stack => {
  const target = function() {};
  target[CALLS] = stack;
  return target;
};

const inspect = proxy => proxy[CALLS];

const handle = (target, frame) => {
  target[CALLS].push(frame);
  const stack = [];
  frame.push(stack);
  return supermock(stack);
};

const handlers = {
  construct(target, args) {
    return handle(target, ["new", args]);
  },
  get(target, key) {
    if (key === CALLS) {
      return target[CALLS];
    }
    return handle(target, ["get", key]);
  },
  set(target, key, value) {
    return handle(target, ["set", key]);
  },
  apply: function(target, thisArg, argumentList) {
    return handle(target, ["apply", argumentList]);
  }
};

const supermock = (stack = []) => new Proxy(createTarget(stack), handlers);

module.exports = {
  inspect,
  supermock
};
