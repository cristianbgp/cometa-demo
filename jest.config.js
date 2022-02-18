module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$",
};
