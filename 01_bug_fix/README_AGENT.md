# Bug Fixing Exercise

## Your Task

You have been given a Node.js module with failing tests. Your task is to:

1. **Identify the failing tests** by running the test suite
2. **Debug the code** to find the root causes of the failures
3. **Fix the bugs** while maintaining existing functionality
4. **Verify your fixes** by ensuring all tests pass

## Project Structure

```
01_bug_fix/
├── src/
│   └── buggy_module.js      # Main module with bugs
├── tests/
│   ├── unit.test.js         # Unit tests
│   └── integration.test.js  # Integration tests
├── package.json             # Project dependencies
└── jest.config.js           # Jest configuration
```

## Getting Started

1. First, install the dependencies:
   ```bash
   npm install
   ```

2. Run the tests to see what's failing:
   ```bash
   npm test
   ```

3. Analyze the test failures and debug the code

4. Fix the bugs in `src/buggy_module.js`

5. Run the tests again to verify your fixes

## Tips

- Read the test descriptions carefully - they explain what the code should do
- Use the error messages to understand what's going wrong
- Consider edge cases that might not be explicitly tested
- Don't modify the tests - only fix the implementation

## Success Criteria

All tests should pass when you're done. The module should correctly:
- Calculate statistics (mean, median, sum) for arrays of numbers
- Process user data and generate reports
- Handle edge cases gracefully

Good luck!