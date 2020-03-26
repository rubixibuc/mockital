const subject = require("./index");

describe("mock", () => {
  let Mock;

  beforeEach(() => {
    Mock = subject();
  });

  it("should mock get without error", () => {
    const a = Mock.a;
  });

  it("should mock set without error", () => {
    Mock.a = "a";
  });

  it("should mock constructor without error", () => {
    new Mock("a", "b");
  });

  it("should mock apply without error", () => {
    Mock(1, 2);
  });
});
