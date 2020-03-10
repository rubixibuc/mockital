const subject = require("./index");

describe("matches", () => {
  it("should be symbol", () => {
    const a = { [subject]: "a" };

    expect(a[subject]).toEqual("a");
  });
});
