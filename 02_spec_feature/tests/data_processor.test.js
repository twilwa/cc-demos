const { processDataset, validateData, transformData, aggregateData } = require('../src/data_processor');

describe('Data Processor', () => {
  
  describe('validateData', () => {
    test('should validate required fields correctly', () => {
      const data = [
        { id: 1, name: 'Alice Johnson' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { name: 'Charlie Brown' }, // Missing id
        { id: 4 } // Missing name
      ];
      
      expect(() => validateData(data)).toThrow('validateData not implemented yet');
      
      // TODO: Uncomment when implemented
      // const result = validateData(data);
      // expect(result.valid).toHaveLength(2);
      // expect(result.invalid).toHaveLength(2);
      // expect(result.summary.total).toBe(4);
    });

    test('should validate email format when present', () => {
      const data = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'invalid-email' }
      ];
      
      expect(() => validateData(data)).toThrow('validateData not implemented yet');
    });

    test('should validate age boundaries', () => {
      const data = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: -5 },
        { id: 3, name: 'Charlie', age: 200 }
      ];
      
      expect(() => validateData(data)).toThrow('validateData not implemented yet');
    });
  });

  describe('transformData', () => {
    test('should normalize names correctly', () => {
      const data = [
        { id: 1, name: '  alice JOHNSON  ' },
        { id: 2, name: 'bob smith' }
      ];
      
      expect(() => transformData(data)).toThrow('transformData not implemented yet');
    });

    test('should calculate age categories', () => {
      const data = [
        { id: 1, name: 'Alice', age: 25 }, // junior
        { id: 2, name: 'Bob', age: 35 },   // mid
        { id: 3, name: 'Charlie', age: 55 } // senior
      ];
      
      expect(() => transformData(data)).toThrow('transformData not implemented yet');
    });

    test('should calculate salary bands', () => {
      const data = [
        { id: 1, name: 'Alice', salary: 40000 }, // entry
        { id: 2, name: 'Bob', salary: 75000 },   // mid
        { id: 3, name: 'Charlie', salary: 120000 } // senior
      ];
      
      expect(() => transformData(data)).toThrow('transformData not implemented yet');
    });
  });

  describe('aggregateData', () => {
    test('should count by categories', () => {
      const data = [
        { id: 1, name: 'Alice', department: 'engineering', age_category: 'junior' },
        { id: 2, name: 'Bob', department: 'engineering', age_category: 'mid' },
        { id: 3, name: 'Charlie', department: 'marketing', age_category: 'senior' }
      ];
      
      expect(() => aggregateData(data)).toThrow('aggregateData not implemented yet');
    });

    test('should calculate salary statistics', () => {
      const data = [
        { id: 1, name: 'Alice', salary: 50000 },
        { id: 2, name: 'Bob', salary: 75000 },
        { id: 3, name: 'Charlie', salary: 100000 }
      ];
      
      expect(() => aggregateData(data)).toThrow('aggregateData not implemented yet');
    });
  });

  describe('processDataset', () => {
    test('should throw error when not implemented', () => {
      const data = generateTestData(10);
      expect(() => processDataset(data)).toThrow('processDataset not implemented yet');
    });

    // TODO: Uncomment performance tests when implemented
    /*
    test('should meet performance requirements for small dataset', () => {
      const data = generateTestData(1000);
      
      const { result, time, memory } = measurePerformance(() => {
        return processDataset(data);
      });
      
      expect(time).toBeWithinTimeLimit(10); // 10ms budget
      expect(memory).toBeWithinMemoryLimit(50 * 1024 * 1024); // 50MB budget
      expect(result).toHaveValidStructure({
        validation: 'object',
        transformation: 'object',
        aggregation: 'object',
        performance: 'object'
      });
    });

    test('should meet performance requirements for medium dataset', () => {
      const data = generateTestData(10000);
      
      const { result, time, memory } = measurePerformance(() => {
        return processDataset(data);
      });
      
      expect(time).toBeWithinTimeLimit(100); // 100ms budget
      expect(memory).toBeWithinMemoryLimit(50 * 1024 * 1024); // 50MB budget
    });

    test('should meet performance requirements for large dataset', () => {
      const data = generateTestData(100000);
      
      const { result, time, memory } = measurePerformance(() => {
        return processDataset(data);
      });
      
      expect(time).toBeWithinTimeLimit(1000); // 1000ms budget
      expect(memory).toBeWithinMemoryLimit(50 * 1024 * 1024); // 50MB budget
    });

    test('should handle options correctly', () => {
      const data = generateTestData(100);
      
      // Test skipValidation
      const result1 = processDataset(data, { skipValidation: true });
      expect(result1.validation).toBeUndefined();
      
      // Test skipTransformation
      const result2 = processDataset(data, { skipTransformation: true });
      expect(result2.transformation).toBeUndefined();
      
      // Test skipAggregation
      const result3 = processDataset(data, { skipAggregation: true });
      expect(result3.aggregation).toBeUndefined();
    });

    test('should handle empty dataset', () => {
      const result = processDataset([]);
      
      expect(result.validation.summary.total).toBe(0);
      expect(result.transformation).toEqual([]);
      expect(result.aggregation.counts.byDepartment).toEqual({});
    });

    test('should handle malformed data gracefully', () => {
      const malformedData = [
        null,
        undefined,
        'not an object',
        { id: 'invalid' },
        { name: '' }
      ];
      
      expect(() => processDataset(malformedData)).not.toThrow();
      
      const result = processDataset(malformedData);
      expect(result.validation.invalid).toHaveLength(5);
      expect(result.validation.valid).toHaveLength(0);
    });
    */
  });

  describe('Integration Tests', () => {
    test('should process realistic dataset end-to-end', () => {
      const realisticData = [
        {
          id: 1,
          name: '  Alice Johnson  ',
          email: 'alice@example.com',
          age: 28,
          department: 'engineering',
          salary: 75000
        },
        {
          id: 2,
          name: 'Bob Smith',
          age: 35,
          department: 'marketing'
          // Missing email and salary - should still be valid
        },
        {
          id: 'invalid', // Invalid ID
          name: 'X', // Too short
          email: 'not-an-email',
          age: 200, // Too old
          department: 'nonexistent',
          salary: -1000 // Negative
        }
      ];
      
      expect(() => processDataset(realisticData)).toThrow('processDataset not implemented yet');
    });
  });
});