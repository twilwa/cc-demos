# Exercise 3: Multi-Agent Worktree Refactor

## Your Task
Refactor error handling code in both frontend and backend modules using Git worktrees for parallel development. This exercise demonstrates how multiple AI agents can work simultaneously on related but separate codebases, then merge their changes while resolving conflicts.

## Context
This exercise simulates a real-world scenario where a team needs to refactor error handling across multiple parts of an application. The frontend and backend modules have similar but distinct error handling patterns that need improvement. The exercise includes intentional merge conflicts to demonstrate conflict resolution skills.

## Requirements
1. Analyze the existing error handling patterns in both modules
2. Refactor the frontend error handling to use consistent patterns and proper error boundaries
3. Refactor the backend error handling to use proper error middleware and structured responses
4. Handle merge conflicts when combining the changes
5. Ensure both modules follow their respective best practices

## Success Criteria
- [ ] Frontend error handling uses React error boundaries or similar patterns
- [ ] Backend error handling uses consistent middleware and structured error responses
- [ ] All error cases are properly handled and logged
- [ ] Merge conflicts are resolved cleanly
- [ ] Code follows respective frontend/backend best practices
- [ ] Error handling is consistent across both modules where applicable

## Available Commands
- `npm test` - Run tests (if available)
- `npm run lint` - Check code style
- `./scripts/setup_worktrees.sh` - Set up Git worktrees for parallel development
- `git worktree list` - List active worktrees
- `git worktree remove <path>` - Remove a worktree when done

## Git Worktree Workflow
1. Use the setup script to create worktrees for frontend and backend
2. Work on each module in its respective worktree
3. Commit changes in each worktree
4. Merge changes back to main branch
5. Resolve any conflicts that arise