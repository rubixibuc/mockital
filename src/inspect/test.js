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
    new mockObj(1, 2);
    expect(subject(mockObj)).toMatchInlineSnapshot(`
      Array [
        Array [
          "new",
          Array [
            1,
            2,
          ],
          Array [],
        ],
      ]
    `);
  });

  it("should inspect apply correctly", () => {
    mockObj("a", "b");
    expect(subject(mockObj)).toMatchInlineSnapshot(`
      Array [
        Array [
          "apply",
          Array [
            "a",
            "b",
          ],
          Array [],
        ],
      ]
    `);
  });

  it("should match readme example", () => {
    mockObj.a = "is this is amazing?";

    let wow = new mockObj.b.c["c"](1, "2", [1, 2]);

    wow.d.e(1, 2, 3).f = "this is amazing";

    expect(subject(mockObj)).toMatchInlineSnapshot(`
Array [
  Array [
    "set",
    "a",
    "is this is amazing?",
    Array [],
  ],
  Array [
    "get",
    "b",
    Array [
      Array [
        "get",
        "c",
        Array [
          Array [
            "get",
            "c",
            Array [
              Array [
                "new",
                Array [
                  1,
                  "2",
                  Array [
                    1,
                    2,
                  ],
                ],
                Array [
                  Array [
                    "get",
                    "d",
                    Array [
                      Array [
                        "get",
                        "e",
                        Array [
                          Array [
                            "apply",
                            Array [
                              1,
                              2,
                              3,
                            ],
                            Array [
                              Array [
                                "set",
                                "f",
                                "this is amazing",
                                Array [],
                              ],
                            ],
                          ],
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
]
`);
    expect(subject(wow)).toMatchInlineSnapshot(`
Array [
  Array [
    "get",
    "d",
    Array [
      Array [
        "get",
        "e",
        Array [
          Array [
            "apply",
            Array [
              1,
              2,
              3,
            ],
            Array [
              Array [
                "set",
                "f",
                "this is amazing",
                Array [],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
]
`);
  });
});
