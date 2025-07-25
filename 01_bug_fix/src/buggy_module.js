/**
 * A module for calculating statistics and processing user data
 * This module contains intentional bugs for the exercise
 */

/**
 * Calculate basic statistics for an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {object} Object containing mean, median, and sum
 */
function calculateStatistics(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return { mean: 0, median: 0, sum: 0 };
  }

  // Calculate sum
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  
  // Calculate mean
  const mean = sum / numbers.length;
  
  // Calculate median
  const sorted = [...numbers].sort((a, b) => a - b);
  let median;
  
  if (sorted.length % 2 === 1) {
    // Odd length - middle element
    median = sorted[Math.floor(sorted.length / 2)];
  } else {
    // Even length - average of two middle elements
    // BUG 1: Off-by-one error here
    const mid = sorted.length / 2;
    median = (sorted[mid] + sorted[mid + 1]) / 2;
  }
  
  return { mean, median, sum };
}

/**
 * Process an array of user objects and generate a report
 * @param {object[]} users - Array of user objects
 * @returns {object} Report object with user statistics
 */
function processUsers(users) {
  if (!Array.isArray(users) || users.length === 0) {
    return {
      totalUsers: 0,
      averageAge: 0,
      usersByRole: {},
      ageDistribution: { min: 0, max: 0, median: 0 }
    };
  }

  // BUG 2: Missing null/undefined check - will crash if user doesn't have age property
  const ages = users.map(user => user.age);
  const ageStats = calculateStatistics(ages);
  
  // Count users by role
  const usersByRole = users.reduce((acc, user) => {
    const role = user.role || 'unknown';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  
  // Calculate age distribution
  const validAges = ages.filter(age => typeof age === 'number' && !isNaN(age));
  const ageDistribution = {
    min: validAges.length > 0 ? Math.min(...validAges) : 0,
    max: validAges.length > 0 ? Math.max(...validAges) : 0,
    median: ageStats.median
  };
  
  return {
    totalUsers: users.length,
    averageAge: ageStats.mean,
    usersByRole,
    ageDistribution
  };
}

/**
 * Filter users by criteria
 * @param {object[]} users - Array of user objects
 * @param {object} criteria - Filter criteria
 * @returns {object[]} Filtered array of users
 */
function filterUsers(users, criteria = {}) {
  if (!Array.isArray(users)) {
    return [];
  }
  
  return users.filter(user => {
    // Filter by age range
    if (criteria.minAge !== undefined && user.age < criteria.minAge) {
      return false;
    }
    if (criteria.maxAge !== undefined && user.age > criteria.maxAge) {
      return false;
    }
    
    // Filter by role
    if (criteria.role && user.role !== criteria.role) {
      return false;
    }
    
    // Filter by active status
    if (criteria.active !== undefined && user.active !== criteria.active) {
      return false;
    }
    
    return true;
  });
}

module.exports = {
  calculateStatistics,
  processUsers,
  filterUsers
};