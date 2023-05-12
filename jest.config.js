module.exports = {
  globals: {
    "ts-jest": {
        useESM: true,
        tsconfig: "tsconfig.spec.json",
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  testRegex: "(spec/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "tests-coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ['ts', 'js', 'html', 'svg', 'json', 'mjs', 'node'],
  modulePathIgnorePatterns: ["<rootDir>/release/"],
  moduleNameMapper: {
    "^@ng-state/store$": "<rootDir>/release/ng-state/fesm2022/ng-state-store",
    "^@ng-state/(.*)$": "<rootDir>/release/$1/fesm2022/ng-state-$1",
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/pretty-format/build/plugins/ConvertAnsi.js",
  ],
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
