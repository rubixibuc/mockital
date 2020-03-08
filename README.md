# MOCKITAL 🦸

- Supports gets, sets, new, and invocation
- Supports nested everything

**More utilities are coming for inspecting/asserting/stubbing**

**Perfect for snapshot testing mocks with Jest**

### Examples

```javascript 1.8
import { mock, inspect } from "mockital";

let Mock = mock();

Mock.a = "is this is amazing?";

let wow = new Mock.b.c["c"](1, "2", [1, 2]);

wow.d.e(1, 2, 3).f = "this is amazing";

JSON.stringify(inspect(Mock)) ===
  [
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
  ];
JSON.stringify(inspect(wow)) ===
  [
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
  ];
```
