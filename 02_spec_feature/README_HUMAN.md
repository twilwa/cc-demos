# Exercise 2: Spec-Driven Feature Development - Human Guide

## Demo Flow

1. **Introduction (2 minutes)**
   - "This exercise tests specification-driven development with performance constraints"
   - Show the detailed specification in `specs/data_processor_spec.md`
   - Highlight the performance budgets: 10ms/100ms/1000ms for different dataset sizes

2. **Show Current State (1 minute)**
   - Run `npm test` to show failing tests (functions not implemented)
   - Run `npm run benchmark` to show benchmark failure
   - Point out the comprehensive test suite and benchmark infrastructure

3. **Agent Implementation (15-20 minutes)**
   - Let the agent read the specification and implement the functions
   - Watch for:
     - How well the agent follows the detailed specification
     - Whether it implements performance-conscious algorithms
     - How it handles edge cases and validation rules

4. **Performance Validation (3-5 minutes)**
   - Run `npm test` to show all tests passing
   - Run `npm run benchmark` to demonstrate performance compliance
   - Show coverage report with `npm run test:coverage`

5. **Discussion Points (3-5 minutes)**
   - Discuss the value of detailed specifications
   - Talk about performance-driven development
   - Highlight the automated benchmarking approach

## Key Points to Highlight

- **Specification Quality**: The 150-line specification covers functional requirements, performance budgets, data formats, and implementation guidelines
- **Performance-First Design**: Budgets are set upfront and tested automatically
- **Realistic Constraints**: Memory limits, CPU budgets, and throughput requirements mirror real-world needs
- **Comprehensive Testing**: Unit tests, integration tests, performance tests, and edge case coverage
- **Developer Experience**: Benchmark tools, coverage reports, and clear error messages

## Technical Highlights

- **Performance Budgets**: 
  - 1K records: 10ms budget (100K records/second)
  - 10K records: 100ms budget (100K records/second)
  - 100K records: 1000ms budget (100K records/second)
- **Memory Constraints**: 50MB peak usage regardless of dataset size
- **Algorithm Requirements**: O(n) or O(n log n) only, no O(n²) operations
- **Validation Rules**: Complex business logic with multiple field types and constraints

## Expected Agent Behavior

**Good Signs:**
- Reads specification thoroughly before coding
- Asks clarifying questions about requirements
- Implements efficient algorithms (avoids nested loops)
- Handles edge cases mentioned in specification
- Tests implementation against benchmarks during development

**Red Flags:**
- Starts coding without reading specification
- Uses inefficient algorithms (O(n²) operations)
- Ignores performance requirements
- Doesn't handle malformed data gracefully
- Skips the benchmark validation step

## Troubleshooting

**If benchmarks fail:**
- Check for O(n²) algorithms in nested loops
- Look for repeated object creation in hot paths
- Verify regex patterns are pre-compiled
- Check for inefficient array operations

**If tests fail:**
- Verify output structure matches specification exactly
- Check validation rules are implemented correctly
- Ensure edge cases (empty data, null values) are handled
- Confirm transformation logic follows specification

**If memory usage is high:**
- Look for unnecessary object duplication
- Check for memory leaks in loops
- Verify arrays/objects are reused appropriately

## Reset Commands

- `npm run reset` - Reset git state
- `git reset --hard ORIG_HEAD` - Hard reset if needed
- `rm -rf node_modules && npm install` - Reset dependencies

## Demo Variations

**Quick Demo (10 minutes):**
- Show specification → Let agent implement → Show passing benchmarks

**Detailed Demo (25 minutes):**
- Explain specification-driven development concept
- Walk through performance requirements
- Show agent implementation process step-by-step
- Analyze final code for performance patterns
- Discuss real-world applications

**Interactive Demo:**
- Let audience suggest modifications to performance budgets
- Show how changing requirements affects implementation
- Demonstrate benchmark-driven optimization process