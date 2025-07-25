# CLAUDE.md - Exercise-Specific Context for 04_unix_pipeline

## Exercise Overview
This exercise shows how coding agents can participate in traditional Unix pipelines. A long stack trace is provided to demonstrate batch processing and output comparison between models.

## Project Structure
```
04_unix_pipeline/
├── CLAUDE.md                # This file - exercise context
├── README_AGENT.md          # Instructions for Claude Code
├── README_HUMAN.md          # Human-facing demo guide
├── logs/
│   └── application_error.log  # 500-line stack trace
├── scripts/
│   └── compare_agents.sh    # Diff helper for agent outputs
└── samples/
    └── complex_diff.patch   # Example diff for analysis
```

## Stack Trace
The `application_error.log` file contains a realistic Node.js stack trace repeated to reach roughly 500 lines. Agents should read from `stdin` to summarise the root cause and suggest fixes.

## Comparison Script
`compare_agents.sh` accepts two text files (agent outputs) and displays a unified diff so you can quickly see differences in recommendations.

## Success Criteria
- Agents produce concise summaries when piped the log
- `compare_agents.sh` highlights differences between agents
- Diffs in `samples/complex_diff.patch` can be used for practice
