# Exercise 5: Security Patch & Vulnerability Scan - Human Guide

## Demo Flow
1. **Initial Assessment**
   - Show the current state: "Let's check what security issues exist"
   - Run `npm audit` to show vulnerable dependencies
   - Highlight the severity levels and CVE numbers

2. **Dependency Vulnerabilities**
   - Explain what each vulnerability means
   - Show how to research CVEs online
   - Demonstrate `npm audit fix` vs manual updates

3. **Code Vulnerabilities**
   - Open `src/vulnerable_service.js`
   - Point out the XSS vulnerability in the user input handling
   - Show how it could be exploited with a malicious payload

4. **Security Testing**
   - Run the security tests to see failures
   - Explain what each test is checking for

5. **Automated Scanning**
   - Run the security scanning script
   - Show how it catches multiple types of issues

6. **Fixing Process**
   - Update package.json dependencies
   - Fix the XSS vulnerability with proper sanitization
   - Re-run tests to verify fixes

7. **Prevention**
   - Show the pre-commit hook
   - Demonstrate how it blocks vulnerable code from being committed

## Key Points to Highlight
- **Dependency Management**: How outdated packages become security risks
- **Input Sanitization**: Why trusting user input is dangerous
- **Defense in Depth**: Multiple layers of security checks
- **Automation**: Security scanning should be part of CI/CD
- **Developer Education**: Security is everyone's responsibility

## Vulnerability Examples
- **XSS**: `<script>alert('XSS')</script>` in user input
- **Prototype Pollution**: Malicious object properties
- **DoS**: ReDoS attacks via regex

## Troubleshooting
- If `npm audit fix` doesn't work: "Sometimes you need manual updates"
- If tests are flaky: "Security tests can be sensitive to timing"
- If hooks don't trigger: "Check git hook permissions and execution"
- Common issues: Version conflicts, breaking changes in security updates

## Reset Commands
- `npm run reset`
- `git reset --hard ORIG_HEAD`
- `rm -rf node_modules && npm install` (to reset dependencies)

## Additional Resources
- OWASP Top 10
- Node.js Security Checklist
- npm audit documentation