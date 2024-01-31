module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "node",
  testEnvironmentOptions: {
    url: "http://localhost/"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["node_modules"],
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"]
};
