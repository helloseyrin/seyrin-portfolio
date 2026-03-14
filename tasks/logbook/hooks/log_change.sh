#!/bin/bash
# PostToolUse hook — logs file changes to today's session logbook entry
# Fires after every Write or Edit tool call

PROJECT="/home/seyrin/Documents/github/seyrin-portfolio"
LOGBOOK_DIR="$PROJECT/tasks/logbook"
TODAY=$(date +%Y-%m-%d)
LOG_FILE="$LOGBOOK_DIR/$TODAY.md"

# Parse file_path from stdin JSON payload
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    ti = d.get('tool_input', {})
    print(ti.get('file_path', ''))
except:
    print('')
" 2>/dev/null)

# Skip if no path detected
[[ -z "$FILE_PATH" ]] && exit 0

# Skip logbook writes to avoid infinite loop
[[ "$FILE_PATH" == *"logbook"* ]] && exit 0

# Make path relative to project root
REL_PATH="${FILE_PATH#$PROJECT/}"

# Create today's entry if it doesn't exist yet
if [ ! -f "$LOG_FILE" ]; then
    cat > "$LOG_FILE" << EOF
# Session — $TODAY

## Insights

<!-- Insights are written here by Claude during the session -->

## Changes

EOF
fi

TIMESTAMP=$(date +%H:%M)
echo "- [$TIMESTAMP] \`$REL_PATH\`" >> "$LOG_FILE"
