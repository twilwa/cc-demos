#!/usr/bin/env node

/**
 * Pre-commit hook to prevent insecure code patterns
 * This hook blocks commits that contain potential security vulnerabilities
 */

const fs = require('fs');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Security patterns to block
const securityPatterns = [
  {
    pattern: /res\.send\([^)]*\$\{[^}]*\}/g,
    message: 'Potential XSS: Template literals in HTML response without escaping',
    severity: 'error'
  },
  {
    pattern: /\.innerHTML\s*=.*\$\{/g,
    message: 'Potential XSS: Direct innerHTML assignment with variables',
    severity: 'error'
  },
  {
    pattern: /_\.merge\s*\(/g,
    message: 'Potential prototype pollution: Using lodash merge (use mergeWith or cloneDeep)',
    severity: 'warning'
  },
  {
    pattern: /throw new Error\([^)]*req\.|throw new Error\([^)]*\$\{req\./g,
    message: 'Information disclosure: Error contains request data',
    severity: 'error'
  },
  {
    pattern: /console\.log\([^)]*password|console\.log\([^)]*secret|console\.log\([^)]*token/gi,
    message: 'Potential secret leakage: Logging sensitive information',
    severity: 'error'
  },
  {
    pattern: /eval\s*\(/g,
    message: 'Code injection risk: Using eval()',
    severity: 'error'
  },
  {
    pattern: /new Function\s*\(/g,
    message: 'Code injection risk: Using Function constructor',
    severity: 'error'
  },
  {
    pattern: /process\.env\.[A-Z_]+\s*\+/g,
    message: 'Potential secret exposure: Environment variable concatenation',
    severity: 'warning'
  }
];

// Production-only patterns that should never be committed
const productionPatterns = [
  {
    pattern: /\.env\.production|\.env\.prod/g,
    message: 'Production environment file should not be committed',
    severity: 'error'
  },
  {
    pattern: /password\s*[:=]\s*["'][^"']+["']/gi,
    message: 'Hardcoded password detected',
    severity: 'error'
  },
  {
    pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
    message: 'Hardcoded API key detected',
    severity: 'error'
  },
  {
    pattern: /secret[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
    message: 'Hardcoded secret key detected',
    severity: 'error'
  }
];

function checkFile(filePath, content) {
  const issues = [];
  
  // Check security patterns
  securityPatterns.forEach(({ pattern, message, severity }) => {
    const matches = content.match(pattern);
    if (matches) {
      issues.push({
        file: filePath,
        message,
        severity,
        matches: matches.length
      });
    }
  });
  
  // Check production patterns
  productionPatterns.forEach(({ pattern, message, severity }) => {
    const matches = content.match(pattern);
    if (matches) {
      issues.push({
        file: filePath,
        message,
        severity,
        matches: matches.length
      });
    }
  });
  
  return issues;
}

function main() {
  try {
    // Get list of staged files
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(file => file.trim() && (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.json')));
    
    if (stagedFiles.length === 0) {
      log('green', '✅ No relevant files to check');
      process.exit(0);
    }
    
    log('yellow', '🔍 Checking staged files for security issues...');
    
    let hasErrors = false;
    let hasWarnings = false;
    
    stagedFiles.forEach(filePath => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const issues = checkFile(filePath, content);
        
        if (issues.length > 0) {
          console.log(`\n📄 ${filePath}:`);
          
          issues.forEach(issue => {
            const icon = issue.severity === 'error' ? '❌' : '⚠️';
            const color = issue.severity === 'error' ? 'red' : 'yellow';
            
            log(color, `  ${icon} ${issue.message}`);
            
            if (issue.severity === 'error') {
              hasErrors = true;
            } else {
              hasWarnings = true;
            }
          });
        }
      } catch (error) {
        log('yellow', `⚠️  Could not read file: ${filePath}`);
      }
    });
    
    if (hasErrors) {
      log('red', '\n🚫 Commit blocked due to security errors!');
      log('red', 'Please fix the security issues above before committing.');
      process.exit(1);
    } else if (hasWarnings) {
      log('yellow', '\n⚠️  Security warnings found');
      log('yellow', 'Consider addressing these issues for better security.');
      log('green', 'Commit allowed, but please review the warnings.');
    } else {
      log('green', '\n✅ No security issues found. Commit allowed.');
    }
    
    process.exit(0);
    
  } catch (error) {
    log('red', `Error running security check: ${error.message}`);
    log('yellow', 'Allowing commit to proceed (hook error)');
    process.exit(0);
  }
}

// Run the security check
main();