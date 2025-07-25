#!/bin/bash

# Git Worktree Setup Script for Parallel Development
# This script creates separate worktrees for frontend and backend development

set -e  # Exit on any error

echo "🌳 Setting up Git worktrees for parallel development..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a Git repository. Please run this from the project root."
    exit 1
fi

# Check Git version (worktrees work better with Git 2.40+)
GIT_VERSION=$(git --version | cut -d' ' -f3)
echo "📋 Git version: $GIT_VERSION"

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Create worktree directories
WORKTREE_DIR="../worktrees"
FRONTEND_WORKTREE="$WORKTREE_DIR/frontend-work"
BACKEND_WORKTREE="$WORKTREE_DIR/backend-work"

echo "📁 Creating worktree directory..."
mkdir -p "$WORKTREE_DIR"

# Create frontend worktree
echo "🎨 Creating frontend worktree..."
if [ -d "$FRONTEND_WORKTREE" ]; then
    echo "⚠️  Frontend worktree already exists. Removing old one..."
    git worktree remove "$FRONTEND_WORKTREE" --force 2>/dev/null || true
    rm -rf "$FRONTEND_WORKTREE" 2>/dev/null || true
fi

git worktree add "$FRONTEND_WORKTREE" -b "frontend-refactor" "$CURRENT_BRANCH"

# Create backend worktree  
echo "⚙️  Creating backend worktree..."
if [ -d "$BACKEND_WORKTREE" ]; then
    echo "⚠️  Backend worktree already exists. Removing old one..."
    git worktree remove "$BACKEND_WORKTREE" --force 2>/dev/null || true
    rm -rf "$BACKEND_WORKTREE" 2>/dev/null || true
fi

git worktree add "$BACKEND_WORKTREE" -b "backend-refactor" "$CURRENT_BRANCH"

# Show worktree status
echo ""
echo "✅ Worktrees created successfully!"
echo ""
git worktree list

echo ""
echo "🚀 Next steps:"
echo "1. Frontend work: cd $FRONTEND_WORKTREE"
echo "2. Backend work:  cd $BACKEND_WORKTREE"
echo "3. In each worktree, focus on your domain-specific refactoring"
echo "4. Commit changes in each worktree separately"
echo "5. Return to main directory to merge changes"
echo ""
echo "💡 Useful commands:"
echo "  git worktree list          - Show all worktrees"
echo "  git worktree remove <path> - Remove a worktree when done"
echo "  git branch -a              - Show all branches including worktree branches"
echo ""
echo "⚠️  Remember: Each worktree is a separate working directory with its own branch!"
echo "   Make sure to commit your changes in each worktree before merging."