module.exports.codechecks = {
  report: jest.fn(),
  getValue: jest.fn(),
  saveValue: jest.fn(),
  getCollection: jest.fn(),
  saveCollection: jest.fn(),
  isPr: jest.fn(),
  context: {
    workspaceRoot: "/codechecks",
  },
  getArtifactLink: jest.fn(),
  getPageLink: jest.fn(),
  success: jest.fn(),
  failure: jest.fn(),
};
