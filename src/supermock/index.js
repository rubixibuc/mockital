const CALLS = Symbol("calls");

const createTarget = (original, stack) => {
  const target = function() {};
  target.original = original;
  target.stack = stack;
  return target;
};

const inspect = proxy => proxy[CALLS];

const handlers = {
  construct(target, args) {
    const calls = (target[CALLS] = target[CALLS] || []);
    if (target.original == null) {
      const stack = [["new", args]];
      calls.push(stack);
      return supermock(target, stack);
    } else {
      target.stack.push(["new", args]);
      return supermock(target.original, target.stack);
    }
  },
  get(target, key) {
    const calls = (target[CALLS] = target[CALLS] || []);
    if (key === CALLS) {
      return calls;
    }
    if (target.original == null) {
      const stack = [["get", key]];
      calls.push(stack);
      return supermock(target, stack);
    } else {
      target.stack.push(["get", key]);
      return supermock(target.original, target.stack);
    }
  },
  set(target, key, value) {
    const calls = (target[CALLS] = target[CALLS] || []);
    if (target.original == null) {
      const stack = [["set", key, value]];
      calls.push(stack);
      return supermock(target, stack);
    } else {
      target.stack.push(["set", key, value]);
      return supermock(target.original, target.stack);
    }
  },
  apply: function(target, thisArg, argumentsList) {
    const calls = (target[CALLS] = target[CALLS] || []);
    if (target.original == null) {
      const stack = [["apply", argumentsList]];
      calls.push(stack);
      return supermock(target, stack);
    } else {
      target.stack.push(["apply", argumentsList]);
      return supermock(target.original, target.stack);
    }
  }
};

const supermock = (original, stack) =>
  new Proxy(createTarget(original, stack), handlers);

module.exports = {
  inspect,
  supermock
};
