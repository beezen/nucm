module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest"
  },
  testURL: "http://localhost/",
  moduleFileExtensions: ["ts", "js", "json"],
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["node_modules"],
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"]
};
