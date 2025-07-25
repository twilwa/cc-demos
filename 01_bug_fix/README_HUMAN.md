# Instructor Guide: Bug Fixing Exercise

## Overview

This exercise tests an AI agent's ability to:
- Run and interpret test failures
- Debug code systematically
- Fix bugs without breaking existing functionality
- Verify fixes through testing

## Exercise Contents

### Bugs Introduced

1. **Off-by-one error in median calculation** (src/buggy_module.js:24-25)
   - Affects even-length arrays
   - Incorrect indices: `sorted[mid]` and `sorted[mid + 1]`
   - Should be: `sorted[mid - 1]` and `sorted[mid]`

2. **Null reference error** (src/buggy_module.js:51)
   - Missing null/undefined check
   - Crashes when users don't have age property
   - Needs filtering or defensive coding

### Expected Failures

Running `npm test` initially shows:
- 4 failing tests
- 8 passing tests

Failing tests:
1. `calculateStatistics > should calculate median correctly for even-length arrays`
2. `calculateStatistics > should handle arrays with negative numbers`
3. `processUsers > should handle users with missing data`
4. `Integration Tests > should process real-world user data correctly`

## Evaluation Rubric

### Excellent (90-100%)
- Identifies both bugs correctly
- Provides clear explanation of issues
- Implements correct fixes
- All tests pass
- Shows systematic debugging approach

### Good (70-89%)
- Fixes both bugs eventually
- Most tests pass
- Some explanation of issues
- Minor inefficiencies in approach

### Satisfactory (50-69%)
- Fixes at least one bug
- Some tests pass
- Basic understanding shown
- May need hints or multiple attempts

### Needs Improvement (<50%)
- Struggles to identify bugs
- Unable to fix issues
- Tests still failing
- Lacks systematic approach

## Common Pitfalls

1. **Fixing symptoms not causes** - Making tests pass without understanding the bug
2. **Over-engineering** - Adding unnecessary complexity
3. **Breaking other tests** - Fixes that cause regressions
4. **Not running tests** - Making changes without verification

## Hints (if needed)

1. "Look at the test descriptions - what exactly is being tested?"
2. "What do the error messages tell you about what's wrong?"
3. "For the median calculation, trace through with a specific example"
4. "For the user processing, what assumptions does the code make?"

## Solution

### Bug 1 Fix:
```javascript
// Line 24-25, change from:
const mid = sorted.length / 2;
median = (sorted[mid] + sorted[mid + 1]) / 2;

// To:
const mid = sorted.length / 2;
median = (sorted[mid - 1] + sorted[mid]) / 2;
```

### Bug 2 Fix:
```javascript
// Line 51, change from:
const ages = users.map(user => user.age);

// To:
const ages = users.filter(user => user.age !== undefined).map(user => user.age);

// Or alternatively:
const ages = users.map(user => user.age).filter(age => age !== undefined);
```

## Extension Ideas

- Add more edge cases
- Introduce performance issues
- Add async/await bugs
- Include memory leak scenarios