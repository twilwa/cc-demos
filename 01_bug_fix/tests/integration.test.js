const { calculateStatistics, processUsers, filterUsers } = require('../src/buggy_module');

describe('Integration Tests', () => {
  test('should process real-world user data correctly', () => {
    const users = [
      { id: 1, name: 'Alice Johnson', age: 28, role: 'developer', active: true, department: 'Engineering' },
      { id: 2, name: 'Bob Smith', age: 35, role: 'manager', active: true, department: 'Engineering' },
      { id: 3, name: 'Charlie Brown', age: 42, role: 'developer', active: false, department: 'Engineering' },
      { id: 4, name: 'Diana Prince', age: 31, role: 'designer', active: true, department: 'Design' },
      { id: 5, name: 'Eve Wilson', role: 'developer', active: true, department: 'Engineering' }, // Missing age
      { id: 6, name: 'Frank Miller', age: 29, role: 'tester', active: true, department: 'QA' },
      { id: 7, name: 'Grace Lee', age: 33, role: 'manager', active: true, department: 'Design' },
      { id: 8, name: 'Henry Davis', age: 26, active: false, department: 'Support' } // Missing role
    ];

    // This should process without crashing despite missing data
    const report = processUsers(users);
    
    expect(report.totalUsers).toBe(8);
    expect(report.usersByRole).toHaveProperty('developer');
    expect(report.usersByRole).toHaveProperty('manager');
    expect(report.usersByRole).toHaveProperty('unknown'); // For Henry who has no role
    
    // The average age should only include users with valid ages
    expect(report.averageAge).toBeCloseTo(32); // Average of valid ages
    expect(report.ageDistribution.min).toBe(26);
    expect(report.ageDistribution.max).toBe(42);
  });

  test('should correctly filter and process users with complex criteria', () => {
    const users = [
      { id: 1, name: 'Alice', age: 25, role: 'junior', active: true, salary: 50000 },
      { id: 2, name: 'Bob', age: 30, role: 'senior', active: true, salary: 80000 },
      { id: 3, name: 'Charlie', age: 35, role: 'lead', active: false, salary: 95000 },
      { id: 4, name: 'David', age: 28, role: 'senior', active: true, salary: 75000 },
      { id: 5, name: 'Eve', age: 32, role: 'senior', active: true, salary: 82000 }
    ];

    // Filter active senior developers
    const activeSeniors = filterUsers(users, { role: 'senior', active: true });
    expect(activeSeniors).toHaveLength(3);

    // Process filtered users
    const seniorReport = processUsers(activeSeniors);
    expect(seniorReport.totalUsers).toBe(3);
    expect(seniorReport.averageAge).toBe(30); // (30 + 28 + 32) / 3
    expect(seniorReport.usersByRole).toEqual({ senior: 3 });

    // Calculate salary statistics for filtered users
    const salaries = activeSeniors.map(user => user.salary);
    const salaryStats = calculateStatistics(salaries);
    expect(salaryStats.mean).toBeCloseTo(79000); // (80000 + 75000 + 82000) / 3
    expect(salaryStats.median).toBe(80000); // Middle value when sorted
  });

  test('should handle edge cases in data processing pipeline', () => {
    // Test with various edge cases
    const edgeCaseUsers = [
      { name: 'User1' }, // No age, no role
      { name: 'User2', age: null }, // Null age
      { name: 'User3', age: undefined }, // Undefined age
      { name: 'User4', age: 'thirty' }, // Invalid age type
      { name: 'User5', age: 30, role: null }, // Null role
      { name: 'User6', age: 25, role: 'valid', active: null } // Null active status
    ];

    // Should not crash despite invalid data
    const report = processUsers(edgeCaseUsers);
    expect(report.totalUsers).toBe(6);
    
    // Should filter correctly with criteria
    const filtered = filterUsers(edgeCaseUsers, { minAge: 20 });
    expect(filtered).toHaveLength(2); // Only User5 and User6 have valid ages >= 20
  });

  test('should calculate statistics for large datasets', () => {
    // Generate a large dataset
    const largeDataset = Array.from({ length: 1000 }, (_, i) => i + 1);
    
    const stats = calculateStatistics(largeDataset);
    expect(stats.sum).toBe(500500); // Sum of 1 to 1000
    expect(stats.mean).toBe(500.5);
    expect(stats.median).toBe(500.5); // Average of 500 and 501
  });
});