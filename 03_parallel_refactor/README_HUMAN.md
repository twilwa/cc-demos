# Exercise 3: Multi-Agent Worktree Refactor - Human Guide

## Demo Flow
1. **Setup Phase**: "Let's start by examining the current error handling code in both modules"
2. **Worktree Creation**: "I'll use Git worktrees to work on both modules simultaneously - run `./scripts/setup_worktrees.sh`"
3. **Parallel Development**: "Now I can refactor the frontend and backend error handling in parallel"
4. **Frontend Refactoring**: Show improvements to error boundaries, user-friendly messages, proper state handling
5. **Backend Refactoring**: Show improvements to middleware, structured responses, logging
6. **Merge Process**: "Let's merge these changes back and handle any conflicts"
7. **Conflict Resolution**: Demonstrate resolving the intentional merge conflict
8. **Validation**: "Finally, let's verify both modules work correctly together"

## Key Points to Highlight
- **Git Worktrees**: Enable parallel development on the same repository
- **Domain-Specific Patterns**: Frontend vs backend error handling have different requirements
- **Merge Conflicts**: Inevitable when multiple agents work on related code
- **Conflict Resolution**: Strategic approach to resolving conflicts while preserving improvements
- **Consistency**: Maintaining consistent patterns within each domain while allowing domain-specific approaches

## Troubleshooting
- If worktree setup fails: Check Git version (needs 2.40+ for modern worktree features)
- If merge conflicts are complex: Walk through each conflict section systematically
- If tests fail after merge: Check that error handling changes don't break existing functionality
- Common issues: Path conflicts when merging worktrees, overlapping variable names

## Technical Concepts to Explain
- **Git Worktrees**: Multiple working directories from the same repository
- **Error Boundaries**: React pattern for catching JavaScript errors in component trees
- **Error Middleware**: Express.js pattern for centralized error handling
- **Structured Error Responses**: Consistent API error format across endpoints
- **Error Logging**: Proper logging levels and error context preservation

## Reset Commands
- `npm run reset`
- `git worktree remove frontend-work backend-work` (if worktrees exist)
- `git reset --hard ORIG_HEAD`
- `git clean -fd`