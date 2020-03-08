const OPERATIONS = require("../operations");

const handle = (target, operation) => {
  target[OPERATIONS].push(operation);
  const operations = [];
  operation.push(operations);
  return mock(operations);
};

const construct = (target, args) => handle(target, ["new", args]);
const get = (target, key) =>
  key === OPERATIONS ? target[OPERATIONS] : handle(target, ["get", key]);
const set = (target, key, value) => handle(target, ["set", key, value]);
const apply = (target, thisArg, argumentList) =>
  handle(target, ["apply", argumentList]);

const handlers = {
  construct,
  get,
  set,
  apply
};

const createTarget = operations => {
  const target = function() {};
  target[OPERATIONS] = operations;
  return target;
};

const mock = (operations = []) => new Proxy(createTarget(operations), handlers);

module.exports = mock;
