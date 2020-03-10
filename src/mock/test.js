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
    new mock("a", "b");
  });

  it("should mock apply without error", () => {
    mock(1, 2);
  });

  it("should convert mock to string", () => {
    mock.a.b.c("1", 2);

    expect(mock.toString()).toMatchInlineSnapshot(
      `"[[\\"get\\",\\"a\\",[[\\"get\\",\\"b\\",[[\\"get\\",\\"c\\",[[\\"apply\\",[\\"1\\",2],[]]]]]]]]]"`
    );
  });
});
