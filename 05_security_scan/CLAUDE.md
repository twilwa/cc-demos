# Exercise 5: Security Patch & Vulnerability Scan

## Overview
This exercise demonstrates security vulnerability detection and remediation in a Node.js application. It covers both dependency vulnerabilities and code-level security issues.

## Learning Objectives
- Identify and fix vulnerable dependencies using npm audit
- Detect and patch XSS vulnerabilities in application code
- Implement automated security scanning
- Set up preventive security measures with git hooks

## Scenario
You've inherited a Node.js web service that processes user comments and displays them on a webpage. The application has several security issues:

1. **Vulnerable Dependencies**: The application uses outdated versions of Express and Lodash with known security vulnerabilities
2. **XSS Vulnerability**: User input is not properly sanitized before being rendered in HTML
3. **Missing Security Controls**: No automated scanning or prevention measures

## Vulnerabilities Included

### Dependency Vulnerabilities
- **Express 4.16.4**: Contains multiple CVEs including path traversal and DoS vulnerabilities
- **Lodash 4.17.11**: Vulnerable to prototype pollution attacks

### Code Vulnerabilities
- **Reflected XSS**: User comments are directly inserted into HTML without sanitization
- **Missing Content Security Policy**: No CSP headers to prevent script injection
- **No Input Validation**: Server accepts any input without validation

## Security Tools Used
- `npm audit`: Dependency vulnerability scanning
- ESLint security plugins: Static code analysis
- Custom security scanner: Pattern-based vulnerability detection
- Git pre-commit hooks: Prevention of vulnerable code commits

## Fix Strategy
1. Update vulnerable dependencies to secure versions
2. Implement HTML escaping for user input
3. Add Content Security Policy headers
4. Set up automated security scanning in CI/CD
5. Install pre-commit hooks to catch future vulnerabilities

## Agent Instructions
The AI agent should:
1. Run security audits to identify issues
2. Research and understand each vulnerability
3. Apply appropriate fixes systematically
4. Verify fixes with security tests
5. Set up preventive measures for the future

This exercise teaches that security is not a one-time fix but an ongoing process requiring multiple layers of protection.