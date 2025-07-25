# Data Processor Feature Specification

## Overview
A high-performance data processing pipeline for transforming, validating, and aggregating large datasets. This feature must balance functionality with strict performance constraints.

## Functional Requirements

### 1. Data Validation
- **Input**: Array of user objects with optional fields
- **Validation Rules**:
  - `id`: Required integer, unique within dataset
  - `name`: Required string, 2-50 characters, alphanumeric + spaces
  - `email`: Optional string, valid email format if present
  - `age`: Optional integer, 0-150 if present
  - `department`: Optional string from predefined list
  - `salary`: Optional number, 0-1000000 if present
- **Output**: Object with `valid` and `invalid` arrays, plus error summary

### 2. Data Transformation
- **Input**: Array of valid user objects
- **Transformations**:
  - Normalize names (trim, proper case)
  - Calculate age categories: "junior" (<30), "mid" (30-50), "senior" (>50)
  - Add computed fields: `full_name`, `age_category`, `salary_band`
  - Convert salary to bands: "entry" (<50k), "mid" (50k-100k), "senior" (>100k)
- **Output**: Array of transformed objects with original + computed fields

### 3. Data Aggregation
- **Input**: Array of transformed user objects
- **Aggregations**:
  - Count by department, age category, salary band
  - Average salary by department and age category
  - Min/max/median calculations for numeric fields
  - Top 10 highest/lowest salaries with names
- **Output**: Nested object with all aggregation results

### 4. Pipeline Composition
- **Function**: `processDataset(rawData, options = {})`
- **Pipeline**: validate → transform → aggregate
- **Options**: 
  - `skipValidation`: boolean (default: false)
  - `skipTransformation`: boolean (default: false)
  - `includeInvalid`: boolean (default: false)
- **Output**: Complete processing report with all stages

## Performance Requirements

### CPU Budget
- **Small Dataset** (≤1,000 records): <10ms total processing time
- **Medium Dataset** (≤10,000 records): <100ms total processing time  
- **Large Dataset** (≤100,000 records): <1,000ms total processing time
- **Algorithm Complexity**: O(n) or O(n log n) maximum, no O(n²) operations

### Memory Budget
- **Peak Memory Usage**: <50MB for datasets up to 100,000 records
- **Memory Growth**: Linear with dataset size, no memory leaks
- **Garbage Collection**: Minimize object creation in hot paths

### Throughput Requirements
- **Validation**: >100,000 records/second
- **Transformation**: >50,000 records/second
- **Aggregation**: >25,000 records/second
- **Full Pipeline**: >10,000 records/second

## Quality Requirements

### Code Quality
- **Test Coverage**: ≥95% line coverage, ≥90% branch coverage
- **Error Handling**: Graceful handling of malformed data
- **Type Safety**: JSDoc annotations for all public functions
- **Performance**: All functions must meet CPU/memory budgets

### Validation
- **Unit Tests**: Test each function in isolation
- **Integration Tests**: Test full pipeline with realistic data
- **Performance Tests**: Benchmark against all performance requirements
- **Edge Case Tests**: Empty arrays, malformed data, boundary conditions

## Sample Data Formats

### Input Format
```javascript
const sampleInput = [
  {
    id: 1,
    name: "  alice JOHNSON  ",
    email: "alice@example.com",
    age: 28,
    department: "engineering",
    salary: 75000
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 35,
    department: "marketing"
    // Missing email and salary
  },
  {
    id: "invalid", // Invalid ID type
    name: "X", // Too short
    email: "not-an-email",
    age: 200, // Too old
    department: "nonexistent",
    salary: -1000 // Negative salary
  }
];
```

### Expected Output Format
```javascript
const expectedOutput = {
  validation: {
    valid: [...], // Array of valid objects
    invalid: [...], // Array of invalid objects with errors
    summary: {
      total: 3,
      valid: 2,
      invalid: 1,
      errorsByField: { id: 1, name: 1, email: 1, age: 1, department: 1, salary: 1 }
    }
  },
  transformation: [...], // Array of transformed valid objects
  aggregation: {
    counts: {
      byDepartment: { engineering: 1, marketing: 1 },
      byAgeCategory: { junior: 1, mid: 1 },
      bySalaryBand: { mid: 1, entry: 0, senior: 0 }
    },
    averages: {
      salaryByDepartment: { engineering: 75000, marketing: null },
      salaryByAgeCategory: { junior: 75000, mid: null }
    },
    statistics: {
      salary: { min: 75000, max: 75000, median: 75000, mean: 75000 },
      age: { min: 28, max: 35, median: 31.5, mean: 31.5 }
    },
    topSalaries: [{ name: "Alice Johnson", salary: 75000 }],
    bottomSalaries: [{ name: "Alice Johnson", salary: 75000 }]
  },
  performance: {
    totalTime: 42, // milliseconds
    validationTime: 15,
    transformationTime: 12,
    aggregationTime: 15,
    memoryUsed: 1024000 // bytes
  }
};
```

## Implementation Guidelines

### Performance Optimization Tips
1. **Avoid Object.keys()** in hot paths - use for..in loops
2. **Pre-compile Regular Expressions** for validation
3. **Use Map/Set** for O(1) lookups instead of Array.includes()
4. **Batch Operations** to reduce function call overhead
5. **Minimize String Operations** - avoid repeated trim/toLowerCase
6. **Use Typed Arrays** for numeric computations when possible

### Testing Strategy
1. **Unit Tests**: Test each validation rule, transformation, aggregation
2. **Performance Tests**: Benchmark each function against time/memory budgets
3. **Integration Tests**: Test full pipeline with various data sizes
4. **Edge Cases**: Test empty data, all invalid data, boundary conditions
5. **Memory Tests**: Verify no memory leaks with repeated processing

### Success Criteria
- [ ] All functional requirements implemented correctly
- [ ] All performance budgets met consistently
- [ ] ≥95% test coverage with passing tests
- [ ] Benchmark results validate performance claims
- [ ] Code is readable and well-documented
- [ ] Error handling is comprehensive and graceful