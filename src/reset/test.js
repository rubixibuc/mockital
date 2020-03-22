const subject = require("./index");
const mock = require("../mock");
const inspect = require("../inspect");

describe("reset", () => {
  let Mock;

  beforeEach(() => {
    Mock = mock();
  });

  it("should reset mock operations", () => {
    Mock.a;

    subject(Mock);

    expect(inspect(Mock)).toEqual([]);
  });

  it("should match readme example", () => {
    Mock.a.b.c("1", "2", "3");

    subject(Mock);

    expect(inspect(Mock)).toEqual([]);
  });
});
