// Backend Error Handling Module - Needs Refactoring
// This Express middleware demonstrates poor error handling patterns that need improvement

const express = require('express');

// Shared error configuration (will cause merge conflict with frontend version)
const ERROR_CONFIG = {
  retryAttempts: 5,
  timeout: 10000,
  logLevel: 'debug',
  includeStackTrace: true
};

// Poor global error handling - no structure, inconsistent responses
process.on('uncaughtException', (error) => {
  console.log('Something bad happened:', error);
  // Dangerous: continuing after uncaught exception
});

// Middleware with poor error patterns
class UserService {
  constructor() {
    this.users = [];
  }

  // No input validation, poor error handling
  async createUser(userData) {
    try {
      // No validation of required fields
      const user = {
        id: Math.random().toString(36),
        name: userData.name,
        email: userData.email,
        profile: userData.profile
      };
      
      // Simulate database operation that might fail
      if (Math.random() < 0.3) {
        throw new Error('Database connection failed');
      }
      
      this.users.push(user);
      return user;
    } catch (error) {
      // Poor error handling: generic message, no context, no logging
      throw new Error('User creation failed');
    }
  }

  // No proper error types, unclear error responses
  async getUserById(id) {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      // Poor error: no status code, inconsistent format
      throw new Error('Not found');
    }
    
    // Simulate potential runtime error
    if (user.profile && user.profile.settings) {
      // Potential null reference - no safety checks
      const notifications = user.profile.settings.notifications.email.frequency;
      user.notificationFreq = notifications;
    }
    
    return user;
  }

  async deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      // Inconsistent error format
      throw { error: 'User not found', code: 404 };
    }
    
    // No soft delete, no audit trail
    this.users.splice(index, 1);
    return true;
  }
}

// Express routes with poor error handling
const userService = new UserService();
const router = express.Router();

// No error middleware, inconsistent error responses
router.post('/users', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    // Poor error response: no status code, raw error message
    res.json({ error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    // Inconsistent error handling compared to POST route
    res.status(500).send(error.message);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true });
  } catch (error) {
    // Another different error format
    if (error.code) {
      res.status(error.code).json({ message: error.error });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// No centralized error handling middleware
router.use((err, req, res, next) => {
  // Basic error middleware with poor logging and response format
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = { UserService, router, ERROR_CONFIG };