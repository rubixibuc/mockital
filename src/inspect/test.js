const subject = require("./index");
const mock = require("../mock");

describe("inspect", () => {
  let Mock;

  beforeEach(() => {
    Mock = mock();
  });

  it("should inspect get correctly", () => {
    const a = Mock.a;
    expect(subject(Mock)).toMatchInlineSnapshot(`
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
    Mock.a = "a";
    expect(subject(Mock)).toMatchInlineSnapshot(`
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
    new Mock(1, 2);
    expect(subject(Mock)).toMatchInlineSnapshot(`
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
    Mock("a", "b");
    expect(subject(Mock)).toMatchInlineSnapshot(`
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
    Mock.a = "is this is amazing?";

    let wow = new Mock.b.c["c"](1, "2", [1, 2]);

    wow.d.e(1, 2, 3).f = "this is amazing";

    expect(subject(Mock)).toMatchInlineSnapshot(`
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
