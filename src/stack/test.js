const subject = require("./index");

describe("stack", () => {
  it("should be symbol", () => {
    const a = { [subject]: "a" };

    expect(a[subject]).toEqual("a");
  });
});
