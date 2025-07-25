# Exercise 4: Unix Pipeline / Batch - Human Guide

## Demo Flow
1. Show the size of `logs/application_error.log` with `wc -l`
2. Pipe the log into Claude Code and Gemini CLI separately
   ```bash
   cat logs/application_error.log | claude -p "Explain and suggest fixes" > claude.txt
   cat logs/application_error.log | gemini -p "Explain and suggest fixes" > gemini.txt
   ```
3. Run `./scripts/compare_agents.sh claude.txt gemini.txt` to diff the outputs
4. Discuss the different suggestions from each agent

## Key Points to Highlight
- Unix pipelines work well with coding agents
- Different models produce different insights
- Simple diffing helps evaluate responses

## Troubleshooting
- Ensure the log file exists and is large enough
- If diff shows no differences, check that each agent produced output

## Reset Commands
- `git reset --hard ORIG_HEAD`
- `git clean -fd`
