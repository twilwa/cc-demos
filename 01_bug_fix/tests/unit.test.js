const { calculateStatistics, processUsers, filterUsers } = require('../src/buggy_module');

describe('calculateStatistics', () => {
  test('should return zeros for empty array', () => {
    const result = calculateStatistics([]);
    expect(result).toEqual({ mean: 0, median: 0, sum: 0 });
  });

  test('should calculate statistics for single element', () => {
    const result = calculateStatistics([5]);
    expect(result).toEqual({ mean: 5, median: 5, sum: 5 });
  });

  test('should calculate mean, median, and sum correctly for odd-length arrays', () => {
    const result = calculateStatistics([1, 3, 5, 7, 9]);
    expect(result.sum).toBe(25);
    expect(result.mean).toBe(5);
    expect(result.median).toBe(5);
  });

  test('should calculate median correctly for even-length arrays', () => {
    const result = calculateStatistics([1, 2, 3, 4]);
    expect(result.sum).toBe(10);
    expect(result.mean).toBe(2.5);
    expect(result.median).toBe(2.5); // This will fail due to bug
  });

  test('should handle unsorted arrays', () => {
    const result = calculateStatistics([5, 1, 9, 3, 7]);
    expect(result.median).toBe(5);
  });

  test('should handle arrays with negative numbers', () => {
    const result = calculateStatistics([-5, -1, 0, 3, 7]);
    expect(result.sum).toBe(4);
    expect(result.mean).toBe(0.8);
    expect(result.median).toBe(0); // This will fail due to bug with even-length arrays
  });
});

describe('processUsers', () => {
  test('should return default values for empty array', () => {
    const result = processUsers([]);
    expect(result).toEqual({
      totalUsers: 0,
      averageAge: 0,
      usersByRole: {},
      ageDistribution: { min: 0, max: 0, median: 0 }
    });
  });

  test('should process users with complete data', () => {
    const users = [
      { name: 'Alice', age: 25, role: 'admin' },
      { name: 'Bob', age: 30, role: 'user' },
      { name: 'Charlie', age: 35, role: 'user' }
    ];
    
    const result = processUsers(users);
    expect(result.totalUsers).toBe(3);
    expect(result.averageAge).toBe(30);
    expect(result.usersByRole).toEqual({ admin: 1, user: 2 });
    expect(result.ageDistribution).toEqual({ min: 25, max: 35, median: 30 });
  });

  test('should handle users with missing data', () => {
    const users = [
      { name: 'Alice', age: 25, role: 'admin' },
      { name: 'Bob', role: 'user' }, // Missing age - this will cause the bug
      { name: 'Charlie', age: 35 }    // Missing role
    ];
    
    const result = processUsers(users); // This will fail due to bug
    expect(result.totalUsers).toBe(3);
    expect(result.usersByRole).toEqual({ admin: 1, user: 1, unknown: 1 });
    // The average age should handle missing data gracefully
    expect(result.averageAge).toBe(30); // Should be (25 + 35) / 2 = 30
    expect(result.ageDistribution.median).toBe(30);
  });
});

describe('filterUsers', () => {
  const testUsers = [
    { name: 'Alice', age: 25, role: 'admin', active: true },
    { name: 'Bob', age: 30, role: 'user', active: false },
    { name: 'Charlie', age: 35, role: 'user', active: true },
    { name: 'David', age: 40, role: 'admin', active: true }
  ];

  test('should return all users when no criteria provided', () => {
    const result = filterUsers(testUsers);
    expect(result).toHaveLength(4);
  });

  test('should filter by age range', () => {
    const result = filterUsers(testUsers, { minAge: 30, maxAge: 35 });
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Bob');
    expect(result[1].name).toBe('Charlie');
  });

  test('should filter by role', () => {
    const result = filterUsers(testUsers, { role: 'admin' });
    expect(result).toHaveLength(2);
    expect(result.every(user => user.role === 'admin')).toBe(true);
  });

  test('should filter by active status', () => {
    const result = filterUsers(testUsers, { active: true });
    expect(result).toHaveLength(3);
    expect(result.every(user => user.active === true)).toBe(true);
  });

  test('should handle multiple criteria', () => {
    const result = filterUsers(testUsers, { role: 'user', active: true });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Charlie');
  });
});