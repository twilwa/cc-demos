# CLAUDE.md - Exercise-Specific Context for 02_spec_feature

## Exercise Overview
This exercise demonstrates specification-driven feature development with strict performance requirements. The codebase contains a detailed specification and comprehensive testing infrastructure, requiring the agent to implement a high-performance data processing pipeline.

## Project Structure
```
02_spec_feature/
├── CLAUDE.md                    # This file - exercise context
├── README_AGENT.md              # Instructions for Claude Code
├── README_HUMAN.md              # Instructions for human tester
├── package.json                 # Dependencies: jest, benchmark, microtime
├── jest.config.js               # Jest config with performance testing setup
├── specs/
│   └── data_processor_spec.md   # Detailed 150-line specification
├── src/
│   └── data_processor.js        # Implementation placeholder (throws errors)
├── tests/
│   ├── setup.js                 # Custom matchers and test utilities
│   └── data_processor.test.js   # Comprehensive test suite
└── benchmark/
    └── bench.js                 # Performance benchmark suite
```

## Key Features

### Detailed Specification
- **150+ line specification** with functional requirements, performance budgets, data formats
- **Performance budgets**: 10ms/100ms/1000ms for 1K/10K/100K records
- **Memory constraints**: <50MB peak usage regardless of dataset size
- **Algorithm requirements**: O(n) or O(n log n) only, no O(n²) operations

### Comprehensive Testing Infrastructure
- **Unit tests** for individual functions
- **Integration tests** for full pipeline
- **Performance tests** with custom Jest matchers
- **Edge case tests** for malformed data handling
- **Coverage requirements**: ≥95% line, ≥90% branch

### Automated Benchmarking
- **Multi-dataset benchmarking** (1K, 10K, 100K records)
- **Memory usage tracking** with garbage collection
- **Throughput measurements** (records/second)
- **Pass/fail validation** against specification budgets
- **Detailed performance breakdown** by pipeline stage

## Implementation Requirements

### Core Functions to Implement
1. **`processDataset(rawData, options)`**: Main pipeline orchestrator
2. **`validateData(data)`**: Business rule validation with error reporting
3. **`transformData(validData)`**: Data normalization and computed field generation
4. **`aggregateData(transformedData)`**: Statistical aggregations and summaries

### Performance Constraints
- **CPU Budget**: 10ms/100ms/1000ms for small/medium/large datasets
- **Memory Budget**: <50MB peak usage for all dataset sizes
- **Throughput**: >10,000 records/second through full pipeline
- **Algorithm Complexity**: O(n) or O(n log n) maximum

### Data Processing Pipeline
1. **Validation**: Check required fields, data types, business rules
2. **Transformation**: Normalize data, add computed fields (age_category, salary_band)
3. **Aggregation**: Generate counts, averages, statistics, top/bottom lists

## Testing Strategy

### Performance Validation
- Custom Jest matchers: `toBeWithinTimeLimit()`, `toBeWithinMemoryLimit()`
- Automatic performance measurement with `measurePerformance()` utility
- Benchmark integration with `npm run benchmark` command

### Edge Case Coverage
- Empty datasets, null/undefined values, malformed objects
- Invalid data types, out-of-range values, missing required fields
- Large datasets with memory pressure testing

## Success Criteria
- All tests pass with correct functionality
- All performance benchmarks meet specification budgets
- Memory usage stays within limits
- Test coverage ≥95% line, ≥90% branch
- Code handles edge cases gracefully
- Implementation follows specification exactly

## Expected Agent Behavior
The agent should:
1. Read the specification thoroughly before implementing
2. Implement efficient algorithms avoiding O(n²) operations
3. Use performance-conscious patterns (pre-compiled regex, Map/Set for lookups)
4. Test implementation against benchmarks during development
5. Handle all edge cases mentioned in specification
6. Achieve required test coverage levels

This exercise tests the agent's ability to work from detailed specifications, implement performance-critical code, and validate results against automated benchmarks.