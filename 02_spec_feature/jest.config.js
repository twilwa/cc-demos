module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  testMatch: ['**/tests/**/*.test.js'],
  // Performance testing configuration
  testTimeout: 10000, // 10 second timeout for performance tests
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};