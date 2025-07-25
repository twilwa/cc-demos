// Jest setup file for performance testing configuration

// Custom matchers for performance testing
expect.extend({
  toBeWithinTimeLimit(received, timeLimit) {
    const pass = received <= timeLimit;
    if (pass) {
      return {
        message: () => `Expected ${received}ms to exceed ${timeLimit}ms`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received}ms to be within ${timeLimit}ms time limit`,
        pass: false,
      };
    }
  },

  toBeWithinMemoryLimit(received, memoryLimit) {
    const receivedMB = received / 1024 / 1024;
    const limitMB = memoryLimit / 1024 / 1024;
    const pass = receivedMB <= limitMB;
    
    if (pass) {
      return {
        message: () => `Expected ${receivedMB.toFixed(2)}MB to exceed ${limitMB.toFixed(2)}MB`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${receivedMB.toFixed(2)}MB to be within ${limitMB.toFixed(2)}MB memory limit`,
        pass: false,
      };
    }
  },

  toHaveValidStructure(received, expectedStructure) {
    const pass = hasExpectedStructure(received, expectedStructure);
    
    if (pass) {
      return {
        message: () => `Expected object to not have valid structure`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected object to have valid structure matching specification`,
        pass: false,
      };
    }
  }
});

function hasExpectedStructure(obj, structure) {
  for (const key in structure) {
    if (!(key in obj)) {
      return false;
    }
    
    if (typeof structure[key] === 'object' && structure[key] !== null) {
      if (!hasExpectedStructure(obj[key], structure[key])) {
        return false;
      }
    } else if (typeof obj[key] !== structure[key]) {
      return false;
    }
  }
  return true;
}

// Global test utilities
global.measurePerformance = function(fn) {
  const startTime = process.hrtime.bigint();
  const startMemory = process.memoryUsage().heapUsed;
  
  const result = fn();
  
  const endTime = process.hrtime.bigint();
  const endMemory = process.memoryUsage().heapUsed;
  
  return {
    result,
    time: Number(endTime - startTime) / 1000000, // Convert to milliseconds
    memory: endMemory - startMemory
  };
};

global.generateTestData = function(size) {
  const departments = ['engineering', 'marketing', 'sales', 'support', 'design'];
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'];
  
  return Array.from({ length: size }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + ` ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: 22 + (i % 43),
    department: departments[i % departments.length],
    salary: 40000 + (i % 80000)
  }));
};