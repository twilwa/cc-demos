# Backend Error Handling Refactoring Instructions

## Your Domain: Backend/Node.js Development

You are working as a backend specialist focused on improving Express.js error handling patterns. Your expertise includes middleware design, API consistency, logging, security, and server-side error management.

## Current Code Problems

The `error_handling.js` file contains several poor patterns:
1. **No Centralized Error Handling**: Each route handles errors differently
2. **Inconsistent API Responses**: Different error formats across endpoints
3. **Poor Input Validation**: No validation of request data
4. **Unsafe Error Exposure**: Stack traces and internal details leaked to clients
5. **No Proper Logging**: Poor error tracking and debugging information
6. **Dangerous Global Handlers**: Continuing after uncaught exceptions
7. **No Error Classification**: All errors treated the same way

## Refactoring Goals

### 1. Implement Centralized Error Middleware
- Create structured error classes
- Consistent error response format
- Proper HTTP status codes
- Security-conscious error messages

### 2. Add Input Validation
- Validate all incoming request data
- Sanitize inputs to prevent injection
- Clear validation error messages
- Schema-based validation where appropriate

### 3. Improve Logging & Monitoring
- Structured logging with appropriate levels
- Error context preservation
- Request correlation IDs
- Performance metrics

### 4. Security Improvements
- No internal details in client responses
- Proper error status codes
- Input sanitization
- Rate limiting considerations

## Backend-Specific Patterns to Apply

### Error Classes Structure
```javascript
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400);
    this.field = field;
  }
}
```

### Centralized Error Middleware
```javascript
const errorHandler = (err, req, res, next) => {
  // Log error details
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    correlationId: req.correlationId
  });

  // Send appropriate response
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      correlationId: req.correlationId
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      correlationId: req.correlationId
    });
  }
};
```

### Input Validation Pattern
```javascript
const validateUserInput = (userData) => {
  const errors = [];
  
  if (!userData.name || userData.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  
  if (!userData.email || !emailRegex.test(userData.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  
  if (errors.length > 0) {
    throw new ValidationError('Validation failed', errors);
  }
};
```

## Success Criteria

- [ ] Centralized error handling middleware
- [ ] Consistent API error response format
- [ ] Proper HTTP status codes
- [ ] Input validation on all routes
- [ ] Structured logging with context
- [ ] No internal details leaked to clients
- [ ] Custom error classes for different scenarios
- [ ] Proper async error handling

## Note on Merge Conflicts

The `ERROR_CONFIG` object will create a merge conflict with the frontend version. When resolving:
- Keep backend-appropriate settings (longer timeouts, detailed logging for servers)
- Include server-specific options like `includeStackTrace` for development
- Consider different retry strategies for database vs external API calls
- Ensure config supports both development and production environments