const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');
const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  transform: { '\\.ts$': ['ts-jest'] },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov']
};
