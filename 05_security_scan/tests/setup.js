// Jest setup file for security tests
// Ensure clean state between tests

beforeEach(() => {
  // Clean up any prototype pollution
  delete Object.prototype.isAdmin;
  delete Object.prototype.polluted;
});

afterEach(() => {
  // Reset any global state
  jest.clearAllMocks();
});