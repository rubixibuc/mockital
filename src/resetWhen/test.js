const subject = require("./index");
const mock = require("../mock");
const when = require("../when");
const util = require("util");

describe("reset", () => {
  let Mock;

  beforeEach(() => {
    Mock = mock();
  });

  it("should reset mock operations", () => {
    when("a", mock().a, Mock);

    subject(Mock);

    expect(util.types.isProxy(Mock.a)).toBe(true);
  });

  it("should match readme example", () => {
    when("a", mock().a.b.c("1", "2", "3"), Mock);

    subject(Mock);

    expect(util.types.isProxy(Mock.a)).toBe(true);
  });
});
