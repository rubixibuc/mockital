const CALLS = Symbol("calls");

const createTarget = (original, stack) => {
  const target = function() {};
  target.original = original;
  target.stack = stack;
  return target;
};

const inspect = proxy => proxy[CALLS];

const handle = (target, frame) => {
  if (target.original == null) {
    const stack = [frame];
    (target[CALLS] = target[CALLS] || []).push(stack);
    return supermock(target, stack);
  } else {
    target.stack.push(frame);
    return supermock(target.original, target.stack);
  }
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
  apply: function(target, thisArg, argumentsList) {
    return handle(target, ["apply", arguments]);
  }
};

const supermock = (original, stack) =>
  new Proxy(createTarget(original, stack), handlers);

module.exports = {
  inspect,
  supermock
};
