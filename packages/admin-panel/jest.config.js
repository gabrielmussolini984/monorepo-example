const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');
const { name } = require('./package.json');

module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  transform: { '\\.ts$': ['ts-jest'] },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: '<rootDir>/coverage',
  testMatch: ['<rootDir>/src/modules/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  clearMocks: true,
  displayName: name,
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node'
};
