const subject = require("../when");
const mock = require("../mock");

describe("when", () => {
  it("should return correct value on get", () => {
    const Mock = mock();

    subject("a", mock().a, Mock);

    expect(Mock.a).toEqual("a");
  });

  it("should return correct value on apply", () => {
    const Mock = mock();

    subject("b", mock().a("1", "2"), Mock);

    expect(Mock.a("1", "2")).toEqual("b");
  });

  it("should return correct value on contruction", () => {
    const Mock = mock();

    subject({ a: "a" }, new (mock())("a", "b"), Mock);

    expect(new Mock("a", "b")).toEqual({ a: "a" });
  });

  it("should return last value assigned to get", () => {
    const Mock = mock();

    subject("a", mock().a, Mock);
    subject("b", mock().a, Mock);

    expect(Mock.a).toEqual("b");
  });
});
