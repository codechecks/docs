const { join } = require("path");
const mockFS = require("mock-fs");

const simpleBuildSizeWatcher = require("../index");
const { codechecks } = require("@codechecks/client");

describe("simple-build-size-watcher", () => {
  const codeChecksMock = require("../__mocks__/@codechecks/client").codechecks;
  beforeEach(() => jest.resetAllMocks());

  it("should work", async () => {
    codeChecksMock.isPr.mockReturnValue(true);
    mockFS({
      [join(__dirname, "../build")]: {
        "main.js": "APP JS",
      },
    });

    await simpleBuildSizeWatcher({
      path: join(__dirname, "../build/main.js"),
    });

    mockFS.restore();
    expect(codechecks.saveValue).toMatchInlineSnapshot(`
[MockFunction] {
  "calls": Array [
    Array [
      "simple-build-size-watcher",
      6,
    ],
  ],
  "results": Array [
    Object {
      "isThrow": false,
      "value": undefined,
    },
  ],
}
`);

    expect(codechecks.success).toMatchInlineSnapshot(`
[MockFunction] {
  "calls": Array [
    Array [
      Object {
        "name": "Simple Build Size",
        "shortDescription": "Size changed by: 6B Total size: 6B",
      },
    ],
  ],
  "results": Array [
    Object {
      "isThrow": false,
      "value": undefined,
    },
  ],
}
`);
  });
});
