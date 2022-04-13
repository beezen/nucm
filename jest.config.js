const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testURL: "http://localhost/",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules"],
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"]
};
