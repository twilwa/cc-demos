#!/bin/bash
# Compare the outputs of two coding agents using diff
# Usage: ./compare_agents.sh claude.txt gemini.txt

set -e
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <agent1_output> <agent2_output>" >&2
  exit 1
fi

AGENT1="$1"
AGENT2="$2"

diff -u "$AGENT1" "$AGENT2" || true
