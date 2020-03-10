const MATCHES = require("../matches");
const OPERATIONS = require("../operations");

module.exports = (value, match, proxy) => {
  proxy[MATCHES].push([value, match[OPERATIONS]]);
};
