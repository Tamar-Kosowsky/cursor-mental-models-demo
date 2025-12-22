#!/bin/bash

json_input=$(cat)
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/agent-audit.log"

mkdir -p "$(dirname "$LOG_FILE")"
echo "[$timestamp] $json_input" >> "$LOG_FILE"

exit 0
