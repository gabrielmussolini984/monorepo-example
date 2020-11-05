/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
const { name } = require('./package.json');

module.exports = {
  displayName: name,
  rootDir: '.',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/controllers/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  testMatch: ['<rootDir>/src/controllers/*.spec.js'],
  testEnvironment: 'node'
};
