#!/bin/bash

# Security Scanning Script for Exercise 05
# This script performs comprehensive security checks

echo "🔒 Starting Security Scan..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        *)
            echo "$message"
            ;;
    esac
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_status "ERROR" "package.json not found. Run this script from the exercise directory."
    exit 1
fi

echo "1. Checking for vulnerable dependencies..."
echo "-------------------------------------------"

# Run npm audit and capture output
npm audit --audit-level=low > audit_results.tmp 2>&1
audit_exit_code=$?

if [ $audit_exit_code -eq 0 ]; then
    print_status "SUCCESS" "No vulnerable dependencies found"
else
    print_status "ERROR" "Vulnerable dependencies detected:"
    cat audit_results.tmp | grep -E "(Critical|High|Moderate|Low)" | head -10
    echo ""
fi

echo ""
echo "2. Scanning for code vulnerabilities..."
echo "---------------------------------------"

# Check for common vulnerability patterns
vulnerabilities_found=0

# Check for XSS vulnerabilities
if grep -r "res\.send.*\${" src/ 2>/dev/null; then
    print_status "ERROR" "Potential XSS vulnerability: Unescaped template literals in HTML response"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

# Check for direct HTML injection
if grep -r "\.innerHTML\s*=" src/ 2>/dev/null; then
    print_status "ERROR" "Potential XSS vulnerability: Direct innerHTML assignment"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

# Check for prototype pollution
if grep -r "_.merge" src/ 2>/dev/null; then
    print_status "WARNING" "Potential prototype pollution: Using lodash merge"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

# Check for exposed error messages
if grep -r "throw new Error" src/ 2>/dev/null | grep -v "sanitized\|safe"; then
    print_status "WARNING" "Potential information disclosure: Throwing detailed errors"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

# Check for missing input validation
if ! grep -r "express\.json.*limit" src/ 2>/dev/null; then
    print_status "WARNING" "Missing input size limits"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

echo ""
echo "3. Checking security headers..."
echo "-------------------------------"

# Check for security middleware
if ! grep -r "helmet\|x-frame-options\|content-security-policy" src/ 2>/dev/null; then
    print_status "WARNING" "Missing security headers middleware"
    vulnerabilities_found=$((vulnerabilities_found + 1))
fi

echo ""
echo "4. Running security tests..."
echo "----------------------------"

# Run security-specific tests
npm test -- --testNamePattern="Security" --verbose 2>/dev/null
test_exit_code=$?

if [ $test_exit_code -eq 0 ]; then
    print_status "SUCCESS" "All security tests passed"
else
    print_status "ERROR" "Security tests failed - vulnerabilities confirmed"
fi

echo ""
echo "5. Summary"
echo "----------"

total_issues=$((vulnerabilities_found))
if [ $audit_exit_code -ne 0 ]; then
    total_issues=$((total_issues + 1))
fi
if [ $test_exit_code -ne 0 ]; then
    total_issues=$((total_issues + 1))
fi

if [ $total_issues -eq 0 ]; then
    print_status "SUCCESS" "Security scan completed - No issues found! 🎉"
    exit 0
else
    print_status "ERROR" "Security scan completed - $total_issues issue(s) found"
    echo ""
    echo "Recommended actions:"
    echo "1. Run 'npm audit fix' to update vulnerable dependencies"
    echo "2. Implement HTML escaping for user input"
    echo "3. Add security headers middleware (helmet)"
    echo "4. Implement proper input validation"
    echo "5. Handle errors securely without exposing internal details"
    exit 1
fi

# Cleanup
rm -f audit_results.tmp