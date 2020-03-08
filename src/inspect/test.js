const subject = require("./index");
const mock = require("../mock");

describe("inspect", () => {
  let mockObj;

  beforeEach(() => {
    mockObj = mock();
  });

  it("should inspect get correctly", () => {
    const a = mockObj.a;
    expect(subject(mockObj)).toMatchInlineSnapshot(`
      Array [
        Array [
          "get",
          "a",
          Array [],
        ],
      ]
    `);
  });

  it("should inspect set correctly", () => {
    mockObj.a = "a";
    expect(subject(mockObj)).toMatchInlineSnapshot(`
      Array [
        Array [
          "set",
          "a",
          "a",
          Array [],
        ],
      ]
    `);
  });

  it("should inspect constructor correctly", () => {
    new mockObj();
    expect(subject(mockObj)).toMatchInlineSnapshot(`
      Array [
        Array [
          "new",
          Array [],
          Array [],
        ],
      ]
    `);
  });

  it("should inspect apply correctly", () => {
    mockObj();
    expect(subject(mockObj)).toMatchInlineSnapshot(`
Array [
  Array [
    "apply",
    Array [],
    Array [],
  ],
]
`);
  });
});
