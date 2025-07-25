# Exercise 3: Multi-Agent Worktree Refactor - Context

## Exercise Overview
This exercise demonstrates parallel development using Git worktrees, where multiple AI agents can work simultaneously on related but separate parts of a codebase. The scenario involves refactoring error handling patterns across frontend and backend modules.

## Learning Objectives
- Demonstrate Git worktree usage for parallel development
- Show how AI agents can work on domain-specific code improvements
- Practice merge conflict resolution between related changes
- Illustrate different error handling patterns for frontend vs backend

## Technical Setup
The exercise includes two modules with intentionally poor error handling:
- **Frontend module**: React-style component with basic error handling
- **Backend module**: Express-style service with basic error handling
- **Intentional conflict**: Both modules modify a shared error configuration

## Key Challenges
1. **Domain Expertise**: Frontend and backend require different error handling approaches
2. **Parallel Development**: Changes happen simultaneously in separate worktrees
3. **Merge Conflicts**: Intentional conflicts in shared configuration require resolution
4. **Consistency**: Maintaining consistent error handling philosophy across domains

## Expected Outcomes
After completion, the exercise should demonstrate:
- Proper React error boundaries and user-friendly error states
- Structured backend error middleware with consistent API responses
- Clean merge conflict resolution preserving improvements from both sides
- Documentation of the parallel development workflow

## Files Created
- `frontend/error_handling.js` - React component with poor error handling patterns
- `backend/error_handling.js` - Express middleware with poor error handling patterns
- `frontend/CLAUDE.md` - Frontend-specific refactoring instructions
- `backend/CLAUDE.md` - Backend-specific refactoring instructions
- `scripts/setup_worktrees.sh` - Script to set up parallel development environment