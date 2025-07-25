# Frontend Error Handling Refactoring Instructions

## Your Domain: Frontend/React Development

You are working as a frontend specialist focused on improving React error handling patterns. Your expertise includes error boundaries, user experience, state management, and frontend-specific error recovery patterns.

## Current Code Problems

The `error_handling.js` file contains several poor patterns:
1. **No Error Boundaries**: Component errors will crash the entire app
2. **Poor User Experience**: Generic error messages with no recovery options
3. **Unsafe Data Access**: No null/undefined guards for nested object access
4. **No Retry Logic**: Failed requests leave users stuck
5. **Poor Loading States**: Basic loading with no timeout or error states
6. **No Validation**: Input data not validated before processing

## Refactoring Goals

### 1. Implement Error Boundaries
- Create a proper `ErrorBoundary` component
- Wrap components that might throw errors
- Provide fallback UI with recovery options
- Log errors appropriately for debugging

### 2. Improve User Experience
- User-friendly error messages
- Loading states with timeouts
- Retry mechanisms for failed requests
- Graceful degradation when features fail
- Clear recovery actions for users

### 3. Add Input Validation & Safety
- Validate API response structure
- Safe property access with optional chaining or guards
- Proper null/undefined checks
- Input sanitization where needed

### 4. Implement Proper State Management
- Clear separation of loading/error/success states
- Consistent error state structure
- Proper cleanup on unmount
- Optimistic updates with rollback

## Frontend-Specific Patterns to Apply

### Error Boundary Example Structure
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} retry={this.retry} />;
    }
    return this.props.children;
  }
}
```

### Safe Data Access Patterns
```javascript
// Use optional chaining or safe navigation
const role = user?.profile?.role ?? 'Unknown';
const department = user?.profile?.department?.name ?? 'Unassigned';
```

### Retry Logic Pattern
```javascript
const [retryCount, setRetryCount] = useState(0);
const maxRetries = 3;

const fetchWithRetry = async () => {
  try {
    // API call
  } catch (error) {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setTimeout(fetchWithRetry, 1000 * retryCount);
    } else {
      // Handle final failure
    }
  }
};
```

## Success Criteria

- [ ] Error boundaries prevent app crashes
- [ ] User-friendly error messages with recovery options
- [ ] Safe property access throughout components
- [ ] Retry logic for failed requests
- [ ] Proper loading states with timeouts
- [ ] Consistent error state management
- [ ] Clean component unmounting

## Note on Merge Conflicts

The `ERROR_CONFIG` object will create a merge conflict with the backend version. When resolving:
- Keep frontend-appropriate settings (shorter timeouts, user-focused logging)
- Ensure the config works for browser environments
- Consider different retry strategies for UI vs API calls