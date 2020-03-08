const subject = require("./index");

describe("operations", () => {
  it("should be symbol", () => {
    const a = { [subject]: "a" };

    expect(a[subject]).toEqual("a");
  });
});
