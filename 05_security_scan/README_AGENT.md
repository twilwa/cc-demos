# Exercise 5: Security Patch & Vulnerability Scan

## Your Task
Identify and fix security vulnerabilities in a Node.js application, including vulnerable dependencies and XSS vulnerabilities in the code.

## Context
This exercise simulates a real-world scenario where an application has security issues that need to be addressed:
- Outdated dependencies with known CVEs
- Cross-site scripting (XSS) vulnerability in user input handling
- Missing security headers and protections

## Requirements
1. Run security audit and identify vulnerable dependencies
2. Update vulnerable dependencies to secure versions
3. Identify and fix XSS vulnerability in the source code
4. Implement proper input sanitization
5. Set up automated security scanning
6. Create pre-commit hooks to prevent insecure code

## Success Criteria
- [ ] All npm audit vulnerabilities are resolved
- [ ] XSS vulnerability is patched with proper sanitization
- [ ] Security tests pass
- [ ] Security scanning script works correctly
- [ ] Pre-commit hooks block vulnerable patterns
- [ ] Code follows security best practices

## Available Commands
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm audit` - Check for vulnerable dependencies
- `npm audit fix` - Attempt to fix vulnerabilities automatically
- `npm run security:scan` - Run custom security scanning script
- `./scripts/security_scan.sh` - Manual security scan

## Security Testing
The exercise includes:
- Unit tests for XSS protection
- Integration tests for the vulnerable service
- Automated dependency vulnerability checking
- Pre-commit hooks to prevent security regressions

## Tips
- Look for unescaped user input in HTML output
- Check for prototype pollution vulnerabilities
- Use tools like `npm audit` and ESLint security plugins
- Consider using security headers middleware