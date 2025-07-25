#!/bin/bash

# Script to install the pre-commit security hook

echo "Installing security pre-commit hook..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "Error: Not in a git repository root. Please run from the repository root."
    exit 1
fi

# Create hooks directory if it doesn't exist
mkdir -p .git/hooks

# Copy the hook
cp "05_security_scan/hooks/deny-prod-paths.js" ".git/hooks/pre-commit"

# Make it executable
chmod +x .git/hooks/pre-commit

echo "✅ Security pre-commit hook installed successfully!"
echo "The hook will now check for security vulnerabilities before each commit."
echo ""
echo "To test the hook, try committing a file with security issues."
echo "To bypass the hook (not recommended), use: git commit --no-verify"