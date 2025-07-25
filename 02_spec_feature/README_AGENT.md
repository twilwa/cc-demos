# Exercise 2: Spec-Driven Feature Development

## Your Task

Implement a high-performance data processing pipeline according to the detailed specification in `specs/data_processor_spec.md`. This exercise tests your ability to build features from specifications with strict performance requirements.

## Context

You are tasked with building a data processing system that can handle large datasets efficiently. The system must validate, transform, and aggregate user data while meeting specific performance budgets for different dataset sizes.

## Requirements

1. **Read the specification** thoroughly in `specs/data_processor_spec.md`
2. **Implement all functions** in `src/data_processor.js`:
   - `processDataset()` - Main pipeline function
   - `validateData()` - Data validation with business rules
   - `transformData()` - Data normalization and computed fields  
   - `aggregateData()` - Statistical aggregations and summaries
3. **Meet performance budgets**:
   - Small dataset (≤1K): <10ms processing time
   - Medium dataset (≤10K): <100ms processing time
   - Large dataset (≤100K): <1000ms processing time
   - Memory usage: <50MB peak for all dataset sizes
4. **Achieve test coverage**: ≥95% line coverage, ≥90% branch coverage
5. **Handle edge cases**: Empty data, malformed data, missing fields gracefully

## Success Criteria

- [ ] All tests pass with correct functionality
- [ ] All performance benchmarks meet timing budgets
- [ ] Memory usage stays within 50MB limit
- [ ] Code handles edge cases gracefully
- [ ] Implementation follows specification exactly
- [ ] Test coverage meets requirements (≥95% line, ≥90% branch)

## Available Commands

- `npm test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run benchmark` - Run performance benchmarks
- `npm run benchmark:watch` - Watch mode for benchmarks during development
- `npm run lint` - Check code style
- `npm run reset` - Reset to original state

## Performance Testing

The benchmark suite will test your implementation against the performance budgets:

```bash
npm run benchmark
```

This will show you:
- Processing time for different dataset sizes
- Memory usage during processing
- Throughput (records/second) for each function
- Pass/fail status against specification budgets

## Development Approach

1. **Start with the specification** - Read `specs/data_processor_spec.md` completely
2. **Review the tests** - Understand expected behavior from `tests/data_processor.test.js`
3. **Implement incrementally** - Build one function at a time
4. **Test frequently** - Run tests after each function implementation
5. **Benchmark early** - Check performance as you build
6. **Optimize if needed** - Use benchmark results to guide optimization

## Key Implementation Tips

- **Avoid O(n²) algorithms** - All operations should be O(n) or O(n log n)
- **Pre-compile regex patterns** - Don't create new RegExp objects in loops
- **Use Map/Set for lookups** - Faster than Array.includes() or object property checks
- **Minimize object creation** - Reuse objects and arrays where possible
- **Batch similar operations** - Group related processing to improve cache locality

## Specification Highlights

The main function signature is:
```javascript
function processDataset(rawData, options = {})
```

Options include:
- `skipValidation: boolean` - Skip validation step
- `skipTransformation: boolean` - Skip transformation step  
- `skipAggregation: boolean` - Skip aggregation step
- `includeInvalid: boolean` - Include invalid records in output

Expected output structure includes validation results, transformed data, aggregations, and performance metrics.

## Getting Help

- Check the detailed specification in `specs/data_processor_spec.md`
- Look at test examples in `tests/data_processor.test.js`
- Run benchmarks to see current performance: `npm run benchmark`
- Use `npm run test:coverage` to see what code paths need testing