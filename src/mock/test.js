const subject = require("./index");

describe("mock", () => {
  let mock;

  beforeEach(() => {
    mock = subject();
  });

  it("should mock get without error", () => {
    const a = mock.a;
  });

  it("should mock set without error", () => {
    mock.a = "a";
  });

  it("should mock constructor without error", () => {
    new mock();
  });

  it("should mock apply without error", () => {
    mock();
  });
});
