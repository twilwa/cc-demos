# CLAUDE.md - Exercise-Specific Context for 01_bug_fix

## Exercise Overview
This exercise demonstrates bug fixing with test prioritization. The codebase contains two intentional bugs that cause test failures. The exercise tests the agent's ability to:
1. Analyze failing tests
2. Identify root causes
3. Fix bugs systematically
4. Validate fixes through testing

## Project Structure
```
01_bug_fix/
├── CLAUDE.md          # This file - exercise context
├── README_AGENT.md    # Instructions for Claude Code
├── README_HUMAN.md    # Instructions for human tester
├── package.json       # Jest dependencies
├── jest.config.js     # Jest configuration
├── src/
│   └── buggy_module.js # Contains two intentional bugs
└── tests/
    ├── unit.test.js       # Unit test (will fail initially)
    └── integration.test.js # Integration test (will fail initially)
```

## Bug Context
1. **Bug 1**: Off-by-one error in array processing
2. **Bug 2**: Null reference error in object property access

## Expected Behavior
- Unit tests should catch individual function errors
- Integration tests should catch interaction errors
- Both test suites should pass after fixes

## Success Criteria
- All tests pass
- Bugs are fixed correctly (not just making tests pass)
- Code quality is maintained
- No new bugs introduced