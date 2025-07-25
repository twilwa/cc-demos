# Exercise 06: Performance Profiling & Auto-Optimization - Human Guide

## Demo Flow

### 1. Setup & Initial State (2-3 minutes)
```bash
cd 06_perf_opt
npm install
```

**Say:** "This exercise demonstrates AI-driven performance optimization. We have an intentionally slow fibonacci implementation that needs to meet specific performance targets."

### 2. Show the Problem (2-3 minutes)
```bash
# Show the slow implementation
cat src/fibonacci.js

# Run the benchmark to see how slow it is
npm run benchmark
```

**Key Points:**
- Point out the O(2^n) recursive implementation
- Highlight the artificial delays making it even slower
- Show the performance targets that need to be met
- Emphasize that even fibonacci(20) will be painfully slow

### 3. Show the Tests (1-2 minutes)
```bash
npm test
```

**Say:** "The tests verify correctness - they should pass before and after optimization. Notice some tests have longer timeouts because they'll be slow initially."

### 4. Agent Interaction (8-10 minutes)
**Prompt:** "Please optimize this fibonacci implementation to meet the performance targets. Use profiling to identify bottlenecks and apply appropriate optimization techniques."

**Expected Agent Actions:**
1. Run initial benchmark to understand current performance
2. Analyze the code to identify inefficiencies
3. Implement optimizations (likely memoization or dynamic programming)
4. Remove artificial delays
5. Run benchmarks to verify improvements
6. Ensure all tests still pass

### 5. Verification & Results (2-3 minutes)
```bash
# Verify tests still pass
npm test

# Check performance improvements
npm run benchmark

# Show the optimized code
cat src/fibonacci.js
```

**Key Points to Highlight:**
- Dramatic performance improvements (likely 1000x+ faster)
- All tests still passing (correctness preserved)
- Different optimization techniques used (memoization, iterative, etc.)
- How profiling guided the optimization decisions

## Key Points to Highlight

### Performance Optimization Concepts
- **Algorithmic Complexity**: Moving from O(2^n) to O(n) or O(1)
- **Memoization**: Caching expensive computations
- **Dynamic Programming**: Bottom-up vs top-down approaches
- **Profiling**: Using data to guide optimization decisions

### AI Capabilities Demonstrated
- **Code Analysis**: Understanding performance bottlenecks
- **Algorithmic Knowledge**: Applying appropriate optimization techniques
- **Testing**: Ensuring correctness is maintained
- **Measurement**: Using benchmarks to validate improvements

### Real-World Applications
- Web application performance optimization
- Database query optimization
- API response time improvements
- Mobile app battery/CPU optimization

## Troubleshooting

### If the Agent Struggles
- **Hint:** "Consider what calculations are being repeated unnecessarily"
- **Hint:** "Look into memoization or dynamic programming approaches"
- **Hint:** "The artificial delays can simply be removed"

### If Benchmark Won't Run
- Check Node.js version (needs 18+)
- Ensure all dependencies installed with `npm install`
- Try running `node benchmark/bench.js` directly

### If Tests Fail After Optimization
- **Common Issue**: Function signatures changed
- **Solution:** Ensure the API remains exactly the same
- **Check:** Return values should be identical to original

### If Performance Targets Not Met
- **Check:** Are artificial delays removed?
- **Check:** Is memoization properly implemented?
- **Check:** Are you using iterative instead of recursive approaches?

## Expected Performance Improvements

### Before Optimization
- `fibonacci(35)`: ~30-60 seconds (extremely slow)
- `fibonacciSequence(20)`: ~5-10 seconds  
- `evenFibs(25)`: ~10-20 seconds

### After Optimization
- `fibonacci(35)`: <1ms (meets 100ms target easily)
- `fibonacciSequence(20)`: <5ms (meets 50ms target easily)
- `evenFibs(25)`: <10ms (meets 75ms target easily)

## Reset Commands
- `npm run reset` - Reset git state
- `git reset --hard ORIG_HEAD` - Hard reset
- `git clean -fd` - Clean untracked files

## Extension Ideas
If time permits, you can ask the agent to:
- Implement additional optimization techniques
- Add more sophisticated profiling
- Create performance regression tests
- Optimize memory usage as well as time