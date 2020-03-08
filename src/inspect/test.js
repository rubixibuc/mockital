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

  it("should match readme example", () => {
    mockObj.a = "is this is amazing?";

    let wow = new mockObj.b.c["c"](1, "2", [1, 2]);

    wow.d.e(1, 2, 3).f = "this is amazing";

    expect(subject(mockObj)).toEqual([
      ["set", "a", "is this is amazing?", []],
      [
        "get",
        "b",
        [
          [
            "get",
            "c",
            [
              [
                "get",
                "c",
                [
                  [
                    "new",
                    [1, "2", [1, 2]],
                    [
                      [
                        "get",
                        "d",
                        [
                          [
                            "get",
                            "e",
                            [
                              [
                                "apply",
                                [1, 2, 3],
                                [["set", "f", "this is amazing", []]]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);
    expect(subject(wow)).toEqual([
      [
        "get",
        "d",
        [
          [
            "get",
            "e",
            [["apply", [1, 2, 3], [["set", "f", "this is amazing", []]]]]
          ]
        ]
      ]
    ]);
  });
});
