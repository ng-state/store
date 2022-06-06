module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(spec/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "tests-coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/release/"],
  moduleNameMapper: {
    "^@ng-state/store$": "<rootDir>/release/ng-state",
    "^@ng-state/(.*)$": "<rootDir>/release/$1",
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/pretty-format/build/plugins/ConvertAnsi.js",
  ],
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
