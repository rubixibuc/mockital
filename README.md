# SUPERMOCK

- Supports gets, sets, new, and invocation
- Supports nested everything

**More utilities are coming for inspecting/asserting/stubbing**

**Perfect for snapshot testing mocks with Jest**

### Examples

```javascript 1.8
import { supermock, inspect } from "@rubixibuc/supermock";

let SuperMock = supermock();

let wow = new SuperMock.a.b["c"](1, "2", [1, 2]);

wow.c.d(1, 2, 3).e = "this is amazing";

JSON.stringify(inspect(SuperMock)) ===
  [
    [
      "get",
      "a",
      [
        [
          "get",
          "b",
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
                      "c",
                      [
                        [
                          "get",
                          "d",
                          [
                            [
                              "apply",
                              [1, 2, 3],
                              [["set", "e", "this is amazing", []]]
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
      "c",
      [
        [
          "get",
          "d",
          [["apply", [1, 2, 3], [["set", "e", "this is amazing", []]]]]
        ]
      ]
    ]
  ];
```
