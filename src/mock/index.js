const OPERATIONS = require("../operations");
const MATCHES = require("../matches");

const checkMatch = (operations, match) => {
  let same = true;

  for (let i = 0; i < operations.operation.length - 1; i++) {
    if (
      JSON.stringify(operations.operation[i]) !==
      JSON.stringify(match.operation[i])
    ) {
      same = false;
      break;
    }
  }
  if (same && !match.operations.operation) {
    return true;
  }
  if (same && match.operations.operation && operations.operations.operation) {
    return checkMatch(operations.operations, match.operations);
  }

  return false;
};

const handle = (target, operation, nest) => {
  target[OPERATIONS].push(operation);
  const operations = [];
  Object.defineProperty(operations, "operation", { value: operation });
  Object.defineProperty(operations, "operations", {
    value: target[OPERATIONS]
  });
  operation.push(operations);

  if (nest) {
    const matched = target[MATCHES].reverse().find(match =>
      checkMatch(operations, match[1])
    );

    if (matched) {
      return matched[0];
    }

    return mock(operations, [...target[MATCHES]]);
  }
};

const construct = (target, args) => handle(target, ["new", args], true);
const get = (target, key) =>
  [OPERATIONS, MATCHES].indexOf(key) !== -1
    ? target[key]
    : handle(target, ["get", key], true);
const set = (target, key, value) => {
  if ([OPERATIONS, MATCHES].indexOf(key) !== -1) {
    target[key] = value;
    return true;
  }
  handle(target, ["set", key, value], false);
  return true;
};
const apply = (target, thisArg, argumentList) =>
  handle(target, ["apply", argumentList], true);

const handlers = {
  construct,
  get,
  set,
  apply
};

const createTarget = (operations = [], matches = []) => {
  const target = function() {};
  target[OPERATIONS] = operations;
  target[MATCHES] = matches;
  return target;
};

const mock = (operations, matches) =>
  new Proxy(createTarget(operations, matches), handlers);

module.exports = mock;
