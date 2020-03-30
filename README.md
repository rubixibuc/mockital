# MOCKITAL 🦸

[![Build Status](https://travis-ci.org/rubixibuc/mockital.svg?branch=master)](https://travis-ci.org/rubixibuc/mockital) [![Coverage Status](https://coveralls.io/repos/github/rubixibuc/mockital/badge.svg?branch=master)](https://coveralls.io/github/rubixibuc/mockital?branch=master)

- Supports gets, sets, new, and invocation
- Supports unlimited nesting

### Install

```shell script
npm i mockital
```

### Examples

##### Inspecting (Compatible with [Jest Snapshots](https://jestjs.io/docs/en/snapshot-testing))

```javascript 1.8
const { mock, inspect } = require("mockital");

const Mock = mock();

Mock.a = "is this is amazing?";

const wow = new Mock.b.c["c"](1, "2", [1, 2]);

wow.d.e(1, 2, 3).f = "this is amazing";

// Jest
expect(inspect(Mock)).toMatchSnapshot();

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

##### Reset mock

```javascript 1.8
const { mock, reset, inspect } = require("mockital");

const Mock = mock();

Mock.a.b.c("1", "2", "3");

reset(Mock);

JSON.stringify(inspect(Mock)) === [];
```

##### Stubbing values

```javascript 1.8
const { mock, when } = require("mockital");

const Mock = mock();

when("a", mock().a.b.c("1", "2", "3"), Mock);

Mock.a.b.c("1", "2", "3") === "a";
```

##### Reset stubbed values

```javascript 1.8
const { mock, resetWhen, when } = require("mockital");

const Mock = mock();

when("a", mock().a.b.c("1", "2", "3"), Mock);

resetWhen(Mock);

// stubbed value no longer returned
Mock.a.b.c("1", "2", "3").d.e;
```
