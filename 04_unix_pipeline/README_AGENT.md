# Exercise 4: Unix Pipeline Batch Processing

## Your Task

Use Unix pipelines to analyze long application logs and compare model outputs. You will pipe a 500-line stack trace into different coding agents and diff their responses.

## Context

The `logs/application_error.log` file contains a large Node.js stack trace. The goal is to generate concise explanations from multiple agents and then compare their suggestions.

## Requirements
1. Read `logs/application_error.log` from standard input
2. Summarize the root cause of the error
3. Propose actionable fixes
4. Output the summary as plain text

## Success Criteria
- [ ] Produces a clear summary of the stack trace
- [ ] Suggests at least one fix
- [ ] Works when run in a Unix pipeline

## Available Commands
- `cat logs/application_error.log | claude -p "Explain"`
- `cat logs/application_error.log | gemini -p "Explain"`
- `./scripts/compare_agents.sh claude.txt gemini.txt`
